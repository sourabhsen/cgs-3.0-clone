(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name jobPlaylist
   * @description
   *
   * # jobPlaylist
   *
   * The `jobPlaylist` module provides a reusable ui component via the jobPlaylist directive.
   *
   * See {@link jobPlaylist.jobPlaylist `jobPlaylist`} for usage.
   */

  /**
   * @ngdoc directive
   * @name jobPlaylist.jobPlaylist
   * @restrict E
   * @element NONE
   *
   * @description
   * A reusable ui component that saves, unsaves and deletes jobs to the Playlist service.
   *
   * Requires the {@link jobPlaylist `jobPlaylist`} module to be installed.
   * Requires the {@link apolloPlaylistCache `apolloPlaylistCache`} module to be installed
   *
   */


  angular.module('jobPlaylist', ['careersUser', 'apolloPlaylistCache'])
    .directive('jobPlaylist', [
      'User',
      'PlaylistCache',
      '$q',
      function(User, PlaylistCache, $q) {
        return {
          restrict: 'E',
          templateUrl: 'app/components/jobPlaylist/jobPlaylist.html',

          scope: {
            job: '=',
            reloadSavedResults: '='
          },

          link: function(scope) {
            var itemSequence = '1',
              playlist;


            function setPlaylist() {
              if (playlist) {
                return $q.when(playlist);
              } else {
                return PlaylistCache.getByType('JOB')
                  .then(function(pl) {
                    playlist = pl;
                    return playlist;
                  }, angular.noop);
              }
            }

            function toggleSavedResults() {
              scope.reloadSavedResults = scope.reloadSavedResults ? false : true;
            }


            scope.toggleSave = function(bool) {
              var jobId = scope.job.job ? scope.job.job.jobId : scope.job.jobId;
              if (bool) {
                // find the saved job in the cached list

                // console.log(playlist.listItems);

                var matchIndex = playlist.listItems.findIndex(function(job) {
                  return parseInt(job.itemIdentifier) === jobId;
                });

                if (matchIndex > -1) {
                  return playlist.listItems[matchIndex].$delete().then(function() {
                    playlist.listItems.splice(matchIndex, 1);
                    scope.job.isSaved = false;
                    toggleSavedResults();
                  });
                }
              } else {
                var saveData = {
                  itemIdentifier: jobId,
                  itemSequence: itemSequence,
                  itemStatus: 'SAVED'
                };
                return PlaylistCache.addListItem('JOB', saveData)
                  .catch(function(err) {
                    return $q.reject(err);
                  })
                  .then(function(data) {
                    scope.listItemId = data.listItemId;
                    scope.job.isSaved = true;
                    scope.job.listId = data.listId;
                    toggleSavedResults();

                    // update playlist if not already set
                    if (!playlist) {
                      setPlaylist();
                    }
                  });
              }
            };

            // on load
            setPlaylist();
          }
        };
      }
    ]);

})();
