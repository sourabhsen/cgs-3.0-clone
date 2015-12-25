(function() {
  'use strict';

  angular.module('skillBuilder', [
      'skillBuilder.vm',
      'truncate',
      'careerSkills',
      'skillAssessment',
      'popoverToggle',
      'ui.router.state',
      'apollo-coach-marks',
      'LocalStorageModule'
    ])
    .controller('SkillBuilderController', [
      'SkillBuilderViewModel',
      '$stateParams',
      'localStorageService',
      '$rootScope',
      '$timeout',
      function(vm, $stateParams, localStorageService, $rootScope, $timeout) {
        var ctrl = this,
          firstSkill,
          firstSkillOriginalValue;

        ctrl.vm = vm;

        ctrl.coachMarks = {
          restart: function(name) {
            this[name].start = this.shouldStart(name);
          },
          setNonce: function(name) {
            localStorageService.set('coachmark.skillBuilder.' + name, true);
          },
          shouldStart: function(name) {
            return localStorageService.get('coachmark.skillBuilder.' + name) ? false : true;
          },
          exit: function() {
            $rootScope.$broadcast('exit-coach-marks');
          },
          walkthrough: {
            showCurtain: false,
            start: false,
            steps: [{
                type: 'element',
                selector: '.cm-plan:first',
                heading: 'Introduction to the Skill Builder',
                text: '<p tabindex="0">We search thousands of job postings to show you the skills needed for your Career Goal(s).</p><p tabindex="0">Rate your current skill levels using the Basic, Intermediate, and Advanced buttons.</p><p tabindex="0">Based on your answer, we\'ll provide suggestions. (Only you can see this rating.)</p>',
                placement: 'skbCM',
                arrowPosition: 'bottom'
              }, {
                type: 'element',
                selector: '.cm-plan:first',
                heading: 'Explore resources and assessments based on your skill level',
                text: '<p class="text-center" tabindex="0"><img src="assets/images/sb-walkthrough-actions.png" alt="You will want to press the buttons that let you build your skills or assess your skills"/></p>',
                placement: 'skbCM',
                arrowPosition: 'none'
              }, {
                type: 'element',
                selector: '.cm-plan:first',
                heading: 'Make a plan',
                text: '<p tabindex="0">We recommend you create a schedule to keep you on track while you develop your skills over time–then continue with the other stages in your Career Guidance System.</p><p class="text-center"><img src="assets/images/sb-walkthrough-plan.png"/></p>',
                placement: 'skbCM',
                arrowPosition: 'none'
              },

            ]
          }
        };

        ctrl.onCoachmarkComplete = function(name) {
          ctrl.coachMarks.setNonce(name);
          firstSkill.userDeclaredLevel = firstSkillOriginalValue;
        };

        ctrl.startCoachmarks = function(forceStart) {
          if ((ctrl.coachMarks.shouldStart('walkthrough') || forceStart) && vm.skills && vm.skills.length) {
            firstSkill = vm.skills[0];
            firstSkillOriginalValue = firstSkill.userDeclaredLevel;
            // wrap these in timeouts so the digest clears
            $timeout(function() {
              firstSkill.userDeclaredLevel = undefined;
            });
            $timeout(function() {
              ctrl.coachMarks.walkthrough.start = true;
            });
          }
        };

        vm.init($stateParams ? $stateParams.id : undefined).then(
          function() {
            ctrl.startCoachmarks();
          });
        ctrl.Math = Math;
      }
    ]);
})();
