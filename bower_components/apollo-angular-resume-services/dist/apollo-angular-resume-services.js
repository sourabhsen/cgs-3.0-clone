///**
// * Created by yrganta on 5/13/15.
// */
//(function (angular) {
//  'use strict';
//
//  angular.module('apolloAngularResumeServices.LIRI', [
//    'apolloAngularResumeServices.linkedInTpl'
//    //, 'apolloAngularResumeServices.ngLinkedIn'
//    , 'apolloAngularResumeServices.resumeUtils'
//    , 'apolloAngularResumeServices.resumeTpl'
//  ])
//  /**
//  *
//  * @ngdoc service
//  * @name apolloAngularResumeServices.$LIRI
//  *
//  * @description
//  *
//  * Provide the service to parse, sanitize and build resume object for backend services consumption.
//  *
//  */
//
//  .factory('$LIRI', [
//    '$q'
//    , '$log'
//    , '$linkedIn'
//    , 'LINKEDINFIELDS'
//    , '$resumeUtils'
//    , 'RESUMETPL'
//    , function ($q, $log, $linkedIn, LINKEDINFIELDS, $resumeUtils, RESUMETPL) {
//
//      var _self = this;
//
//      /**
//       * Parse date from object in the following format:
//       * { year: 2011, month: 2, day: 1}
//       * @param d date object
//       * @return date
//       */
//      this.parseDate = function (d) {
//        var dt = null;
//        if ($resumeUtils.isNotNullLIRI(d)) {
//          dt = new Date(0);
//          var y = (d.year || dt.getFullYear());
//          var m = (d.month || 1) - 1;
//          var day = (d.day || 1);
//          dt.setFullYear(y, m, day);
//        }
//        return dt;
//      };
//
//
//      this.import = function () {
//        return $linkedIn.authorize()
//          .then(function () {
//            return $linkedIn.isAuthorized();
//          }, function (err) {
//            var msg = err || 'Oops! Something went wrong when connecting Bootcamp to your LinkedIn account. Please try again.';
//            throw msg;
//          })
//          .then(function (authenticated) {
//            if (!authenticated) {
//              $log.log('Oops! Please try logging into LinkedIn again.');
//              throw 'User not authenticated.';
//            }
//
//            $linkedIn.refresh();
//            return _self.getUserProfile();
//          })
//          .then(function (profileData) {
//            return profileData ? _self.createJsonResumeFromLinkedIn(profileData) : undefined;
//          });
//      };
//
//      this.getUserProfile = function () {
//        return $linkedIn.profile('me', LINKEDINFIELDS);
//      };
//
//      this.createJsonResumeFromLinkedIn = function (profile) {
//        // $log.log('createJsonResumeFromLinkedIn ', profile);
//
//        var _self = this,
//          positions, endDate, startDate, resumeObject, retObj;
//
//        retObj = angular.copy(RESUMETPL);
//        resumeObject = retObj.resume;
//
//        resumeObject.contact.firstName = profile.values[0].firstName;
//        resumeObject.contact.lastName = profile.values[0].lastName;
//        resumeObject.contact.emailAddress = profile.values[0].emailAddress;
//        resumeObject.summary.includeUserSummary = true;
//        resumeObject.summary.userSummary = $resumeUtils.LbsToHtml(profile.values[0].summary);
//
//
//        if ($resumeUtils.isNotNullLIRI(profile.values[0].positions)) {
//          positions = profile.values[0].positions.values;
//          for (var pIdx = 0, pLen = positions.length; pIdx < pLen; pIdx++) {
//            var position = positions[pIdx];
//
//            if ($resumeUtils.isNotNullLIRI(position)) {
//              startDate = _self.parseDate(position.startDate);
//
//              endDate = _self.parseDate(position.endDate);
//
//              resumeObject.experience.jobs[pIdx] = {
//                'id': '' + (pIdx + 1),
//                'isCurrent': position.isCurrent,
//                'title': position.title,
//                'startDate': startDate,
//                'endDate': endDate,
//                'employer': position.company.name,
//                'description': $resumeUtils.LbsToHtml(position.summary),
//                'displayInResume': true
//              };
//
//            }
//          }
//        }
//
//        if ($resumeUtils.isNotNullLIRI(profile.values[0].skills)) {
//          var skills = profile.values[0].skills.values;
//          for (var sIdx = 0, sLen = skills.length; sIdx < sLen; sIdx++) {
//            var skill = skills[sIdx];
//            if ($resumeUtils.isNotNullLIRI(skill)) {
//              resumeObject.skills.skills[sIdx] = skill.skill.name;
//            }
//          }
//        }
//
//        if ($resumeUtils.isNotNullLIRI(profile.values[0].educations) && $resumeUtils.isNotNullLIRI(profile.values[0].educations.values)) {
//          var educations = profile.values[0].educations.values;
//          for (var eIdx = 0, eLen = educations.length; eIdx < eLen; eIdx++) {
//            var education = educations[eIdx];
//
//            startDate = _self.parseDate(education.startDate);
//            endDate = _self.parseDate(education.endDate);
//
//            resumeObject.education.schools[eIdx] = {
//              'startDate': startDate,
//              'completionDate': endDate,
//              'qualification': education.degree,
//              'major': education.fieldOfStudy,
//              'institution': education.schoolName
//            };
//          }
//        }
//
//        return retObj;
//
//      };
//
//      // The only API exposed for external use.
//      return {
//        import: this.import
//      };
//
//    }]);
//
//})(angular);

