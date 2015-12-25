/**
 * Created by yrganta on 6/23/15.
 */


(function (angular) {
  'use strict';

  /**
   * @ngdoc module
   * @name optimalInterviewService
   * @require configs
   *
   * @description
   *  Packages the service to interact with 3rd party
   *  optimal resume client services.
   *
   *
   */

  angular.module('optimalInterviewService', [
  ])
  /**
   * @ngdoc service
   * @name OptimalInterview
   * @require $http
   *
   * @description
   *  Provides a interface for components to interact
   *  with Optimal resume 3rd party RESTful interface to get
   *  interview prep meta data.
   *
   *  @return {object} return and object that provide methods to call into get
   *                    data for interview preparation.
   */
    .factory('OptimalInterview', [
      '$http'
      , '$parse'
      , function ($http, $parse) {
        return {
          getQuestions: function (params) {
            var config = {
              headers: {
                'Authorization': 'Bearer d611e3a1a4045736961e6767a6871501b6e4034a'
              }
              , params: {},
              transformResponse: (function () {
                // We can't guarantee that the default transformation is an array
                var defaults = angular.isArray($http.defaults.transformResponse) ? $http.defaults.transformResponse : [$http.defaults.transformResponse];

                // Append the new transformation to the defaults
                return defaults.concat(function (data) {
                  var value;

                  value = angular.isArray($parse('_embedded.questions')(data)) ? $parse('_embedded.questions')(data) :
                    [$parse('_embedded.questions')(data)];

                  Object.keys(data)
                    .forEach(function (key) {
                      if (key !== '_embedded') {
                        value[key] = data[key];
                      }
                    });

                  return value;
                });
              })()
            };


            if (angular.isObject(params)) {
              angular.extend(config.params, params);
            }

            return $http.get('/api/interview/optimal-interview/questions', config);
          }
        };
      }
    ])
  /**
   * @ngdoc filter
   *
   * @name  falttenQuestion
   * @require $parse
   *
   * @return {object} return a fattened object.
   */
    .filter('flattenQuestion', [
      '$parse'
      , function ($parse) {
        return function (input, props) {
          var question = {};

          angular.forEach(props, function (pattern, prop) {
            question[prop] = $parse(pattern)(input);
          });

          return question;
        };
      }
    ]);
})(angular);


(function (angular) {
  'use strict';

  /**
   * @ngdoc module
   *
   * @name interviewPrep.vm
   *
   * @description
   *  Provides an interview preparation model to be used by
   *  controllers to draw up the UI.
   */

  angular.module('interviewPreparation.vm', [
    'optimalInterviewService'
  ])
    .factory('InterviewPrepViewModel', [
      'OptimalInterview'
      , '$filter'
      , function (oInterview, $filter) {
        var mapQuestions;

        mapQuestions = function mapQuestions(questions) {
          var qList = [];

          qList = questions.map(function (question) {
            var q;

            q = $filter('flattenQuestion')(question, {
              questionsText: 'questions_text'
              , status: 'status'
              , coachsTip: '_embedded.coaching[0].coaching_text'
              , coachingVideo: '_embedded.coaching[0]._embedded.coaching_media[0].media_url'
              , questionVideo: '_embedded.question_media[0].media_url'
            });

            if (angular.isUndefined(q.questionsText)) {
              q.questionsText = $filter('flattenQuestion')(question, {questionsText: 'question_text'}).questionsText;
            }

            return q;
          });

          qList.pageCount = questions.page_count; // jshint ignore:line
          qList.totalItems = questions.total_items; // jshint ignore:line
          qList.pageSize = questions.page_size; // jshint ignore:line


          return qList;
        };


        var model = {
          faqs: []
          , searchQuestions: []
          , getQuestions: function (params) {
            var self = this;

            return oInterview.getQuestions(params)
              .then(function (resp) {
                return mapQuestions(resp.data);
              })
              .then(function (flattenedQuestions) {
                self.searchQuestions = flattenedQuestions;
              });
          }
          // Cache last query to check if its just a page increment search.
          //, previousSearch: ''
        };

        // on load frequent questions by default.
        model.init = function () {
          // Always reset the faqs when initializing
          model.faqs = [];
          model.searchQuestions = [];

          return model.getQuestions({
            status: 'active'
            , 'playlist_id': 'AFFr18'
            , 'api_module': 'optimal-interview'
            , 'api_service': 'questions'
            , 'api_service_operation': 'list-collection'
          })
            .then(function () {
              // This should assign faqs to searchQuestions for the first search.
              model.faqs = model.searchQuestions;
            });
        };

        return model;
      }
    ]);
})(angular);
