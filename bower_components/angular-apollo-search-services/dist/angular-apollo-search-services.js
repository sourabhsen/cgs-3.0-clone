/**
 * Created by vcanterb on 7/30/15.
 */

(function (angular) {
  'use strict';

  angular.module('angularApolloSearchServices.search', [
    'angularApolloSearchServices.utils'
  ])
  /**
   * @ngdoc service
   * @name Search
   * @requires $http
   * @requires angularApolloSearchServices.utils
   *
   *
   * @description
   * A factory which constructs a http object that lets you interact with Apollo search services
   *
   * @returns {object} Returns a hash with the methods:
   *
   */
  .factory('Search', [
    '$http',
    'angularApolloSearchServices.utils',
    '$parse',
    '$q',
    function ($http, utils, $parse, $q) {

      var servicePaths = {
        queryJobs: '/api/search/jobs/query',
        mltJobs: '/api/search/jobs/mlt',
        similarJobs: '/api/job-service/:apiVersion/:tenant/jobs/:jobId/similarjobs'
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
        queryJobs: function (userconfig) {
          var config = {
              transformResponse: rootResponseTransforms
            },
            request;

          if (!$parse('q')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.queryJobs);

          return $http.get(request.url, request.config);
        },
        // now 'similarjobs' serivce is used
        // this function can be removed
        mltJobs: function (userconfig) {
          var config = {
              transformResponse: rootResponseTransforms
            },
            request;
          if (!$parse('q')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.mltJobs);

          return $http.get(request.url, request.config);
        },
        similarJobs: function (userconfig) {
            var config = {
                transformResponse: rootResponseTransforms
              },
              request;

            if (!$parse('jobId')(userconfig)) {
              return $q.when({
                data: []
              });
            }
            request = utils.map(userconfig, config, servicePaths.similarJobs);
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
  angular.module('angularApolloSearchServices.config', [])
    .value('angularApolloSearchServices.config', {
      debug: true,
      apiVersion: 1,
      tenant: 'uopx'
    });

  angular.module('angularApolloSearchServices.utils', [
    'angularApolloSearchServices.config'
  ]).factory('angularApolloSearchServices.utils', [
    'angularApolloSearchServices.config',
    function (jsconfig) {
      return {
        map: function (userconfig, defaults, url) {
          var request = {
              url: '',
              config: {}
            },
            re = /:([a-zA-Z0-9_-]+)/g;
          if (userconfig.tenant) {
              jsconfig.tenant = userconfig.tenant;
          }
          url = url.replace(/:version/gi, jsconfig.apiVersion).replace(/:tenant/gi, jsconfig.tenant);

          url = url.replace(re, function replaceParam(str, p1) {
            var val = userconfig[p1];
            delete userconfig[p1];
            delete userconfig["tenant"];
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
   * @name angularApolloSearchServices
   * @description
   *
   * # angularApolloSearchServices
   *
   * The `angularApolloSearchServices` module provides support for Apollo search-service
   *
   * See {@link angularApolloSearchServices.search `Search`} for usage.
   */
  angular.module('angularApolloSearchServices', [
    'angularApolloSearchServices.search'
  ]);

})(angular);
