(function () {
  'use strict';

  angular
    .module('JobSearch', [
      'JobsViewModel',
      'ui.router.state',
      'searchQuery'
    ])
    .controller('JobSearchCtrl', [
      'JobsViewModel',
      '$stateParams',
      'SearchQuery',
      'localStorageService',
      function (JobsViewModel, $stateParams, searchQuery, localStorageService) {
        this.model = JobsViewModel;
        this.initWait = this.model.init($stateParams.viewId === 'details', $stateParams.viewId === 'results', false);
        this.isQuery = true;
        this.startTab = 'recommended';

        this.savedSearch = function (query) {
          searchQuery.saveQuery(query);
          JobsViewModel.init($stateParams.viewId === 'details', $stateParams.viewId === 'results');
        };

        this.focusFilter = function() {
          angular.element('#refine-title').trigger('focus');
        };

        this.setTab = function (tab) {
          localStorageService.set('jobsDashboardTab', tab);
        };
      }
    ]);

})();
