/**
 * Created by yrganta on 5/4/15.
 */

(function () {
  'use strict';


  angular.module('apolloJobServices.activity.tracker', [
    'apolloJobServices.utils'
  ])
    .factory('ActivityTracker', [
      '$http', 'apolloJobServices.utils', '$parse', '$q',
      function ($http, utils, $parse, $q) {

        var servicePaths = {
          savedJobs: '/api/job-service/:version/:tenant/users/:profileId/jobs/lists',
          appliedJobs: '/api/job-service/:version/:tenant/users/:profileId/jobs/applications',
          activity: '/api/job-service/:version/:tenant/jobs/:id/activity',
          getAppliedJob: '/api/job-service/:version/:tenant/users/:profileId/jobs/:id/activity/applied',
          userConfirmationPreference: '/api/job-service/:version/:tenant/users/:profileId/jobs/applications/confirmation',
          getApplicationStatuses: '/api/job-service/:version/jobs/applications/statuses',
          updateApplication: '/api/job-service/:version/:tenant/users/:profileId/jobs/applications/:id',
          updateATSCredentials: '/api/job-service/:version/:tenant/users/:profileId/jobs/applications/companies/:companyId/credentials',
          atsConnections: '/api/job-service/:version/:tenant/users/:profileId/jobs/applications/companies/:companyId/connections'
        };

        var resultsResponseTransforms = utils.appendTransform($http.defaults.transformResponse,
          function tranformResultsToArray(response) {
            var transformedResponse;

            // successful response should already be an object from default transform
            if (angular.isObject(response) && Object.keys(response)) {
              if (response.results) {
                transformedResponse = angular.isArray(response.results) ? response.results : [response.results];

                // Project any higher level properties on to transformedResponse.
                Object.keys(response)
                  .filter(function (key) {
                    return key !== 'results';
                  })
                  .forEach(function (key) {
                    transformedResponse[key] = response[key];
                  });
              } else {
                transformedResponse = response;
              }

              return transformedResponse;
            } else {
              return response;
            }
          }
        );

        return {
          /**
           *
           * @param userconfig
           * e.g: {
           *   tenantId				string
           *   profileId			string
           *   page.number		integer
           *   page.size			integer
           *   company				string
           *   saveDateFrom		string
           *   saveDateTo			string
           *   page.sort			string
           *   page.sort.dir  string
           * }
           *
           * @returns {HttpPromise}
           */
          savedJobs: function (userconfig) {
            var config = {
                params: {},
                transformResponse: utils.appendTransform($http.defaults.transformResponse,
                  utils.transformJobsResultsToArray)
              },
              request;

            if (!$parse('profileId')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            request = utils.map(userconfig, config, servicePaths.savedJobs);

            return $http.get(request.url, request.config);
          },
          /**
           *
           * @param userconfig
           * e.g: {
           *   tenantId				string
           *   profileId			string
           *   page.number		integer
           *   page.size			integer
           *   company				string
           *   saveDateFrom		string
           *   saveDateTo			string
           *   page.sort			string
           *   page.sort.dir  string
           * }
           *
           * @returns {HttpPromise}
           */
          appliedJobs: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            if (!$parse('profileId')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            request = utils.map(userconfig, config, servicePaths.appliedJobs);

            return $http.get(request.url, request.config);
          },
          setActivity: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.activity);
            /*  service expects a specific plain object */
            return $http.post(request.url, userconfig);
          },
          setAppliedJob: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.appliedJobs);
            /*  service expects a specific plain object */
            return $http.post(request.url, userconfig);
          },
          getAppliedJob: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.getAppliedJob);

            return $http.get(request.url, request.config);
          },
          getUserConfirmationPreference: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.userConfirmationPreference);

            return $http.get(request.url, userconfig);
          },
          setUserConfirmationPreference: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.userConfirmationPreference);
            /* put call expects a specific plain object */
            return $http.put(request.url, userconfig);
          },
          getApplicationStatuses: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.getApplicationStatuses);

            return $http.get(request.url, userconfig);
          },
          updateApplication: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.updateApplication);

            return $http.put(request.url, userconfig);
          },
          updateATSCredentials: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.updateATSCredentials);

            return $http.post(request.url, userconfig);
          },
          getATSConnectionStatus: function (userconfig) {
            var config = {
                params: {},
                transformResponse: resultsResponseTransforms
              },
              request;

            request = utils.map(userconfig, config, servicePaths.atsConnections);

            return $http.get(request.url, userconfig);
          }
        };
      }
    ]);
}());

/**
 * Created by yrganta on 5/4/15.
 */

