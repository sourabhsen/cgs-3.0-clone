(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name myGoal
   * @description
   *
   * # myGoal
   *
   * The `myGoal` module provides a reusable ui component for the user's career goal (My Goal).
   *
   * See {@link myGoal.myGoalButton `myGoalButton`} for usage.
   */
  angular.module('myGoal', [
    'apolloPlaylistCache',
    'config.constants',
    'careersUser',
    'myGoalInfo'
  ])

  .value('MyGoalButtonSaveStatus', {
    activeCount: 0
  })

  /**
   * @ngdoc controller
   * @name myGoal.MyGoalButtonCtrl
   *
   * @description
   * My Goal Button Controller - used by {@link myGoal.myGoalButton `myGoalButton`}.
   *
   * Requires the {@link apolloPlaylistCacheService `apolloPlaylistCacheService`} module to be installed
   *
   */
  .controller('MyGoalButtonCtrl', [
    '$scope',
    '$q',
    '$log',
    'User',
    'PlaylistCache',
    'MyGoalInfo',
    'MyGoalButtonSaveStatus',
    function($scope, $q, $log, User, PlaylistCache, MyGoalInfo, MyGoalButtonSaveStatus) {
      var ctrl = this,
        idField = $scope.idField || 'rOnet',
        ronetPlaylist;

      ctrl.savedLimitPopupMessage = 'Use this tool to explore careers and narrow your focus. You cannot add more than ' + MyGoalInfo.goalLimit + ' Career Goals. You must remove a Career Goal before adding a new one.';
      ctrl.isSaved = undefined;
      ctrl.myGoalInfo = MyGoalInfo;
      ctrl.saveStatus = MyGoalButtonSaveStatus;


      function setRonetPlaylist() {
        if (ronetPlaylist) {
          if (ronetPlaylist.listItems && ronetPlaylist.listItems.length) {
            ctrl.saveStatus.activeCount = ronetPlaylist.listItems.length;
          }
          return $q.when(ronetPlaylist);
        } else {
          return PlaylistCache.getByType('RONET')
            .then(function(playlist) {
              ronetPlaylist = playlist;
              if (ronetPlaylist.listItems && ronetPlaylist.listItems.length) {
                ctrl.saveStatus.activeCount = ronetPlaylist.listItems.length;
              }
              return playlist;
            }, angular.noop);
        }
      }

      ctrl.activate = function() {
        if (!$scope.goal) {
          throw new Error('goal must be defined');
        }
        // get playlist and set isSaved flag
        setRonetPlaylist()
          .then(function() {
            var match;
            if (ronetPlaylist && ronetPlaylist.listItems) {
              match = ronetPlaylist.listItems.find(function(goal) {
                return goal.itemIdentifier === $scope.goal[idField];
              });
            } else {
              match = false;
            }
            ctrl.isSaved = match ? true : false;
          });

      };

      function getPlaylistIndex() {
        return ronetPlaylist.listItems.findIndex(function(goal) {
          return goal.itemIdentifier === $scope.goal[idField];
        });
      }

      ctrl.saveOrRemove = function() {

        if (ctrl.isSaved) {

          var matchIndex = getPlaylistIndex();
          if (matchIndex > -1) {
            // remove item
            return ronetPlaylist.listItems[matchIndex].$delete()
              .then(function() {
                ctrl.isSaved = false;
                // there's no guarantee match index is same with multiple requests
                // so get it again
                matchIndex = getPlaylistIndex();
                if (matchIndex > -1) {
                  ctrl.saveStatus.activeCount--;
                  ronetPlaylist.listItems.splice(matchIndex, 1);
                } else {
                  $log.error('myGoalButton: matchIndex not found after $delete');
                }

                MyGoalInfo.update();
              });
          } else {
            $log.error('myGoalButton: matchIndex not found');

            // somehow already deleted
            ctrl.isSaved = true;
            return $q.when();
          }

        } else {

          var saveData = {
            itemIdentifier: $scope.goal[idField],
            itemSequence: 0,
            itemStatus: 'SAVED',
            orderItemSequence: true
          };

          if (ctrl.saveStatus.activeCount < MyGoalInfo.goalLimit) {
            ctrl.saveStatus.activeCount++;
            return PlaylistCache.addListItem('RONET', saveData)
              .then(function() {
                ctrl.isSaved = true;
                MyGoalInfo.update();

                // update playlist if not already set
                if (!ronetPlaylist) {
                  setRonetPlaylist();
                }
              }, function() {
                ctrl.saveStatus.activeCount--;
              });
          }
        }
      };

      return ctrl.activate();
    }
  ])

  /**
   * @ngdoc directive
   * @name myGoal.myGoalButton
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that saves and deletes goals from the Playlist service.
   *
   * Requires the {@link apolloPlaylistCacheService `apolloPlaylistCacheService`} module to be installed
   *
   */
  .directive('myGoalButton', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'app/components/myGoal/myGoalButton.html',

        scope: {
          goal: '=',
          idField: '@', // defaults to rOnet
          tableSize: '@',
          viewGoalsOnLimit: '@'
        },

        controller: 'MyGoalButtonCtrl as myGoal'
      };
    }
  ]);

})();
