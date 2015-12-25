(function() {
  'use strict';
  /**
   * @ngdoc module
   * @name myGoalCount
   * @description
   *
   * # myGoalCount
   *
   * The `myGoalCount` module provides a reusable ui component for the user's career goal (My GoalCount).
   *
   * See {@link myGoalCount.myGoalCountButton `myGoalCountButton`} for usage.
   */

  angular
    .module('FeedbackFormViewModelUOPX', [
      'careersUser',
      'apolloValidation'
    ])
    .factory('FeedbackFormViewModelUOPX', [
      'User',
      '$uibModal',
      '$location',
      'Validation',
      '$window',
      '$http',
      'CONSTANTS',
      'CONFIG',

      function(User, $uibModal, $location, Validation, $window, $http, CONSTANTS, CONFIG) {
        var vm = this,
            config = CONFIG.config;

        vm.data = {};
        vm.promises = {};
        vm.formShown = false;
        vm.user = User;
        vm.formSuccess = false;
        vm.formError = false;

        vm.showFeedbackForm = function () {
          vm.btnDisabled = true;
          vm.formError = false;
          vm.formSuccess = false;
          vm.comments = '';
          vm.locationPath = $location.absUrl();
          vm.browser = {
            name: $window.navigator.appName,
            version: $window.navigator.appVersion
          };
          vm.maxCommentLength = 1990;
          vm.tenantId = CONSTANTS.tenant;
          vm.poid = config.aptinet.orderaction.poid;
          vm.mode = config.aptinet.orderaction.mode;

          Validation.ipLocation().$promise.then(function(location) {
            vm.ipAddr = location.IPAddress;
            $uibModal.open({
              templateUrl: 'app/components/footer/tenant/' + CONSTANTS.tenant + '/feedback-form.html'
              , controller: 'FeedbackCtrl as fbModalCtrl'
              , keyboard: false
            }).result.catch(function (reason) {
                if (reason === 'backdrop click') {
                    vm.btnDisabled = false;
                }
            });
          });
        };

        vm.submitFeedback = function () {
          var formData = angular.element('#frmAptiNet').serialize();
          vm.formError = false;
          vm.formSuccess = false;

          $http({
              url: '/api/pAptiNet/OrderAction',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : formData
            })
            .then(function(data) {

              if (data.status !== 200) {
                vm.formError = true;
              } else {
                vm.formSuccess = true;
              }
            }, function(){
              vm.formError = true;
            });
        };

        return vm;
      }
    ]);

})();
