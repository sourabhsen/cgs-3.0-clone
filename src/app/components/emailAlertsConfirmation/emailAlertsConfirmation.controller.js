/**
 * Created by yrganta on 8/20/15.
 */
(function (angular) {
  'use strict';

  angular.module('emailAlertsManager', [
    'angularApolloNotificationServices'
  ])
    .controller('emailAlertsManagerCtrl', [
      '$window'
      ,'Notifications'
      , function ($window, Notifications) {
        var getQueryStr
          , parseQueryParams
          , queryParams = {
            'tenant': ''
            , 'notificationid': ''
            , 'token': ''
            , 'additionalid': []
            , 'schedulename': ''
          }
          , self = this;

        self.feedback = {
          additionalIds: []
          , detail: ''
          , reason: ''
        };

        self.emailConfirmationError = false;

        getQueryStr = function (str) {
          str = decodeURIComponent(str);
          return str.slice(str.indexOf('?') + 1);
        };

        parseQueryParams = function (str, queryParams) {
          var param;
          for (var i = 0, params = str.split('&'); i < params.length; i++) {
            param = params[i].split('=');
            if (param[0] === 'additionalid') {
              queryParams[param[0]].push(param[1]);
            }
            else {
              queryParams[param[0]] = param[1];
            }

          }
          return queryParams;
        };

        self.enable = function () {
          var queryStr;

          queryStr = 'token=' + self.queryParams.token;
          for (var i = 0; i < self.queryParams.additionalid.length; i++) {
            queryStr += '&additionalid=' + self.queryParams.additionalid[i];
          }

          Notifications.status({
            status: 'Enabled'
            , notificationId: self.queryParams.notificationid
            , queryStr: queryStr
          })
            .then(function () {
              self.view = 'confirmation';
              self.action = 'status';
            });
        };

        self.changeSchedule = function () {
          Notifications.schedule({
            notificationId: self.queryParams.notificationid
            ,scheduleName: self.queryParams.schedulename === 'user-job-search-notification-weekly' ? 'user-job-search-notification-daily' : 'user-job-search-notification-weekly'
            ,queryStr: 'token=' + self.queryParams.token
          })
            .then(function () {
              self.action = 'frequency';
            });
        };

        self.confirmEmail = function() {
          // use emailaddress, tenant, profileid and send to server, then display results...
          self.emailConfirmed = false;
            self.view = 'emailConfirmation';
            // queryStr = 'token=' + self.queryParams.token + '&emailAddress=' + self.queryParams.emailaddress;

            Notifications.updateEmail({
              emailAddress: self.queryParams.emailaddress,
              token: self.queryParams.token,
              profileId: self.queryParams.profileid,
              ignoreAuthModule: true
            })
              .then(function() {
                self.emailConfirmed = true;
              });
        };

        self.submitFeedback = function () {
          self.feedback.additionalIds = self.queryParams.additionalid;
          self.feedback.notificationId = self.queryParams.notificationid;
          self.feedback.queryStr = 'token=' + self.queryParams.token;
          Notifications.feedback(self.feedback)
            .then(function () {
              self.view = 'confirmation';
              self.action = 'feedback';
            });
        };

        self.emailError = function() {
          self.emailConfirmationError = true;
        };

        self.init = function () {
          var queryStr;

          self.queryParams = parseQueryParams(getQueryStr($window.location.hash), queryParams);

          if (self.queryParams.schedulename) {
            self.view = 'scheduler';


            Notifications.schedule({
              notificationId: self.queryParams.notificationid
              , scheduleName: self.queryParams.schedulename
              , queryStr: 'token=' + self.queryParams.token
            });


          } else if(self.queryParams.emailaddress) {

            self.confirmEmail();

          } else {
            queryStr = 'token=' + self.queryParams.token;
            for (var i = 0; i < self.queryParams.additionalid.length; i++) {
              queryStr += '&additionalid=' + self.queryParams.additionalid[i];
            }

            Notifications.status({
              status: 'Paused'
              , notificationId: self.queryParams.notificationid
              , queryStr: queryStr
            });
          }

        };
      }
    ]);
})(angular);
