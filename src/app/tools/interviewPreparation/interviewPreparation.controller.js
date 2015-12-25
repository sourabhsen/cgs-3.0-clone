/**
 * Created by yrganta on 6/23/15.
 */

(function(angular) {
  'use strict';

  /**
   * @ngdoc module
   *
   * @name interviewPreparation
   *
   * @description
   * Contains the controller to bind the module to
   * template for drawing UI.
   */
  angular.module('interviewPreparation', [
      'interviewPreparation.vm'
    ])
    /**
     * @ngdoc controller
     *
     * @name InterviewPrep
     * @require
     *
     * @description
     * Bind template to model.
     */
    .controller('InterviewPrepController', [
      'InterviewPrepViewModel', '$scope', '$state', 'localStorageService',
      function(iPrepModel, $scope, $state, localStorageService) {
        var self = this;
        self.tip = true;
        self.curIndex = 0;

        var _faq = angular.copy(iPrepModel.faqs);

        Object.defineProperties(self, {
          'questions': {
            get: function() {
              return _faq;
            },
            enumerable: true
          }
        });

        self.goToSearch = function(query) {
          if (!query) {
            return false;
          }

          localStorageService.set('iPrep.searchParams', angular.toJson({
            query: query,
            page: 1
          }));
          $state.go('auth.tools.view', {
            viewId: 'search'
          });
        };

        self.selectQuestion = function(question) {
          self.questions.map(function(q){
            q.active = false;
          });
          question.active = true;
        };


        self.onSlideChanged = function(index) {
          self.curIndex = index;

          if (_faq[index]) {
            _faq[index].visited = true;
          }
        };

        $scope.inTimelineView = function(index, curIndex) {
          return index >= curIndex && index < curIndex + 4;
        };

        $scope.activeClass = function(index, curIndex) {
          return index - curIndex;
        };

        self.init = function() {
          // Default to prep template
          if (!self.questions.length) {
            self.loading = iPrepModel.init().then(function () {
              _faq = angular.copy(iPrepModel.faqs);
            });
          }
        };
      }
    ])
    .controller('InterviewPrepSearchController', [
      'InterviewPrepViewModel', '$state', 'localStorageService', '$window',
      function(iPrepModel, $state, localStorageService, $window) {
        var self = this;
        self.paginationSize = 6;

        Object.defineProperties(self, {
          'searchQuestions': {
            get: function() {
              return iPrepModel.searchQuestions;
            },
            enumerable: true
          }
        });

        self.getQuestions = function(query, page) {
          if (!query) {
            return false;
          }

          localStorageService.set('iPrep.searchParams', angular.toJson({
            query: query,
            page: page
          }));
          self.searchTerm = query;
          self.currentPage = page || 1;

          return iPrepModel.getQuestions({
            'question_text': query,
            'page': self.currentPage
          }).then(function() {
            self.paginationSize = iPrepModel.searchQuestions.pageCount > 6 ? 6 : iPrepModel.searchQuestions.pageCount;
            self.itemsPerPage = Math.ceil(iPrepModel.searchQuestions.totalItems / iPrepModel.searchQuestions.pageCount);
          });
        };

        self.goToFaq = function($event) {
          $event.preventDefault();
          $window.history.back();
        };

        self.init = function() {
          // save the search in local storage.
          var searchParams = localStorageService.get('iPrep.searchParams');
          if (searchParams) {
            searchParams = angular.fromJson(searchParams);
            self.loading = self.getQuestions(searchParams.query, searchParams.page);
          }
        };
      }
    ])
    .directive('trainingVideo', function() {
      return {
        restrict: 'E',
        scope: {
          question: '=',
          showTip: '='

        },
        templateUrl: 'app/tools/interviewPreparation/templates/video.html'
      };
    })

  .directive('onCarouselChange', function($parse) {
    return {
      require: 'uib-carousel',
      link: function(scope, element, attrs, carouselCtrl) {
        var fn = $parse(attrs.onCarouselChange);
        var origSelect = carouselCtrl.select;
        carouselCtrl.select = function( /*nextSlide*/ ) {
          origSelect.apply(this, arguments);
          fn(scope, {
            curIndex: this.getCurrentIndex()
          });
        };
      }
    };
  });

})(angular);
