(function() {
  'use strict';

  angular.module('interestSurvey', [
      'apolloInterestSurvey.directives',
      'careersUser'
    ])
    .controller('InterestSurveyController', [
      'User',
      '$state',
      function(User, $state) {
        var self = this;

        self.user = User;
        self.restart = angular.fromJson($state.params.restart);

        self.onSurveyComplete = function() {
          $state.go('auth.interestSurvey.results');
        };

        self.onSurveyInit = function() {
          $state.go('auth.interestSurvey', {restart: false});
        };
      }
    ]);
})();
