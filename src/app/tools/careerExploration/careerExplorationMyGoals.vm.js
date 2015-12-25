(function() {
  'use strict';

  angular.module('careerExplorationMyGoals.vm', [
      'apolloPlaylistCache',
      'labormarketServices.career.ronets',
      'config.constants',
      'careersUser',
      'ui.bootstrap.modal'
    ])
    .factory('CareerExplorationMyGoalsViewModel', [
      '$parse',
      '$q',
      'PlaylistCache',
      'Ronets',
      'User',
      'CONSTANTS',
      '$uibModal',
      function($parse, $q, PlaylistCache, Ronets, User, CONSTANTS, $uibModal) {
        var vm = {
            playlist: undefined,
            details: []
          },
          parsers = {
            listItems: $parse('listItems || []')
          };
        vm.getMyGoals = function() {
          var playlist;
          if (!(User.profileId && User.profile && User.profile.stateAreaId)) {
            return $q.reject('User.profileId and User.profile.stateAreaId must be set');
          }

          return PlaylistCache.getByType('RONET')
            .catch(function(err) {
              if (err.status === 404) {
                return {};
              } else {
                return $q.reject(err);
              }
            })
            .then(function(playlistResp) {
              playlist = playlistResp;
              var listItems = parsers.listItems(playlist);
              if (listItems.length) {
                var ronets = listItems.map(function(listItem) {
                  return listItem.itemIdentifier;
                });
                return Ronets.getLaborData({
                  ronets: ronets,
                  stateAreaId: User.profile.stateAreaId
                });
              } else {
                playlist.listItems = [];
              }
            }).then(function(http) {
              vm.details = http && angular.isArray(http.data) ? http.data : [];
              vm.playlist = playlist;
              vm.addDetails();
              return vm.playlist;
              // console.log('GOALS', vm.goals);
            });
        };
        vm.addDetails = function() {
          vm.playlist.listItems.forEach(function(goal) {
            goal.$$details = vm.details.find(function(detail) {
              return goal.itemIdentifier === detail.rOnet;
            });
          });
        };
        vm.openDeleteModal = function(goal) {
          $uibModal.open({
            templateUrl: 'app/tools/careerExploration/myGoalDeleteModal.html',
            // size: 'sm',
            backdrop: true,
            resolve: {
              goalToDel: angular.identity.bind(this, goal)
            },
            controller: 'MyGoalDeleteModalCtrl as myGoalDel'
          });
        };
        vm.deleteGoal = function(goal) {
          if (!(goal && goal.listId && goal.listItemId)) {
            return $q.reject('goal argument must be provided');
          } else if (!User.profileId) {
            return $q.reject('User.profileId must be set');
          }

          return goal.$delete().then(function() {
            var matchIndex = vm.playlist.listItems.findIndex(function(vmGoal) {
              return goal.listItemId === vmGoal.listItemId;
            });
            if (matchIndex > -1) {
              vm.playlist.listItems.splice(matchIndex, 1);
            }
          });
        };
        vm.saveGoalOrdering = function() {
          if (!vm.playlist || !vm.playlist.listItems || !vm.playlist.listItems.length) {
            return $q.reject('No goals to save');
          } else if (!User.profileId) {
            return $q.reject('User.profileId must be set');
          }

          vm.playlist.listItems.forEach(function(goal, idx) {
            goal.itemSequence = idx;
          });

          return vm.playlist.$update().then(function() {
            // we've updated the whole playlist, be sure they are playlist Items
            PlaylistCache.convertToPlaylistItems(vm.playlist);
            vm.addDetails();
          });
        };

        vm.init = function() {
          // wait on User profile before calling getMyGOals
          return User.get().then(vm.getMyGoals);
        };

        return vm;

      }
    ]);
})();
