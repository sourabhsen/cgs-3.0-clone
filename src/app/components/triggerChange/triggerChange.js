(function() {
  'use strict';

  /**
   * $ngdoc directive
   * @name triggerChange
   * @scope
   * @restrict A
   * @description Workaround for autofill problems on angular js forms. Autofilling on forms does not update the angular model since
   *              it does not trigger a change event.  This directive is a workaround by firing the change for the specified elements
   *              on click of the submit button.
   *
   *              Refer to http://stackoverflow.com/a/18666882 for more information
   *
   * @example   <input data-ng-model="user.nome" type="text" id="username">
   *            <input data-ng-model="user.senha" type="password" id="password" >
   *            <input type="submit" data-ng-click="login.connect()" id="btnlogin" trigger-change="#password,#username"/>
   *
   */
  angular.module('triggerChange', [])
    .directive('triggerChange', ['$sniffer',
      function($sniffer) {
        return {
          restrict: 'A',
          link: function(scope, elem, attrs) {
            if (attrs.triggerChange) {
              elem.bind('click', function() {
                angular.element(attrs.triggerChange).trigger($sniffer.hasEvent('input') ? 'input' : 'change');
              });

            }
          },
          priority: 1
        };
      }
    ]);
})();
