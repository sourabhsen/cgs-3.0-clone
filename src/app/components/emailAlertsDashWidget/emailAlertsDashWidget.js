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
    .module('emailAlertsDashWidget', [
      'angularApolloNotificationServices', 'ui.bootstrap', 'cgBusy', 'LocalStorageModule', 'emailAlertsWidget'
    ])
    .directive('emailAlertsDashWidget', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'app/components/emailAlertsDashWidget/emailAlertsDashWidget.html',
          scope: {
            limit: '@',
            profileId: '@',
            userAuthenticated: '@',
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
    ]);

})(angular);