/**
 * Created by yrganta on 5/13/15.
 */

(function (angular) {
  'use strict';

  angular.module('apolloAngularResumeServices.linkedInTpl', [])
  /**
   *
   * @ngdoc constant
   * @name apolloAngularResumeServices.linkedInTpl.LINKEDINFIELDS
   *
   * @description
   *
   * Defines the list of information that is requested from linkedIn to build the resume object.
   *
   */

    .constant('LINKEDINFIELDS', 'first-name,last-name,headline,picture-url,industry,summary,specialties,positions,publicProfileUrl,educations,volunteer,skills,courses,honors-awards,num-recommenders');

})(angular);

///**
// * Created by yrganta on 5/13/15.
// */
//
//(function (angular) {
//  'use strict';
//
//    /**
//     * Adapting @author  Roman Alexeev <roman@boket.to> to fit our projects need.
//     *
//     * Angular LinkedIn Service
//     *
//     * For more info see official API Documentation:
//     * https://developer.linkedin.com/documents/javascript-api-reference-0
//     *
//     * @author  Roman Alexeev <roman@boket.to>
//     * @date    April 21, 2014
//     * @version 0.1.2
//     * @license MIT
//     */
//
//
//    /* global IN */
//    angular.module('apolloAngularResumeServices.ngLinkedIn', [
//      'apolloAngularResumeServices.config'
//    ])
//      .factory('$linkedIn', [
//        '$rootScope'
//        , '$q'
//        , '$window'
//        , 'apolloAngularResumeServices.config'
//        , '$timeout',
//        function($rootScope, $q, $window, rbconfig, $timeout) {
//          var config = {
//            appKey: null,
//            authorize: false,
//            lang: 'en_US',
//            scope: 'r_basicprofile'/*,
//             'credentials_cookie': false */
//          };
//
//          var _self = this;
//
//          this.set = function(property, value) {
//            if (!config.hasOwnProperty(property)) {
//              throw 'Config does not support property: ' + property;
//            }
//            config[property] = value;
//            return this;
//          };
//
//          this.get = function(property) {
//            if (!config.hasOwnProperty(property)) {
//              throw 'Config does not support property: ' + property;
//            }
//            return config[property];
//          };
//
//
//          var $linkedIn = $q.defer();
//
//          $rootScope.$on('in.load', function(e, IN) {
//            $linkedIn.resolve(IN);
//
//            var events = ['auth', 'logout'];
//            angular.forEach(events, function(event) {
//              IN.Event.on(IN, event, function(response) {
//                $rootScope.$broadcast('in.' + event, response);
//                if (!$rootScope.$$phase) {
//                  $rootScope.$apply();
//                }
//              });
//            });
//          });
//
//          // Set the key here for now
//          this.set('appKey', rbconfig.linkedInKey) // '754rrlz6zr3x48'
//            .set('authorize', true)
//            .set('scope', '');
//
//          $linkedIn.config = function(property, value) {
//            var retVal;
//
//            if ( typeof value !== 'undefined' ) {
//              _self.set(property, value);
//            }
//            else {
//              retVal = _self.get(property);
//            }
//            return retVal;
//          };
//
//          // init
//          $linkedIn.init = function() {
//            if (!$linkedIn.config('appKey')) {
//              throw '$linkedInProvider: appKey is not set';
//            }
//
//            $window.inAsyncLoad = function() {
//              $rootScope.$broadcast('in.load', $window.IN);
//            };
//            $window.IN.init(angular.extend({
//              'api_key': $linkedIn.config('appKey'),
//              onLoad: 'inAsyncLoad'
//            }, config));
//          };
//
//          // check auth
//          $linkedIn.isAuthorized = function() {
//            return $linkedIn.promise.then(function(IN) {
//              return IN.User.isAuthorized();
//            });
//          };
//
//          // authorize
//          $linkedIn.authorize = function() {
//            var defer = $q.defer();
//            return $linkedIn.promise.then(function(IN) {
//
//              var authorizationTimer = $timeout(function(){
//                defer.reject('User failed to provide access to their LinkedIn account.');
//              }, 30000);
//
//              IN.User.authorize(function() {
//                $timeout.cancel(authorizationTimer);
//                defer.resolve();
//              });
//
//              return defer.promise;
//            });
//          };
//
//          // refresh token
//          $linkedIn.refresh = function() {
//            IN.User.refresh();
//          };
//
//          // logout
//          $linkedIn.logout = function() {
//            var defer = $q.defer();
//            return $linkedIn.promise.then(function(IN) {
//              IN.User.logout(function() {
//                defer.resolve();
//              });
//              return defer.promise;
//            });
//          };
//
//          // share
//          $linkedIn.share = function(url) {
//            if (!url) {
//              throw 'Url is not specified';
//            }
//            IN.UI.Share()
//              .params({
//                url: url
//              })
//              .place();
//          };
//
//          // general api request
//          $linkedIn.api = function(api, ids, fields, params) {
//            var defer = $q.defer();
//            return $linkedIn.promise.then(function(IN) {
//              IN.API[api](ids.toString() || 'me')
//                .fields(fields || null)
//                .params(params || {})
//                .result(function(response) {
//                  defer.resolve(response);
//                })
//                .error(function(err) {
//                  defer.reject(err);
//                });
//              return defer.promise;
//            });
//          };
//
//          // api shortcut methods
//          // profile
//          $linkedIn.profile = function(ids, fields, params) {
//            return $linkedIn.api('Profile', ids, fields, params);
//          };
//
//          // connections
//          // requires 'r_network' and 'rw_nus' permissions
//          $linkedIn.connections = function(ids, fields, params) {
//            return $linkedIn.api('Connections', ids, fields, params);
//          };
//
//          // member updates
//          // requires 'rw_nus' permission
//          $linkedIn.memberUpdates = function(ids, fields, params) {
//            return $linkedIn.api('MemberUpdates', ids, fields, params);
//          };
//
//          // raw api
//          $linkedIn.raw = function(type, method, requestBody) {
//            if (!type) {
//              throw 'Url type is not specified';
//            }
//
//            var defer = $q.defer();
//            var APIUrl = {
//              'gm': '/people/~/group-memberships'
//            };
//
//            return $linkedIn.promise.then(function(IN) {
//              IN.API.Raw(APIUrl[type])
//                .method(method || 'GET')
//                .body(requestBody || '')
//                .result(function(response) {
//                  defer.resolve(response);
//                })
//                .error(function(err) {
//                  defer.reject(err);
//                });
//              return defer.promise;
//            });
//          };
//
//
//          function getScript(source, callback) {
//            var script = document.createElement('script');
//            var prior = document.getElementsByTagName('script')[0];
//            script.async = 1;
//            prior.parentNode.insertBefore(script, prior);
//
//            script.onload = script.onreadystatechange = function (_, isAbort) {
//              if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
//                script.onload = script.onreadystatechange = null;
//                script = undefined;
//
//                if (!isAbort && callback) {
//                  callback();
//                }
//              }
//            };
//
//            script.src = source;
//          }
//
//          // Load the linkedIn platform api if not already present on the page.
//          if (angular.isUndefined(window.IN)) {
//            window.IN = null;
//
//            // TODO: Make this independent of jQuery getScript
//            getScript('//platform.linkedin.com/in.js?async=true', function() {
//              $linkedIn.init();
//              if (!$rootScope.$$phase) {
//                $rootScope.$apply();
//              }
//            });
//          }
//
//
//          return $linkedIn;
//
//        }
//      ]);
//
//})(angular);

