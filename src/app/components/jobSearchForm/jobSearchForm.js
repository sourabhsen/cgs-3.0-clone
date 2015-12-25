(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name jobSearchForm
   * @description
   *
   * # jobSearchForm
   *
   * The `jobSearchForm` module provides a reusable ui component via the jobSearchForm directive.
   *
   * See {@link jobSearchForm.jobSearchForm `jobSearchForm`} for usage.
   */

  /**
   * @ngdoc directive
   * @name jobSearchForm.jobSearchForm
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that saves, unsaves and deletes jobs to the Playlist service.
   *
   * Requires the {@link jobSearchForm `jobSearchForm`} module to be installed.
   *
   */


  angular.module('jobSearchForm', ['searchQuery', 'ui.router'])
    .directive('jobSearchForm', [
      'SearchQuery',
      '$stateParams',
      function (SearchQuery, $stateParams) {
        return {
          restrict: 'E',
          templateUrl: function ($elem, $attr) {
            return 'app/components/jobSearchForm/jobSearchForm' + [$attr.mode] + '.html';
          },
          link: function (scope) {
            scope.searchQuery = SearchQuery;
            if ($stateParams.viewId !== 'results') {
              SearchQuery.init();
            }
          }
        };
      }
    ]);
})();
