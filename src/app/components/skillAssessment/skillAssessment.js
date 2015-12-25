'use strict';

angular.module('skillAssessment', [
  'config.constants',
  'ui.bootstrap.modal',
  'LocalStorageModule',
  'careersUser',
  'login'
])


.value('skillAssessment.config', {
  userAgreementHtml: 'Skill assessments are designed to give you an idea of what your current skill level is and are provided by Smarterer, a third party service provider.' +
    '<br/> In order to take an assessment you must become a registered user of the Smarterer service and agree to the ' +
    '<a href="http://smarterer.com/legal/terms" target="_blank">Smarterer User Agreement</a>, ' +
    '<a href="http://smarterer.com/legal/privacy" target="_blank">Privacy Policy</a> and ' +
    '<a href="http://smarterer.com/legal/guidelines" target="_blank">Community Guidelines</a>. By clicking \'I Agree\' below, you give us permission to automatically create your user account by sending your student email address, and your first and last name to Smarterer. ' +
    '<br/> When you finish the assessment, you can close the Smarterer window to return to this page and see your results.',
  uaCookieKey: 'skillAssessment.smarterer_ua_accepted'
})

.factory('SkillAssessmentViewModel', [
  'CONSTANTS',
  'localStorageService',
  'User',
  '$uibModal',
  '$http',
  'skillAssessment.config',
  'LoginModal',
  function(CONSTANTS, localStorageService, User, $uibModal, $http, config, LoginModal) {
    var vm = this;

    vm.launchSmarterer = function(url, onComplete) {
      var uaAccepted = localStorageService.get(config.uaCookieKey);
      if (!User.isAuthenticated()) {
        LoginModal.open().then(function() {
          // open assessment upon successful login
          // TODO what to do if skills changes upon login and they don't have
          // the skill to assess?
          vm.launchSmarterer(url, onComplete);
        });
        return;
      }

      // called create then login
      if (uaAccepted) {
        return vm.openSmartererModal(url, onComplete);
      } else {
        return vm.openUserAgreementModal(url, onComplete);
      }
    };

    vm.openUserAgreementModal = function(url, onComplete) {
      return $uibModal.open({
        templateUrl: 'app/components/skillAssessment/assessmentUAModal.html',
        // size: 'lg',
        resolve: {
          smartererUrl: angular.identity.bind(this, url),
          onComplete: angular.identity.bind(this, onComplete)
        },
        controller: 'SmartererUAModalCtrl as suam'
      });
    };

    vm.openSmartererModal = function(url, onComplete) {
      var httpConfig = {
        params: {
          accepttoc: true,
          toctext: angular.element('<div>' + config.userAgreementHtml + '</div>').text()
        }
      };

      return $http.get('/api/survey-service/2/' + CONSTANTS.tenant + '/users/' + User.profileId + '/skills/autologin', httpConfig)
        .then(function(http) {

          var authUrl = http.data.url + '?next_url=' + encodeURIComponent(url);

          var modalInstance = $uibModal.open({
            templateUrl: 'app/components/skillAssessment/smartererModal.html',
            size: 'lg',
            resolve: {
              smartererUrl: angular.identity.bind(this, authUrl),
            },
            backdrop: 'static', // do not close on outside click
            controller: 'SmartererModalCtrl as smm'
          });
          modalInstance.result.then(onComplete);
        });
    };

    return vm;
  }
])

.controller('SmartererUAModalCtrl', [
  'smartererUrl',
  'onComplete',
  'User',
  '$scope',
  'skillAssessment.config',
  'localStorageService',
  'SkillAssessmentViewModel',
  function(smartererUrl, onComplete, User, $scope, config, localStorageService, vm) {
    var ctrl = this;

    ctrl.userAgreementHtml = config.userAgreementHtml;

    ctrl.agree = function() {
      localStorageService.set(config.uaCookieKey, true);
      return vm.openSmartererModal(smartererUrl, onComplete)
        .then(function() {
          $scope.$close('agree');
        });
    };
  }
])

.controller('SmartererModalCtrl', [
  'smartererUrl',
  '$scope',
  '$timeout',
  '$parse',
  '$window',
  function(smartererUrl, $scope, $timeout, $parse, $window) {
    var ctrl = this,
      parsers = {
        eventData: $parse('originalEvent.data')
      };

    ctrl.smartererUrl = smartererUrl;

    ctrl.checkFinish = function(e) {
      var eventData = parsers.eventData(e);
      if (eventData === 'test:done' || eventData === 'widget_close') {
        // close must be within timeout to take effect (needs digest)
        $timeout(function() {
          $scope.$close('done');
        });
      }
    };
    ctrl.bindEvents = function() {
      angular.element($window).on('message', ctrl.checkFinish);
    };
    ctrl.unbindEvents = function() {
      angular.element($window).off('message', ctrl.checkFinish);
    };
    ctrl.activate = function() {
      ctrl.bindEvents();
      $scope.$on('$destroy', ctrl.unbindEvents);
    };
    $scope.$close = function(){
      $window.location.reload();
    };

    // on start
    ctrl.activate();
  }
])

.controller('SkillsAssessmentLinkCtrl', [
  '$scope',
  '$window',
  'SkillAssessmentViewModel',
  function($scope, $window, vm) {
    var ctrl = this;

    ctrl.assessSkill = function() {
      return vm.launchSmarterer($scope.assessmentData.url, $scope.onAssessmentComplete);
    };
  }
])

.directive('apSkillsAssessmentModalLink', [
  function() {
    return {
      restrict: 'E',
      scope: {
        assessmentData: '=',
        userdeclaredData: '=',
        onAssessmentComplete: '&',
        hideIcon: '@'
      },
      templateUrl: 'app/components/skillAssessment/skillAssessmentModalLink.html',
      controller: 'SkillsAssessmentLinkCtrl as sam'
    };
  }
]);
