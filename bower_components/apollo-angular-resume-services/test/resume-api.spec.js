/**
 * Created by yrganta on 5/13/15.
 */

describe('`$resumeservice`:', function () {
  var $injector, $httpBackend, $resumeservice;

  beforeEach(function () {
    module('apolloAngularResumeServices.resume');

    inject(function (_$injector_) {
      $injector = _$injector_;

      $httpBackend = $injector.get('$httpBackend');

      $resumeservice = $injector.get('$resumeservice');
    });

  });
  afterEach(function () {
    $injector = $httpBackend = $resumeservice = undefined;
  });

  it('Verify the $resumeservice as all the appropriate methods on it.', function () {
    /*expect(angular.isFunction($resumeservice.importLinkedIn)).toEqual(true); */
    expect(angular.isFunction($resumeservice.upload)).toEqual(true);
    expect(angular.isFunction($resumeservice.create)).toEqual(true);
    expect(angular.isFunction($resumeservice.list)).toEqual(true);
    expect(angular.isFunction($resumeservice.setPreference)).toEqual(true);
    expect(angular.isFunction($resumeservice.getPreferences)).toEqual(true);
    expect(angular.isFunction($resumeservice.get)).toEqual(true);
    expect(angular.isFunction($resumeservice.update)).toEqual(true);
    expect(angular.isFunction($resumeservice.previewUrl)).toEqual(true);
    expect(angular.isFunction($resumeservice.preview)).toEqual(true);
    expect(angular.isFunction($resumeservice.getTemplates)).toEqual(true);
    expect(angular.isFunction($resumeservice.parse)).toEqual(true);
    expect(angular.isFunction($resumeservice.delete)).toEqual(true);
    expect(angular.isFunction($resumeservice.getMetaInfo)).toEqual(true);
    expect(angular.isFunction($resumeservice.setMetaInfo)).toEqual(true);
    expect(angular.isFunction($resumeservice.getDegrees)).toEqual(true);
  });


  describe('', function () {

  })

});
