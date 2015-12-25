(function() {
  'use strict';
  angular
    .module('FeedbackUOPX', [
      'FeedbackFormViewModel'
    ])
    .controller('FeedbackCtrlUOPX', [
      'FeedbackFormViewModelUOPX',
      '$scope',
      '$window',
      '$document',
      '$timeout',
      function DashboardCtrl(FeedbackFormViewModelUOPX,  $scope, $window, $document, $timeout) {
        var self = this;
        self.vm = FeedbackFormViewModelUOPX;

        var feedbackObj = angular.element('#feedback-div');
        var bottomOfObject, bottomOfWindow;

        var checkHeight = function checkHeight() {
          var docHeight = $document.height();
          // determine if the docHeight differs from the $scope.documentHeight variable.
          if (docHeight !== $scope.documentHeight) {
            $scope.documentHeight = docHeight;
            $scope.$emit('heightchange', docHeight); // transmits the new docHeight up through the scope
          }
          $timeout(checkHeight, 50); // after a bit of time
        };

        var setFeedbackOpacity = function setFeedbackOpacity() {
          // gets the footer feedback div element and determines if it is on the screen
          // by comparing its location with the scrolled position of the document.
          bottomOfObject = feedbackObj.offset().top + feedbackObj.outerHeight() + 30;
          bottomOfWindow = $window.pageYOffset + $window.innerHeight;
          if (bottomOfWindow > bottomOfObject) {
            if (!self.feedbackObjVis) {
              self.feedbackObjVis = true;
            }
          } else {
            if (self.feedbackObjVis) {
              self.feedbackObjVis = false;
            }
          }
        };

        angular.element($window).bind('scroll', function CALLTOsetFeedbackOpacity2() {
          // fires the function on scroll event
          setFeedbackOpacity();
          $scope.$apply();
        });

        $scope.$on('heightchange', function CALLTOsetFeedbackOpacity() {
          setFeedbackOpacity();
        });

        // check the height on initialization
        checkHeight();

      }
    ]);

})();
