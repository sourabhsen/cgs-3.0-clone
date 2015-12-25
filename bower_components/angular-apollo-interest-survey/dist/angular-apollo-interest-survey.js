(function(angular) {
  'use strict';

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('apolloInterestSurvey.config', [])
    .value('apolloInterestSurvey.config', {
      debug: true,
      defaultValue: 2, // default value of slider if none available
      pageSize: 6,
      sliderConfig: {
        from: 0,
        to: 4,
        step: 0.5
      },
      surveyInfo: {
        id: 'holland',
        name: 'mc'
      }
    });

  // Modules
  angular.module('apolloInterestSurvey.directives', ['apolloInterestSurvey.directives.interestSurvey']);
  angular.module('apolloInterestSurvey.filters', ['apolloInterestSurvey.filters.startFrom']);
  angular.module('apolloInterestSurvey.services', []);
  angular.module('apolloInterestSurvey', [
    'apolloInterestSurvey.config',
    'apolloInterestSurvey.directives',
    'apolloInterestSurvey.filters',
    'apolloInterestSurvey.services'
  ]);

})(angular);

(function() {
  'use strict';

  angular.module('apolloInterestSurvey.directives.interestSurvey', [
      'apolloInterestSurvey.directive.interestSurvey.vm',
      'apolloInterestSurvey.filters.startFrom',
      'rzModule'
    ])
    .controller('ApInterestSurveyCtrl', [
      '$scope',
      'InterestSurveyViewModel',
      function($scope, vm) {
        $scope.activate = function() {
          if (!$scope.profileId) {
            throw new Error('apInterestSurvey: profileId attribute must be specified!');
          }
          vm.init($scope.profileId, $scope.restart, $scope.onInit, $scope.onComplete);
        };
        $scope.vm = vm;

        // console.log('in controller');

        // on start
        $scope.activate();
      }
    ])
    .directive('apInterestSurvey', [
      function() {
        return {
          restrict: 'E',
          templateUrl: 'angular-apollo-interest-survey/directives/interest-survey.html',
          controller: 'ApInterestSurveyCtrl',

          scope: {
            profileId: '=',
            onComplete: '=',
            onInit: '=',
            restart: '='
          },
        };
      }
    ]);
})();

