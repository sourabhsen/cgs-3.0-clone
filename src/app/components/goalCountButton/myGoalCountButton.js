(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name myGoalCount
   * @description
   *
   * # myGoalCount
   *
   * The `myGoalCount` module provides a reusable ui component for the user's career goal (My GoalCount).
   *
   * See {@link myGoalCount.myGoalCountButton `myGoalCountButton`} for usage.
   */
  angular.module('myGoalCount', [
    'duScroll',
    'myGoalInfo'
  ])

  /**
   * @ngdoc controller
   * @name myGoalCount.MyGoalCountButtonCtrl
   *
   * @description
   * My Goal Button Controller - used by {@link myGoalCount.myGoalCountButton `myGoalCountButton`}.
   *
   * Requires the {@link myGoalInfo `myGoalInfo`} module to be installed
   *
   */
  .controller('MyGoalCountButtonCtrl', [
    'MyGoalInfo',
    function(MyGoalInfo) {

      this.myGoalInfo = MyGoalInfo;

      // update goal counts
      MyGoalInfo.update();
    }
  ])

  /**
   * @ngdoc directive
   * @name myGoalCount.myGoalCountButton
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that shows the goal count and redirects to My Goals upon click.
   *
   * Requires the {@link myGoalInfo `myGoalInfo`} module to be installed
   *
   */
  .directive('myGoalCountButton', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'app/components/goalCountButton/myGoalCountButton.html',
        scope: false,
        controller: 'MyGoalCountButtonCtrl as myGoalCount',

      };
    }
  ]);

})();
