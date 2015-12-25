'use strict';

/**
 * Monkey patch for ui-bootstrap popover to add custom 'open' trigger and directive
 * to toggle ui.boostrap popovers.
 * Add the new popover-toggle attribute and use the toggle() method in your
 * popover template.
 *
 * Refer to https://github.com/angular-ui/bootstrap/issues/590#issuecomment-104840909
 * for more information.
 *
 */
angular.module('popoverToggle', [
  'ui.bootstrap.popover'
])

.config([
  '$tooltipProvider',
  function($tooltipProvider) {
    $tooltipProvider.setTriggers({
      'open': 'close'
    });
  }
])

.directive('popoverToggle', function($timeout) {
  return {
    scope: true,
    link: function(scope, element) {
      scope.toggle = function() {
        $timeout(function() {
          element.triggerHandler(scope.openned ? 'close' : 'open');
          scope.openned = !scope.openned;
        });
      };
      return element.on('click', scope.toggle);
    }
  };
});
