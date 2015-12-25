(function() {
  'use strict';

  angular.module('careerExplorationDetails.vm', [
      'apolloPlaylistCache',
      'apolloJobServices.jobs',
      'config.constants',
      'careersUser',
      'LocalStorageModule'
    ])
    .factory('CareerExplorationDetailsViewModel', [
      '$parse',
      '$q',
      '$http',
      'User',
      'PlaylistCache',
      'Jobs',
      'CONSTANTS',
      'CONFIG',
      '$state',
      'localStorageService',
      '$location',
      function($parse, $q, $http, User, PlaylistCache, Jobs, CONSTANTS, CONFIG, $state, localStorageService, $location) {
        var config = CONFIG.config;
        var vm = {
            goal: undefined,
            displayDegrees: config.displayDegrees
          },
          parsers = {
            listItems: $parse('listItems || []'),
            experienceLevels: $parse('laborData.experienceLevels || []'),
            educationReqs: $parse('laborData.educationRequirements || []'),
            maxExperience: $parse('(laborData.experienceLevels | orderBy : "-experiencePercentile")[0]'),
            maxEducation: $parse('(laborData.educationRequirements | orderBy : "-requirementPercentile")[0]')
          };

        vm.getSearchJobCodeUri = function(ronet) {
          var uri = $state.href('auth.tools.view', {
            toolId: 'jobsearch',
            viewId: 'results',
          }, {
            inherit: false
          }) + '?location=' +  encodeURI(User.profile.city + ', ' + User.profile.state) + '&jobcodeid=' + ronet;

          return uri;
        };

        vm.setSearchCompanyFilter = function(jobCode, companyName) {
          var filter = {
                          'profileId': User.profile.profileId,
                          'location': User.profile.city + ', ' + User.profile.state,
                          'preferredPartner': false,
                          'pageNumber': 0,
                          'jobCode': jobCode,
                          'companyFilter': [companyName]
                        };

          localStorageService.set('jobSearch.query', filter);
          var path = vm.getSearchJobCodeUri(jobCode);
              path = path.replace('#/', '');
          $location.path('/' + path).search({
                                        'location': User.profile.city + ', ' + User.profile.state,
                                        'jobcodeid': jobCode
                                      });
        };

        vm.getSearchJobCodeUri = function() {

          var uri = $state.href('auth.tools.view', {
            toolId: 'jobsearch',
            viewId: 'results',
          }, {
            inherit: false
          });

          return uri;
        };

        vm.getGoalDetails = function(ronet) {
          var goal;
          if (!(ronet && User.profileId && User.profile && User.profile.cgsLocation)) {
            return $q.reject('ronet argument, User.profileId, User.profile.stateAreaId, User.profile.cityState must be set');
          }

          //TODO MOVE THIS TO LABORMARKET
          return $http.get('/api/labormarket-service/1/' + CONSTANTS.tenant + '/career/' + ronet + '/details', {
              params: {
                stateAreaId: User.profile.stateAreaId,
                fallback: 'national',
                laborMarketDetails: true
              }
            })
            .then(function(http) {
              console.log('getGoalDetails');
              goal = http.data;
              if (goal && goal.laborData) {
                // populate names for experience levels and get max value
                parsers.experienceLevels(goal).forEach(function(exp) {
                  exp.name = CONSTANTS.experienceLevelNames[exp.experienceLevel];
                });
                goal.maxExperience = parsers.maxExperience(goal);
                // populate names for education levels and get max value
                parsers.educationReqs(goal).forEach(function(edu) {
                  edu.name = CONSTANTS.educationLevelNames[edu.educationRequirementType];
                });
                goal.maxEducation = parsers.maxEducation(goal);

                return PlaylistCache.getByType('RONET')
                  .catch(function(err) {
                    if (err.status === 404) {
                      return {};
                    } else {
                      return $q.reject(err);
                    }
                  });
              }
            })
            .then(function(playlist) {
              var listItems = parsers.listItems(playlist);
              if (listItems.length && goal.laborData) {
                goal.laborData.saved = listItems.find(function(listItem) {
                  return goal.laborData.id === listItem.itemIdentifier;
                });
              }
              return Jobs.search({
                jobCode: ronet,
                location: User.profile.cgsLocation,
                pageSize: 5,
                'keywords.title': undefined,
                radius: undefined,
                tuitionReimbursement: undefined,
                preferredPartner: undefined
              });
            }).then(function(http) {
              goal.jobs = http.data;
              vm.goal = goal;
              return goal;
            });
        };

        return vm;

      }
    ]);
})();
