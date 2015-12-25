(function() {
  'use strict';

  // Poached from https://gist.github.com/turtlemonvh/10686980/038e8b023f32b98325363513bf2a7245470eaf80

  angular.module('messageBus', [])
    .factory('MessageBus', ['$rootScope', function($rootScope) {
      var msgBus = {};
      msgBus.emitMsg = function(msg, data) {
        data = data || {};
        $rootScope.$emit(msg, data);
      };
      msgBus.onMsg = function(msg, func, scope) {
        var unbind = $rootScope.$on(msg, func);
        if (scope) {
          scope.$on('$destroy', unbind);
        }
      };
      return msgBus;
    }]);

})();