(function (angular) {
  'use strict';


  angular.module('apolloJobServices.jobs', [
    'apolloJobServices.utils'
  ])
  /**
   * @ngdoc service
   * @name Jobs
   * @requires $http
   * @requires apolloJobServices.config
   *
   *
   * @description
   * A factory which constructs a http object that lets you interact with Apollo job services
   *
   * @returns {object} Returns a hash with the methods:
   *  search: returns search results object.
   */
  .factory('Jobs', [
    '$http',
    'apolloJobServices.utils',
    '$parse',
    '$q',
    function ($http, utils, $parse, $q) {

      var servicePaths = {
        search: '/api/job-service/:version/:tenant/jobs/search',
        suggest: '/api/job-service/:version/jobs/suggest/keywords',
        recommendedJobs: '/api/job-service/:version/:tenant/jobs/search/recommendedJobs',
        jobDetails: '/api/job-service/:version/jobs/:jobId'
      };

      var jobsResultsResponseTransforms = utils.appendTransform($http.defaults.transformResponse,
          utils.transformJobsResultsToArray),
        rootResponseTransforms = utils.appendTransform($http.defaults.transformResponse,
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
        search: function (userconfig) {
          var config = {
              transformResponse: jobsResultsResponseTransforms
            },
            request,
            data = {
              'keywords.title': '',
              'radius': 25,
              'programFilter': [],
              'programCode': [],
              'industryFilter': [],
              'experienceLevel': [],
              'companyFilter': [],
              'jobTitle': [],
              'jobType': [],
              'jobCode': '',
              'eduLevelFilter': [],
              'salaryRange': [],
              'salaryFrequency': [],
              'tuitionReimbursement': false,
              'preferredPartner': true,
              'pageNumber': 0,
              'pageSize': '10',
              'sortBy': 'Relevancy',
              'locationFilter': []
            };

          request = utils.map({}, config, servicePaths.search);

          data = angular.extend(data, userconfig);

          return $http.post(request.url, data, request.config);
        },
        suggest: function (userconfig) {
          var config = {
              params: {
                noOfResults: 20
              },
              transformResponse: rootResponseTransforms
            },

            request;

          if (!$parse('q')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.suggest);

          return $http.get(request.url, request.config);
        },
        recommendedJobs: function (userconfig) {
          var config = {
              params: {
                pageSize: 20,
                useRecommendation: true,
                recommendationType: 'RONET'
                //, programCode: '@programCode
                //, profileId: '@profileId'
              },
              transformResponse: jobsResultsResponseTransforms
            },
            request;

          if (!$parse('profileId')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.recommendedJobs);

          return $http.get(request.url, request.config);
        },
        jobDetails: function (userconfig) {
          var config = {
              params: {},
              transformResponse: rootResponseTransforms
            },
            request;

          if (!$parse('jobId')(userconfig)) {
            return $q.when({
              data: []
            });
          }

          request = utils.map(userconfig, config, servicePaths.jobDetails);

          return $http.get(request.url, request.config);
        }
      };
    }
  ]);

})(angular);

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt
(function (angular) {
  'use strict';


  // Config
  angular.module('apolloJobServices.config', [])
    .value('apolloJobServices.config', {
      debug: true,
      apiVersion: 1,
      tenant: 'uopx'
    });

  angular.module('apolloJobServices.utils', [
    'apolloJobServices.config'
  ])
    .factory('apolloJobServices.utils', [
      'apolloJobServices.config',
      '$parse',
      function (jsconfig, $parse) {
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
          appendTransform: function(defaults, transform) {
              // We can't guarantee that the default transformation is an array
              defaults = angular.isArray(defaults) ? defaults : [defaults];

              // Append the new transformation to the defaults
              return defaults.concat(transform);
          },
          transformJobsResultsToArray: function(response) {
            var transformedResponse;

            // successful response should already be an object from default transform
            if (angular.isObject(response)) {

              transformedResponse = $parse('jobs.results')(response);

              if (transformedResponse) {
                // console.log('transformResultDataToArray 1', transformedResponse);
                // handle single result
                transformedResponse = angular.isArray(transformedResponse) ? transformedResponse : [transformedResponse];
                // console.log('transformResultDataToArray 2', transformedResponse);

                //  Loop through rest of the params and map them to data rather.
                  Object.keys(response.jobs)
                    .forEach(function (key) {
                      if (key !== 'results') {
                        transformedResponse[key] = response.jobs[key];
                      }
                    });

                  // Copy over higher level prop to data
                  Object.keys(response)
                    .forEach(function (key) {
                      if (key !== 'jobs') {
                        transformedResponse[key] = response[key];
                      }
                    });
              } else {
                transformedResponse = [];
              }
              return transformedResponse;
            } else {
              return response;
            }
          }
        };
      }
    ]);


  /**
   * @ngdoc module
   * @name apolloJobService
   * @description
   *
   * # apolloJobService
   *
   * The `apolloJobService` module provides authentication support with RESTful services
   * via the Jobs service.
   *
   * See {@link apolloJobService.Jobs `Jobs`} for usage.
   */
  angular.module('apolloJobServices', [
    'apolloJobServices.jobs', 'apolloJobServices.activity.tracker'
  ]);

})(angular);