/**
 * Created by yrganta on 5/13/15.
 */

(function (angular) {
  'use strict';

  /**
   * @ngdoc module
   * @name resumeAPI
   *
   * @description
   *
   * provide an API to save and retrieve bits of information related to resume
   *
   */
  angular.module('apolloAngularResumeServices.resume', [
    'ngFileUpload'
    //, 'apolloAngularResumeServices.LIRI'
    , 'apolloAngularResumeServices.resumeUtils', 'apolloAngularResumeServices.resumeTpl', 'apolloAngularResumeServices.config', 'apolloAngularResumeServices.utils'
  ])

  /**
   * @ngdoc service
   * @name $resumeservice
   *
   * @description
   *
   * An API to interact with backend resume services to read and write any resume related data.
   *
   */

  .factory('$resumeservice', [
    '$http', 'Upload', '$log'
    //, '$LIRI'
    , '$resumeUtils', '$q', 'RESUMETPL', 'apolloAngularResumeServices.utils', '$parse',
    function ($http, $upload, $log, /*$LIRI,*/ $resumeUtils, $q, resumeTpl, utils, $parse) {

      var normalizeJobData, getTitleAndCanonSkillsForResumeSection, api;

      normalizeJobData = function (data) {
        var sanitizedObj = {
          occupation: '',
          canonSkills: []
        };

        if ($resumeUtils.isNotNullLIRI(data.experience) && $resumeUtils.isNotNullLIRI(data.experience.jobs)) {
          sanitizedObj.occupation = data.experience.jobs[0].occupation;
        }

        if ($resumeUtils.isNotNullLIRI(data.canonSkills)) {
          for (var skIdx = 0, skLen = data.canonSkills.length; skIdx < skLen; skIdx++) {
            sanitizedObj.canonSkills.push(data.canonSkills[skIdx]);
          }
        }

        sanitizedObj.canonSkills = $resumeUtils.dedupeArray(sanitizedObj.canonSkills);

        return sanitizedObj;
      };


      getTitleAndCanonSkillsForResumeSection = function (jobs) {
        var asyncReqs = [];
        var job;
        var resume;
        var req;

        for (var i = 0, pLen = jobs.length; i < pLen; i++) {
          job = jobs[i];
          resume = '';
          if ($resumeUtils.isNotNullLIRI(job)) {
            resume = resume + job.employer + '.  -';
            if ($resumeUtils.isNotNullLIRI(job.startDate) && $resumeUtils.isNotNullLIRI(job.startDate.getYear())) {
              resume = resume + ' ' + job.startDate.getYear();
            }
            if ($resumeUtils.isNotNullLIRI(job.endDate) && $resumeUtils.isNotNullLIRI(job.endDate.getYear())) {
              resume = resume + ' to ' + job.endDate.getYear() + ' ';
            } else {
              resume = resume + 'to ';
            }

            resume = resume + job.title + '\n';

            if ($resumeUtils.isNotNullLIRI(job.descriptionRaw)) {
              resume = resume + job.descriptionRaw + '\n\n';
            }
          }

          req = api.parse(angular.toJson({
            text: resume
          }));
          asyncReqs.push(req);
        }

        return asyncReqs;
      };


      api = {
        //importLinkedIn: function (profileId) {
        //  var _self = this;
        //
        //  //return $LIRI.import().then(function (res) {
        //  //  if (!res) {
        //  //    throw 'Oops.. we failed to import resume. Please try again.';
        //  //  }
        //  //
        //  //  var resumeObj = res.resume;
        //  //  var canonSkillPromises = getTitleAndCanonSkillsForResumeSection(resumeObj.experience.jobs);
        //  //
        //  //  return $q.all(canonSkillPromises).then(function (cListData) {
        //  //    var sObj;
        //  //    angular.forEach(resumeObj.experience.jobs, function (job, index) {
        //  //
        //  //      sObj = normalizeJobData(cListData[index]);
        //  //
        //  //      resumeObj.occupation = sObj.occupation;
        //  //      resumeObj.canonSkills = sObj.canonSkills;
        //  //    });
        //  //
        //  //    res.name = 'LinkedIn resume';
        //  //    return _self.create(profileId, res);
        //  //  });
        //  //});
        //
        //},

        upload: function (profileId, $files) {
          var file = $files[0],
            url = '/api/resume-service/:version/:tenant/users/:profileId/document';

          url = utils.urlBuilder(url, {
            'profileId': profileId
          });

          return $upload.upload({
            url: url //upload.php script, node.js route, or servlet url
            //method: 'POST' or 'PUT',
            //headers: {'header-key': 'header-value'},
            //withCredentials: true,
            ,
            fields: {
              name: file.name,
              documentType: 'RESUME',
              primaryInd: 'Y'
            },
            file: file //, // or list of files ($files) for html5 only
            //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // customize file formData name ('Content-Disposition'), server side file variable name.
            //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            //formDataAppender: function(formData, key, val){}
          }).progress(function (evt) {
            $log.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function ( /*data , status, headers, config*/ ) {
            // file is uploaded successfully
            $log.log('resume uploaded successfully');
          });
        },

        create: function (profileId, userData) {

          // Use the predefined empty resume object
          var data = angular.copy(resumeTpl),
            url = '/api/resume-service/:version/:tenant/users/:profileId/resume';

          // Delete the under lying skills object for new resume.
          data.resume.skills = {};

          if (angular.isObject(userData)) {
            data.name = userData.name;
            angular.extend(data.resume, userData.resume);
          }

          url = utils.urlBuilder(url, {
            'profileId': profileId
          });

          return $http.post(url, data);
        },

        list: function (profileId) {

          var configs = {
              params: {
                type: 'RESUME',
                status: 'COMPLETE'
              }
            },
            url = '/api/resume-service/:version/:tenant/users/:profileId/document';

          url = utils.urlBuilder(url, {
            profileId: profileId
          });

          return $http.get(url, configs);
        },

        setPreference: function (userconfig) {
          //profileId, docId, payload
          var data = {
              resumeTemplatePreference: 'CLASSIC'
            },
            url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId/preferences';


          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig)) {
            return $q.when({
              data: {}
            });
          }

          url = utils.urlBuilder(url, userconfig);

          if (userconfig.payload) {
            angular.extend(data, userconfig.payload);
          }

          return $http.put(url, data);
        },

        getPreferences: function (userconfig) {
          var url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId/preferences',
            config = {
              params: {}
            },
            request;


          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig)) {
            return $q.when({
              data: {}
            });
          }

          request = utils.map(userconfig, config, url);

          return $http.get(request.url, request.config);
        },

        get: function (userconfig) {
          // profileId, docId
          var url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig)) {
            return $q.when({
              data: {}
            });
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.get(url);
        },

        update: function (userconfig) {
          var url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig) || !$parse('data')(userconfig)) {
            return; //$q.when({data: {}});
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.put(url, userconfig.data);
        },

        previewUrl: function (userconfig) {
          // profileId, docId, template
          var url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId/html?template=:template';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig) || !$parse('template')(userconfig)) {
            return '';
          }

          return utils.urlBuilder(url, userconfig);
        },

        preview: function (userconfig) {
          //profileId, docId, template
          var config = {
              params: {
                'template': 'CLASSIC'
              }
            },
            url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId/html',
            request;


          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig)) {
            return $q.when({
              data: ''
            });
          }

          request = utils.map(userconfig, config, url);

          return $http.get(request.url, request.config);
        },

        getTemplates: function () {
          var url = '/api/resume-service/:version/:tenant/resume/templates';
          url = utils.urlBuilder(url);

          return $http.get(url);
        },

        parse: function (data) {
          var url = '/api/resume-service/:version/:tenant/resume/parse';

          if (!data) {
            return $q.when({
              data: ''
            });
          }

          url = utils.urlBuilder(url);

          return $http.post(url, data);
        },

        delete: function (userconfig) {
          //profileId, docId

          return this.setMetaInfo(angular.extend({}, userconfig, {
            data: {
              primaryInd: 'N',
              status: 'DELETED'
            }
          }));
        },

        getMetaInfo: function (userconfig) {
          //profileId, docId
          var url = '/api/resume-service/:version/:tenant/users/:profileId/document/:docId/metadata';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig)) {
            return $q.when({
              data: ''
            });
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.get(url);
        },

        setMetaInfo: function (userconfig) {
          var url = '/api/resume-service/:version/:tenant/users/:profileId/document/:docId/metadata';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig) || !$parse('data')(userconfig)) {
            return $q.when({
              data: ''
            });
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.put(url, userconfig.data);
        },

        getDegrees: function () {
          var url = '/api/resume-service/:version/:tenant/library/display/degreelevels';
          url = utils.urlBuilder(url);

          return $http.get(url);
        },

        duplicate: function (userconfig) {
          var url = '/api/resume-service/:version/:tenant/users/:profileId/resume/:docId/duplicate';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig) || !$parse('data')(userconfig)) {
            return $q.when({
              data: ''
            });
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.post(url, userconfig.data);

        },

        apply: function (userconfig) {
          var url = '/api/resume-service/:version/:tenant/users/:profileId/jobs/apply/:sourceId/resume/:docId';

          if (!$parse('profileId')(userconfig) || !$parse('docId')(userconfig) || !$parse('sourceId')(userconfig)) {
            return; //$q.when({data: {}});
          }

          url = utils.urlBuilder(url, userconfig);

          return $http.post(url, userconfig.data);
        },

        getCountryList: function () {
          var url = 'api/validation-service/1/uopx/address/countries';
          return $http.get(url, {cache: true});
        },

        getStates : function () {
          //var url = 'api/resume-service/1/uopx/library/lookups?type=states';
          var url = 'api/resume-service/1/uopx/library/lookups?type=states&limit=1000';
          return $http.get(url, {cache: true});
        }
      };

      return api;

    }
  ]);

})(angular);

