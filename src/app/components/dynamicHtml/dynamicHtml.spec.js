'use strict';

ngDescribe({
  name: 'Directive: dynamicHtml',
  modules: 'dynamicHtml',
  inject: ['$rootScope', '$compile'],
  tests: function(deps) {
    it('should properly compile dynamic-html', function() {
      deps.$rootScope.content = '<div ng-class="{foo: true}"></div>';
      var element = deps.$compile('<main dynamic-html="content"></main>')(deps.$rootScope);
      deps.$rootScope.$digest();
      expect(element.find('div').hasClass('foo')).toBeTruthy();
    });
  }
});
