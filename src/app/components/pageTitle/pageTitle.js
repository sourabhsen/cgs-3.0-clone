/**
 * AngularJS module for updating browser title/history based on the current ui-router state.
 *
 * @link https://github.com/nonplus/angular-ui-router-title
 *
 * @license angular-ui-router-title v0.0.4
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

  /* globals document: false */

  'use strict';
  angular.module('ui.router.title', ['ui.router'])
    .run([
      '$rootScope',
      '$state',
      '$parse',
      '$interpolate',
      function($rootScope, $state, $parse, $interpolate) {
        var bcLabelParse = $parse('ncyBreadcrumb.label'),
          defaultTitle = document.title;

        // parse page title
        // from state definition
        // pageTitle property or ncyBreadcrumb.label property, interpolating using $rootScope
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          var stateRef = $state.get(toState),
            parseLabel = $interpolate(stateRef.pageTitle || bcLabelParse(stateRef) || ''),
            titleValue = parseLabel($rootScope);

          document.title = titleValue || defaultTitle;
        });

      }
    ]);


})(window.angular); // jshint ignore:line
