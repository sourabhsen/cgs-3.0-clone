/**
 * Created by yrganta on 5/12/15.
 */
(function (angular) {
  'use strict';

  angular.module('angularApolloNotificationServices.notifications', [
    'angularApolloNotificationServices.utils'
  ])
    .factory('Notifications', [
      '$http'
      , '$parse'
      , '$q'
      , 'angularApolloNotificationServices.utils'
      , function ($http, $parse, $q, utils) {
        return {
          /**
           * @description
           * Get a specific notification by id for a user.
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.profileId
           * @require {string} reqConfig.notificationId
           *
           * @returns {HttpPromise} notification
           *
           */
          getById: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('profileId')(reqConfig) || !$parse('notificationId')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/profiles/:profileId/jobnotifications/:notificationId', reqConfig);
            config.params =  request.params;

            return $http.get(request.url, config);
          }
          /**
           * @description
           * Send a confirmation email to given email
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.emailAddress
           * @require {string} reqConfig.alertUri
           *
           * @returns {HttpPromise}
           *
           */
          , confirmEmail: function (reqConfig) {
            var request
              , config = {};

            // check for required params to be passed in.
            if (!$parse('profileId')(reqConfig) || !$parse('emailAddress')(reqConfig) || !$parse('alertUri')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/profiles/:profileId/confirmemail', reqConfig);
            config.params = request.params;
            config.url = request.url;
            config.method = 'PUT';

            return $http(config);
          }
          /**
           * @description
           * Update user email where the notification to be sent
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.emailAddress
           * @require {string} reqConfig.token
           *
           * @returns {HttpPromise}
           */
          , updateEmail: function (reqConfig) {
            var request
              , config = {};

            // check for required params to be passed in.
            if (!$parse('profileId')(reqConfig) || !$parse('emailAddress')(reqConfig) || !$parse('token')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/updateemail', reqConfig);
            config.params = request.params;
            config.url = request.url + '?' + request.params.queryStr;
            config.method = 'PUT';
            // put request with no body
            return $http(config);
          }
          /**
           * @description
           * Get all the notification related to a specific user
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.profileId
           * @require {string} reqConfig.status
           *
           * @returns {HttpPromise} notifications
           */
          , get: function (reqConfig) {
            var request
              , config = {};

            // check for required params to be passed in.
            if (!$parse('profileId')(reqConfig) || !$parse('status')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/profiles/:profileId/jobnotifications', reqConfig);
            config.params =  request.params;

            return $http.get(request.url, config);
          }
          /**
           * @description
           * Set a job notification for given query
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.searchQry
           * @require {string} reqConfig.notificationTitle
           * @require {string} reqConfig.profileId
           * @optional {obj} attributes
           *
           * @returns {HttpPromise} notification
           */
          , set: function (reqConfig) {
            var request
              , config = {}
              , data;

            // check for required params to be passed in.
            if (!$parse('profileId')(reqConfig) && !$parse('data')(reqConfig)) {
              //return $q.when({});
            }

            data = reqConfig.data;
            delete reqConfig.data;

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/profiles/:profileId/jobnotifications', reqConfig);
            config.params =  request.params;

            return $http.put(request.url, data, config);
          }
          /**
           * @description
           * Schedule user notifications
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.notificationId
           * @require {string} reqConfig.scheduleName
           * @require {string} reqConfig.token
           *
           * @returns {HttpPromise}
           */
          , schedule: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('notificationId')(reqConfig) || !$parse('scheduleName')(reqConfig) || !$parse('queryStr')(reqConfig)) {
              return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/jobnotifications/:notificationId/schedules/:scheduleName', reqConfig);
            request.url += '?' +request.params.queryStr;

            return $http.put(request.url, config);
          }
          /**
           * @description
           * Set the status of notification
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.notificationId
           * @require {string} reqConfig.status
           * @require {string} reqConfig.token
           *
           * @returns {HttpPromise}
           */
          , status: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('notificationId')(reqConfig) || !$parse('status')(reqConfig) || !$parse('queryStr')(reqConfig)) {
              return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/jobnotifications/:notificationId/status/:status', reqConfig);
            request.url += '?' +request.params.queryStr;

            return $http.put(request.url, config);
          }
          /**
           * @description
           * Send feedback related to a notification
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.notificationId
           * @require {string} reqConfig.token
           *
           * @returns {HttpPromise}
           */
          , feedback: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('notificationId')(reqConfig) || !$parse('reason')(reqConfig)) {
              return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/jobnotifications/:notificationId/feedback', reqConfig);
            request.url += '?' + request.params.queryStr;
            delete request.params.queryStr;

            config.params =  request.params;

            return $http.put(request.url, config);
          }
          /**
           * @description
           * Get log entry for last user notification
           *
           * @param {obj} reqConfig
           * @require {string} reqConfig.notificationId
           * @require {string} reqConfig.limit
           *
           * @returns {HttpPromise}
           */
          , log: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('notificationId')(reqConfig) || !$parse('limit')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/logentries/ids/:notificationId', reqConfig);
            config.params =  request.params;

            return $http.get(request.url, config);
          }
        };
      }
    ]);
})(angular);

