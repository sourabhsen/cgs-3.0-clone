(function() {
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



  angular.module('appliedJobsWidget', [
    'apolloJobServices.activity.tracker',
    'careersUser',
    'appliedJobsViewModel',
    'JobApply.vm',
    'ui.bootstrap'
  ])

  .service('appliedJobsWidgetViewModel', [
    'ActivityTracker',
    'AppliedJobsViewModel',
    'JobApplyViewModel',
    'User',
    '$uibModal',
    '$http',
    '$location',
    'CONSTANTS',
    function(ActivityTracker, AppliedJobsViewModel, JobApplyViewModel, User, $uibModal, $http, $location, CONSTANTS) {
      var vm = this;
      vm.appliedJobsVM = AppliedJobsViewModel;
      // vm.getAppStatus = getApplicationStatuses;
      vm.pageNumber = 0;
      vm.results = [];
      vm.noMoreResults = true;
      vm.savedJobsPromise = null;
      vm.firstAppliedTabClick = true;

      if (!vm.data) {
        vm.data = [];
      }

      vm.jobApply = function jobApply(id, jobId, companyId, connectionStatus) {
        vm.modalInstance = $uibModal.open({
          controller: function($scope) {
            vm.atsLoginError = false;
            vm.atsServiceError = false;
            vm.atsPending = false;
            vm.atsSuccess = false;
            $scope.vm = vm;
            $scope.vm.atsId = id;
            $scope.vm.atsJobId = jobId;
            $scope.vm.atsCompanyId = companyId;
            $scope.vm.connectionStatus = connectionStatus;
          },
          templateUrl: 'app/components/appliedJobsWidget/atsModal.html',
          backdrop: 'static',
          keyboard: false
        });
      };

      vm.removeAppliedJob = function removeAppliedJob(id) {
        var modalRemoveInstance = $uibModal.open({
          templateUrl: 'app/components/appliedJobsWidget/delete-job.html',
          size: 'md'
        });
        return modalRemoveInstance.result
          .then(function(response) {
            if (response) {
              $http({
                  url: '/api/job-service/1/' + CONSTANTS.tenant + '/users/' + vm.profileId + '/jobs/applications/' + id,
                  method: 'PUT',
                  data: '{"status":"INACTIVE"}'
                })
                .then(function() {
                  return vm.init();
                }, function() {
                  return vm.init();
                });
            }
          });
      };

      vm.createLoginObj = function createLoginObj(id, jobId, companyId, connectionStatus, status) {
        var obj;
        if (status === 'firstTime') {
          obj = {
            profileId: User.profileId,
            atsUserCredentials: {
              username: vm.username,
              password: vm.password
            },
            applicationId: id,
            jobId: jobId,
            companyId: companyId,
          };
        } else if (status === 'update') {
          obj = {
            profileId: User.profileId,
            applicationId: vm.applicationId,
            username: vm.username,
            password: vm.password,
            companyId: companyId
          };
        } else {
          obj = {};
        }
        return obj;
      };

      vm.setATSVariables = function setATSVariables() {
        vm.atsLoginError = false;
        vm.atsServiceError = false;
        vm.atsPending = false;
        vm.atsSuccess = true;
        vm.getAppliedJobs(vm.limit);
      };

      vm.setATSErrors = function setATSErrors(res) {
        //error
        vm.atsPending = false;
        if (res.data.type === 'VALIDATION') {
          vm.atsLoginError = true;
        } else {
          vm.atsServiceError = true;
        }
      };

      vm.submitATSLogin = function submitATSLogin(id, jobId, companyId, connectionStatus) {
        if (connectionStatus && connectionStatus === 'INVALID_CREDENTIALS') {
          vm.atsPending = ActivityTracker.updateATSCredentials(vm.createLoginObj(id, jobId, companyId, connectionStatus, 'update'));
        } else {
          vm.atsPending = ActivityTracker.setAppliedJob(vm.createLoginObj(id, jobId, companyId, connectionStatus, 'firstTime'));
        }
        vm.atsPending.then(function callSetATSVariables() {
              vm.setATSVariables();
              vm.modalInstance.close();
            }, function callSetATSErrors(res) {
              vm.setATSErrors(res);
            });
        return vm.atsPending;
      };

      vm.getAppliedJobs = function getAppliedJobs() {
        // disable incoming getAppliedJobs requests until finished
        if (!vm.firstAppliedTabClick) {
          return;
        }
        vm.firstAppliedTabClick = false;
        vm.appliedJobsPromise = ActivityTracker.appliedJobs({
            'profileId': vm.profileId,
            'page.size': vm.limit,
            'status': vm.status
          }).then(function(data) {
            if (data.data) {
              vm.nextPage = data.data.nextPage ? data.data.nextPage : 0;
              vm.isNextPage = (data.data.nextPage === -1) ? false : true; // isNextPage is truthy value for 'view more button'
              vm.totalNumberOfResults = data.data.totalNumberOfResults ? data.data.totalNumberOfResults : ' 0 ';
              vm.pageNumber = data.data.pageNumber ? data.data.pageNumber : 0;
              //vm.results = data.data;

              var values = data.data;
              var results = [];
              angular.forEach(values, function(value) {
                if (value && value.status && (value.status !== 'INACTIVE')) {
                  this.push(value);
                }
              }, results);

              vm.results = results;
            }
          }, vm.appliedJobsError())
          .finally(function() {
            vm.firstAppliedTabClick = true;
          });
        return vm.appliedJobsPromise;
      };

      vm.showMoreItems = function showMoreItems() {
        vm.limit += vm.limit;
        vm.getAppliedJobs();
      };

      vm.appliedJobsError = function appliedJobsError() {
        vm.totalNumberOfResults = ' 0 ';
      };

      vm.sendActivity = function sendActivity(index) {
        var job = vm.results[index];
        var jobId = job.jobId;

        var postData = {
          id: jobId,
          activityName: 'Job_Viewed',
          jobId: jobId,
          userIdentifier: User.profileId,
          activityValue: 'valid',
          pageName: $location.absUrl(),
          pageNameDetail: (index + 1) + ' of ' + vm.results.length + ' on pageNumber ' + vm.pageNumber,
          serviceNameDetail: vm.serviceNameDetail,
          serviceName: vm.serviceName
        };

        ActivityTracker.setActivity(postData);
      };

      vm.updateServer = function updateServer() {
        // No purpose other than to kick off a job on the back-end.
        // no response expected.
        $http({
            url: '/api/job-service/1/' + CONSTANTS.tenant + '/users/' + vm.profileId + '/jobs/applications',
            method: 'PUT'
          })
          .then(function() {
            return;
          }, function() {
            return;
          });
      };

      vm.init = function init() {
        if (!vm.firstAppliedTabClick) {
          // disable incoming getAppliedJobs requests until finished
          // prevents multiple click errors.
          return;
        }

        vm.appliedJobsVM.getApplicationStatuses().then(function(data) {
          if (data && data.data) {
            vm.manualStatuses = data.data;
          }
        });

        vm.results = [];
        vm.noMoreResults = true;
        vm.pageNumber = 0;

        vm.updateServer();
        vm.getAppliedJobs();
      };
    }
  ])

  .directive('appliedJobsWidget', [
    'appliedJobsWidgetViewModel',
    'CONFIG',
    'localStorageService',
    function(appliedJobsWidgetViewModel, CONFIG, localStorageService) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/appliedJobsWidget/appliedJobsWidget.html',
        scope: {
          appliedJobsLayout: '@',
          profileId: '@'
        },
        replace: true,
        link: function(scope) {
          scope.vm = appliedJobsWidgetViewModel;
          scope.vm.profileId = scope.profileId;

          if (scope.appliedJobsLayout === 'page') {
            scope.vm.limit = CONFIG.config.resultsPerPage;
            scope.vm.status = null;
          } else { //standalone
            scope.vm.limit = CONFIG.config.widgetResults;
            scope.vm.status = 'ACTIVE';
          }

          scope.vm.init();

          scope.vm.pageChange = function() {
            scope.vm.showMoreItems();
          };

          scope.setTab = function(tab) {
            localStorageService.set('jobsDashboardTab', tab);
          };
        }
      };
    }
  ]);
})();
