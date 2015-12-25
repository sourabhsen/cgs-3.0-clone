'use strict';

describe('Dynamic Routing Service', function() {
  var DynamicRouting, mockBackend, CONFIG, $injector;

  // Load module
  beforeEach(function() {
    module('configMock');
    module('careersRouting');
  });

  beforeEach(inject(function(_DynamicRouting_, _$httpBackend_,  _CONFIG_, _$injector_) {
    mockBackend = _$httpBackend_;
    DynamicRouting = _DynamicRouting_;
    $injector = _$injector_;
    CONFIG = _CONFIG_;
    // console.log('CONFIG', CONFIG);
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    DynamicRouting = mockBackend = $injector = undefined;
  });

  describe('Validate states', function() {
    it('should skip non auth.tools / auth.milestones states', function() {
      var toState = {
        name: 'heyo'
      };
      var result = DynamicRouting.isStateAllowed(toState);
      expect(result).toBeTruthy();
    });

    it('should be able to get to all tools routes', function() {
      angular.forEach(CONFIG.tools, function(key) {
        var toolId = key.identifier.split('.')[1],
          toState = {
            name: 'auth.tools.view',
          },
          toParams = {
            toolId: toolId
          };
        expect(DynamicRouting.isStateAllowed(toState, toParams)).toBe(true);
      });
    });

    it('should be able to get to all milestone routes', function() {
      angular.forEach(CONFIG.milestones, function(key) {
        var milestoneId = key.orderSequence,
          toState = {
            name: 'auth.milestones',
          },
          toParams = {
            milestoneId: milestoneId
          };
        expect(DynamicRouting.isStateAllowed(toState, toParams)).toBe(true);
      });
    });

    it('should fail tools state that has bad toolId', function() {
      var toState = {
          name: 'auth.tools.checkMe'
        },
        toParams = {
          toolId: 'foo'
        };
      var result = DynamicRouting.isStateAllowed(toState, toParams);
      expect(result).toBeFalsy();
    });

    it('should fail milestone state that has bad toolId', function() {
      var toState = {
          name: 'auth.milestones.checkMe'
        },
        toParams = {
          milestoneId: 'foo'
        };
      var result = DynamicRouting.isStateAllowed(toState, toParams);
      expect(result).toBeFalsy();
    });

  });

  describe('Handle errors', function() {
    // beforeEach(function() {
    //   var CONFIG = $injector.get('CONFIG');
    //   CONFIG = null;
    // });

    it('should throw error when invalid toState', function() {
      expect(DynamicRouting.isStateAllowed).toThrowError('toState invalid and cannot be checked');
    });

    // it('should throw error when no CONFIG', function() {
    //   function testFunc() {
    //     var toState = {
    //       name: 'heyo'
    //     };
    //     DynamicRouting.isStateAllowed(toState);
    //   }
    //   expect(testFunc).toThrowError('toState invalid and cannot be checked');
    // });

  });

});
