(function() {
  'use strict';

  angular.module('military', [
    ])
    .controller('MilitaryController', [
      '$state',
      '$window',
      function($state, $window) {
        $window.open('https://careers.phoenix.edu/military.html');
        $state.go('auth.dashboard');
      }
    ]);
})();
