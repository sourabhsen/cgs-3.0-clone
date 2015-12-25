'use strict';

ngDescribe({
  name: 'Factory: GUID',
  modules: 'guid',
  inject: ['GUID'],
  tests: function(deps) {
    it('should create a unique GUID', function() {
      var guid1 = deps.GUID.create(),
        guid2 = deps.GUID.create(),
        guidRE = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

      expect(guidRE.test(guid1)).toBeTruthy();
      expect(guidRE.test(guid2)).toBeTruthy();
      expect(guid1).not.toBe(guid2);

      console.log('GUID', guid1, guid2);
    });
  }
});
