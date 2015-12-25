/**
 * Created by yrganta on 7/10/15.
 */
'use strict';

describe('Filter: Partition', function () {
  var scope, $compile;

  beforeEach(function (){
    module('partitionFilter');
  });

  beforeEach(inject(function (_$rootScope_, _$compile_){
    scope = _$rootScope_;
    $compile = _$compile_;
    scope.data = ['one', 'two','three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  }));

  it('should return 6 items', function (){
    var elem = $compile('<div id="test"><p ng-repeat="d in data | partition : 2">{{d}}</p></div>')(scope);
    scope.$digest();
    expect(elem.find('p').length).toEqual(6);
  });

});
