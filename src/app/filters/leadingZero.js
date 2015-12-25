(function(angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name filter:leadingZero
   * @function
   *
   * @description
   * The leadingZero filter will pad an integer with leading zeros up to the specified length.
   *
   * @example
   * Where sampleNum is 10:
   * <div>{{ sampleNum : 4 }}</div>
   *
   * Output will be:
   * <div>0010</div>
   */

  angular.module('filter.leadingZero', [])
    .filter('leadingZero', function() {
      return function(n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
          return n;
        }
        num = '' + num;
        while (num.length < len) {
          num = '0' + num;
        }
        return num;
      };
    });

})(angular);
