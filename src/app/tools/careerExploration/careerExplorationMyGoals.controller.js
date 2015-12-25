(function() {
  'use strict';

  angular.module('careerExplorationMyGoals', [
      'careerExplorationMyGoals.vm',
      'ui.router',
      'careersUser',
      'apolloInterestSurvey.filters.startFrom',
      'truncate',
      'filter.leadingZero',
      'ui.tree'
    ])
    .controller('CareerExplorationMyGoalsCtrl', [
      '$state',
      '$parse',
      'User',
      'CareerExplorationMyGoalsViewModel',
      function($state, $parse,User, vm) {
        var ctrl = this,
          parseSrcAndDestSame = $parse('source.nodesScope.$id === dest.nodesScope.$id && source.index === dest.index');

        ctrl.vm = vm;


        ctrl.treeOptions = {
          beforeDrag: function(sourceNodeScope, event) {
            var eventElm = angular.element(event.target),
              tagName = eventElm.prop('tagName').toLowerCase();

            // skip drags on links
            return tagName !== 'a';
          },
          dropped: function(event) {
            var dropSame = parseSrcAndDestSame(event);
            if (!dropSame) {
              ctrl.initWait = vm.saveGoalOrdering();
            }
          }
        };

        ctrl.initWait = vm.init();

      }
    ]).controller('MyGoalDeleteModalCtrl', [
      'goalToDel',
      '$scope',
      'CareerExplorationMyGoalsViewModel',
      function(goalToDel, $scope, vm) {
        var ctrl = this;

        ctrl.goal = goalToDel;

        ctrl.deleteGoal = function() {
          return vm.deleteGoal(ctrl.goal).then(function() {
            $scope.$close(true);
          });
        };
      }
    ]);




})();
