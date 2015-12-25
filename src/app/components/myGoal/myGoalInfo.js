(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name myGoalInfo
   * @description
   *
   *
   * The `myGoalInfo` module provides a factory with information on the My Goal,
   * including the goal count and whether the saved limit was reached.
   *
   */
  angular.module('myGoalInfo', [
    'apolloPlaylistCache',
    'careersUser'
  ])

  .factory('MyGoalInfo', [
    'CONFIG',
    'PlaylistCache',
    '$q',
    'User',
    function(CONFIG, PlaylistCache, $q, User) {
      /*jshint latedef: nofunc */ // for hoisting functions below
      var factory = {
          goalCount: undefined,
          reachedSavedLimit: false,
          goalLimit: CONFIG.config.savedGoalLimit
        },
        ronetPlaylist;


      factory.update = function() {
        setRonetPlaylist().then(function() {
          if (ronetPlaylist && ronetPlaylist.listItems) {
            factory.goalCount = ronetPlaylist.listItems.length;
          } else {
            factory.goalCount = 0;
          }
          updateReachedLimit();
        });

      };

      function setRonetPlaylist() {
        if (ronetPlaylist) {
          return $q.when(ronetPlaylist);
        } else {
          return PlaylistCache.getByType('RONET')
            .then(function(playlist) {
              ronetPlaylist = playlist;
              return playlist;
            }, angular.noop);
        }
      }

      function updateReachedLimit() {
        factory.reachedSavedLimit = factory.goalCount >= factory.goalLimit;
      }

      function activate() {
        // reload my goal count when user refreshed
        User.onMsg('User:reload', function() {
          ronetPlaylist = null;
          factory.update();
        });
      }

      // on startup
      activate();

      return factory;
    }
  ]);

})();
