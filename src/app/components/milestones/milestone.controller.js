(function() {
  'use strict';

  angular
    .module('milestone', [
      'milestones',
      'videoPlayer',
      'dynamicHtml',
    ])
    .controller('MilestoneCtrl', [
      '$state',
      'Milestones',
      '$uibModal',
      '$location',
      '$timeout',
      function DashboardCtrl($state, Milestones, $uibModal, $location, $timeout) {
        var ctrl = this;
        ctrl.vm = Milestones;

        ctrl.activate = function() {
          ctrl.anchor = $location.hash();
          ctrl.milestoneId = $state.params.milestoneId;
          ctrl.vm.getMilestoneById($state.params.milestoneId)
            .then(function(milestone) {
              ctrl.details = milestone;
            });
          ctrl.vm.getMilestoneNamedArray()
            .then(function(milestoneArray) {
              ctrl.ids = milestoneArray;
            });

          // after 1.5 seconds, set initialized flag to true
          // this is used to determine whether to call autoscroll
          $timeout(function() {
            ctrl.initialized = true;
          }, 1500);
        };

        ctrl.openTemplate = function(url, sz) {
          $uibModal.open({
            templateUrl: url,
            size: sz
          });
        };

        ctrl.updateAnchor = function(id) {
          // if same id, close it
          ctrl.anchor = ctrl.anchor === id ? '' : id;
          $location.hash(ctrl.anchor).replace();
        };

        ctrl.activate();
      }
    ]);
})();
