(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name stacktrace
   *
   * @description
   * A wrapper for the stacktrace library included in the global scope
   *
   */
  angular.module('stacktrace', [])
    .factory('Stacktrace', [
      '$window',
      function($window) {

        // This functionality was poached and adapted from https://github.com/stacktracejs/stacktrace.js/blob/master/dist/stacktrace.js


        var _options = {
          filter: function(stackframe) {
            // Filter out stackframes for this library by default
            return (stackframe.functionName || '').indexOf('StackTrace$$') === -1 &&
              (stackframe.functionName || '').indexOf('ErrorStackParser$$') === -1 &&
              (stackframe.functionName || '').indexOf('StackTraceGPS$$') === -1 &&
              (stackframe.functionName || '').indexOf('StackGenerator$$') === -1;
          }
        };


        /**
         * Merge 2 given Objects. If a conflict occurs the second object wins.
         * Does not do deep merges.
         * @param first Object
         * @param second Object
         * @returns new Object merged first and second
         * @private
         */
        function _merge(first, second) {
          var target = {};

          [first, second].forEach(function(obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                target[prop] = obj[prop];
              }
            }
            return target;
          });

          return target;
        }


        return {
          /**
           * Given an error object, parse it.
           * @param error Error object
           * @param opts Object for options
           * @return Array[StackFrame]
           */
          fromError: function StackTrace$$fromError(error, opts) {
            opts = _merge(_options, opts);
            var GPS = new $window.StackTraceGPS(opts);

            function getAnnotatedStackframe(sf) {
              return new Promise(function(resolve) {
                function resolveOriginal() {
                  resolve(sf);
                }

                GPS.pinpoint(sf)
                  .then(resolve, resolveOriginal)['catch'](resolveOriginal);
              });
            }

            var stackframes = $window.ErrorStackParser.parse(error),
              annotatedSFs = [];
            if (typeof opts.filter === 'function') {
              stackframes = stackframes.filter(opts.filter);
            }

            // sequentially loop through each promise
            // so that the source maps do not get his multiple times
            // modeled after http://www.joezimjs.com/javascript/patterns-asynchronous-programming-promises/
            // and https://github.com/DukeyToo/es6-promise-patterns
            return stackframes.reduce(function(prev, curr) {
              return prev.then(function() {
                return getAnnotatedStackframe(curr);
              }).then(function(newSF) {
                annotatedSFs.push(newSF);
              });
            }, Promise.resolve()).then(function() {
              return annotatedSFs;
            });
          }

        };
      }
    ]);

})();
