(function() {
  'use strict';

  angular
    .module('pageHeader.vm', [])
    .factory('PageHeaderViewModel', [
      'CONFIG',
      function(CONFIG) {

        var factory = {};

        factory.getTitleObject = function(stateParams) {

          var type = '',
          current = '';

          //TODO: Make more generic, to support more than just tools and milestones.

          if (stateParams.toolId) {
            type = 'tools';
            current = 'tools.' + stateParams.toolId;
          } else if (stateParams.milestoneId) {
            type = 'milestones';
            current = 'milestones.' + stateParams.milestoneId;
          }

          // Passing in empty array to circumvent the js errors on standalone non tools and milestones
          var config = CONFIG[type] || [],
            pageObject = {};

          return config.find(function(item) {

            if (current === item.identifier) {
              pageObject = item;
              if (stateParams.toolId) {
                pageObject.type = 'Career Tools';
              }
              if (stateParams.milestoneId) {
                pageObject.type = 'Milestone ' + pageObject.orderSequence;
              }
              return pageObject;
            }

          });

        };

        return factory;

      }
    ]);
})();
