(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name jobsDashboard
   * @description
   *
   * # jobsDashboard
   *
   * The `jobsDashboard` module provides a reusable ui component via the jobsDashboard directive.
   *
   * See {@link jobsDashboard.jobsDashboard `jobsDashboard`} for usage.
   */

  /**
   * @ngdoc directive
   * @name jobsDashboard.jobsDashboard
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that saves, unsaves and deletes jobs to the Playlist service.
   *
   * Requires the {@link jobsDashboard `jobsDashboard`} module to be installed.
   * Requires the {@link JobsDashboardViewModel `JobsDashboardViewModel`} module to be installed.
   *
   */


  angular.module('jobsDashboard', [
      'JobsDashboardViewModel',
      'LocalStorageModule',
      'searchQuery'
    ])
    .directive('jobsDashboard', [

      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/components/jobsDashboard/jobsDashboard.html',

          scope: {
            dashboardType: '@',
            profileId: '@',
            jobType: '@',
            dashboardTitle: '@',
            programCode: '@',
            startTab: '@'
          },

          controller: ['$scope',
            'JobsDashboardViewModel',
            'CONFIG',
            '$state',
            'localStorageService',
            'User',
            'savedJobsWidgetViewModel',
            'appliedJobsWidgetViewModel',
            'SearchQuery',
            function($scope, JobsDashboardViewModel, CONFIG, $state, localStorageService, User, savedJobsWidgetViewModel, appliedJobsWidgetViewModel, searchQuery) {
              var jobSize = $scope.dashboardType === 'widget' ? CONFIG.config.widgetResults : CONFIG.config.dashboardResults;
              $scope.profileId = User.profileId;
              $scope.savedJobsWidgetViewModel = savedJobsWidgetViewModel;
              $scope.appliedJobsWidgetViewModel = appliedJobsWidgetViewModel;

              $scope.startTab = localStorageService.get('jobsDashboardTab') || $scope.startTab;

              // tabs object used to drive active tab on startup
              $scope.tabs = [{
                name: 'recommended',
                active: $scope.startTab === 'recommended'
              }, {
                name: 'applied',
                active: $scope.startTab === 'applied'
              }, {
                name: 'saved',
                active: $scope.startTab === 'saved'
              }, {
                name: 'emailAlerts',
                active: $scope.startTab === 'emailAlerts'
              }];

              $scope.user = User;
              $scope.isAuthenticated = function() {
                return User.isAuthenticated();
              };

              $scope.jobsDashboardModel = JobsDashboardViewModel;

              $scope.jobsDashboardModel.init(jobSize, $scope.programCode, $scope.dashboardType);

              $scope.savedSearch = function(query) {
                searchQuery.saveQuery(query);

                $state.go('auth.tools.view', {
                  toolId: 'jobsearch',
                  viewId: 'results'
                });
              };

              $scope.setTab = function (tab) {
                JobsDashboardViewModel.setTab(tab);
              };

              // on location change, obtain recommended jobs
              User.onMsg('User:setStateAreaId', function(message, data) {
                if (data.setCount > 1) {
                  JobsDashboardViewModel.getRecommendedJobs();
                }
              }, $scope);
            }
          ]
        };
      }
    ]);
})();
