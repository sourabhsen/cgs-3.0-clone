(function (angular) {
  'use strict';

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('apolloSkillServices.config', [])
      .value('apolloSkillServices.config', {
          debug: true,
          useHttpCache: false,
          defaultPageSize: 15,
          defaultCourseTypeId: '1,3,4,5'
  });

  // Modules
  angular.module('apolloSkillServices',
      [
          'apolloSkillServices.config',
          'apolloSkillServices.skills',
          'apolloSkillServices.skilledup'
      ]);

})(angular);

(function(window, angular, undefined) {
  'use strict';
  angular.module('apolloSkillServices.skilledup', ['apolloSkillServices.config'])
    /**
     *
     *  type :{
     *    1: Skill-Based,
     *    3: Talks & Lectures,
     *    4: Books & eBooks,
     *    5: Open Courses
     *  }
     *
     *  price :{
     *    null: All Prices,
     *    0: Free,
     *    1..50: Less than $50,
     *    1..100: Less than $100,
     *    1..250: Less than $250
     *  }
     *
     *  page.size: Number of results per page
     *  page.number: Current page number
     */
    .factory('SkilledUp', [
      '$http',
      'apolloSkillServices.config',
      function($http, moduleConfig) {

        function forEachSorted(obj, iterator, context) {
          var keys = Object.keys(obj).sort();
          for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
          }
          return keys;
        }

        // proprietary buildUrl for encoding query parameters
        // because skilledUP service is a POS that interprets
        // Communication+Skills and Communication%20Skills differently
        // Use encodeUriComponent to only use %20 encoding
        function buildUrl(url, params) {
          if (!params) {
            return url;
          }
          var parts = [];
          forEachSorted(params, function(value, key) {
            if (value === null || angular.isUndefined(value)) {
              return;
            }
            if (!angular.isArray(value)) {
              value = [value];
            }

            angular.forEach(value, function(v) {
              if (angular.isObject(v)) {
                if (angular.isDate(v)) {
                  v = v.toISOString();
                } else {
                  v = angular.toJson(v);
                }
              }
              parts.push(encodeURIComponent(key) + '=' +
                encodeURIComponent(v));
            });
          });
          if (parts.length > 0) {
            url += ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
          }
          return url;
        }

        return {
          /**
           * makes a GET request for skills courses
           * @param  {String} keyword Skill Name
           * @param  {Number} page    Page Number
           * @param  {Number} pageSize  Page Size
           * @param  {String} type    Type of courses
           * @param  {String} price   Value to indicate price range
           * @return {Promise}        returns $http promise
           */
          getCourses: function(keyword, page, pageSize, type, price) {
            var config = {
              cache: moduleConfig.useHttpCache,
              params: {
                'keyword': keyword,
                'course_type_id': type || moduleConfig.defaultCourseTypeId,
                'page.size': pageSize || moduleConfig.defaultPageSize
              }
            };

            if (price) {
              config.params.price = price;
            }
            if (page) {
              config.params.page = page;
            }
            return $http.get('/api/skill-service/1/skilledUp/courses', config);
          },
          /**
           * makes a GET request for skilledUp products/courses (courses v2)
           * @param  {Object} params Paramers object.  page.size is required.
           *         Sample values: q, page.size, page.number, product.type.name, provider.id, 
           *         category, price.min, price.max, facet, unfacet, zero_facets, sortBy, sortOrder
           * @return {Promise}        returns $http promise
           */
          getProducts: function(params) {
            // use proprietary buildUrl because skilledUp service sucks
            var url = buildUrl('/api/skill-service/1/products', params);
            var config = {
              cache: moduleConfig.useHttpCache
            };
            return $http.get(url, config);
          }
        };
      }
    ]);
})(window, window.angular);

(function(window, angular, undefined) {
    'use strict';
    angular.module('apolloSkillServices.skills', ['apolloSkillServices.config'])

    /**
     * makes a GET request for skills by occupation
     * @param  {String} jobCodeType jobCodeType (defaults to RONET)
     * @param  {Object} params    Parameters object (e.g. {jobcode:'41-3041.00',
     *                             profileid: 'e815ecfe-b387-4cc1-af2f-c08980829400',
     *                             sort: 'Importance', tenantid: 'uopx', maximumskills: 15)
     * Refer to
     * https://developer.devnt.aptimus.net/api/skill-service/1/apti/docs#!/skills/getSkillsForOccupation
     *                            for details
     * @return {Promise}        returns $http promise
     */
    .factory('Skills', [
        '$http',
        function($http) {
            return {
                'getByOccupations': function(jobCodeType, params) {
                    var jcType = jobCodeType || 'RONET',
                        config = {};
                    if (angular.isObject(params)) {
                        config.params = params;
                    }

                    return $http.get('/api/skill-service/1/skills/occupations/' + jcType, config);
                }
            };
        }
    ]);
})(window, window.angular);
