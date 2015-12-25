(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name appliedJobsWidget
   * @description
   *
   * # appliedJobsWidget
   *
   * The `appliedJobsWidget` module provides a reusable ui component.
   *
   * See {@link appliedJobsWidget.appliedJobsWidget `appliedJobsWidget`} for usage.
   */

  /**
   * @ngdoc directive
   * @name appliedJobsWidget.appliedJobsWidget
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that displays the most recent saved jobs.
   *
   * Requires the {@link appliedJobsWidget `appliedJobsWidget`} module to be installed.
   *
   */



  angular.module('jobSearchHistoryWidget', [
    'careersUser',
    'searchQuery',
    'ui.bootstrap'
  ])

  .service('jobSearchHistoryWidgetViewModel', [
    'User',
    '$http',
    '$location',
    'CONSTANTS',
    function (User, $http, $location, CONSTANTS) {
      var vm = this;
          vm.totalNumberOfResults = 0;
          vm.lastSearchData = [];

      vm.getLastSearches = function () {

        var httpConfig = {
          params: {
            noOfResults: 3
          }
        };

        return $http.get('/api/session-service/2/' + CONSTANTS.tenant + '/jobs/history/users/' + User.profileId, httpConfig)
          .then(function(httpResponse) {
            vm.totalNumberOfResults = httpResponse.data.length;
            vm.lastSearchData = [];

            function logArrayElements(element) {
              var obj = angular.fromJson(element.searchValue);
              var strTime = element.searchTime;
              if (obj.searches && obj.searches[0]) {
                var objToPush = [obj.searches[0], {'searchTime': strTime}];
                vm.lastSearchData.push(objToPush);
              }
            }

            httpResponse.data.forEach(logArrayElements);
            return vm.lastSearchData;
          });
      };

    }
  ])

  .directive('jobSearchHistoryWidget', [
    'jobSearchHistoryWidgetViewModel',
    'SearchQuery',
    '$stateParams',
    function (jobSearchHistoryWidgetViewModel, SearchQuery, $stateParams) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/jobSearchHistory/jobSearchHistoryWidget.html',
        scope: {
          jobSearchHistoryLayout: '@',
          profileId: '@',
        },
        link: function (scope) {

          scope.SearchQuery = SearchQuery;
          if ($stateParams.viewId !== 'results') {
            SearchQuery.init();
          }

          scope.vm = {};
          scope.$watch('profileId', function(newValue) {
            if (newValue) {
              scope.vm = jobSearchHistoryWidgetViewModel
                          .getLastSearches()
                          .then(function(data){
                            scope.vm = data;
                            return;
                          });

              return scope.vm;
            }
          }, true);

        }
      };
    }
  ]);

})();
