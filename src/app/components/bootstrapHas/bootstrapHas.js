(function() {
    'use strict';

  // Poached from http://stackoverflow.com/questions/14348384/reconcile-angular-js-and-bootstrap-form-validation-styling/23618508#23618508


  // add bsHas|bsHasError|bsHasSuccess at parent of input|select|textarea field
  // (e.g. class with form-control) to add has-error|has-success classes appropriately on input errors
  angular.module('bootstrap-has', [])
    .factory('bsProcessValidator', function($timeout) {
      return function(scope, element, ngClass, bsClass) {
        $timeout(function() {
          var input = element.find('input');
          if (!input.length) {
            input = element.find('select');
          }
          if (!input.length) {
            input = element.find('textarea');
          }
          if (input.length) {
            scope.$watch(function() {
              return input.hasClass(ngClass) && (input.hasClass('ng-dirty') || input.hasClass('ng-touched'));
            }, function(isValid) {
              element.toggleClass(bsClass, isValid);
            });
          }
        });
      };
    })
    .directive('bsHasSuccess', function(bsProcessValidator) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          bsProcessValidator(scope, element, 'ng-valid', 'has-success');
        }
      };
    })
    .directive('bsHasError', function(bsProcessValidator) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          bsProcessValidator(scope, element, 'ng-invalid', 'has-error');
        }
      };
    })
    .directive('bsHas', function(bsProcessValidator) {
      return {
        restrict: 'A',
        link: function(scope, element) {
          bsProcessValidator(scope, element, 'ng-valid', 'has-success');
          bsProcessValidator(scope, element, 'ng-invalid', 'has-error');
        }
      };
    });
})();
