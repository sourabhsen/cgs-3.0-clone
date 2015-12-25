(function() {
  'use strict';

  angular.module('careerExploration', [
      'careerExplorationViewModel',
      'careerExploration.directives',
      'careerExplorationDetails',
      'careerExplorationMyGoals',
      'xeditable',
      'ui.router'
    ])
    .controller('CareerExplorationController', [
      'CareerExplorationViewModel',
      '$scope',
      '$stateParams',
      function(vm, $scope, $stateParams) {
        var ctrl = this;
        ctrl.vm = vm;
        $scope.tabActivity = [false, false];

        vm.activeTab = $scope.tabs = [{
          active: false
        }, {
          active: false
        }, {
          active: false
        }];
        ctrl.tabActivity = $scope.tabActivity;

        ctrl.initWait = vm.init($scope);
        ctrl.stateParams = $stateParams;
      }
    ]);
})();
