(function(angular) {

    // Create all modules and define dependencies to make sure they exist
    // and are loaded in the correct order to satisfy dependency injection
    // before all nested files are concatenated by Gulp

    // Config
    angular.module('apolloSurveyServices.config', [])
        .value('apolloSurveyServices.config', {
            debug: true,
            apiVersion: 2,
            tenant: 'uopx'
        });

    // Util service
    angular.module('apolloSurveyServices.utils', [
            'apolloSurveyServices.config'
        ])
        .factory('apolloSurveyServices.configMgr', [
            'apolloSurveyServices.config',
            function(lbconfig) {
                return {
                    project: function(userconfig, defaults, url) {
                        var request = {
                            url: '',
                            config: {}
                        };
                        var re = /:([a-zA-Z0-9_-]+)/g;
                        var tmpArray;

                        // Replace tenant and version before applying other configurations to url
                        url = url.replace(':version', lbconfig.apiVersion).replace(':tenant', lbconfig.tenant);

                        url = url.replace(re, function replaceParam(str, p1) {
                            var val = userconfig[p1];
                            delete userconfig[p1];
                            return val;
                        });

                        // console.log('url', url);

                        // save the new replaced url to pass back.
                        request.url = url;

                        // Merge the remaining config properties to be passed as params.
                        defaults.params = angular.extend({}, defaults.params, userconfig);
                        // pass that extended defaults as new config
                        request.config = defaults;

                        return request;
                    }
                };
            }
        ]);

    // Modules
    angular.module('apolloSurveyServices.services', [
        'apolloSurveyServices.survey',
        'apolloSurveyServices.surveyAnswers'
    ]);
    angular.module('apolloSurveyServices', [
        'apolloSurveyServices.config',
        'apolloSurveyServices.services'
    ]);

})(angular);

(function(window, angular, undefined) {
    'use strict';

    angular.module('apolloSurveyServices.survey', ['apolloSurveyServices.utils'])
        .factory('Survey', [
            '$http',
            '$q',
            '$parse',
            'apolloSurveyServices.configMgr',
            function($http, $q, $parse, configMgr) {

                return {
                    get: function(userconfig) {
                        var config = {
                                params: {},
                            },
                            url = '/api/survey-service/:version/:tenant/surveys/:survey/:id',
                            request;

                        // If survey or id is not passed in, return immediately with an empty object
                        if (!$parse('survey')(userconfig) || !$parse('id')(userconfig)) {
                            return $q.when({
                                data: {}
                            });
                        }

                        request = configMgr.project(userconfig, config, url);

                        return $http.get(request.url, request.config);
                    }
                };

            }
        ]);
})(window, window.angular);

(function(window, angular, undefined) {
    'use strict';

    angular.module('apolloSurveyServices.surveyAnswers', ['apolloSurveyServices.utils'])
        .factory('SurveyAnswers', [
            '$http',
            '$q',
            '$parse',
            'apolloSurveyServices.configMgr',
            function($http, $q, $parse, configMgr) {

                function getOrSave(isSave, userconfig, data) {
                        var config = {
                                params: {},
                            },
                            url = '/api/survey-service/:version/:tenant/users/:profileId/:survey/:id',
                            request;

                        // If profileId, survey, or id is not passed in, return immediately with an empty object
                        if (!$parse('profileId')(userconfig) || !$parse('survey')(userconfig) ||
                            !$parse('id')(userconfig)) {
                            return $q.when({
                                data: {}
                            });
                        }

                        request = configMgr.project(userconfig, config, url);

                        if (isSave) {
                          return $http.post(request.url, data, request.config);
                        } else {
                          return $http.get(request.url, request.config);
                        }
                }
                return {
                    get: function(userconfig) {
                        return getOrSave(false, userconfig);
                    },
                    save: function(userconfig, data) {
                        return getOrSave(true, userconfig, data);
                    }
                };

            }
        ]);
})(window, window.angular);
