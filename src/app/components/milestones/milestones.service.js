(function() {
  'use strict';

  angular
    .module('milestones', [
      'ui.bootstrap.modal',
      'apolloPlaylistCache',
      'careersUser',
      'httpUtils',
      'config.constants',
    ])
    .factory('Milestones', [
      'CONFIG',
      'CONSTANTS',
      'User',
      'PlaylistCache',
      'httpUtils',
      '$http',
      '$q',
      function(CONFIG, CONSTANTS, User, PlaylistCache, httpUtils, $http, $q) {
        /*jshint latedef: nofunc */ // for hoisting functions below

        var factory = {
            playlistPromise: undefined,
            milestonesPromise: undefined
          },
          milestones = angular.copy(CONFIG.milestones),
          totalActivitiesCount = 0,
          totalCompletedCount = 0,
          playlistItems;


        factory.getMilestones = function() {
          return factory.milestonesPromise;
        };

        factory.getMilestoneById = function(milestoneId) {
          return factory.milestonesPromise.then(function() {
            return milestones.find(function(ms) {
              return (milestoneId == ms.orderSequence); // jshint ignore:line
            });
          });
        };

        factory.getMilestoneNamedArray = function() {
          return factory.milestonesPromise.then(function() {
            var namedArray = {};
            milestones.forEach(function(ms) {
              var name = ms.identifier.substring(ms.identifier.indexOf('.') + 1);
              namedArray[name] = ms.orderSequence;
            });
            return namedArray;
          });
        };

        factory.getPlaylist = function(reload) {
          if (playlistItems) {
            return $q.when(playlistItems);
          } else {
            factory.playlistPromise = PlaylistCache.getByType('CAREER_PLAN_STEP')
              .then(function(data) {
                  playlistItems = data.listItems;
                  addPlaylistDataToActivities();
                  return data.listItems;
                },
                function(err) {
                  if (err.status === 404) {
                    if (reload) {
                      addPlaylistDataToActivities();
                    }
                  } else {
                    return $q.reject(err);
                  }
                });
            return factory.playlistPromise;
          }
        };

        factory.saveActivity = function(activity) {
          if (activity.completed && activity.playlist) {
            // Remove Item
            return activity.playlist.$delete()
              .then(function() {
                activity.completed = false;
                totalCompletedCount--;
                if (playlistItems) {
                  var matchIndex = playlistItems.findIndex(function(playlistItem) {
                    return activity.playlist.listItemId === playlistItem.listItemId;
                  });
                  if (matchIndex > -1) {
                    playlistItems.splice(matchIndex, 1);
                  }
                }
                setPercentCompleted();
              });
          } else {
            // Save Item
            return PlaylistCache
              .addListItem('CAREER_PLAN_STEP', {
                itemIdentifier: activity.playlistId,
                itemSequence: '1',
                itemStatus: 'COMPLETE'
              })
              .then(function(playlist) {
                // Set activity.saved to activity object
                activity.completed = true;
                activity.playlist = playlist;
                totalCompletedCount++;
                setPercentCompleted();
              });
          }
        };

        function addMilestoneContent() {
          $http.get('/api/utility/2/' + CONSTANTS.tenant + '/config/app/cgs/module/content')
            .then(function(content) {
              if (content.data && content.data.milestones && content.data.milestones.activities.length) {
                var appContent = content.data.milestones.activities;
                milestones.forEach(function(milestone) {
                  milestone.activities.forEach(function(activity) {
                    var match = appContent.find(function(content) {
                      return (content.identifier == activity.identifier); // jshint ignore:line
                    });
                    if (match) {
                      activity.content = match.content;
                    }
                  });
                });
              }
            });
        }

        function getNavigation(orderSequence) {
          var navigation = {
            'previous': '',
            'next': ''
          };
          milestones.find(function(ms) {
            if (ms.orderSequence === orderSequence - 1) {
              navigation.previous = {};
              navigation.previous.orderSequence = ms.orderSequence;
              navigation.previous.title = ms.title;
            }
            if (ms.orderSequence === orderSequence + 1) {
              navigation.next = {};
              navigation.next.orderSequence = ms.orderSequence;
              navigation.next.title = ms.title;
            }
          });
          return navigation;
        }

        function addPlaylistDataToActivities() {
          // Set activity.completed to activity object'
          totalCompletedCount = 0;
          totalActivitiesCount = 0;
          milestones.forEach(function(ms) {
            var activities = ms.activities;
            totalActivitiesCount += ms.activities.length;
            activities.forEach(function(activity) {
              var match = (playlistItems || []).find(function(pl) {
                return pl.itemIdentifier === activity.playlistId;
              });
              activity.completed = (match) ? true : false;
              if (match) {
                totalCompletedCount++;
                activity.playlist = match;
              }
            });
          });
          setPercentCompleted();
        }

        function setPercentCompleted() {
          var message = false;
          var milestonecount= 0;
          factory.getPlaylist().then(function() {
            milestones.progressPercentage = (totalCompletedCount / totalActivitiesCount) * 100;
            milestones.progressStyleValue = {
              'width': Math.floor(milestones.progressPercentage) + '%'
            };
            milestones.forEach(function(ms) {
              ms.progressPercentage = milestones.progressPercentage;
              ms.progressStyleValue = milestones.progressStyleValue;
              // Set Milestone Completed
              var allActivitiesCompleted = true;
              ms.activities.forEach(function(activity) {
                if (!activity.completed) {
                  allActivitiesCompleted = false;
                }else{
                     milestonecount +=1; //CGS 90 - Set individual milestone progress count
                }

              });

               //CGS-90-  Set individual milestone progress status
               ms.milestoneProgressPercentage = (milestonecount / ms.activities.length) * 100;
               milestonecount = 0;

              ms.completed = (allActivitiesCompleted) ? true : false;
              // Set Next
              //console.log('1');
              if (!ms.completed && !message) {
                ms.next = true;
                message = true;
                // milestones.message = 'Hello World';
                // console.log('2');
                // console.log(milestones.message);
              } else {
                ms.next = false;
              }
            });
          });
        }

        // refresh playlist on User reload
        function bindToUserReload() {
          User.onMsg('User:reload', function() {
            playlistItems = undefined;
            factory.getPlaylist(true);
          });
        }

        factory.init = (function() {
          factory.getPlaylist();
          addMilestoneContent();
          milestones.forEach(function(ms) {
            // Could move, but shouldn't rely on playlist service
            ms.navigation = getNavigation(ms.orderSequence);
          });
          if (!playlistItems) {
            milestones[0].next = true;
          }
          bindToUserReload();
          factory.milestonesPromise = $q.when(milestones);
          return factory.milestonesPromise;
        }());

        return factory;

      }
    ]);

})();
