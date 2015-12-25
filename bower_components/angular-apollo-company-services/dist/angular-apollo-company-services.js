/**
 * Created by vcanterb on 5/4/15.
 */

(function (angular) {
  'use strict';

  angular.module('angularApolloCompanyServices.companies', [
    'angularApolloCompanyServices.utils'
  ])
  /**
   * @ngdoc service
   * @name Companies
   * @requires $http
   * @requires angularApolloCompanyServices.utils
   *
   *
   * @description
   * A factory which constructs a http object that lets you interact with Apollo company services
   *
   * @returns {object} Returns a hash with the methods:
   *  companyDetails: returns company details promise.
   */
  .factory('Companies', [
    '$http',
    'angularApolloCompanyServices.utils',
    '$parse',
    '$q',
    function ($http, utils, $parse, $q) {

      var servicePaths = {
        companyDetails: '/api/company-service/:version/companies/:companyId',
      };

      var rootResponseTransforms = utils.appendTransform($http.defaults.transformResponse,
        function (response) {
          var data;
          // successful response should already be an object from default transform
          if (angular.isObject(response)) {
            // Expecting the result to be just a list of suggestions.
            data = angular.isArray(response) ? response : [response];
            return data;
          } else {
            return response;
          }
        });

      return {
        companyDetails: function (userconfig) {
          var config = {
              transformResponse: rootResponseTransforms
            },
            request;

          if (!$parse('companyId')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.companyDetails);

          return $http.get(request.url, request.config);
        }
      };
    }
  ]);

})(angular);

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp
(function (angular) {
  'use strict';
  // Config
  angular.module('angularApolloCompanyServices.config', [])
    .value('angularApolloCompanyServices.config', {
      debug: true,
      apiVersion: 1,
      tenant: 'uopx'
    });

  angular.module('angularApolloCompanyServices.utils', [
    'angularApolloCompanyServices.config'
  ]).factory('angularApolloCompanyServices.utils', [
    'angularApolloCompanyServices.config',
    function (jsconfig) {
      return {
        map: function (userconfig, defaults, url) {
          var request = {
              url: '',
              config: {}
            },
            re = /:([a-zA-Z0-9_-]+)/g;

          url = url.replace(/:version/gi, jsconfig.apiVersion).replace(/:tenant/gi, jsconfig.tenant);

          url = url.replace(re, function replaceParam(str, p1) {
            var val = userconfig[p1];
            delete userconfig[p1];
            return val;
          });

          // save the new replaced url to pass back.
          request.url = url;

          // Merge the remaining config properties to be passed as params.
          defaults.params = angular.extend({}, defaults.params, userconfig);

          // pass that extended defaults as new config
          request.config = defaults;
          return request;
        },
        appendTransform: function (defaults, transform) {
          // We can't guarantee that the default transformation is an array
          defaults = angular.isArray(defaults) ? defaults : [defaults];

          // Append the new transformation to the defaults
          return defaults.concat(transform);
        }
      };
    }
  ]);

  /**
   * @ngdoc module
   * @name angularApolloCompanyServices
   * @description
   *
   * # angularApolloCompanyServices
   *
   * The `angularApolloCompanyServices` module provides support for Apollo company-service
   *
   * See {@link angularApolloCompanyServices.companies `Companies`} for usage.
   */
  angular.module('angularApolloCompanyServices', [
    'angularApolloCompanyServices.companies'
  ]);

})(angular);
