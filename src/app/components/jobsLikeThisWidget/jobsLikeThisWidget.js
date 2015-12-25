(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name jobsLikeThisWidget
   * @description
   *
   * # jobsLikeThisWidget
   *
   * The `jobsLikeThisWidget` module provides a reusable ui component.
   *
   * See {@link jobsLikeThisWidget.jobsLikeThisWidget `jobsLikeThisWidget`} for usage.
   */

  /**
   * @ngdoc directive
   * @name jobsLikeThisWidget.jobsLikeThisWidget
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that displays similar jobs list.
   *
   * Requires the {@link jobsLikeThisWidget `jobsLikeThisWidget`} module to be installed.
   *
   */


  angular.module('jobsLikeThisWidget', [
    'angularApolloRecommendationServices.Recommendations',
    'angularApolloSearchServices.search',
    'careersUser'
  ])

  .directive('jobsLikeThisWidget', [
    'Recommendations',
    'Search',
    'User',
    'ActivityTracker',
    '$location',
    'CONSTANTS',

    function (Recommendations, Search, User, ActivityTracker, $location, CONSTANTS) {
      var jobsLikeThisVM = function (scope) {
        var limit = 3;  //TODO: Use a constant
        var vm = {
          getJobsLikeThis: function () {
            if (!scope.job.jobId) {
              vm.data = '';
              return;
            }
            var jobId = scope.job.jobId;
              vm.jobsLikeThisPromise = Search.similarJobs({
                jobId: jobId,
                'page.size': limit,
                 apiVersion: 1,
                 tenant: CONSTANTS.tenant
              }).then(function (data) {
                vm.data = data.data[0].jobs;
                vm.noResults = false;
                if(!vm.data) {
                  vm.noResults = true;
                }
              }, vm.jobsLikeThisError());

            return vm.jobsLikeThisPromise;
          },
          jobsLikeThisError: function () {
            vm.data = '';
          },

          sendActivity: function (index) {
            var job = vm.data.results[index];
            var jobId = job.job.jobId;

            var postData = {
              id: jobId,
              activityName: 'Job_Viewed',
              jobId: jobId,
              userIdentifier: User.profileId,
              activityValue: 'valid',
              pageName: $location.absUrl(),
              pageNameDetail: (index + 1) + ' of ' + vm.data.results.length + ' from Jobs Like This list',
              serviceName: 'SolrSearch',
              serviceNameDetail: 'Result from SOLR Service'
            };

            ActivityTracker.setActivity(postData);
          }
        };
        return vm;
      };

      return {
        restrict: 'E',
        templateUrl: 'app/components/jobsLikeThisWidget/jobsLikeThisWidget.html',
        scope: {
          job: '=',
          profileId: '@',
          useRecommendations: '='
        },
        replace: true,
        link: function (scope) {
          scope.vm = jobsLikeThisVM(scope);
          scope.vm.userPromise = User.get()
            .then(function () {
              scope.$watch('job', function () {
                if (scope.job.jobId) {
                  scope.vm.getJobsLikeThis();
                }
              });
            });
        }
      };
    }
  ]);
})();
