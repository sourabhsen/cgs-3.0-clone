(function() {
  'use strict';

  angular
    .module('JobApply.vm', [
      'apolloJobServices.activity.tracker',
      'ui.router',
      'careersUser',
      'JobsViewModel',
      'angularApolloCompanyServices',
      'apolloPlaylistCache'
    ])
    .service('JobApplyViewModel', [
      'ActivityTracker',
      'User',
      '$stateParams',
      'JobsViewModel',
      'Companies',
      '$timeout',
      'PlaylistCache',
      '$q',
      function(ActivityTracker, User, $stateParams, JobsViewModel, Companies, $timeout, PlaylistCache, $q) {
        var vm = this;

        PlaylistCache.getByType('JOB').catch(function(err) {
          if (err.status === 404) {
            return {};
          } else {
            return $q.reject(err);
          }
        }).then(function(playlistResponse) {
          vm.playlist = playlistResponse;
        });

        vm.deleteSavedJob = function deleteSavedJob() {
          var matchIndex = vm.playlist.listItems.findIndex(function(job) {
            return job.itemIdentifier === $stateParams.id;
          });
          if (matchIndex > -1) {
            vm.callPlaylistDelete(matchIndex);
          } else {
            return null;
          }
        };

        vm.callPlaylistDelete = function callPlaylistDelete(matchIndex) {
          vm.playlist.listItems[matchIndex].$delete()
            .then(function spliceSavedPromise() {
              vm.playlist.listItems.splice(matchIndex, 1);
            });
        };

        vm.submitAppStatus = function submitAppStatus() {
          var promise;
          switch (vm.applicationStatus) {
            case 'yes':
              var postData = {
                id: $stateParams.id,
                activityName: 'applied',
                jobId: $stateParams.id,
                userIdentifier: User.profileId,
                activityValue: 'valid'
              };
              promise = vm.setJobActivity(postData);
              promise.then(function() {
                if (JobsViewModel.isATSTracked) {
                  vm.hasATSConnection = false;
                  promise = vm.getATSConnectionStatus().then(function(data) {
                    if (data.data.connectionStatus === 'ACTIVE' || data.data.connectionStatus === 'SUCCESSFUL') {
                      vm.showDidApplyForm = false;
                      vm.hasATSConnection = true;
                      vm.confirmAndClose();
                    } else if (data.data.connectionStatus === 'INVALID_CREDENTIALS') {
                      vm.showDidApplyForm = false;
                      vm.hasInvalidCredentials = true;
                      vm.showATSLogin = true;
                    }
                  }, function() {
                    // no prior connection
                    vm.showDidApplyForm = false;
                    vm.showATSLogin = true;
                  });
                } else {
                  vm.showDidApplyForm = false;
                  vm.confirmAndClose();
                }
              }, function() {
                //error case
                JobsViewModel.modalInstance.close();
                return;
              }).finally(vm.setJobAppliedStatus());
              return promise;

            case 'missing':
              var postData1 = {
                id: $stateParams.id,
                activityName: 'expired_or_does_not_exist',
                jobId: $stateParams.id,
                userIdentifier: User.profileId,
                activityValue: 'valid'
              };

              return vm.setJobActivity(postData1)
                .then(JobsViewModel.modalInstance.close);

            default:
              // user clicked did not apply.
              // Close modal.
              return JobsViewModel.modalInstance.close();
          }
        };

        vm.getATSConnectionStatus = function getATSConnectionStatus() {
          return ActivityTracker.getATSConnectionStatus({
            profileId: User.profileId,
            companyId: JobsViewModel.details.companyId
          });
        };

        vm.confirmAndClose = function confirmAndClose() {
          vm.showATSLogin = false;
          vm.atsSuccess = false;
          vm.atsLoginError = false;
          vm.atsServiceError = false;
          if (vm.hideConfirmation) {
            vm.showConfirmationMessage = false;
            JobsViewModel.modalInstance.close();
          } else {
            vm.showConfirmationMessage = true;
          }
        };

        vm.setJobActivity = function setJobActivity(requestObj) {
          var promise = ActivityTracker.setActivity(requestObj);
          return promise;
        };

        vm.checkJobAgain = function checkJobAgain() {
          PlaylistCache.getByType('JOB').catch(function(err) {
            if (err.status === 404) {
              return {};
            } else {
              return $q.reject(err);
            }
          }).then(function(playlistResponse) {
            vm.playlist = playlistResponse;
            if (vm.playlist && vm.playlist.listItems) {
              vm.deleteSavedJob();
            }
          });
        };

        vm.setJobAppliedStatus = function setJobAppliedStatus() {
          var promise = ActivityTracker.setAppliedJob({
            profileId: User.profileId,
            jobId: $stateParams.id,
            companyId: JobsViewModel.details.companyId
          }).then(function(data) {
            vm.applicationId = data.data;
            /* Delete saved job if matches */
            if (vm.playlist && vm.playlist.listItems) {
              vm.deleteSavedJob();
            } else {
              // refresh call
              vm.checkJobAgain();
            }
            JobsViewModel.appliedName = 'Applied';
            JobsViewModel.detailsApplied = true;
          });
          return promise;
        };

        vm.getUserConfirmationPreference = function getUserConfirmationPreference() {
          ActivityTracker.getUserConfirmationPreference({
            profileId: User.profileId
          }).then(function(data) {
            vm.hideConfirmation = data.data.hideMessage;
          }, function() {
            vm.hideConfirmation = false;
          });
        };

        vm.setUserConfirmationPreference = function setUserConfirmationPreference() {
          if (vm.hideConfirmation) {
            ActivityTracker.setUserConfirmationPreference({
              profileId: User.profileId,
              hideMessage: true
            }, {
              hideMessage: false
            });
          }
          JobsViewModel.modalInstance.close();
        };

        vm.formATSLoginRequestObject = function formATSLoginRequestObject() {
          return {
            profileId: User.profileId,
            atsUserCredentials: {
              username: vm.username,
              password: vm.password
            },
            applicationId: vm.applicationId,
            jobId: $stateParams.id,
            companyId: JobsViewModel.details.companyId,
          };
        };

        vm.formCredUpdateObject = function formCredUpdateObject() {
          return {
            profileId: User.profileId,
            applicationId: vm.applicationId,
            username: vm.username,
            password: vm.password,
            companyId: JobsViewModel.details.companyId
          };
        };

        vm.submitATSLogin = function submitATSLogin() {
          vm.atsPending = true;
          var request = vm.formATSLoginRequestObject();
          var requestCredentialsUpdate = vm.formCredUpdateObject();
          if (vm.hasInvalidCredentials) {
            request = requestCredentialsUpdate;
            vm.atsPending = ActivityTracker.updateATSCredentials(request).then(function() {
              vm.atsPending = false;
              vm.atsSuccess = true;
              vm.confirmAndClose();
            }, function(res) {
              //error
              vm.atsPending = false;
              if (res.data.type === 'VALIDATION') {
                vm.atsLoginError = true;
              } else {
                vm.atsServiceError = true;
              }
            });
          } else if (vm.hasATSConnection) {
            vm.confirmAndClose();
          } else {
            vm.atsPending = ActivityTracker.setAppliedJob(request).then(function() {
              vm.atsPending = false;
              vm.atsSuccess = true;
              vm.confirmAndClose();
            }, function(res) {
              //error
              vm.atsPending = false;
              if (res.data.type === 'VALIDATION') {
                vm.atsLoginError = true;
              } else {
                vm.atsServiceError = true;
              }
            });
          }
          return vm.atsPending;
        };

        vm.initModal = function initModal() {
          vm.atsSuccess = vm.atsLoginError = vm.atsServiceError = vm.atsServiceError = vm.atsPending = vm.showATSLogin = vm.showFocusTalent = vm.showConfirmationMessage = false;
          vm.showDidApplyForm = true;
          vm.applicationStatus = null;
          vm.getUserConfirmationPreference();
        };
      }
    ]);
})();
