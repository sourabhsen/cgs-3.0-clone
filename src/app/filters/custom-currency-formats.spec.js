'use strict';

describe('abbreviateUSD: Filters', function () {
  beforeEach(function () {
    module('careers');
    module('careersRouting', function($provide) {
      $provide.value('CONFIG', {});
    });
  });

  describe('Abbreviate currency values', function () {
    it('has a abbreviateUSD filter', inject(function($filter) {
        expect($filter('abbreviateUSD')).not.toBeNull();
    }));

    it('it should be equal to $45K', inject(function (abbreviateUSDFilter) {
        expect(abbreviateUSDFilter('45000')).toEqual('$45K');
        expect(abbreviateUSDFilter('45000.23')).toEqual('$45K');
        expect(abbreviateUSDFilter('44900.36')).toEqual('$45K');
        expect(abbreviateUSDFilter('44900')).toEqual('$45K');
    }));

    it('it should be equal to $38', inject(function (abbreviateUSDFilter) {
        expect(abbreviateUSDFilter('38')).toEqual('$38');
        expect(abbreviateUSDFilter('38.36')).toEqual('$38');
        expect(abbreviateUSDFilter('37.96')).toEqual('$38');
    }));
  });
});
