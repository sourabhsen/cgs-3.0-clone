(function() {
  'use strict';

  angular
    .module('navigation', ['apolloSvgIcon', 'apolloPlaylistCache', 'LocalStorageModule', ])
    .controller('Navigation', ['CONFIG', 'localStorageService', '$rootScope', '$scope', function Navigation(CONFIG, localStorageService, $rootScope, $scope) {
      var ctrl = this;
      ctrl.navigation = {};

      ctrl.navigation.home = [];
      ctrl.navigation.home.title = 'Home';
      ctrl.navigation.home.push({
        icon: 'navDashboardICON',
        title: 'Career Guidance',
        appUrl: 'auth.dashboard',
        identifier: 'dashboard.home'
      });

      ctrl.navigation.milestones = CONFIG.milestones;
      ctrl.navigation.milestones.title = 'Milestones';
      ctrl.navigation.milestones.forEach(function(milestone) {
        milestone.appUrl = 'auth.milestones({milestoneId: ' + milestone.orderSequence + '})';
        milestone.icon = (milestone && milestone.identifier) ? milestone.identifier.split('.')[1] + 'ICON' : '';
      });

      ctrl.navigation.tools = CONFIG.tools;
      ctrl.navigation.tools.title = 'Tools';
      ctrl.navigation.tools.forEach(function(tool) {
        tool.appUrl = 'auth.tools({toolId:\'' + tool.identifier.split('.')[1] + '\'})';
        tool.icon = (tool && tool.identifier) ? tool.identifier.split('.')[1] + 'ICON' : '';
      });

      // Nav slider: slide out on hover or focus of individual elements
      // Remove left-nav class 'display-nav' (if it exists) on body
      // If a user clicks on the dashboard icon, the right-justified spacing is left in place
      // causing the main dashboard to be shifted to the right.
      var mainContentDiv = angular.element('body');
      var navHasFocus = false; // setHoverState state needs focus status
      mainContentDiv.attr('data-focus', 'false');
      mainContentDiv.attr('data-hover', 'false');
      mainContentDiv.attr('data-left-nav', 'true');

      // Needs refactor - probably take advantage of (currently unused) header controller .run() function
      // This watch function gets changes in the milestoneView variable which adjusts body padding to
      // accommodate the left nav
      $scope.$watch(function() {
        return $rootScope.isMilestoneView;
      }, function() {
        mainContentDiv.attr('data-left-nav', $rootScope.isMilestoneView);
      }, true);

      ctrl.setFocusState = function(hasFocus) {
        if (hasFocus) {
          navHasFocus = true;
          mainContentDiv.attr('data-focus', 'true');
        } else {
          navHasFocus = false;
          mainContentDiv.attr('data-focus', 'false');
        }
      };

      ctrl.setHoverState = function(hasHover) {
        if (!navHasFocus) { // skip if focus state is active
          if (hasHover) {
            mainContentDiv.attr('data-hover', 'true');
          } else {
            mainContentDiv.attr('data-hover', 'false');
          }
        }
      };
      // END Nav slider
    }]);

})();
