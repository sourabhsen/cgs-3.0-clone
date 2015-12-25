'use strict';

angular.module('apolloAudit', [
  'config.constants',
  'careersUser',
  'guid'
])

/**
 * @ngdoc service
 * @name  Audit
 * @requires CONSTANTS, User
 *
 * @description
 * A factory to log to audit service for logging UI errors.
 *
 * NOTE: This service cannot be used with ExceptionLogging service due to a circular dependency on USER and $q
 *
 * Refer to https://developer.devint.aptimus.net/api/audit-service/1/apti/docs#!/uiaudit/saveAuditUIRecored
 *
 * Sample object
 * {
 *   transactionId: 3bcbb213-bbb8-47ba-b76c-e4ba6c2eaed9,
 *   exception: some exception,
 *   hostName: www.bootcamp.com,
 *   logType: ERROR,
 *   headers: {\1\ : \2\},
 *   userName: satis.gunnu@gmail.com,
 *   userAgent: {\1\ : \2\},
 *   applicationName: bootcamp,
 *   tenantName: cpbc,
 *   pageName: homepage
 * }
 *
 */

.factory('Audit', [
  '$http',
  '$window',
  'CONSTANTS',
  'CONFIG',
  'GUID',
  'User',
  function($http, $window, CONSTANTS, CONFIG, GUID, User) {
    return {
      'send': function(exception) {
        var guid = GUID.create();

        exception.transactionId = guid;
        exception.hostName = $window.location.hostname;
        exception.userName = User.profileId;
        exception.emailAddress = User.profile.emailAdedress;
        exception.applicationName = CONFIG.config.audit.appName;
        exception.tenantName = CONSTANTS.tenant;
        exception.userAgent = $window.navigator.userAgent;

        return $http.post('/api/audit-service/1/uiaudit', exception);
      }
    };
  }
]);
