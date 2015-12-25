(function() {
  'use strict';

  angular.module('skillBuilder.vm', [
      'labormarketServices.career.search',
      'apolloSkillServices.skills',
      'apolloPlaylistCache',
      'config.constants',
      'careersUser',
      'skillAssessment',
      'LocalStorageModule',
      'ui.bootstrap.modal'
    ])
    .value('skillBuilder.vm.config', {
      skillsExpandedKey: 'skillBuilder.skills.expanded'
    })
    .factory('SkillBuilderViewModel', [
      '$parse',
      '$q',
      '$http',
      'User',
      'CareerSearch',
      'Skills',
      'PlaylistCache',
      'SkillAssessmentViewModel',
      '$timeout',
      'localStorageService',
      'CONSTANTS',
      'skillBuilder.vm.config',
      '$window',
      '$rootScope',
      '$uibModal',
      function($parse, $q, $http, User, CareerSearch, Skills, PlaylistCache, SkillAssessmentViewModel, $timeout, localStorageService, CONSTANTS, config, $window, $rootScope, $uibModal) {
        var defaults = {
            goals: undefined,
            skills: undefined,
            maxSkills: 15,
            skillsPlaylist: undefined,
            params: {
              goalId: undefined
            },
            waits: {
              goals: undefined,
              skills: undefined
            }
          },
          vm = angular.extend({}, defaults),
          parsers = {
            skillLevel: $parse('userDeclaredLevel'),
            skillId: $parse('skill.skillId')
          };

        vm.getUserGoals = function() {
          if (!User.profileId) {
            vm.goals = undefined;
            vm.waits.goals = $q.reject('User.profileId must be set');
            return vm.waits.goals;
          }
          vm.waits.goals = CareerSearch.getUser({
            profileId: User.profileId
          }).then(
            function(http) {
              vm.goals = http.data;
              return vm.goals;
            },
            function(err) {
              if (err.status === 404) {
                vm.goals = [];
                return vm.goals;
              } else {
                vm.goals = undefined;
                return $q.reject(err);
              }
            }
          );
          return vm.waits.goals;
        };

        vm.getSkills = function() {
          if (!vm.params.goalId || !User.profileId) {
            vm.skills = undefined;
            vm.waits.skills = $q.reject('goalId parameter and User.profileId must be set');

            return vm.waits.skills;
          }

          vm.waits.skills = Skills.getByOccupations('RONET', {
            jobcode: vm.params.goalId,
            profileid: User.profileId,
            sort: 'Importance',
            tenantid: CONSTANTS.tenant,
            maximumskills: vm.maxSkills
          }).then(function(http) {
            if (http.data && http.data[vm.params.goalId]) {
              var skills = http.data[vm.params.goalId],
                skillsExpanded = vm.getSkillsExpanded();

              skills.forEach(function(skill) {
                if (skill.userJobCodesThisSkillAppearsIn) {
                  // convert object to array
                  var relatedJobs = Object.keys(skill.userJobCodesThisSkillAppearsIn).map(function(key) {
                    return {
                      id: key,
                      name: skill.userJobCodesThisSkillAppearsIn[key]
                    };
                  });
                  skill.userJobCodesThisSkillAppearsIn = relatedJobs;
                }
                skill.expanded = skillsExpanded[parsers.skillId(skill)];
              });
              vm.skills = skills;
            } else {
              vm.skills = [];
            }
            return vm.skills;
          }, function(err) {
            vm.skills = undefined;
            return $q.reject(err);
          });
          return vm.waits.skills;
        };

        vm.onAssessmentComplete = function() {
          $timeout(vm.getSkills);
        };

        vm.getSkillsExpanded = function() {
          return localStorageService.get(config.skillsExpandedKey) || {};
        };

        vm.putSkillsExpanded = function(skillsExpanded) {
          return localStorageService.set(config.skillsExpandedKey, skillsExpanded);
        };

        vm.saveSkillLevel = function(skill) {
          // check for skill object (skill.skill.skillId and skill.userDeclaredLevel)

          if (!User.profileId) {
            vm.skills = undefined;
            return $q.reject('User.profileId must be set');
          } else if (!parsers.skillId(skill) || !parsers.skillLevel(skill)) {
            return $q.reject('skill argument must be defined and have both skill.skillId and .userDeclaredLevel properties');
          }

          return vm.getSkillPlaylist()
            .then(function() {
              // update existing playlist item
              if (vm.skillsPlaylist && angular.isArray(vm.skillsPlaylist.listItems)) {
                var skillIdStr = skill.skill.skillId.toString(),
                  match = vm.skillsPlaylist.listItems.find(function(listItem) {
                    return listItem.itemIdentifier === skillIdStr;
                  });
                if (match) {
                  if (match.priority !== skill.userDeclaredLevel) {
                    match.priority = skill.userDeclaredLevel;
                    match.userIdentifier = User.profileId;
                    return match.$update();
                  } else {
                    // no update required
                    return match;
                  }
                }
              }

              // save to playlist
              return PlaylistCache.addListItem('SKILL', {
                itemIdentifier: skill.skill.skillId,
                itemSequence: '1',
                itemStatus: 'SAVED',
                priority: skill.userDeclaredLevel
              }).then(function() {
                // update playlist if it's not available
                if (!vm.skillsPlaylist) {
                  return vm.getSkillPlaylist();
                }
              });
            });
        };

        vm.getSkillPlaylist = function() {
          if (vm.skillsPlaylist) {
            return $q.when(vm.skillsPlaylist);
          } else {
            return PlaylistCache.getByType('SKILL')
              .then(function(skillsPlaylist) {
                vm.skillsPlaylist = skillsPlaylist;
              }).catch(function() {
                vm.skillsPlaylist = undefined;
              });
          }
        };

        vm.expandContractSkill = function(skillId, expanded) {

          if (!skillId) {
            return;
          }
          // call within timeout so it doesn't delay the browser
          $timeout(function() {
            var skillsExpanded = vm.getSkillsExpanded();
            if (expanded) {
              skillsExpanded[skillId] = true;
            } else {
              delete skillsExpanded[skillId];
            }
            vm.putSkillsExpanded(skillsExpanded);
          });
        };

        vm.confirmInvalidSkillDescription = function(skill) {
          var scope = $rootScope.$new();
          scope.skill = skill;
          scope.vm = vm;
          return $uibModal.open({
            templateUrl: 'app/tools/skillBuilder/invalidDescriptionModal.html',
            size: 'sm',
            scope: scope
          });
        };

        vm.reportInvalidSkillDescription = function(skillId, onSuccessCallback) {
          if (!skillId) {
            return $q.reject('skillId parameter must be provided');
          }
          var cfg = {
            params: {
              skillid: skillId
            }
          };
          return $http.post('/api/skill-service/1/sendEmail', undefined, cfg).then(function() {
            if (angular.isFunction(onSuccessCallback)) {
              onSuccessCallback();
            }
          });
        };

        vm.init = function(goalId) {
          angular.extend(vm, defaults);
          return vm.getUserGoals().then(function(goals) {
            if (goals && goals.length) {
              if (goalId) {
                var match = goals.find(function(goal) {
                  return goal.id === goalId;
                });
                if (match) {
                  vm.params.goalId = goalId;
                }
              }
              vm.params.goalId = vm.params.goalId || goals[0].id;
              return vm.getSkills();
            }
          });
        };

        return vm;

      }
    ]);
})();
