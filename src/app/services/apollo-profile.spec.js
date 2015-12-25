'use strict';

describe('Profile Service: Functions', function() {
  var Profile, mockBackend;

  // Load module
  beforeEach(function () {
    module('apolloProfile');
  });

  beforeEach(inject(function (_Profile_, _$httpBackend_) {
    mockBackend = _$httpBackend_;
    Profile = _Profile_;
  }));

  afterEach(function () {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    Profile = mockBackend = undefined;
  });

  describe('Profile', function () {

    it('should return profile', function () {
      mockBackend.expectGET('/api/profile-service/1/cgsdemo/profiles/70e5030f-3d60-449c-b44c-10c7c76e875e?includeStudentPrograms=true').respond(200, '');
      Profile.get({profileId: '70e5030f-3d60-449c-b44c-10c7c76e875e'});
      mockBackend.flush();
    });

  });

});
