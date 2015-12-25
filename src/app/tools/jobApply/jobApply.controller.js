(function() {
  'use strict';

  angular
    .module('JobApply', [
      'JobApply.vm',
      'ui.bootstrap'
    ])
    .controller('JobApplyCtrl', [
      'JobApplyViewModel',
      function JobApplyCtrl(JobApplyViewModel) {
        this.model = JobApplyViewModel;

        this.submitDidApply = function() {
          if (this.didApplyForm.$valid) {
            return this.model.submitAppStatus();
          }
        };

        this.model.initModal();
      }
    ]);

})();
