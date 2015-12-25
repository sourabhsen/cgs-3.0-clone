(function() {
  'use strict';

  angular.module('inheritBreadcrumb', [
    'ui.router',
    'LocalStorageModule'
  ])

  .value('inheritBreadcrumbConfig', {
    valueCookieKey: 'inheritBreadcrumb.value'
  })

  .value('inheritBreadcrumbVal', {
    enabled: false,
    parent: '',
    retainParent: false
  })

  .run(['$rootScope',
    'inheritBreadcrumbVal',
    'inheritBreadcrumbConfig',
    'InheritBreadcrumb',
    'localStorageService',
    function($rootScope, inheritBreadcrumbVal, config, InheritBreadcrumb, localStorageService) {
      // upon load, retain any saved values from local storage
      var savedValue = localStorageService.get(config.valueCookieKey);
      if (savedValue) {
        Object.assign(inheritBreadcrumbVal, savedValue);
        $rootScope.breadcrumbParent = inheritBreadcrumbVal.parent;
        InheritBreadcrumb.enableWhenInherited();
      }

      // on state change start
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toParams && toParams.retainBreadcrumb) {
          InheritBreadcrumb.enableWhenInherited();
        }
        if (inheritBreadcrumbVal.enabled) {
          if (inheritBreadcrumbVal.retainParent) {
            // retain the existing parent
            inheritBreadcrumbVal.retainParent = false;
          } else {
            inheritBreadcrumbVal.parent = fromState.name;
            if (fromParams) {
              inheritBreadcrumbVal.parent += '(' + angular.toJson(fromParams) + ')';
            }
          }
          $rootScope.breadcrumbParent = inheritBreadcrumbVal.parent;
          inheritBreadcrumbVal.enabled = false;
        } else {
          inheritBreadcrumbVal.parent = '';
        }
        $rootScope.breadcrumbParent = inheritBreadcrumbVal.parent;
        localStorageService.set(config.valueCookieKey, inheritBreadcrumbVal);
      });
    }
  ])

  .factory('InheritBreadcrumb', [
    'inheritBreadcrumbVal',
    function(inheritBreadcrumbVal) {
      return {
        enable: function() {
          inheritBreadcrumbVal.enabled = true;
          inheritBreadcrumbVal.retainParent = false;
        },
        enableWhenInherited: function() {
          if (inheritBreadcrumbVal.parent) {
            inheritBreadcrumbVal.enabled = inheritBreadcrumbVal.retainParent = true;
          }
        }
      };
    }
  ])

  .directive('inheritBreadcrumb', [
    'InheritBreadcrumb',
    function(InheritBreadcrumb) {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, element) {
          element.on('click', function inheritBreadcrumbClick() {
            InheritBreadcrumb.enable();
          });
        }
      };
    }
  ]);

})();
