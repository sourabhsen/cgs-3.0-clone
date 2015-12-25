'use strict';

describe('filter.textClamp', function() {
  beforeEach(function() {
    module('filter.textClamp');
  });

  it('has a textClamp filter', inject(function($filter) {
    expect($filter('textClamp')).not.toBeNull();
  }));

  it('it should return a string within the limit', inject(function(textClampFilter) {
    var inputText = 'Whether you\'re a short-order cook or a CEO, every job has a required skillset.  Find out what skills required to achieve your goal.';
    var outputText = 'Whether you\'re a short-order cook or a CEO, every job has a required skillset.  Find out what skills ...';

    expect(textClampFilter(inputText, 100)).toEqual(outputText);
  }));

  it('should return for non-string data', inject(function(textClampFilter) {
    expect(textClampFilter(1231232, 100)).toEqual('');
  }));
});
