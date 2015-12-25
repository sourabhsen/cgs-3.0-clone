'use strict';

describe('Filter: leadingZero', function() {
  beforeEach(function() {
    module('filter.leadingZero');
  });

  it('has a leadingZero filter', inject(function($filter) {
    expect($filter('leadingZero')).not.toBeNull();
  }));

  it('it should add leading zeros as needed', inject(function(leadingZeroFilter) {
    expect(leadingZeroFilter('45', 4)).toEqual('0045');
    expect(leadingZeroFilter('1', 1)).toEqual('1');
    expect(leadingZeroFilter('010', 10)).toEqual('0000000010');
    expect(leadingZeroFilter('45', 1)).toEqual('45');
    expect(leadingZeroFilter('310.123', 5)).toEqual('00310');
  }));

  it('should handle non-numbers', inject(function(leadingZeroFilter) {
    expect(leadingZeroFilter('foo', 1)).toEqual('foo');
    expect(leadingZeroFilter('23', 'bar')).toEqual('23');
  }));
});
