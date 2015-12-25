(function() {
  'use strict';

  angular.module('interestSurveyResults.vm', [
      'apolloSurveyServices.surveyAnswers',
      'apolloInterestSurvey.config',
      'config.constants',
      'careersUser'
    ])
    .factory('InterestSurveyResultsViewModel', [
      '$http',
      '$q',
      '$filter',
      'User',
      'CONSTANTS',
      'SurveyAnswers',
      'apolloInterestSurvey.config',
      '$state',
      function($http, $q, $filter, User, CONSTANTS, SurveyAnswers, surveyConfig, $state) {
        var vm = {
          params: {},
          scores: undefined,
          categories: undefined,
          surveyInfo: surveyConfig.surveyInfo
        };

        vm.getAnswers = function() {
          return SurveyAnswers.get({
            profileId: User.profileId,
            survey: vm.surveyInfo.name,
            id: vm.surveyInfo.id
          }).then(function(http) {
            try {
              vm.scores = vm.parseAnswers(http.data);
              return vm.scores;
            } catch(err) {
              return $q.reject(err.message);
            }
          }, function(){
            // If request failes, redirect back to survey.
            $state.go('auth.interestSurvey', {restart: false});
          });
        };
        vm.parseAnswers = function(data) {
          if (data && angular.isArray(data.scores)) {
            var match = data.scores.find(function(val) {
              return val.category === 'adjustedCategoryValueSum';
            });
            if (!match) {
              throw new Error('Cannot find adjustedCategoryValueSum in survey answer scores');
            }
            // convert score value to a number
            match.scores.forEach(function(val) {
              val.scoreValue = parseFloat(val.scoreValue);
            });
            // sort scores by scoreValue descending and obtain total scores value
            var sortedScores = $filter('orderBy')(match.scores, '-scoreValue'),
              scoreTotal = sortedScores.reduce(function(total, val) {
                return total + val.scoreValue;
              }, 0);

            // assign rank and percentage value
            sortedScores.forEach(function(val, idx) {
              val.rank = idx + 1;
              if (scoreTotal === 0) {
                val.scorePct = 16;
              } else {
                val.scorePct = Math.round(val.scoreValue / scoreTotal * 100);
              }
            });
            return sortedScores;
          } else {
            throw new Error('Cannot find scores in survey answer response');
          }
        };
        vm.getInterestCategories = function() {
          return $http.get('/api/onet-service/1/' + CONSTANTS.tenant + '/occupationalInterest').then(
            function(http) {
              if (http && http.data && http.data.occupationalInterest) {
                vm.categories = http.data.occupationalInterest;
                return vm.categories;
              } else {
                return $q.reject('Cannot obtain interest survey categories');
              }
            });
        };

        vm.deleteSurvey = function(bool) {

          if (bool) {
            $http.delete('/api/survey-service/2/' + CONSTANTS.tenant + '/users/' + User.profileId + '/mc/holland', {})
              .then(function(){
                $state.go('auth.interestSurvey', {restart:'true'}, {reload: true});
              });
          } else {
              console.log('do not delete it');
          }
        };

        vm.init = function() {

          return $q.all([
            vm.getAnswers(),
            vm.getInterestCategories()
          ]);

        };

        return vm;
      }
    ]);
})();
