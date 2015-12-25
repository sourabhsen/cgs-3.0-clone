(function() {
  'use strict';

  angular.module('careerExploration.directives', [
      'myGoal',
      'myGoalCount',
      'truncate',
      'partitionFilter'
    ])
    .directive('careerExpTiles', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/tools/careerExploration/careerExplorationTiles.html',
          scope: {
            careerGoals: '='
          }
        };
      }
    ])
    .directive('careerExpTile', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/tools/careerExploration/careerExplorationTile.html',
          scope: {
            careerGoal: '='
          }
        };
      }
    ])
    .directive('careerExpTable', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/tools/careerExploration/careerExplorationTable.html',
          scope: {
            careerGoals: '='
          }
        };
      }
    ]);
})();
