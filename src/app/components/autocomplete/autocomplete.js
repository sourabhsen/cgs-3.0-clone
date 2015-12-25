(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name careersAutocomplete
   * @description
   *
   * # careersAutocomplete
   *
   * The `careersAutocomplete` module provides a reusable ui component via the careersAutocomplete directive.
   *
   * See {@link careersAutocomplete.careersAutocomplete `careersAutocomplete`} for usage.
   */

  /**
   * @ngdoc directive
   * @name careersAutocomplete.careersLocationAutocomplete
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that creates a location autocomplete text input field.
   *
   * Requires the {@link careersAutocomplete `careersAutocomplete`} module to be installed.
   *
   */

  /**
   * @ngdoc directive
   * @name careersAutocomplete.careersJobsearchAutocomplete
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that creates a location autocomplete text input field.
   *
   * Requires the {@link careersAutocomplete `careersAutocomplete`} module to be installed.
   *
   */

  angular.module('careersAutocomplete', ['apolloValidation', 'apolloJobServices.jobs', 'searchQuery'])
    .factory('autocompleteFactory', [
      'Validation',
      'Jobs',
      function (Validation, Jobs) {
        return {
          getLocation: function (val) {
            var location = Validation.suggestLocation({
              searchTerm: val
            });
            return location.$promise.then(function (response) {
              return response.resultList.map(function (item) {
                item.location = (  (item.city) + ', ' + item.state);
                return item;
              });
            });
          },

          getJobKeywords: function (val) {
            var keywords = Jobs.suggest({
              q: val
            });
            return keywords.then(function (response) {
              return response.data.map(function (item) {

                // capitalization
                item.value = item.value.replace(/(^| )(\w)/g, function (x) {
                  return x.toUpperCase();
                });

                return item;
              });
            });
          }
        };
      }
    ])
    //TODO do not use implicit scope binding, spell it out, e.g.
    //scope: { location: '=' }
    //  then use that to bind to this directive so it carries down the line
    //  Refer to jobsDashboard.js
    .directive('careersLocationAutocomplete', function (autocompleteFactory, SearchQuery) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/autocomplete/_locationAutocomplete.html',
        link: function (scope) {
          scope.searchQuery = SearchQuery;
          scope.getLocation = autocompleteFactory.getLocation;
        },
        scope: {}
      };
    })
    .directive('careersJobsearchAutocomplete', function (autocompleteFactory, SearchQuery, $stateParams) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/autocomplete/_jobKeywordsAutocomplete.html',
        link: function (scope) {
          scope.getJobKeywords = autocompleteFactory.getJobKeywords;

          // In order to selectively pre-populate last search term we
          // cannot use SearchQuery model in the view. We need to
          // use facade to selectively use model data.
          scope.searchQuery = {};
          if ($stateParams.viewId === 'results') {
            scope.searchQuery = SearchQuery;
          }
          else {
            scope.$watch('searchQuery.keywords', function (newVal) {
              SearchQuery.keywords = newVal;
            });
          }
        },
        scope: {
          placeholder: '@'
        }
      };
    });

})();
