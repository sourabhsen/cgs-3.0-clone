/**
 * Created by yrganta on 6/16/15.
 */
(function (angular) {
  'use strict';

  angular.module('resumeBuilder', [
    'careersUser',
    'apolloAngularResumeBuilder'
  ])
    .controller('ResumeBuilderController', [
      '$state'
      , '$filter'
      , 'CONFIG'
      , '$uibModal'
      , '$q'
      , 'resumeModel'
      , 'User'
      , '$scope'
      , function ($state, $filter, CONFIG, $uibModal, $q, resumeModel, User, $scope) {
        var self = this
          , size = 0;
        self.viewFlag = false;
        self.createResume = false;


        self.size = function (listSize) {
          size = listSize;
        };

        self.hasMaxed = function () {
          return size >= 25;
        };

        self.showList = function () {
            if(typeof resumeModel.showList === 'undefined') {
                return size >= 1;
            }
          return size >= 1 && resumeModel.showList;
        };

        self.list = function (promise) {
          var deferred = $q.defer();
          $q.when(promise).finally(function () {
             $scope.viewFlag = true;
            deferred.resolve();
          });

          self.resumelistWait = deferred.promise;
        };

        self.editor = function (promise) {
            // set showList to true so that
            // once first resume is created then onwards always list will be shown
          resumeModel.showList = true;
          self.resumelistWait = $q.when(promise).then(function () {
            $state.go('auth.tools.view', {viewId: 'editor'});
          });
        };

        self.newResume = function (promise) {
          var deferred = $q.defer();


          $q.when(promise).then(function (msg) {
            if (msg && msg.toLowerCase() === 'success') {
              self.editor(promise);
            }
          })
            .finally(function () {
              deferred.resolve();
            });

          self.resumelistWait = deferred.promise;
        };

        self.preview = function (promise, hideEdit, cta) {
          self.resumelistWait = $q.when(promise).then(function () {
            var tmpScope = $scope.$new();

            tmpScope.$editor = self.editor;
            tmpScope.$hideEdit = !!hideEdit;
            tmpScope.$cta = cta;

            $uibModal.open({
              template: '<div class="one-col">' +
              '<div class="row">' +
              '<div class="col">' +
              '<a href role="button" class="modal-close-link" ng-click="$dismiss()" title="Close" role="button"><span class="icon"></span></a>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<ap-preview-resume pid="user.profileId" on-edit="$editor()" hide-edit="$hideEdit" cta="$cta"></ap-preview-resume>'
              , size: 'lg'
              , windowClass: 'padded-modal-content'
              , scope: tmpScope
            });
          });
        };

        self.listView = function (promise) {
          return $q.when(promise)
          .then(function() {
            $state.go('^', {tab: ''});
          });
        };

        function bindToUserReload() {
          // call init again upon user reload so goals, etc refresh
          // this will get destroyed when $scope is destroyed
          User.onMsg('User:reload', function () {
            resumeModel.init(User.profileId);
          }, $scope);
        }

        self.init = function () {
          var deferred;
          $scope.viewFlag = false;
          bindToUserReload();

          if ($state.params.tab === 'preview') {
            deferred = $q.defer();
            deferred.resolve('preview');
            self.preview(deferred.promise);
          }

          if ($state.params.tab === 'createResume') {
            deferred = $q.defer();
            deferred.resolve('createResume');
            self.createResume = true;
          }
        };
      }
    ]).filter('capitalize', function() {
        return function(input) {
        input = input.toLowerCase() || '';

        return input.replace(/([^\W_]+[^\s-]*)/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });
})(angular);
