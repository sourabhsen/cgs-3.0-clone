/**
 * Created by fmdominy on 9/17/2015.
 */

(function (angular, undefined){
  'use strict';

/**
   * @ngdoc module
   * @name apolloSvgIcon
   * @description
   *
   *
   * A directive that places an inline svg icon
   * The directive should be passed the name of the file and the extension (html or svg)
   *   <apollo-svg-icon svg-icon="name" file-type="svg"></apollo-svg-icon>
   */

  angular.module('apolloSvgIcon', [])
    .directive('apolloSvgIcon', [ function() {
      return {
        restrict: 'E',
        scope: {
          svgIcon: '='
        },
        templateUrl: 'app/components/apollo-svg-icon/svg-icon.html'
      };
    }]);
})(angular);
