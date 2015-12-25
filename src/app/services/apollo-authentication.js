(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name apolloAuthentication
   * @description
   *
   * # apolloAuthentication
   *
   * The `apolloAuthentication` module provides authentication support with RESTful services
   * via the Authentication service.
   *
   * See {@link apolloAuthentication.Authentication `Authentication`} for usage.
   */

  /**
   * @ngdoc service
   * @name Authentication
   * @requires $resource, CONSTANTS
   *
   * @description
   * A factory which constructs a resource object that lets you interact with
   * [Apollo authentication user services](https://developer.devint.aptimus.net/api/authentication-service/2/apti/docs#!/user/).
   *
   * Requires the {@link apolloAuthentication `apolloAuthentication`} module to be installed.
   *
   * @returns {object} Returns a hash with the methods:
   *  getUserInfo: returns an authentication object.
   */


  //   angular.module('apolloAuthentication', ['config.constants'])
  //     .factory('Authentication', [
  //       '$resource',
  //       'CONSTANTS',
  //       '$log',
  //       function Authentication($resource, CONSTANTS, $log) {
  //         this.tenant = CONSTANTS.tenant;
  //         this.authServicePath = '/api/authentication-service/2/' + this.tenant + '/user/';

  //         return $resource(this.authServicePath, null, {
  //             'getUserInfo': {
  //               method: 'GET',
  //               params: {
  //                 createAnonymousProfile: true
  //               },
  //               url: this.authServicePath + 'info',
  //               responseType: 'json'
  //             }
  //           }, function (err) {
  //             $log.debug(err);
  //           });
  //       }
  //     ]);



  angular.module('apolloAuthentication', [
    'config.constants',
    'ngCookies'
  ])

  .factory('Auth', ['$http', '$cookies', 'CONSTANTS',
    function($http, $cookies, CONSTANTS) {

      // transform roles to array of roles by app name, e.g.
      //
      // function transformRoles(data) {
      //   var dataObj = angular.fromJson(data) || {},
      //     appRoles = {};
      //   _.forEach(dataObj.roles || [], function (val) {
      //     var apps = JSPath.apply('.resources.appName', val),
      //       roleName = val.roleName;
      //     _.forEach(apps, function (app) {
      //       if (appRoles[app]) {
      //         appRoles[app].push(roleName);
      //       } else {
      //         appRoles[app] = [roleName];
      //       }
      //     });
      //   });
      //   // remove dupe app names
      //   appRoles = _.mapValues(appRoles, _.uniq);
      //   return appRoles;
      // }

      // use classic phxAptiAuth for uopx, multi-tenant mtAuth for everyone else
      function _getAuthName() {
        return CONSTANTS.tenant === 'uopx' ? 'phxAptiAuth' : 'mtAuth';
      }

      return {
        'get': function(createAnonymousProfile) {
          var cfg = {
            params: {
              createAnonymousProfile: createAnonymousProfile ? true : undefined
            }
          };
          return $http.get('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/info', cfg);
        },
        'register': function(data, queryParams) {
          queryParams = queryParams && angular.isString(queryParams) ? '?'+queryParams : '';
          //TODO selectively change endpoint for uopx until mtAuth works on uopx
          return $http.post('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/' + _getAuthName() + '/create' + queryParams, data);
        },
        'login': function(data) {
          return $http.post('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/login', data, {
            ignoreAuthModule: true
          });
        },
        'logout': function() {
          return $http.get('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/logout', {
            ignoreAuthModule: true
          });
        },
        'forgotPassword': function(data) {
          return $http.post('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/' + _getAuthName() + '/forgotpassword', data);
        },
        'changePassword': function(data) {
          return $http.post('/api/authentication-service/2/' + CONSTANTS.tenant + '/user/' + _getAuthName() + '/forgotpasswordfinish', data);
        }
        // 'roles': function (config) {
        //   var cfg = angular.extend({
        //     transformResponse: transformRoles
        //   }, config);
        //   return $http.get('/api/authorization-service/2/' + CONSTANTS.tenant + '/userinfo', cfg);
        // },
        // 'hasCookies': function() {
        //   return $cookies.INFO && $cookies.TOKEN ? true : false;
        // },
      };
    }
  ]);
})();
