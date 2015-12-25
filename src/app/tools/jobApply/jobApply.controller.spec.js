// /* FMDominy 11-21-2015 */
'use strict';
xdescribe('Controller: JobApplyCtrl', function() {
  var $controller, scope, controller, $rootScope, JobApplyViewModel, User;


  beforeEach(module('JobApply'));
  beforeEach(module('JobApply.vm'));

  // beforeEach(inject(function(_$controller_, _$rootScope_) {
  //   $controller = _$controller_;
  //   $rootScope = _$rootScope_;
  //   scope = $rootScope.$new();
  //   controller = $controller('JobApplyCtrl', {
  //     scope: scope
  //   });
  // }));


  beforeEach(function() {
    inject(function(_$controller_, _$rootScope_, _JobApplyViewModel_, _User_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      JobApplyViewModel = _JobApplyViewModel_;
      User = _User_;

      scope = $rootScope.$new();
      controller = $controller('JobApplyCtrl', {
        scope: scope
      });
    });
  });

  describe('The VM ', function() {
    it('should be loaded', function() {
      scope.$digest();
      expect(JobApplyViewModel.initModal).toBeDefined();
    });
    xit('should be an object', function() {
      // expect(typeof controller.model).toBe('object');
    });
  });

});
