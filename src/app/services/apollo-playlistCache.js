(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name apolloPlaylistCache
   * @description
   *
   *
   * The `apolloPlaylistCache` module provides a wrapper to Playlist services, minimizing REST calls by leveraging
   * an internal cache and Resources
   *
   */
  angular.module('apolloPlaylistCache', [
    'config.constants',
    'ngResource',
    'careersUser',
    'httpUtils',
  ])

  /**
   * @ngdoc service
   * @name PlaylistList
   * @requires $resource, CONSTANTS, httpUtils
   *
   * @description
   * A factory that wraps Playlist calls.  This is used by PlaylistCache and should not be used directly.
   *
   *
   * @returns {object} Returns a hash with the methods:
   *  query: returns all lists
   *  get : get a single playlist
   *  save:: createa a new Playlist
   *  delete: deletes an existing playlist
   */
  .factory('PlaylistList', [
    '$resource',
    'CONSTANTS',
    'httpUtils',
    function($resource, CONSTANTS, httpUtils) {
      this.tenant = CONSTANTS.tenant;
      this.playlistServicePath = '/api/playlist-service/1/' + this.tenant + '/users/:userIdentifier/lists/:listId';

      return $resource(this.playlistServicePath, {
        userIdentifier: '@userIdentifier',
        listId: '@listId',
        deleteExistingItems: '@deleteExistingItems',
        orderItemSequence: '@orderItemSequence'
      }, {
        query: {
          method: 'GET',
          isArray: true,
          transformResponse: httpUtils.appendTransformtoDefaults(function transformListsResponse(resp) {
            if (angular.isObject(resp)) {
              return resp.list || [];
            } else {
              return resp;
            }
          }),
        },
        update: {
          method: 'PUT'
        }
      });
    }
  ])

  /**
   * @ngdoc service
   * @name PlaylistItem
   * @requires $resource, CONSTANTS, httpUtils
   *
   * @description
   * A factory that wraps Playlist Item calls.  This is used by PlaylistCache and should not be used directly.
   *
   * @returns {object} Returns a hash with the methods:
   *  query: returns all playlist items
   *  get : get a single playlist item
   *  save:: createa a new Playlist item
   *  delete: deletes an existing playlist item
   *  update: updates an existing playlist item
   */
  .factory('PlaylistItem', [
    '$resource',
    'CONSTANTS',
    'httpUtils',
    function($resource, CONSTANTS, httpUtils) {
      this.tenant = CONSTANTS.tenant;
      this.playlistServicePath = '/api/playlist-service/1/' + this.tenant + '/users/:userIdentifier/lists/:listId/items/:listItemId';

      var transformDeleteResponse = httpUtils.appendTransformtoDefaults(function transformListItemsResponse(resp) {
        if (angular.isObject(resp)) {
          // return empty response for deletes
          // since the service returns the whole playlist
          // and changes the Resource
          return '';
        } else {
          return resp;
        }
      });

      return $resource(this.playlistServicePath, {
        userIdentifier: '@userIdentifier',
        listId: '@listId',
        listItemId: '@listItemId',
        orderItemSequence: '@orderItemSequence'
      }, {
        query: {
          method: 'GET',
          isArray: true,
          transformResponse: httpUtils.appendTransformtoDefaults(function transformListItemsResponse(resp) {
            if (angular.isObject(resp)) {
              return resp.listItems || [];
            } else {
              return resp;
            }
          })
        },
        update: {
          method: 'PUT'
        },
        delete: {
          method: 'DELETE',
          transformResponse: transformDeleteResponse
        },
        remove: {
          method: 'DELETE',
          transformResponse: transformDeleteResponse
        }

      });
    }
  ])

  /**
   * @ngdoc value
   * @name PlaylistBaseData
   *
   * @description
   * Base data used by PlaylistCache to save data.
   *
   */
  .value('PlaylistBaseData', {
    JOB: {
      name: 'MyJobs',
      description: 'My Saved Jobs',
      ownerType: 'USER',
      privacyType: 'Private'
    },
    RONET: {
      name: 'MyGoals',
      description: 'My goal list',
      ownerType: 'USER',
      privacyType: 'Private'
    },
    SKILL: {
      name: 'Skills',
      description: 'My skill level list',
      ownerType: 'USER',
      privacyType: 'Private'
    },
    CAREER_PLAN_STEP: {
      name: 'CAREER PLAN',
      ownerType: 'USER',
      privacyType: 'Private',
    }
  })

  .factory('PlaylistCache', [
    'PlaylistList',
    'PlaylistItem',
    'PlaylistBaseData',
    'User',
    '$q',
    function(PlaylistList, PlaylistItem, PlaylistBaseData, User, $q) {
      var cache = this;


      function _reset() {
        Object.assign(cache, {
          $lists: [],
          $listsPromise: undefined
        });
      }

      // on init
      (function init() {
        _reset();

        // reset playlist upon user:reload
        User.onMsg('User:reload', function() {
          _reset();
        });
      })();


      /**
       * Internal function to get all playlists and assign them to PlaylistCache.$lists
       * Promise is stored as PlaylistCache.$listsPromise. Subsequent calls will use this promise.
       *
       * @return {[Promise]} all lists promise resolving go lists (empty array if not found)
       */
      function _get() {
        if (cache.$listsPromise) {
          return cache.$listsPromise;
        }
        cache.$listsPromise = PlaylistList.query({
            userIdentifier: User.profileId
          }).$promise
          .then(function(lists) {

              cache.$lists = lists;
              lists.forEach(function(list) {
                cache.convertToPlaylistItems(list);
              });

              return cache.$lists;
            },
            function(err) {
              if (err.status === 404) {
                cache.$lists = [];
                return cache.$lists;
              } else {
                return $q.reject(err);
              }
            });
        return cache.$listsPromise;
      }

      function findListByType(listType) {
        return cache.$lists.find(function(list) {
          return listType === list.listType;
        });
      }

      /**
       * @ngdoc method
       *
       * @name PlaylistCache#convertToPlaylistItems
       *
       * @description
       * For a given playlist, convert all list items to PlaylistItems
       *
       * @param {Playlist} Playlist
       *
       */
      cache.convertToPlaylistItems = function(list) {
        if (list && angular.isArray(list.listItems)) {
          list.listItems = list.listItems.map(function(listItem) {
            return new PlaylistItem(Object.assign(listItem, {
              userIdentifier: User.profileId
            }));
          });
        }
      };

      /**
       * @ngdoc method
       *
       * @name PlaylistCache#getByType
       *
       * @description
       * Get playlist by type
       *
       * @param {string} list type (e.g. RONET).
       *
       * @returns Promise - resolves to matching list Resource of type
       *                    PlaylistList.
       *                    If not found, resolve to error status 404, not found.
       *
       */
      cache.getByType = function(listType) {
        return _get().then(function() {
          var match = findListByType(listType);
          if (match) {
            return $q.when(match);
          } else {
            return $q.reject({
              status: 404,
              message: 'List not found'
            });
          }
        });
      };

      /**
       * @ngdoc method
       *
       * @name PlaylistCache#save
       *
       * @description
       * Save a playlist.  Used to create a new playlist.
       * Note: If you wish to update an existing playlist use the $update() instance method.
       *
       * @param {Object} list data. If changing values, pass in the existing PlaylistList Resource.
       *
       * @returns Promise
       *
       */
      cache.save = function(listData) {
        if (!angular.isObject(listData) || !listData.listType || !angular.isArray(listData.listItems)) {
          return $q.reject('listData argument must contain listType and listItems');
        }
        var saveData = Object.assign({}, {
            userIdentifier: User.profileId
          }, listData),
          baseData = PlaylistBaseData[listData.listType],
          savePromise;

        // assign default data if available
        if (baseData) {
          Object.assign(saveData, baseData);
        } else {
          return $q.reject('PlaylistBaseData does not exist for listType "' + listData.listType + '"');
        }

        // do not use listId so resource URL resolves to /users/:userIdentifier/lists
        delete saveData.listId;
        saveData.listItems.forEach(function(item) {
          delete item.listItemId;
          delete item.listId;
        });
        savePromise = PlaylistList.save(saveData, function(newList) {
          var newListResource = new PlaylistList(newList);
          cache.convertToPlaylistItems(newListResource);
          var matchIdx = cache.$lists.findIndex(function(list) {
            return list.listType === listData.listType;
          });
          // if list exists, update, otherwise add it to cache.$lists
          if (matchIdx > -1) {
            cache.$lists[matchIdx] = newListResource;
          } else {
            cache.$lists.push(newListResource);
          }
          return newListResource;
        }).$promise;

        // if no lists exist and this is the first save,
        // reset the $listsPromise to this save so that
        // subsequent saves wait on this and don't overwrite
        if (!cache.$lists.length) {
          cache.$listsPromise = savePromise;
        }

        return savePromise;
      };

      /**
       * @ngdoc method
       *
       * @name PlaylistCache#addListItem
       *
       * @description
       * Add a list item to a playlist.  If playlist does not already exist, will create it first.
       *
       * @param {string} listType. List type (e.g. RONET, JOB)
       * @param {Object} list item data.
       *
       * @returns Promise
       *
       */
      cache.addListItem = function(listType, listItemData) {
        if (!listType) {
          return $q.reject('listType argument must be provided');
        } else if (!angular.isObject(listItemData) || !listItemData.itemIdentifier) {
          return $q.reject('listItemData argument must contain itemIdentifier');
        }

        var existingList,
          saveItemData = Object.assign({}, {
            itemType: listType,
            userIdentifier: User.profileId
          }, listItemData);

        return cache.getByType(listType)
          .then(
            function(listResp) {
              existingList = listResp;
              return PlaylistItem.save(Object.assign(saveItemData, {
                listId: existingList.listId
              })).$promise;
            },
            function(err) {
              // if playlist doesn't exist, create it
              if (err.status === 404) {
                return cache.save({
                  listType: listType,
                  listItems: [saveItemData]
                });
              } else {
                return $q.reject(err);
              }
            })
          .then(function(resp) {
            if (existingList) {
              existingList.listItems.push(Object.assign(resp, {
                userIdentifier: User.profileId
              }));
              return resp;
            } else {
              // return first list item
              return resp.listItems[0];
            }
          });
      };

      return cache;
    }


  ]);

})();
