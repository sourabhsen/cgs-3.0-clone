(function() {
  'use strict';
  angular
    .module('DashBoard', [
      'DashboardViewModel',
      'apolloAngularResumeBuilder',
      'careersUser',
      'apolloSvgIcon',
      'filter.textClamp'
    ])
    .controller('DashboardCtrl', [
      'DashboardViewModel',
      'Milestones',
      'CONFIG',
      'User',
      '$state',
      '$filter',
      'resumeModel',
      '$scope',
      function DashboardCtrl(DashboardViewModel, Milestones, CONFIG, User, $state, $filter, resumeModel, $scope) {

        var self = this;
        self.model = DashboardViewModel;
        self.startTab = 'recommended';
        self.tools = CONFIG.tools;

        self.login = function() {
          User.launchLoginModal();
        };

        function getResumeBuilderConfig() {
          var config = $filter('filter')(CONFIG.tools, {
            identifier: 'tools.resumeBuilder'
          })[0];

          return config;
        }

        // Resume widget handlers
        self.showEditor = function(promise) {
          self.resumeBuilderPromise = promise;
          promise.then(function() {
            var config = getResumeBuilderConfig();

            $state.go('auth.tools.view', {
              'toolId': config.identifier.split('.')[1],
              viewId: 'editor'
            });
          });
        };

        self.showPreview = function(promise) {
          self.resumeBuilderPromise = promise;
          promise.then(function() {
            var config = getResumeBuilderConfig();

            $state.go('auth.tools', {
              'toolId': config.identifier.split('.')[1],
              tab: 'preview'
            });
          });
        };

        // Resume show more link
        self.resumeShowMoreLink = function(size) {
          self.rlSize = size;
        };

        function bindToUserReload() {
          // call init again upon user reload so goals, etc refresh
          // this will get destroyed when $scope is destroyed
          User.onMsg('User:reload', function() {
            resumeModel.init(User.profileId);
          }, $scope);
        }

        self.activate = function() {
          DashboardViewModel.init();

          // use CONFIG.milestonse initially, then override later after playlist is retrieved
          // this is a workaround to a strange bug with angular not picking up changes to milestone/completed flag
          // https://jira.aptimus.net/browse/ANGCGS-943
          self.milestones = CONFIG.milestones;

          Milestones.getPlaylist().finally(function() {
            return Milestones.getMilestones().then(function(milestones) {
              self.milestones = milestones;
            });
          });

          self.playlistPromise = Milestones.playlistPromise;
          self.milestonesPromise = Milestones.milestonesPromise;

          // Remove left-nav class 'display-nav' (if it exists) on body
          // If a user clicks on the dashboard icon, the right-justified spacing is left in place
          // causing the main dashboard to be shifted to the right.
          angular.element('body')
            .attr('data-focus', 'false')
            .attr('data-hover', 'false')
            .attr('data-left-nav', 'false');

          bindToUserReload();
        };

        // on startup
        self.activate();
      }
    ]);

})();
