'use strict';

describe('Autocomplete Factory: Functions', function() {
  var autocompleteFactory, mockBackend;

  // beforeEach(module(function($provide) {
  //   $provide.value('CONFIG', 'test');
  // }));


  // Load module
  beforeEach(function() {
    module('configMock');
    module('careersAutocomplete');
  });


  beforeEach(inject(function(_autocompleteFactory_, _$httpBackend_) {
    mockBackend = _$httpBackend_;
    autocompleteFactory = _autocompleteFactory_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    autocompleteFactory = mockBackend = undefined;
  });

  describe('Keyword is in data response', function() {
    var mockResponse = [{
      'value': 'java architect',
      'type': 'title'
    }, {
      'value': 'java consultant',
      'type': 'title'
    }, {
      'value': 'java developer',
      'type': 'title'
    }, {
      'value': 'java engineer',
      'type': 'title'
    }, {
      'value': 'java farm supply incorporated',
      'type': 'company'
    }, {
      'value': 'java programmer',
      'type': 'title'
    }, {
      'value': 'javaji system solutions incorporated',
      'type': 'company'
    }, {
      'value': 'javan engineering, inc',
      'type': 'company'
    }, {
      'value': 'javascript developer',
      'type': 'title'
    }, {
      'value': 'senior java developer',
      'type': 'title'
    }];

    beforeEach(function() {
      mockBackend.whenGET('/api/job-service/1/jobs/suggest/keywords?noOfResults=20&q=java')
        .respond(mockResponse);
    });

    it('should return results for Java', function() {
      var serviceData,
        test;

      test = autocompleteFactory.getJobKeywords('java');

      test.then(function(result) {
        serviceData = result;
      });

      mockBackend.flush();

      expect(serviceData).toBeDefined();

      //console.log(JSON.stringify(test));
    });
  });

  describe('Location is in data response', function() {
    var mockResponse = {
      'resultList': [{
        'postalCode': '98101',
        'city': 'Seattle',
        'state': 'WA',
        'latitude': '47.61',
        'longitude': '-122.33'
      }]
    };

    beforeEach(function() {
      mockBackend.whenGET('/api/validation-service/1/cgsdemo/address/cities/suggest/Seattle?noOfResults=25')
        .respond(mockResponse);
    });

    it('should return Seattle, WA', function() {
      var serviceData,
        test;

      test = autocompleteFactory.getLocation('Seattle');

      test.then(function(result) {
        serviceData = result;
      });

      mockBackend.flush();

      expect(serviceData).toBeDefined();

      //console.log(JSON.stringify(test));
    });

  });

});
