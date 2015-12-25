(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name dynamicHtml
   * @description
   *
   * # dynamicHtml
   *
   * The `dynamicHtml` module provides the dynamicHtml directive.
   *
   * See {@link dynamicHtml.dynamicHtml `dynamicHtml`} for usage.
   */
  angular.module('dynamicHtml', [])


  /**
   * @ngdoc directive
   * @name dynamicHtml.dynamicHtml
   * @restrict A
   * @element NONE
   *
   * @description
   * A directive to dynamically compile content.  Similar to ng-bind-html, except it actually compiles the dynamic HTML.
   * HTML should be trusted and safe.
   *
   *
   */
  .directive('dynamicHtml', [
    '$compile',
    function($compile) {
      return {
        restrict: 'A',
        scope: {
          dynamicHtml: '='
        },
        link: function(scope, element) {
          scope.$watch('dynamicHtml', function(html) {
            element.html(html);
            $compile(element.contents())(scope);
          });
        }
      };
    }
  ]);

})();
