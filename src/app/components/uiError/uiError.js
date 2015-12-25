(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name showError
   * @description
   *
   * # showError
   *
   * The `showError` module provides the dynamicHtml directive.
   *
   * See {@link dynamicHtml.dynamicHtml `dynamicHtml`} for usage.
   */
  angular.module('uiError', [])

  .factory('ErrorParser', function() {
    // var methods = {
    //   GET: 'getting from',
    //   POST: 'sending to',
    //   PUT: 'sending to',
    //   DELETE: 'sending to'
    // };

    return {
      parseError: function(error) {
        var errorMsg;
        if (angular.isObject(error)) {
          if (error.errorMsg) {
            errorMsg = error.errorMsg;
          } else if (error.message) {
            errorMsg = error.message;
          } else if (error.data && error.data.error) {
            errorMsg = error.data.error;
          } else if (angular.isDefined(error.status) || error.statusText) {
            if (error.config && error.config.url) {
              // var verb = methods[error.config.method] || methods.GET,
              var service = error.config.url.replace(/(^\/api\/)(.*?)(\/.*$)/, '$2');
              // errorMsg = 'Error ' + verb + ' ' + service + ' (' + error.status + ': ' + error.statusText + ')';
              errorMsg = '(' + service + ' ' + error.status + ')';
            } else {
              // errorMsg = error.status + ' ' + error.statusText;
              errorMsg = error.statusText;
            }
          } else {
            errorMsg = angular.toJson(error);
          }
        } else {
          errorMsg = error;
        }
        return errorMsg;
      }
    };

  })

  .controller('UiErrorController', [
      '$scope',
      '$window',
      'ErrorParser',
      function($scope, $window, ErrorParser) {

        $scope.reload = function(url) {
          if (url) {
            $window.location = url;
          } else {
            $window.location.reload();
          }
        };

        $scope.$watch('errorObjs', function(newVal) {
          var parsedErrors = [],
            parsingProblems = false;
          angular.forEach(newVal, function(err) {
            var errorMsg = ErrorParser.parseError(err);
            if (errorMsg) {
              parsedErrors.push(errorMsg);
            } else {
              parsingProblems = true;
            }

          });
          $scope.parsedErrors = parsedErrors;
          $scope.parsingProblems = parsingProblems;
        });
      }
    ])
    /**
     * @ngdoc directive
     * @name dynamicHtml.dynamicHtml
     * @restrict A
     * @element NONE
     *
     * @description
     * A directive to dynamically compile content.  Similar to ng-bind-html, except it actually compiles the dynamic HTML.
     * HTML should be trusted and safe.
     *
     *
     */
    .directive('uiError', function() {
      return {
        restrict: 'E',
        scope: {
          errorObjs: '=',
          message: '@',
          action: '@',
          toUrl: '@',
          inline: '@'
        },
        templateUrl: 'app/components/uiError/uiError.html',
        controller: 'UiErrorController'
      };
    });


})();
