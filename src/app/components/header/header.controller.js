(function() {
  'use strict';

  angular
    .module('header', [
      'login',
      'apolloAuthentication',
      'careersUser',
      'ui.router',
      'ncy-angular-breadcrumb'
    ])
    .run(['$rootScope',
      function($rootScope) {
        // store stateParams
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
          $rootScope.$headerType = toParams && toParams.header === 'tool' ? 'tool' : 'default';
        });
      }
    ])
    .controller('HeaderDefaultCtrl', [
      'LoginModal',
      'Auth',
      'User',
      '$state',
      '$rootScope',
      '$timeout',
      function HeaderDefaultCtrl(LoginModal, Auth, User, $state, $rootScope, $timeout) {
        var ctrl = this;

        function hideCurtain() {
          // use timeout so weird page redraws don't show: https://jira.aptimus.net/browse/ANGCGS-750
          $timeout(function() {
            $rootScope.$showSiteCurtain = false;
          }, 1500);
        }

        //console.log(User);
        ctrl.login = function() {
          if (!User.isAuthenticated()) {
            return LoginModal.open()
              .then(function() {
                $rootScope.$showSiteCurtain = true;
                return $state.reload()
                  .finally(hideCurtain);
              });
          }
        };
        ctrl.logout = function() {
          return Auth.logout().then(function() {
            $rootScope.$showSiteCurtain = true;
            return User.reload()
              .then($state.reload)
              .finally(hideCurtain);
          });
        };
      }
    ])
    .controller('HeaderToolCtrl', [
      '$state',
      'Milestones',
      '$document',
      function HeaderToolCtrl($state, Milestones, $document) {
        var ctrl = this;

        ctrl.activate = function() {
          // scroll to top
          $document.scrollTo(0, 0);

          Milestones.getMilestoneById($state.params.from)
            .then(function(milestone) {
              ctrl.fromMilestone = milestone;
            });

          ctrl.fromMilestoneSeq = $state.params.from;
          ctrl.fromMilestoneAnchor = $state.params.fromAnchor;
        };

        ctrl.activate();
      }
    ]);
})();
