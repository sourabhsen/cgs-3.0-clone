'use strict';

describe('Directive: myGoalCount', function() {
  var $rootScope, $compile, MyGoalInfo;

  beforeEach(function() {

    module('configMock');
    module('myGoalCount');
    module('app/components/goalCountButton/myGoalCountButton.html');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _MyGoalInfo_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    MyGoalInfo = _MyGoalInfo_;
  }));

  afterEach(function() {
    $rootScope = $compile = undefined;
  });

  it('should initalize properly with goal defined', function() {
    spyOn(MyGoalInfo, 'update');
    MyGoalInfo.goalCount = 3;
    MyGoalInfo.reachedSavedLimit = true;
    $rootScope.offset = 100;
    var element = $compile('<my-goal-count-button></my-goal-count-button>')($rootScope);
    $rootScope.$digest();
    expect(element.html().indexOf('3')).toBeGreaterThan(0);
    expect(MyGoalInfo.update).toHaveBeenCalled();
    // console.log('HTML', element.html());
  });

});
