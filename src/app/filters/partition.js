/**
 * Created by yrganta on 7/10/15.
 */
(function (angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name filter:partition
   * @function
   *
   * @description
   * The partition filter accepts an array and a number. It splits the array into sub-arrays containing the given number of items.
   * downloaded from m59peacemaker repo https://github.com/m59peacemaker/AngularComponents/tree/master/src/filter_partition
   *
   * @example
   * <div ng-repeat="partition in [1,2,3,4] | pmkr.partition:2">
   *   <p>Row</p>
   *   <div ng-repeat="item in partition">{{item}}</div>
   * </div>
   */

  angular.module('partitionFilter', [])
    .filter('partition', function ($cacheFactory) {
      var arrayCache = $cacheFactory('partition');
      var filter = function (arr, size) {
        if (!arr) {
          return;
        }
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
          newArr.push(arr.slice(i, i + size));
        }
        var cachedParts;
        var arrString = JSON.stringify(arr);
        cachedParts = arrayCache.get(arrString + size);
        if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
          return cachedParts;
        }
        arrayCache.put(arrString + size, newArr);
        return newArr;
      };
      return filter;
    });

})(angular);