(function() {
  'use strict';

  angular.module('apolloInterestSurvey.directive.interestSurvey.vm', [
      'apolloInterestSurvey.config',
      'apolloSurveyServices.survey',
      'apolloSurveyServices.surveyAnswers'
    ])
    .factory('InterestSurveyViewModel', [
      '$parse',
      '$q',
      'apolloInterestSurvey.config',
      'Survey',
      'SurveyAnswers',
      function($parse, $q, moduleConfig, Survey, SurveyAnswers) {
        var vm = {
            retrieved: false,
            params: {
              profileId: null,
              restart: false,
              onComplete: null,
              onInit: null
            },
            surveyQuestions: null,
            surveyAnswers: {
              questions: {}
            },
            surveyAnswersTransformed: {
              questions: {}
            },
            defaultValue: moduleConfig.defaultValue, // default value of slider if none available
            currentPage: 0,
            pageSize: moduleConfig.pageSize,
            lastPage: null,
            sliderConfig: moduleConfig.sliderConfig,
            surveyInfo: moduleConfig.surveyInfo
          },
          parsers = {
            questions: $parse('data.questions'),
            scoreByCategory: $parse('( data.scores | filter : {category: category} )[0].scores'),
            pctComplete: $parse('(( data.scores | filter : {category: "answeredQuestionPercentage"} )' +
              '[0].scores | filter : {scoreName: "percentageAnswered"})[0].scoreValue')
          };

        vm.init = function(profileId, restart, onInit, onComplete) {
          if (!profileId) {
            return $q.reject('No profileId provided to apInterestSurvey!');
          }

          vm.params.profileId = profileId;
          vm.params.restart = restart;
          vm.params.onInit = onInit;
          vm.params.onComplete = onComplete;
          vm.currentPage = 0;
          return Survey.get({
            survey: vm.surveyInfo.name,
            id: vm.surveyInfo.id
          }).then(function(http) {
            vm.surveyQuestions = parsers.questions(http);
            vm.lastPage = (vm.surveyQuestions || []).length / vm.pageSize;
            return SurveyAnswers.get({
              profileId: vm.params.profileId,
              survey: vm.surveyInfo.name,
              id: vm.surveyInfo.id
            });
          }).then(function(http) {
            var questions = parsers.questions(http);
            if (questions && http.data.questions) {
              angular.forEach(questions, function(resp) {
                // console.log('f', resp);
                vm.surveyAnswers.questions[resp.itemId] = resp.optionValues && resp.optionValues.length ?
                  resp.optionValues[0] : resp.optionValues;
              });
              // Page advance
              if (!vm.params.restart) {
                vm.currentPage = Math.min((questions.length / vm.pageSize), vm.lastPage - 1);
              }
            }
            vm.retrieved = true;
          }, function(err) {
            if (vm.surveyQuestions && vm.surveyQuestions.length && err && err.status === 404) {
              vm.surveyAnswers.questions = {};
              vm.retrieved = true;
            } else {
              return $q.reject(err);
            }
          }).finally(function() {
            vm.assignDefaultAnswers(vm.currentPage);
            if (vm.retrieved) {
              if (angular.isFunction(vm.params.onInit)) {
                vm.params.onInit();
              }
            }
          });
        };

        vm.saveInterests = function() {
          return SurveyAnswers.save({
            profileId: vm.params.profileId,
            survey: vm.surveyInfo.name,
            id: vm.surveyInfo.id
          }, vm.surveyAnswersTransformed);
        };

        vm.nextGroup = function() {
          // format answers object to send to service
          var qs = vm.surveyAnswers.questions;
          vm.surveyAnswersTransformed.questions = Object.keys(qs).map(function(val) {
            // console.log('nextGroup', value, id, qs[value], qs[value].toString());
            return {
              'itemId': val,
              'optionValues': [qs[val].toString()]
            };
          });
          return vm.saveInterests().then(function(http) {
            if (vm.currentPage + 1 >= vm.lastPage) {

              var categories = parsers.scoreByCategory(http, {
                  category: 'adjustedCategoryValueSum'
                }),
                careerInterestResults = {
                  score: categories
                };

              if (!categories) {
                return $q.reject(
                  'Survey results not as expected ("adjustedCategoryValueSum" not found)'
                );
              }

              // fire onComplete handler with careerInterestResults!
              if (angular.isFunction(vm.params.onComplete)) {
                vm.params.onComplete(careerInterestResults);
              }
            } else {
              vm.currentPage++;
              vm.assignDefaultAnswers(vm.currentPage);
            }
          });
        };

        vm.previousGroup = function() {
          vm.currentPage = Math.max(vm.currentPage - 1, 0);
        };

        vm.assignDefaultAnswers = function(page) {
          if (angular.isNumber(page) && vm.surveyQuestions) {
            for (var len = vm.surveyQuestions.length, idx = page * vm.pageSize,
                ct = 0; ct < vm.pageSize && idx < len; ct++, idx++) {
              var question = vm.surveyQuestions[idx];
              if (!vm.surveyAnswers.questions[question.itemId]) {
                vm.surveyAnswers.questions[question.itemId] = vm.defaultValue;
              }
            }
          }
        };

        vm.getSurveyCompleted = function(profileId) {
          if (!profileId) {
            return $q.reject('No profileId provided to getSurveyCompleted');
          }
          return SurveyAnswers.get({
            profileId: profileId,
            survey: vm.surveyInfo.name,
            id: vm.surveyInfo.id
          }).then(function(http) {
            var pctComplete = parseFloat(parsers.pctComplete(http) || 0);
            return pctComplete;
          }, function(err) {
            if (err && err.status === 404) {
              return 0;
            } else {
              return $q.reject(err);
            }
          });
        };

        return vm;

      }
    ]);
})();

(function() {
  'use strict';

  angular.module('apolloInterestSurvey.filters.startFrom', [])
    .filter('startFrom', function() {
      return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      };
    });
})();

angular.module("apolloInterestSurvey.directives").run(["$templateCache", function($templateCache) {$templateCache.put("angular-apollo-interest-survey/directives/interest-survey.html","<div class=\"col survey\" ng-if=\"vm.retrieved\"><h4 class=\"page-title text-center margin-small-bottom no-top-margin\">{{vm.currentPage + 1}} of {{vm.surveyQuestions.length/vm.pageSize}}</h4><div class=\"one-col\"><div class=\"row\"><div class=\"font-small font-heading\"><span class=\"pull-left\">Least Interested</span> <span class=\"pull-right\">Most Interested</span></div></div></div><div ng-repeat=\"question in vm.surveyQuestions | startFrom:vm.currentPage * vm.pageSize | limitTo:vm.pageSize track by $index\" class=\"one-col questions\"><div class=\"row\"><div class=\"question-text\">{{question.itemText}}</div><div class=\"rzsliderContainer\"><rzslider class=\"survey-slider\" rz-slider-model=\"vm.surveyAnswers.questions[question.itemId]\" rz-slider-floor=\"0\" rz-slider-ceil=\"4\" rz-slider-step=\"1\" rz-slider-show-ticks=\"true\" rz-slider-hide-limit-labels=\"true\"></rzslider></div></div></div><div class=\"text-center margin-medium\"><button type=\"button\" class=\"survey-btn survey-btn-prev\" tabindex=\"0\" ng-disabled=\"vm.currentPage === 0\" ng-click=\"vm.previousGroup()\"><span class=\"fa fa-arrow-left\"></span></button> <button type=\"button\" class=\"survey-btn survey-btn-next\" tabindex=\"0\" ng-click=\"saveWait = vm.nextGroup()\" cg-busy=\"{promise: saveWait, profile: \'inlineSmall\'}\"><span class=\"fa fa-arrow-right\"></span></button></div></div>");}]);