/**
 * Created by yrganta on 5/12/15.
 */
(function (angular) {
  'use strict';

  angular.module('apolloAngularResumeServices.resumeTpl', [])
  /**
   * @ngdoc constant
   * @name RESUMETPL
   *
   * @description
   *
   * Resume object template that is used to construct resume object.
   */

    .constant('RESUMETPL', {
      'name': '',
      'primaryInd': 'Y',
      'status': 'COMPLETE',
      'resume': {
        'contact': {
          'firstName': '',
          'middleName': '',
          'lastName': '',
          'postalAddress': {
            'line1': '',
            'line2': '',
            'city': '',
            'state': '',
            'postalCode': '',
            'country': ''
          },
          'phones': [
            {
              'extension': '',
              'number': ''
            },
            {
              'extension': '',
              'number': ''
            }
          ],
          'emailAddress': '',
          'webSite': '',
          'addinfo': ''
        },
        'statements': {
          'personal': {
            'veteran': {}
          },
          'honors': ''
        },
        'skills': {
          'skills': [],
          'languages': '',
          'awards': '',
          'certifications': '',
          'volunteerWork': '',
          'personalHobbies': ''
        },
        'professional': {
          'publications': []
        },
        'education': {
          'courses': '',
          'schools': []
        },
        'summary': {
          'includeUserSummary': false,
          'userSummary': '',
          'objectives': []
        },
        'experience': {
          'jobs': []
        },
        'references': [
          ''
        ],
        'canonSkills': [],
        'jobPreferences': {
          'workOverTime': false
        },
        additionalSections: [],
        sections: [
          {'type': 'CONTACT'},
          {'type': 'SUMMARY'},
          {'type': 'EXPERIENCE', 'subSections': []},
          {'type': 'EDUCATION', 'subSections': []}
        ]
      }
    });

})(angular);

