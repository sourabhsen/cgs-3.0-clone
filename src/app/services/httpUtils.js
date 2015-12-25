(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name httpUtils
   * @description
   *
   * # httpUtils
   *
   * The `httpUtils` module provides general http utilities for services
   */

  angular.module('httpUtils', [])
    .factory('httpUtils', [
      '$http',
      '$q',
      function($http, $q) {
        return {
          appendTransformtoDefaults: function(transform) {
            // We can't guarantee that the default transformation is an array
            var defaults = angular.isArray($http.defaults.transformResponse) ? $http.defaults.transformResponse : [$http.defaults.transformResponse];

            // Append the new transformation to the defaults
            return defaults.concat(transform);
          },
          ignoreNotFoundExceptionHandler: function(err) {
            if (err.status !== 404) {
              return $q.reject(err);
            }
          }
        };
      }
    ]);

})();
