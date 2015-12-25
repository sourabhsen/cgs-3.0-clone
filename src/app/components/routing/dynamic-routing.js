(function() {
  'use strict';

  /**
   * Dynamic routing helper factory
   */
  angular.module('careersRouting', [])
    .factory('DynamicRouting', ['CONFIG',
      function DynamicRouting(CONFIG) {
        var stateNameRE = /^auth\.(tools|milestones)/;

        return {
          isStateAllowed: function(toState, toParams) {
            if (!toState) {
              throw new Error('toState invalid and cannot be checked');
            }
            // if state name does not start with auth.tools or auth.milestones,
            // or state does not have data.configId, return true
            else if (!stateNameRE.test(toState.name)) {
              return true;
            } else if (!toParams) {
              return false;
            } else if (!CONFIG) {
              throw new Error('CONFIG configuration must be properly initialized');
            }

            var hasMatch, configId;
            if (toState.name.startsWith('auth.tools')) {
              // look for matching tool based on toolId param
              configId = 'tools.' + toParams.toolId;
              hasMatch = (CONFIG.tools || []).some(function(tool) {
                return configId === tool.identifier;
              });
            } else {
              // look for matching milestone based on milestoneId param
              configId = toParams.milestoneId;
              hasMatch = (CONFIG.milestones || []).some(function(milestone) {
                return configId == milestone.orderSequence; // jshint ignore:line
              });
            }

            return hasMatch;
          }
        };
      }
    ]);
})();
