'use strict';

angular.module('exceptionLogging', [
  'stacktrace',
  'apolloAudit'
])

/**
 *
 * @ngdoc service
 * @name  ExceptionLogging
 * @requires  $log, printStacktrace
 *
 * @description
 * A provider for the Angular $exceptionHandler service.
 * See http://www.bennadel.com/blog/2542-logging-client-side-errors-with-angularjs-and-stacktrace-js.htm
 *
 */

.factory('ExceptionLogging', [
  '$log',
  '$injector',
  '$parse',
  '$window',
  'Stacktrace',
  function($log, $injector, $parse, $window, Stacktrace) {
    var errors = [],
      Audit;

    function log(exception, cause) {
      var port = $window.location.port,
        logMessage;

      // get the Audit service
      if (!Audit) {
        try {
          Audit = $injector.get('Audit');
        } catch (error) {
          $log.warn('Retrieving Audit service for error logging failed.');
          $log.log(error);
        }
      }

      // add exception into ExceptionLogging.errors array
      if (arguments.length === 1) {
        errors.push(exception);
      } else {
        errors.push([].slice.call(arguments, 0));
      }

      // log error to console
      $log.error.apply($log, arguments);


      // only send errors when we are on deployed port (80 / 443)
      if (port === '443' || port === '80') {

        // create object to send to Audit service
        logMessage = {
          exception: {
            errorMessage: exception.toString(),
            cause: (cause || ' ')
          },
          logType: 'UI Exception',
          pageName: $window.location.hash
        };

        // get the annotated stacktrace
        Stacktrace.fromError(exception)
          .then(function(stackframes) {
            logMessage.exception.stacktrace = stackframes;

            // send exception to audit service
            Audit.send(logMessage);
          }).catch(function(e) {
            $log.error('Unable to parse error with Stacktrace', e);
            logMessage.exception.stacktrace = 'Unable to parse error with Stacktrace: ' + e.toString();

            // send exception to audit service
            Audit.send(logMessage);
          });

      }

    }

    return {
      log: log,
      errors: errors
    };
  }
]);
