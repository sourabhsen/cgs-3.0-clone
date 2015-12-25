'use strict';

ngDescribe({
  name: 'Factory: MessageBus',
  modules: 'messageBus',
  inject: ['$rootScope', 'MessageBus'],
  tests: function(deps) {
    it('should emit and catch a msg', function() {
      var msg = 'foo',
        data = {
          foo: 'bar'
        },
        cb = {
          func: angular.noop,
        },
        scope = deps.$rootScope.$new();

      spyOn(cb, 'func');

      deps.MessageBus.onMsg(msg, cb.func, scope);
      deps.MessageBus.emitMsg(msg, data);

      scope.$digest();

      expect(cb.func).toHaveBeenCalled();

      cb.func.calls.reset();
      scope.$destroy();

      deps.MessageBus.emitMsg(msg, data);

      expect(cb.func).not.toHaveBeenCalled();

      // for code coverage
      deps.MessageBus.onMsg(msg, angular.noop);
      deps.MessageBus.emitMsg(msg);
    });
  }
});
