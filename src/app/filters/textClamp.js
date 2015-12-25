(function(angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name filter:textClamp
   * @function
   *
   * @description
   * text is clammped and does not exceed the length
   * last word is not cut and ellipses are added at the end
   * @example
   * For Given text "Whether you're a short-order cook or a CEO, every job has a required skillset.  Find out what skills required to achieve your goal."
   * and limit=100
   * Output will be:
   * "Whether you're a short-order cook or a CEO, every job has a required skillset.  Find out what skills ..."
   */

  angular.module('filter.textClamp', [])
    .filter('textClamp', function() {
      return function (text, limit) {
        if (!angular.isString(text)) {
          return '';
        }
        var index = text.lastIndexOf(' ', limit);
        return text.substr(0, index) + ' ...';
      };
    });

})(angular);
