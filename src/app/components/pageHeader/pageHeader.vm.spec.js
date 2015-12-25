'use strict';

describe('Factory: PageHeaderViewModel', function() {
  var DynamicRouting, mockBackend, vm, CONFIG;

  // Load module
  beforeEach(function() {
    module('configMock');
    module('careersRouting');
    module('pageHeader.vm');
  });

  beforeEach(inject(function(_DynamicRouting_, _$httpBackend_,  _PageHeaderViewModel_, _CONFIG_) {
    mockBackend = _$httpBackend_;
    DynamicRouting = _DynamicRouting_;
    vm = _PageHeaderViewModel_;
    CONFIG = _CONFIG_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    DynamicRouting = mockBackend = CONFIG = vm = undefined;
  });

  describe('Get Page Header Object', function() {
    it('should be able to get page header object for all CONFIG milestones', function() {
      angular.forEach(CONFIG.milestones, function(key) {
        var stateObject = {};
          stateObject.milestoneId = key.identifier.split('.')[1];
        var milestonesHeader = vm.getTitleObject(stateObject);
        expect(milestonesHeader.title).toBeDefined();
        expect(milestonesHeader.type).toBeDefined();
      });
    });
    it('should be able to get page header object for all CONFIG tools', function() {
      angular.forEach(CONFIG.tools, function(key) {
        var stateObject = {};
          stateObject.toolId = key.identifier.split('.')[1];
        var toolsHeader = vm.getTitleObject(stateObject);
        expect(toolsHeader.title).toBeDefined();
        expect(toolsHeader.type).toBeDefined();
      });
    });
  });

});
