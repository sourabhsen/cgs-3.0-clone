(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name savedJobsWidget
   * @description
   *
   * # savedJobsWidget
   *
   * The `savedJobsWidget` module provides a reusable ui component.
   *
   * See {@link savedJobsWidget.savedJobsWidget `savedJobsWidget`} for usage.
   */

  /**
   * @ngdoc directive
   * @name savedJobsWidget.savedJobsWidget
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that displays the most recent saved jobs.
   *
   * Requires the {@link savedJobsWidget `savedJobsWidget`} module to be installed.
   *
   */


  angular
    .module('savedJobsWidget', [
      'apolloJobServices.activity.tracker',
      'ui.bootstrap',
    ])

    .service('savedJobsWidgetViewModel', [
      'ActivityTracker', 'User', '$location',
      function(ActivityTracker, User, $location) {
        var vm = this;
        vm.pageNumber = 0;
        vm.noMoreResults = true;
        vm.data = (vm.data) ? vm.data : [];
        vm.results = [];
        vm.reloadSaved = false;
        vm.savedJobsPromise = null;
        vm.firstSavedTabClick = true;
        vm.serviceName = '';
        vm.serviceNameDetail = '';

        vm.getSavedJobs= function () {
          // disable incoming getSavedJobs requests until finished
          if(!vm.firstSavedTabClick) {
            return;
          }
          vm.firstSavedTabClick = false;
          vm.savedJobsPromise = ActivityTracker.savedJobs({
            'page.size': vm.limit ? vm.limit : 3,
            'profileId': vm.profileId,
            'page.number': (vm.pageNumber ? vm.pageNumber - 1 : 0)
          }).then(function (data) {
            if(data.data) {
              vm.noMoreResults = false;
              vm.serviceName = data.data.serviceName;
              vm.serviceNameDetail = data.data.serviceNameDetail;

              for(var i = 0; i < data.data.length; i += 1) {
                vm.results.push(data.data[i]);
              }
            }
            if(data.data.totalNumberOfResults) {
              vm.totalPages = data.data.totalPages;
              vm.totalNumberOfResults = data.data.totalNumberOfResults ? data.data.totalNumberOfResults : 0;
              vm.pageNumber = data.data.pageNumber + 1;
              if(vm.pageNumber >= vm.totalPages) {
                vm.noMoreResults = true;
              }
            } else {
              vm.totalNumberOfResults = ' 0 ';
              vm.noMoreResults = true;
            }
          }, vm.savedJobsError)
          .finally(function() {
            vm.firstSavedTabClick = true;
          });
          return vm.savedJobsPromise;
        };

        vm.showMoreItems = function () {
          vm.pageNumber = vm.pageNumber + 1;
          vm.getSavedJobs();
        };

        vm.savedJobsError = function() {
          vm.totalNumberOfResults = ' 0 ';
          vm.data = [];
        };

        vm.sendActivity = function (index) {
          var job = vm.results[index];
          var jobId = job.job.jobId;

          var postData = {
            id: jobId,
            activityName: 'Job_Viewed',
            jobId: jobId,
            userIdentifier: User.profileId,
            activityValue: 'valid',
            pageName: $location.absUrl(),
            pageNameDetail: (index + 1) + ' of ' + vm.results.length + ' on pageNumber ' + vm.pageNumber,
            serviceNameDetail: vm.serviceNameDetail,
            serviceName : vm.serviceName
          };

          ActivityTracker.setActivity(postData);
        };

        vm.init = function() {
          // disable incoming getSavedJobs requests until finished
          if(!vm.firstSavedTabClick) {
            return;
          }
          vm.results = [];
          vm.noMoreResults = true;
          vm.pageNumber = 1;
          vm.getSavedJobs();
        };
      }
    ])

    .directive('savedJobsWidget', [
      'savedJobsWidgetViewModel',
      'CONFIG',
      'localStorageService',
      function (savedJobsWidgetViewModel, CONFIG, localStorageService) {
        return {
          restrict: 'E',
          templateUrl: 'app/components/savedJobsWidget/savedJobsWidget.html',
          scope: {
            savedJobsLayout: '@',
            reloadSavedResults: '=',
            profileId: '@'
          },
          link: function(scope) {
            scope.vm = savedJobsWidgetViewModel;
            scope.vm.profileId = scope.profileId;

            if(scope.savedJobsLayout === 'page') {
              scope.vm.limit = CONFIG.config.resultsPerPage;
            } else {
              scope.vm.limit = CONFIG.config.widgetResults;
            }

            scope.vm.pageChange = function() {
              scope.vm.showMoreItems();
            };

            scope.$watch('reloadSavedResults', function () {
              scope.vm.init();
            });

            scope.setTab = function (tab) {
              localStorageService.set('jobsDashboardTab', tab);
            };
          }
        };
      }
    ]);
})();
