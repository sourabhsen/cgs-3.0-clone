(function (angular) {
  'use strict';


  angular.module('labormarketServices.career.areas', [
    'labormarketServices.config'
    , 'labormarketServices.utils'
  ])
    .factory('CareersAreas', [
      '$http'
      , '$q'
      , '$parse'
      , 'labormarketServices.$httpConfigMgr'
      , function ($http, $q, $parse, $httpConfigMgr) {
        return {
          get: function (userconfig) {
            var config = {
                params: {
                  laborMarketDetails: false,
                },
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  function(response) {
                    return $httpConfigMgr.transformResponseToArray('items', response);
                  })
              }
              , url
              , request;

            if (!$parse('majorFamily')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            url = '/api/labormarket-service/:version/:tenant/explorer/minorFamilies/results';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';


  angular.module('labormarketServices.career.categories', ['labormarketServices.utils'])
    .factory('CareerCategories', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {

        var resultsResponseTransforms = $httpConfigMgr.appendTransform($http.defaults.transformResponse,
          function(response) {
            return $httpConfigMgr.transformResponseToArray('results', response);
          });


        return {
          query: function () {
            var config = {
                params: {
                  'page.size': 50,
                  'sort': 'name'
                },
                transformResponse: resultsResponseTransforms
              }
              , url = '/api/labormarket-service/:version/:tenant/families/major'
              , request;

            request = $httpConfigMgr.project({}, config, url);

            return $http.get(request.url, request.config);
          },
          getSubCategories: function (userconfig) {
            var config = {
                params: {
                  'page.size': 50,
                  'sort': 'name'
                },
                transformResponse: resultsResponseTransforms
              }
              , url = '/api/labormarket-service/:version/:tenant/families/major/:majorId/minor'
              , request;

            // Check if no majorId passed return
            // immediately with an empty array.
            if (!$parse('majorId')(userconfig)) {
              return $q.when({data: []});
            }


            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          },
          browse: function (userconfig) {
            var config = {
                params: {
                  'page.size': 50,
                  sort: 'name',
                  sortOrder: 'DESC',
                  orderBy: 'hiringdemand',
                  fallback: 'national'
                },
                // We needed this because this response is non confirming to typical
                // response structure.
                 transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                   function(response) {
                    return $httpConfigMgr.transformResponseToArray('jobCodes', response);
                   })
              }
              , url = '/api/labormarket-service/:version/:tenant/explorer/minorFamily/:majorId/results'
              , request;

            // Check if no minorId or statAreaId is not passed return
            // immediately with an empty array.
            if (!$parse('majorId')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }
        };

      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.details', ['labormarketServices.utils'])
    .factory('CareerDetails', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      '$window',
      function ($http, $q, $parse, $httpConfigMgr, $window) {
        return {
          get: function (userconfig) {

            var config = {
                params: {},
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  $httpConfigMgr.transformResultDataToArray)
              },
              url = '/api/labormarket-service/:version/:tenant/job/:jobId/labordata',
              request;

            if (!$parse('jobId')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            userconfig.tenant = 'uopx';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          },
          getByOnetId: function (userconfig) {

            var config = {
                params: {
                  laborMarketDetails: true
                },
                isArray: true,
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  function(response) {
                    return $httpConfigMgr.transformResponseToArray('jobCodes', response);
                  }),
                interceptor: {
                  responseError: function () {
                    return [];
                  }
                }
              },
              url = '/api/labormarket-service/:version/:tenant/explorer/jobCode/:jobCode/results',
              request;

            if (!$parse('jobCode')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          },
          numPostings: function (userconfig) {

            return this.getByOnetId(userconfig)
              .then(function (resp) {
                var numJobs = resp.data.noOfJobsOpenings || 0;
                return {data: $window.parseInt(numJobs, 10)};
              });
          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.employers', ['labormarketServices.utils'])
    .factory('CareerEmployers', [
      '$http'
      , '$q'
      , '$parse'
      , 'labormarketServices.$httpConfigMgr'
      , function ($http, $q, $parse, $httpConfigMgr) {
        return {
          'get': function (userconfig) {
            // id, param

            var config = {
                params: {}
                ,transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  $httpConfigMgr.transformResultDataToArray)

              }
              , url
              , request;

            if (!$parse('jobId')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            url = '/api/labormarket-service/:version/:tenant/job/:jobId/employers';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.pathway', ['labormarketServices.utils'])
    .factory('CareerPathway', [
      '$http'
      , '$q'
      , '$parse'
      , 'labormarketServices.$httpConfigMgr'
      , function ($http, $q, $parse, $httpConfigMgr) {

        var responseTransformers = $httpConfigMgr.appendTransform($http.defaults.transformResponse,
          $httpConfigMgr.transformResultDataToArray);

        return {
          'from': function (userconfig) {
            //id, params
            var config = {
                params: {
                  careerPathDirection: 'careerPathFrom'
                },
                transformResponse: responseTransformers

                , isArray: true
              }
              , url = '/api/labormarket-service/:version/:tenant/job/:jobId/careerpath'
              , request;


            if (!$parse('jobId')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          },
          'to': function (userconfig) {
            var config = {
                params: {
                  careerPathDirection: 'careerPathTo'
                },
                transformResponse: responseTransformers
                , isArray: true
              }
              , url = '/api/labormarket-service/:version/:tenant/job/:jobId/careerpath'
              , request;

            if (!$parse('jobId')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          }
        };
      }
    ]);

})(angular);

/* Search by keyword for Program Codes */
(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.programsearch', ['labormarketServices.utils'])
    .factory('CareerProgramSearch', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function($http, $q, $parse, $httpConfigMgr) {

        var responseTransformers = $httpConfigMgr.appendTransform($http.defaults.transformResponse,
          function transformJobcodeResponse(response) {
            return $httpConfigMgr.transformResponseToArray('results', response);
          });

        return {
          filter: function(userconfig) {

            var config = {
                params: {
                  'page.size': '50'
                },
                isArray: true,
                transformResponse: responseTransformers
              },
              url,
              request;

            if (!$parse('searchTerm')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            url = '/api/labormarket-service/:version/:tenant/programs';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }
        };

      }
    ]);

})(angular);

(function (angular) {
  'use strict';


  angular.module('labormarketServices.career.program', ['labormarketServices.utils'])
    .factory('CareerProgram', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {

        return {
          get: function (userconfig) {
            var config = {
                params: {
                  fallback: 'national',
                  laborMarketDetails: false
                }
              }
              , url = '/api/labormarket-service/:version/:tenant/explorer/program/results'
              , request;

            // Check if no minorId or statAreaId is not passed return
            // immediately with an empty array.
            if (!$parse('programCode')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: {}});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }
        };

      }
    ]);

})(angular);

(function(angular) {
  'use strict';

  angular.module('labormarketServices.career.search', ['labormarketServices.utils'])
    .factory('CareerSearch', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function($http, $q, $parse, $httpConfigMgr) {

        var responseTransformers = $httpConfigMgr.appendTransform($http.defaults.transformResponse,
          function transformJobcodeResponse(response) {
            return $httpConfigMgr.transformResponseToArray('results', response);
          });


        return {

          filter: function(userconfig) {

            var config = {
                params: {
                  'page.size': '20'
                },
                isArray: true,
                transformResponse: responseTransformers
              },
              url,
              request;

            if (!$parse('searchTerm')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            url = '/api/labormarket-service/:version/:tenant/jobcodes';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          },

          getUser: function(userconfig) {

            var config = {
                params: {
                },
                isArray: true,
                transformResponse: responseTransformers
              },
              url,
              request;

            if (!$parse('profileId')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            url = '/api/labormarket-service/:version/:tenant/users/:profileId/jobCodes';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          },

          getUserRecommended: function(userconfig) {

            var config = {
                params: {
                },
                isArray: true,
                transformResponse: responseTransformers
              },
              url,
              request;

            if (!$parse('profileId')(userconfig)) {
              return $q.when({
                data: []
              });
            }

            url = '/api/labormarket-service/:version/:tenant/users/:profileId/recommended/jobCodes';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          }

        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.skills', ['labormarketServices.utils'])
    .factory('CareerSkills', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {
        return {
          'get': function (userconfig) {

            var config = {
                params: {
                  // Not implemented yet
                  // stateAreaId: 955,
                  // jobSkillType: 'Held'
                },
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                 $httpConfigMgr.transformResultDataToArray)
              },
              url,
              request;

            if (!$parse('jobId')(userconfig)) {
              return $q.when({data: []});
            }

            url = '/api/labormarket-service/:version/:tenant/job/:jobId/skills';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.locationservices', ['labormarketServices.utils'])
    .factory('LocationService', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {
        return {
          'getStates': function () {
            var config = {
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  function transformJobcodeResponse(response) {
                    return $httpConfigMgr.transformResponseToArray('items', response);
                  })
              }
              , request
              , url = '/api/labormarket-service/:version/:tenant/state';

            request = $httpConfigMgr.project({}, config, url);

            return $http.get(request.url, request.config);
          },
          'getStateCodes': function (userconfig) {

            var config = {
                transformResponse: function (response) {

                  response = angular.fromJson(response);

                  return angular.isArray(response.items) ? response.items : [];
                }
              }
              , request
              , url = '/api/labormarket-service/:version/:tenant/state/:state';

            if (!$parse('state')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          },
          getUserMsaCode: function (UserState) {
            var self = this;

            if (!UserState) {
              return $q.when('');
            }

            return self.getStates().then(function (res) {
              var state = res.data.filter(function (state) {
                return state.stateCode === UserState;
              });

              return self.getStateCodes({state: state[0].stateCode});
            })
              .then(function (res) {
                var msa = $parse('data[0]')(res);
                return msa.stateAreaCode.slice(msa.stateAreaCode.lastIndexOf('/') + 1);
              })
              .then(function (msa) {
                return msa;
              },
              function () {
                return '';
              });

          },
          getStateCodeFromZip: function (userconfig) {
            var request
              , url = '/api/labormarket-service/:version/:tenant/state/zip/:zip'
              , config = {
                cache: true,
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  function transformJobcodeResponse(response) {
                    if (angular.isObject(response)) {
                      return [response];
                    } else {
                      return response;
                    }
                  })
              };

            if (!$parse('zip')(userconfig)) {
              return $q.when({data: []});
            }

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
            // TODO: If we need to handle these service failures differently we can
          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.related', ['labormarketServices.utils'])
    .factory('RelatedCareers', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {

        return {
          'get': function (userconfig) {
            var config = {
                params: {
                  fallback: 'national'
                },
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  $httpConfigMgr.transformResultDataToArray)
              },
              url,
              request;


            if (!$parse('jobId')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            url = '/api/labormarket-service/:version/:tenant/job/:jobId/relatedjobs';

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);

          }
        };
      }
    ]);

})(angular);

(function (angular) {
  'use strict';

  angular.module('labormarketServices.career.ronets', ['labormarketServices.utils'])
    .factory('Ronets', [
      '$http',
      '$q',
      '$parse',
      'labormarketServices.$httpConfigMgr',
      function ($http, $q, $parse, $httpConfigMgr) {

        function floorTo(n, v) {
          n = n / v;
          n = Math.floor(n) * v;
          return n;
        }

        return {
          getLaborData: function (userconfig) {

            var config = {
                params: {
                  fallback: 'national'
                },
                transformResponse: $httpConfigMgr.appendTransform($http.defaults.transformResponse,
                  function transformJobcodeResponse(response) {
                    return $httpConfigMgr.transformResponseToArray('items', response);
                  })
              },
              url = '/api/labormarket-service/:version/:tenant/ronets/labordata',
              request;

            // Required parameters check
            if (!$parse('ronets')(userconfig) || !$parse('stateAreaId')(userconfig)) {
              return $q.when({data: []});
            }

            // special case the parameter is supposed to be a single string with ',' separated values.
            userconfig.ronets = angular.isArray(userconfig.ronets) ? userconfig.ronets.slice(0, 25).join(',') : userconfig.ronets;

            request = $httpConfigMgr.project(userconfig, config, url);

            return $http.get(request.url, request.config);
          },
          // gets minor family from ronet id
          getMinorFamilyId: function (ronetId) {
            var onetParts = ronetId.split('-'),
              secondPart,
              result = '';

            if (onetParts && onetParts.length === 2) {
              secondPart = parseInt(onetParts[1], 10) || 0;
              onetParts[1] = floorTo(secondPart, 100);
              result = onetParts.join('-');
            }
            return result;
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
  angular.module('labormarketServices.config', [])
    .value('labormarketServices.config', {
      debug: true,
      apiVersion: 1,
      // default to uopx
      tenant: 'uopx'
    });

  // Util service
  angular.module('labormarketServices.utils', [
    'labormarketServices.config'
  ])
    .factory('labormarketServices.$httpConfigMgr', [
      'labormarketServices.config',
      '$parse'
      , function (lbconfig, $parse) {
        return {
          project: function (userconfig, defaults, url) {
            var request = {
              url: '',
              config: {}
            };
            var re = /:([a-zA-Z0-9_-]+)/g;

            // Replace tenant and version before applying other configurations to url
            url = url.replace(':version', lbconfig.apiVersion).replace(':tenant', lbconfig.tenant);

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
          /** transform response to array
           *  rootProp is root property that contains the array
           *  All other properties will become properties of the array object
           */
          transformResponseToArray: function(rootProp, response) {
            var transformedResponse;

            // successful response should already be an object from default transform
            if (angular.isObject(response)) {

              if (response[rootProp]) {
              transformedResponse = angular.isArray(response[rootProp]) ? response[rootProp] : [response[rootProp]];

              // Project any higher level properties on to transformedResponse.
              Object.keys(response)
                .filter(function(key) {
                  return key !== rootProp;
                })
                .forEach(function(key) {
                  transformedResponse[key] = response[key];
                });
              } else {
                transformedResponse = [];
              }

              return transformedResponse;
            } else {
              return response;
            }
          },
          transformResultDataToArray: function(response) {
            var transformedResponse;

            // successful response should already be an object from default transform
            if (angular.isObject(response)) {

              transformedResponse = $parse('result.data')(response);

              if (transformedResponse) {
                // console.log('transformResultDataToArray 1', transformedResponse);
                // handle single result
                transformedResponse = angular.isArray(transformedResponse) ? transformedResponse : [transformedResponse];
                // console.log('transformResultDataToArray 2', transformedResponse);

                //  Loop through rest of the params and map them to data rather.
                Object.keys(response.result)
                  .filter(function(key) {
                    return key !== 'data';
                  })
                  .forEach(function(prop) {
                    transformedResponse[prop] = response.result[prop];
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
      }]);


// Modules
  angular.module('labormarketServices',
    [
      'labormarketServices.career.categories'
      , 'labormarketServices.career.details'
      , 'labormarketServices.career.employers'
      , 'labormarketServices.career.pathway'
      , 'labormarketServices.career.search'
      , 'labormarketServices.career.skills'
      , 'labormarketServices.career.areas'
      , 'labormarketServices.career.related'
      , 'labormarketServices.career.ronets'
      , 'labormarketServices.locationservices'
      , 'labormarketServices.career.program'
      , 'labormarketServices.career.programsearch'
    ]);

})(angular);
