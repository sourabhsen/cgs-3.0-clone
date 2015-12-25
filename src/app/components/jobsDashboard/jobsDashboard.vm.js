(function () {
  'use strict';
  angular
    .module('JobsDashboardViewModel', [
      'apolloJobServices.activity.tracker',
      'apolloJobServices.jobs',
      'careersUser',
      'appliedJobsViewModel',
      'LocalStorageModule',
      'ui.router'
    ])
    .factory('JobsDashboardViewModel', [
      'ActivityTracker',
      'Jobs',
      'User',
      'CONFIG',
      'AppliedJobsViewModel',
      '$state',
      'localStorageService',
      '$location',
      //'savedJobsWidgetViewModel',
      //'appliedJobsWidgetViewModel',
      function (ActivityTracker, Jobs, User, CONFIG, AppliedJobsViewModel, $state, localStorageService, $location) {
        var vm = {
          data: {},
          dashboardPageSize: CONFIG.config.dashboardResults,
          recommendationsTotal: CONFIG.config.recommendations,
          widgetResults: CONFIG.config.widgetResults,
          pagesShown: 1,
          pageType: null,
          appliedJobsVM: AppliedJobsViewModel,
          reloadSaved: false,

          recommendedJobs: function (data) {
            vm.widgetRecommendResults = (vm.pageType === 'widget' && data.data && data.data.totalNumberOfResults > 0);
            vm.pageRecommendedResults = (vm.pageType === 'page' && data.data && data.data.totalNumberOfResults > 0);
            vm.noRecommendedResults = (data.data && data.data.totalNumberOfResults > 0) ? false : true;
            vm.data.jobs = data.data;
          },

          getRecommendedJobs: function () {
            var pageSize = vm.pageSize;
            if (vm.pageSize === vm.dashboardPageSize) {
              /* for recommnendations page, we want to fetch a larger number of results */
              pageSize = vm.recommendationsTotal;
            }

            vm.recommendationsPromise = Jobs.recommendedJobs({
              pageSize: pageSize,
              programCode: vm.programCode,
              profileId: User.profileId,
              location: User.profile.cgsLocation
            }).then(function (data) {
              vm.recommendedJobs(data);
            }, function () {
              vm.noRecommendedResults = true;
            });
            return vm.recommendationsPromise;
          },

          setTab: function (tab) {
            localStorageService.set('jobsDashboardTab', tab);
          },

          itemsLimit: function () {
            if (vm.pageType === 'page') {
              return vm.dashboardPageSize * vm.pagesShown;
            } else {
              return vm.widgetResults;
            }
          },

          hasMoreItemsToShow: function () {
            if (vm.noRecommendedResults) {
              return false;
            } else {
              return vm.pagesShown < (vm.recommendationsTotal / vm.dashboardPageSize);
            }
          },

          showMoreItems: function () {
            vm.pagesShown = vm.pagesShown + 1;
          },

          sendActivity: function (index) {
            //all steps are exactly similar to CGS2.0
            var job = vm.data.jobs[index],
              pageNumber = vm.data.jobs.pageNumber + 1,
              totalMahoutJobs = 0,
              totalSolrJobs = 0;

            angular.forEach(vm.jobs, function (value) {
              if (value.recommender === 'Mahout') {
                totalMahoutJobs = totalMahoutJobs + 1;
              }
              else {
                totalSolrJobs = totalSolrJobs + 1;
              }
            });

            var postData = {
              id: job.job.jobId,
              activityName: 'Job_Viewed',
              jobId: job.job.jobId,
              userIdentifier: User.profileId,
              activityValue: 'valid',
              pageName: $location.absUrl(),
              pageNameDetail: (index + 1) + ' of ' + vm.itemsLimit() + ' on pageNumber ' + pageNumber,
              serviceNameDetail: 'Mahout jobs on page : ' + totalMahoutJobs + ' : SOLR jobs on page ' + totalSolrJobs,
              serviceName: 'Recommender-' + job.recommender
            };

            ActivityTracker.setActivity(postData);
          },

          init: function (pageSize, programCode, pageType) {
            vm.pageType = pageType;
            vm.isWidget = (pageType === 'widget');
            vm.pageSize = pageSize;
            // wait for user profile to become available
            vm.recommendationsPromise = User.get()
              .then(function () {
                vm.programCode = programCode;
                return vm.getRecommendedJobs();
              });
            return vm.recommendationsPromise;
          }
        };
        return vm;
      }
    ]);
})();