/**
 * Created by yrganta on 5/13/15.
 */
(function (angular) {
  'use strict';

  angular.module('apolloAngularResumeServices.resumeUtils', [])
  /**
   * @ngdoc service
   * @name apolloAngularResumeServices.resumeUtils.$resumeUtils
   *
   * @description
   *
   * Some utility function to perform various grunt task.
   *
   */

    .factory('$resumeUtils', [
      '$q'
      , '$log'
      , function () {
        // Util func.
        this.isNotNullLIRI = function (data) {
          if (typeof(data) !== 'undefined' && data !== null) {
            return true;
          }
          return false;
        };

        this.escapeHTMLLIRI = function (string) {
          // TODO: Get rid of jQuery reference and use angular
          return angular.element('<pre>').text(string).html();
        };

        /**
         * Convert linebreaks to HTML.
         * @param {type} s string
         * @returns string with new HTML breaks.
         */
        this.LbsToHtml = function (s) {
          // TODO: I think we could just do isNotNullLIRI ? s.replace : s;
          // double check.
          if (this.isNotNullLIRI(s)) {
            return s.replace(/(\r\n|\n|\r)/gm, '<br/>') || s;
          } else {
            return s;
          }
        };

        this.dedupeArray = function (arr) {
          if (this.isNotNullLIRI(arr)) {
            var i, len = arr.length,
              out = [],
              obj = {};
            for (i = 0; i < len; i++) {
              obj[arr[i]] = 0;
            }
            for (i in obj) {
              out.push(i);
            }
            return out;
          } else {
            return arr;
          }
        };

        return this;
      }]);

})(angular);


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt
(function (angular) {
  'use strict';

// Config
angular.module('apolloAngularResumeServices.config', [])
  .value('apolloAngularResumeServices.config', {
    debug: true
    , apiVersion: 1
    , tenant: 'uopx'
    , linkedInKey: '754rrlz6zr3x48'
  });

// Modules

angular.module('apolloAngularResumeServices.utils', [
  'apolloAngularResumeServices.config'
])
  .factory('apolloAngularResumeServices.utils', [
    'apolloAngularResumeServices.config'
    , function (rbconfig) {
      return {
        map: function (userconfig, defaults, url) {
          var request = {
              url: '',
              config: {}
            }
            , re = /:([a-zA-Z0-9_-]+)/g;

          url = url.replace(/:version/gi, rbconfig.apiVersion).replace(/:tenant/gi, rbconfig.tenant);

          url = url.replace(re, function replaceParam(str, p1) {
            var val = userconfig[p1];
            delete userconfig[p1];
            return val;
          });

          // save the new replaced url to pass back.
          request.url = url;

          // Merge the remaining config properties to be passed as params.
          defaults.params = angular.extend({}, defaults.params, userconfig);

          // pass that extended defaults as new config
          request.config = defaults;
          return request;

        }
        , urlBuilder: function(url, obj) {

          if (obj) {
            for(var key in obj) {
              url = url.replace((':' + key), obj[key]);
            }
          }

          // Replace the tenant and version based on configuration
          url = url.replace(':version', rbconfig.apiVersion).replace(':tenant', rbconfig.tenant);

          return url;
        }
      };
    }
  ]);

angular.module('apolloAngularResumeServices',
  [
    'apolloAngularResumeServices.resume'

  ]);

})(angular);
