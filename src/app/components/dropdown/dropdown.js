(function() {
  'use strict';
  /**
   * @ngdoc module
   * @name careersDropdown
   * @description
   *
   * # careersDropdown
   *
   * The `careersDropdown` module provides a reusable ui component via the careersDropdown directive.
   *
   * See {@link careersDropdown.careersDropdown `careersDropdown`} for usage.
   */

  /**
   * @ngdoc directive
   * @name careersDropdown.careersDropdown
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that creates a dropdown and menu.
   *
   * Requires the {@link careersDropdown `careersDropdown`} module to be installed.
   *
   */

  angular.module('careersDropdown', [])
    .directive('careersDropdown', function() {
      return {
        restrict: 'E',
        scope: {
          items: '=',
          selected: '=',
          isOpen: '='
        },
        transclude: true,
        template: '<div ng-transclude class="dropdown careers" is-open="status.isopen" dropdown></div>',
        controller: function($scope) {
          $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.status.isopen = !this.status.isopen;
          };
        }
      };
    })
    .directive('careersTrigger', function() {
      return {
        transclude: true,
        scope: {},
        template: '<div ng-transclude class="dropdown-toggle careers" dropdown-toggle></div>'
      };
    })
    .directive('careersTarget', function() {
      return {
        transclude: true,
        require: '^careersDropdown',
        scope: {},
        template: '<ul ng-transclude class="dropdown-menu careers"></ul>',
        link: function(scope, elem, attrs, ctrl) {
          scope.ctrl = ctrl;
        }
      };
    });

})();
