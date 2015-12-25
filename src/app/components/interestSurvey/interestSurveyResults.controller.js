(function() {
  'use strict';

  angular.module('interestSurveyResults', [
      'interestSurveyResults.vm',
      'ui.router'
    ])
    .controller('InterestSurveyResultsController', [
      'InterestSurveyResultsViewModel',
      '$stateParams',
      function(vm, $stateParams) {
        this.vm = vm;
        this.initWait = vm.init();
        this.deleteSurveyClick = function(value) {
            vm.deleteSurvey(value);
        };
        this.selectedCat = '';
        this.stateParams = $stateParams;
      }
    ]);
})();
