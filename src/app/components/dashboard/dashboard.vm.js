(function() {
  'use strict';

  angular
    .module('DashboardViewModel', [
      'jobPlaylist',
      'labormarketServices.career.ronets',
      'apolloValidation',
      'labormarketServices.locationservices',
      'apolloProfile',
      'apolloPlaylistCache',
      'careersUser'
    ])
    .factory('DashboardViewModel', [
      'User',
      'PlaylistCache',
      'Ronets',
      'Validation',
      'LocationService',
      '$q',
      function(User, PlaylistCache, Ronets, Validation, LocationService, $q) {
        var model = this;

        model.data = {};
        model.title = 'Career Guidance System';
        model.ronetitems = [];
        model.promises = {};
        model.initialized = false;

        model.suggestLocations = function(val) {
          var location = Validation.suggestLocation({
            searchTerm: val
          });
          return location.$promise.then(function(response) {
            return response.resultList.map(function(item) {
              item.location = item.city + ', ' + item.state;
              return item;
            });
          });
        };

        model.updateCgsLocation = function(data) {
          var re = /[A-Za-z],\s[A-Za-z]/;
          if (data.match(re)) {
            model.updateStateAreaId(data);
            return true;
          } else {
            return false;
          }
        };

        model.updateStateAreaId = function(location) {
          var locationArray = location.split(','),
            userCity = locationArray[0].trim(),
            userState = locationArray[1].trim();
          User.setStateAreaId(userCity, userState);
        };

        model.getGoalDetails = function(id, msa) {
          if (!id || !msa) {
            // reset ronet data
            model.ronetitems = [];

            return true;  // we don't want to show the error if a user has purposefully cleared their goals ...We shouldn't discriminate against the goal disenfranchised
            // return $q.reject('ronet id and msa must be provided');   // Disabled as was surfacing an error when logged in user sets goals to zero
          }
          return Ronets
            .getLaborData({
              ronets: [id],
              stateAreaId: msa
            })
            .then(function(obj) {
              model.ronetitems = obj.data;
              return model;
            });
        };


        model.getPrimaryGoalData = function() {
          var firstGoalPromise = PlaylistCache.getByType('RONET')
            .then(function(data) {
              model.data = data;
              return data && data.listItems && data.listItems.length ? model.data.listItems[0].itemIdentifier : undefined;
            });

          return $q.all([firstGoalPromise, User.get()])
            .then(function(result) {
              var ronetId = result[0];
              return model.getGoalDetails(ronetId, User.profile.stateAreaId);
            }, function(err) {
              // reset data
              model.data = {};
              model.ronetitems = [];

              // reject if not 404
              if (err.status !== 404) {
                return $q.reject(err);
              }
            });
        };

        model.changeLocation = function() {

        };

        // function bindToUserReload() {
        //   if (model.initialized) {
        //     return;
        //   }
        //   // call init again upon user reload so goals, etc refresh
        //   User.onMsg('User:reload', function() {
        //     model.init();
        //   });
        // }

        model.init = function() {
          model.promises.primaryGoal = model.getPrimaryGoalData();
          //bindToUserReload();
          model.initialized = true;
        };

        return model;
      }
    ]);
})();
