(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name careersList
   * @description
   *
   * # careersList
   *
   * The `careersList` module provides a reusable ui component via the careersList directive.
   *
   * See {@link careersList.careersList `careersList`} for usage.
   */

  /**
   * @ngdoc directive
   * @name careersList.careersList
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that take in an items list and a selected attribute.
   *
   * Requires the {@link careersList `careersList`} module to be installed.
   *
   */

  angular.module('careersList', [])
    .directive('careersList',
      function() {
        return {
          restrict: 'E',
          template: 'list.html',
          scope: {
            items: '=',
            selected: '='
          },
          link: function(scope) {
            scope.selectItem = function(item) {
              scope.selected = item;
            };
          }
        };
      });

})();
