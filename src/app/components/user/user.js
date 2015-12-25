(function() {
  'use strict';

  /**
   * Global careers User object
   * This contains User.auth, User.profileId, and User.profile information.
   * User.get will be called by default by the auth state, but it will not wait for profile information (if available) to be returned.
   * If you need User.profile information, call User.get again to wait and wait on the  profile/location calls.
   */
  angular.module('careersUser', [
      'apolloAuthentication',
      'apolloProfile',
      'labormarketServices.locationservices',
      'apolloValidation',
      'messageBus',
      'ui.router',
      'LocalStorageModule'
    ])
    .factory('User', [
      '$q',
      'Auth',
      'Profile',
      'LocationService',
      'Validation',
      'MessageBus',
      'CONFIG',
      '$injector',
      'localStorageService',
      function User($q, Auth, Profile, LocationService, Validation, MessageBus, CONFIG, $injector, localStorageService) {
        /*jshint latedef: nofunc */ // for hoisting functions below
        var user = this,
          defaults = {
            auth: {},
            profile: {},
            profileId: undefined,
            $authPromise: undefined,
            $userPromise: undefined,
            setStateAreaCount: 0
          };

        /**
         * Retrieve User object. If already retrieved, existing promise will be returned.
         * Call this if you need to wait for User.profile details
         */
        user.get = function(authOnly) {
          if (user.$authPromise && user.$userPromise) {
            return authOnly ? user.$authPromise : user.$userPromise;
          }

          user.$authPromise = _getAuth();
          user.$userPromise = user.$authPromise.then(_getProfile);

          return authOnly ? user.$authPromise : user.$userPromise;
        };

        user.$reset = function() {
          Object.assign(user, defaults);
        };

        /** Sets state area id from user.profile.city and user.profile.state */
        user.setStateAreaId = function(city, state) {
          return LocationService.getStateCodes({
            state: state || CONFIG.config.defaultLocation.state
          }).then(function(location) {
            var re = new RegExp(city, 'gi'),
              stateAreaCode;

            location.data.find(function(value) {
              if (value.stateAreaName.match(re)) {
                stateAreaCode = value.stateAreaCode;
                return true;
              }
            });
            if (!stateAreaCode) {
              stateAreaCode = location.data[0].stateAreaCode;
            }
            user.profile.stateAreaId = stateAreaCode ? stateAreaCode.slice(stateAreaCode.lastIndexOf('/') + 1) : CONFIG.config.defaultLocation.stateAreaId;

            if (user.profile.stateAreaId === CONFIG.config.defaultLocation.stateAreaId && user.profile.state !== CONFIG.config.defaultLocation.state) {
              user.profile.city = CONFIG.config.defaultLocation.city;
              user.profile.state = CONFIG.config.defaultLocation.state;
            } else {
              user.profile.city = city;
              user.profile.state = state;
            }

            user.profile.cgsLocation = toTitleCaseIfNeeded(user.profile.city) + ', ' + user.profile.state;

            MessageBus.emitMsg('User:setStateAreaId', {
              city: city,
              state: state,
              stateAreaId: user.profile.stateAreaId,
              setCount: ++user.setStateAreaCount
            });

            return user;
          });
        };

        user.isAuthenticated = function() {
          return user.auth && user.auth.authenticated && user.auth.loginStatus === 'LOGGEDIN' ? true : false;
        };

        user.isKnown = function() {
          return user.auth && !user.auth.authenticated && user.auth.loginStatus === 'KNOWN' ? true : false;
        };

        user.isAnonymous = function() {
          return user.auth && !user.auth.authenticated && user.auth.loginStatus === 'ANONYMOUS' ? true : false;
        };

        user.reload = function(authOnly) {
          user.$reset();
          return user.get(authOnly)
            .then(function() {
              MessageBus.emitMsg('User:reload');
            });
        };

        // convenience method for launching login modal
        user.launchLoginModal = function(onSuccess, showAccessMessage) {
          var LoginModal = $injector.get('LoginModal');

          return LoginModal.open(showAccessMessage)
            .then(angular.isFunction(onSuccess) ? onSuccess : angular.noop);
        };

        // simple wrapper to Message Bus
        user.onMsg = function(msg, func, scope) {
          MessageBus.onMsg(msg, func, scope);
        };

        function _getAuth() {
          return Auth.get((CONFIG.config.accessRequired ? false: true))
            .then(function(httpAuth) {
              user.auth = httpAuth.data;
              user.profileId = user.auth.profileId;
              return user;
            });

          // sample KNOWN user:
          // {
          //   "username": "user@apollo.edu",
          //   "identifier": "user@apollo.edu",
          //   "profileId": "apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819",
          //   "status": "VALID",
          //   "authenticated": false,
          //   "lastAuthenticated": "2015-07-17T06:56:49.977+0000",
          //   "providerProps": {},
          //   "tenantProfileId": "apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819",
          //   "loginStatus": "KNOWN",
          //   "sessionId": "5A24D1C284C64CA8B02CE0A9B0F01C41"
          // }
        }

        function _getProfile() {
          var profileGet;

          // in known state, return public profile since normal endpoint returns 403
          if (user.auth && !user.auth.authenticated && user.auth.loginStatus === 'KNOWN') {
            profileGet = Profile.getPublic({
              profileId: user.profileId
            }).$promise.then(function(profileData) {
              return profileData && profileData.results && profileData.results.length ? profileData.results[0] : {};
            });
          } else {
            profileGet = Profile.get({
              profileId: user.profileId
            }).$promise;
          }

          return profileGet
            .then(function(profile) {
              user.profile = profile;
              return user;
            }, function() {
              //TODO trap 403s or do anything here?
              return user;
            })
            .finally(function() {
              // In case if user as already performed any search before
              // default user location to searched area.
              var savedQuery = localStorageService.get('jobSearch.query');
              var loc;

              if (savedQuery && savedQuery.location) {
                loc = savedQuery.loc = (savedQuery.location).match(/([a-zA-Z\s]+)(?:,\s*)([a-zA-Z]+)/);
              }

              if (loc && loc.length >= 3) {
                return user.setStateAreaId(savedQuery.loc[1], savedQuery.loc[2]);
              } else if (user.profile.city && user.profile.state) {
                return user.setStateAreaId(user.profile.city, user.profile.state);
              } else {
                return _useIpLocation();
              }
            });
        }

        function _useIpLocation() {
          return Validation.ipLocation().$promise.then(function(location) {
            user.profile.postalCode = location.PostalCode;
            return user.setStateAreaId(location.City, location.State);
          });
        }

        function toTitleCaseIfNeeded(str) {
          return str === str.toUpperCase()  ? toTitleCase(str) : str;
        }

        function toTitleCase(str) {
          return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }


        // on startup, reset to defaults
        user.$reset();

        return user;
      }
    ]);
})();
