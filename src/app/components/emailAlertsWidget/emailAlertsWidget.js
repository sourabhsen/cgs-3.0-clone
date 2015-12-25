/**
 * Created by yrganta on 8/7/15.
 */
(function(angular, undefined) {
  'use strict';

  /**
   * @ngdoc module
   * @name emailAlertWidget
   * @description
   *
   *
   * A module to manage Job Alerts.
   *
   */
  angular
    .module('emailAlertsWidget', [
      'angularApolloNotificationServices', 'ui.bootstrap', 'cgBusy', 'LocalStorageModule'
    ])
    .directive('emailAlertTrigger', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/components/emailAlertsWidget/emailAlertTrigger.html',
          scope: {
            profileId: '@',
            emailAddress: '@',
            isAuth: '&',
            authenticate: '&',
            maxAlerts: '@'
          },
          bindToController: true,
          link: function() {},
          controller: 'EmailNotificationCtrl',
          controllerAs: 'alertsCtrl'
        };
      }
    ])
    .directive('emailAlertsWidget', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/components/emailAlertsWidget/emailAlertsWidget.html',
          scope: {
            limit: '@',
            profileId: '@',
            emailAddress: '@',
            alertTypes: '@',
            onSearch: '&',
            layout: '@'
          },
          bindToController: true,
          link: function() {},
          controller: 'EmailNotificationCtrl',
          controllerAs: 'alertsCtrl'
        };
      }
    ])
    .factory('EmailAlertsModel', [
      'Notifications',
      'localStorageService',
      function(Notifications, localStorageService) {
        var self, model;

        model = {
          alerts: [],
          set: function(data) {
            if (!data) {
              return;
            }

            return Notifications.set({
                profileId: self.profileId,
                data: data
              })
              .then(function() {
                // Refresh the results
                self.get();
              });
          },
          get: function() {
            return Notifications.get({
                profileId: self.profileId,
                status: self.alertTypes || ['Enabled', 'Paused'],
                r: 16,
                timestamp: Date.now()
              })
              .then(function(resp) {
                self.alerts = resp.data;
              });
          },
          confirmEmail: function(data) {
            if (!angular.isObject(data)) {
              return;
            }

            data = angular.extend({}, data);
            return Notifications.confirmEmail(data);
          },
          setAlertTitle: function() {
            var keywordsLocation, savedQuery, title, keywordsTitle;
            var titleCheck = localStorageService.get('jobSearch.keywords');

            title = (titleCheck)? titleCheck : 'Job Alert';
            keywordsTitle = angular.isObject(title) ? title.value : title;
            keywordsTitle.toLowerCase();
            keywordsTitle = keywordsTitle.replace(/(^| )(\w)/g, function(x) {
              return x.toUpperCase();
            });

            savedQuery = localStorageService.get('jobSearch.query');
            if (savedQuery.location.indexOf(',') !== -1 ) {
              var newKeywordsLocation = savedQuery.location.split(',');
              var city = newKeywordsLocation[0].toLowerCase().replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
              });
              keywordsLocation = city + ',' + newKeywordsLocation[1].toUpperCase();
            } else {
              keywordsLocation = savedQuery.location.toLowerCase();
              keywordsLocation = keywordsLocation.replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
              });
            }

            if (title && savedQuery.location) {
              title = keywordsTitle + ' in ' + keywordsLocation;
            } else if (!title && savedQuery.location) {
              title = keywordsLocation;
            } else {
              title = keywordsTitle;
            }

            return title;
          },
          init: function(profileId, alertTypes) {
            self.profileId = profileId;
            self.alertTypes = alertTypes;
          }
        };

        self = model;
        return model;
      }
    ])
    .controller('EmailNotificationCtrl', [
      '$scope',
      '$window',
      '$uibModal',
      'localStorageService',
      '$log',
      '$q',
      'EmailAlertsModel',
      'CONFIG',
      '$location',
      '$state',
      function($scope, $window, $uibModal, localStorageService, $log, $q, EmailAlertsModel, CONFIG, $location, $state) {
        var self = this,
          maxAlerts = self.maxAlerts ? parseInt(self.maxAlerts, 10) : -1;

        self.model = EmailAlertsModel;
        EmailAlertsModel.init(self.profileId, self.alertTypes);

        $scope.setStatus = function(notificationId, status) {
          return EmailAlertsModel.set({
            userNotificationId: notificationId,
            status: status
          });
        };

        self.setAlertObj = function(savedQuery, title) {

          var obj = {
            // We seem to default it to daily when setting a notification
            notificationScheduleName: 'user-job-search-notification-daily',
            attributes: {
              alertUri: $location.protocol() + '://' + $location.host(),
              emailAddressProfile: self.emailAddress
            },
            queryString: angular.toJson(savedQuery),
            userNotificationTitle: title
          };

          if(CONFIG.config.cgsApp) {
            obj.attributes.app = CONFIG.config.cgsApp;
          }

          return obj;
        };

        self.setAlert = function(newTitle) {
          var savedQuery, title, uri;

          if (angular.isFunction(self.isAuth) && !self.isAuth()) {
            (self.authenticate || angular.noop)({
              callback: self.setAlert
            });
            return;
          }

          self.error = false;
          self.titleError = false;
          self.error = false;

          // FIXME: read from parent scope callback func
          savedQuery = localStorageService.get('jobSearch.query');
          uri = $window.location.origin || ($window.location.protocol + '://' + $window.location.hostname);
          title = (newTitle) ? newTitle : self.model.setAlertTitle();

          if (uri && self.emailAddress && savedQuery) {

            return EmailAlertsModel.set(self.setAlertObj(savedQuery, title))
              .catch(function(resp) {
                var message = resp.data.message;
                if (resp.data.type === 'ITEM_ALREADY_EXISTS') {
                  self.error = true;
                  self.errorText = 'An alert already exits for current search in your account.';
                } else if (message === 'Validation exception: userNotification.title already exists') {
                  self.titleError = true;
                  self.title = resp.config.data.userNotificationTitle;
                } else {
                  $log.debug(resp.data.type);
                  $log.debug('Failed to create a new alert aat service end.');
                }
              });
          } else {
            self.error = true;
            self.errorText = 'Sorry, we were unable to save your job alert at this time. Try again later';
            $log.debug('Unable to set an alert at this time. Required information missing.');
          }
        };

        self.count = 0;
        self.getSearchNotificationUri = function(alert) {
          var uri = $state.href('auth.tools.view', {
            toolId: 'jobsearch',
            viewId: 'results',
          }, {
            inherit: false
          }) + '?notificationid=' + alert.userNotificationId;

          return uri;
        };

        // Func that are called on initialization.
        // They are invoked by ng-init directive in the template
        self.getAlerts = function() {
          EmailAlertsModel.get();
        };

        self.hasMaxed = function() {
          return maxAlerts === -1 ? false : EmailAlertsModel.alerts.length >= maxAlerts;
        };

        self.jobSearch = function(alert, uri, userNotificationId) {
          localStorageService.remove('jobSearch.keywords');
          localStorageService.set('jobSearch.query', angular.fromJson(alert));
          $window.location.href = uri + '&notificationid=' + userNotificationId;
          (self.onSearch || angular.noop)({
            params: angular.fromJson(alert)
          });
        };

        self.pauseAlert = function(alert) {
          return $scope.setStatus(alert.userNotificationId, 'Paused');
        };

        self.restartAlert = function(alert) {
          return $scope.setStatus(alert.userNotificationId, 'Enabled');
        };

        self.deleteAlert = function(alert) {
          var modalInstance = $uibModal.open({
            templateUrl: 'app/components/emailAlertsWidget/delete-alert.html',
            size: 'md'
          });

          return modalInstance.result
            .then(function(response) {
              if (response) {
                $scope.setStatus(alert.userNotificationId, 'Deleted');
              }
            });
        };

        self.createConfirmEmailObj = function(alert) {
          var confirmEmailObj = {
            emailAddress: alert.attributes.emailAddressUserDefined,
            alertUri: $location.protocol() + '://' + $location.host(),
            profileId: self.profileId
          };

          // ONLY 'uopx' needs the app parameter
          if(CONFIG.config.cgsApp) {
            confirmEmailObj.app = CONFIG.config.cgsApp;
          }
          return confirmEmailObj;
        };

        self.setTab = function(tab) {
          localStorageService.set('jobsDashboardTab', tab);
        };

        self.editAlert = function(alert) {
          var modalScope = $scope.$new();
          modalScope.alert = alert;

          // original email and title for comparison - set back to this value on $close(false);
          var email = (alert.attributes.emailAddressUserDefined) ? alert.attributes.emailAddressUserDefined : alert.attributes.emailAddressProfile;

          /*
          If there is a difference between the userDefined email and the profile email
            we need to reset the profile email to the most current userDefined value.
            The placeholder on the form will default back to the profile email if the user
            clears away the userdefined email value
          */
          alert.attributes.emailAddressProfile = email;


          var frequency = alert.notificationScheduleName;
          var title = alert.userNotificationTitle;

          var modalInstance = $uibModal.open({
            templateUrl: 'app/components/emailAlertsWidget/edit-alert.html',
            size: 'md',
            scope: modalScope
          });

          return modalInstance.result
            .then(function(response) {
              var result;
              var promiseList = [];

              if (response) {
                promiseList.push(
                  EmailAlertsModel.set({
                    notificationScheduleName: alert.notificationScheduleName,
                    userNotificationTitle: alert.userNotificationTitle,
                    userNotificationId: alert.userNotificationId
                  })
                );

                result = $q.all(promiseList);
              }

              if (response) {
                if(alert.attributes.emailAddressUserDefined) {
                  if (alert.attributes.emailAddressUserDefined && email !== alert.attributes.emailAddressUserDefined) {
                    promiseList.push( EmailAlertsModel.confirmEmail( self.createConfirmEmailObj(alert) ) );
                    result = $q.all(promiseList);
                    result.then(function() {
                      var tmpScope = modalScope.$new();

                      $uibModal.open({
                        templateUrl: 'app/components/emailAlertsWidget/email-confirmation.html',
                        size: 'md',
                        scope: tmpScope
                      });
                    });
                  }
                }
              } else {
                alert.userNotificationTitle = title;
                alert.attributes.emailAddressUserDefined = '';
                alert.notificationScheduleName = frequency;
              }
              return result;
            });
        };
      }
    ]);
})(angular);
