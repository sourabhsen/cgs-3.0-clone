'use strict';

describe('Service: Http Utilities', function() {
  var httpUtils, $http;

  // Load module
  beforeEach(function () {
    module('httpUtils');
  });

  beforeEach(inject(function (_httpUtils_, _$http_) {
    httpUtils = _httpUtils_;
    $http = _$http_;
  }));

  afterEach(function () {
    httpUtils = $http = undefined;
  });

  describe('appendTransformtoDefaults()', function () {

    it('should append when defaults.transformResponse is array', function () {
      var tarnsformResponses = httpUtils.appendTransformtoDefaults(angular.noop);
      expect(tarnsformResponses.length).toBe(2);
    });

  });

});