/**
 * Created by yrganta on 5/12/15.
 */
(function (angular) {
  'use strict';

  angular.module('angularApolloNotificationServices.schedules', [
    'angularApolloNotificationServices.utils'
  ])
    .factory('Scheduler', [
      '$http'
      , '$q'
      , '$parse'
      , 'angularApolloNotificationServices.utils'
      , function ($http, $q, $parse, utils) {
        return {
          /**
           * @description
           * Get all notifications schedules by a given type
           *
           * @param reqConfig
           *
           * @return {HttpPromise}
           */
          getByType: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('type')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules/types/:type', reqConfig);
            config.params = request.params;

            return $http.get(request.url, config);
          }
          /**
           * @description
           * Get all notifications schedules by a given id
           *
           * @param reqConfig
           * @returns {HttpPromise}
           */
          , getById: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('scheduleId')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules/ids/:scheduleId', reqConfig);
            config.params = request.params;

            return $http.get(request.url, config);
          }
          /**
           * @description
           * Get scheduled notifications by name
           *
           * @param reqConfig
           * @returns {HttpPromise}
           */
          , getByName: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('name')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules/names/:name', reqConfig);
            config.params = request.params;

            return $http.get(request.url, config);
          }
          /**
           * @description
           * Save a notification schedule
           *
           * @param reqConfig
           * @returns {HttpPromise}
           */
          , schedule: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('data')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules', reqConfig);
            config.params = request.params;

            return $http.post(request.url, reqConfig.data, config);
          }
          /**
           * @description
           * Get log entires for schedules for a user
           *
           * @param reqConfig
           * @returns {HttpPromise}
           */
          , log: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('scheduleId')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules/logentries/ids/:scheduleId', reqConfig);
            config.params = request.params;

            return $http.get(request.url, config);
          }
          /**
           * @descrption
           * Used to change the a schedule status from sleeping to active
           *
           * @param reqConfig
           * @returns {HttpPromise}
           */
          , wakeup: function (reqConfig) {
            var request
              , config = {
                //transformResponse: utils.appendTransformer($http.defaults.transformResponse)
              };

            // check for required params to be passed in.
            if (!$parse('data')(reqConfig)) {
              //return $q.when({});
            }

            // Build request url and params from passed configuration
            request = utils.requestBuilder('/api/notification-service/:version/:tenant/schedules/wakeup', reqConfig);
            config.params = request.params;

            return $http.post(request.url, reqConfig.data, config);
          }
        };
      }
    ]);
})(angular);

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt
(function (angular) {
  'use strict';

// Config
  angular.module('angularApolloNotificationServices.config', [])
    .value('angularApolloNotificationServices.config', {
      debug: true
      , apiVersion: 1
      , tenant: 'uopx'
    });

// Modules

  angular.module('angularApolloNotificationServices.utils', [
    'angularApolloNotificationServices.config'
  ])
    .factory('angularApolloNotificationServices.utils', [
      'angularApolloNotificationServices.config'
      , function (config) {
        return {
          requestBuilder: function (url, obj) {
            var request = {
              url: ''
              , params : {}
            };
            var regex = /:([a-zA-Z0-9_-]+)/g;

              // Replace the tenant and version from url first then start replacing dynamic params.
              url = url.replace(':version', config.apiVersion).replace(':tenant', config.tenant);

              request.url = url.replace(regex, function replaceParam(str, p1) {
                var val = obj[p1];
                delete obj[p1];
                return val;
              });

              // whatever properties are left after replacing pass them through as request a params
              request.params = obj;

            return request;
          }
          , appendTransformer: function(defaults, transform) {
            // We can't guarantee that the default transformation is an array
            defaults = angular.isArray(defaults) ? defaults : [defaults];

            // Append the new transformation to the defaults
            return defaults.concat(transform);
          }
        };
      }
    ]);


  angular.module('angularApolloNotificationServices',
    [
      'angularApolloNotificationServices.notifications'
      , 'angularApolloNotificationServices.schedules'
    ]);

})(angular);
