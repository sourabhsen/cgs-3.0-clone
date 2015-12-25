(function() {
  'use strict';
  angular
    .module('Feedback', [
      'FeedbackFormViewModel'
    ])
    .controller('FeedbackCtrl', [
      'FeedbackFormViewModel',
      '$scope',
      '$window',
      '$document',
      '$timeout',
      function DashboardCtrl(FeedbackFormViewModel) {
        var self = this;
        self.vm = FeedbackFormViewModel;

      }
    ]);
})();
