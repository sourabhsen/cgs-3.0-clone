(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name recentSearchesWidget
   * @description
   *
   * # recentSearchesWidget
   *
   * The `recentSearchesWidget` module provides a reusable ui component.
   *
   * See {@link recentSearchesWidget.recentSearchesWidget `recentSearchesWidget`} for usage.
   */

  /**
   * @ngdoc directive
   * @name recentSearchesWidget.recentSearchesWidget
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that displays the most recent searches.
   *
   * Requires the {@link recentSearchesWidget `recentSearchesWidget`} module to be installed.
   *
   */


  angular.module('recentSearchesWidget', ['apolloPlaylistCache', 'config.constants'])
    .directive('recentSearchesWidget', [
      'PlaylistCache',
      'CONSTANTS',
      function (PlaylistCache) {
        var recentSearchesVM = function () {
          var vm = {
            getRecentSearches: function () {
              vm.noResults = false;
              vm.recentSearchesPromise = PlaylistCache.getByType('SAVED_SEARCHES').then(function (data) {
                console.log('in get recent searches success: ' + JSON.stringify(data));
                vm.data = data.data;
              }, function (data) {
                vm.recentSearchesError(data);
              });
              return vm.savedJobsPromise;
            },
            recentSearchesError: function (data) {
              console.log('in get recent searches error: ' + JSON.stringify(data));
            }
          };

          return vm;
        };

        return {
          restrict: 'E',
          templateUrl: 'app/components/recentSearchesWidget/recentSearchesWidget.html',
          scope: {
            profileId: '@',
          },
          replace: true,
          link: function (scope) {
            scope.vm = recentSearchesVM(scope);
            scope.vm.getRecentSearches();
          }
        };
      }
    ]);
})();
