(function() {
  'use strict';

  angular.module('careerExplorationDetails', [
      'careerExplorationDetails.vm',
      'ui.router',
      'careersUser',
      'myGoalInfo',
      'angular-circles'
    ])
    .controller('CareerExplorationDetailsCtrl', [
      '$state',
      'CareerExplorationDetailsViewModel',
      'User',
      'MyGoalInfo',
      '$parse',
      function($state, vm, User, MyGoalInfo, $parse) {
        var ctrl = this;
        ctrl.vm = vm;

        // if no id, go back to career exploration
        if (!($state.params && $state.params.id)) {
          $state.go('auth.tools', {
            toolId: 'careerExploration'
          });
        }


        function getJobsearchWithCompanyUrl() {
          return ctrl.jobSearchUrl;
          // company filter borken
          // + '&companyFilter=' + encodeURIComponent(companyName);
        }

        ctrl.initWait = User.get()
          .then(function() {
            // update goal counts
            MyGoalInfo.update();

            return vm.getGoalDetails($state.params.id);
          })
          .then(function() {
            // expose the jobSearchUrl (state cannot handle search params)
            var keywords = $parse('goal.laborData.name')(vm);
            ctrl.jobSearchUrl = $state.href('auth.tools.view', {
              toolId: 'jobsearch',
              viewId: 'results',
            }) + '?keywords.title=' + encodeURIComponent(keywords) + '&location=' + encodeURIComponent(User.profile.cgsLocation);

            ctrl.getJobsearchWithCompanyUrl = getJobsearchWithCompanyUrl;
          });


      }
    ]);
})();
