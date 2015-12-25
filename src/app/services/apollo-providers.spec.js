'use strict';

describe('Provider Service: Functions', function() {
  var ProviderList, ProviderById, mockBackend, User, $rootScope;

  // Load module
  beforeEach(function() {
    module('configMock');
    module('apolloProvider');
  });

  beforeEach(inject(function(_$httpBackend_, _User_, _$rootScope_, _ProviderList_, _ProviderById_) {
    mockBackend = _$httpBackend_;
    User = _User_;
    $rootScope = _$rootScope_;
    ProviderList = _ProviderList_;
    ProviderById = _ProviderById_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    ProviderList = mockBackend = User = $rootScope = undefined;
  });

  describe('Get Provider', function() {

    var mockListsResponse = '{"items" : [ {"@type" : "providerDetails","description" : "Description","name" : "ProviderName","providerId" : "5","tenantName" : "testTenant"} ]}';

    it('should return 404 when no items available', function() {
      var results;
      mockBackend.whenGET('/api/provider-service/1/cgsdemo/provider').respond({status: 404});
      ProviderList.get().$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(404);
    });

    it('should return data', function() {
      var results;
      mockBackend.whenGET('/api/provider-service/1/cgsdemo/provider').respond(mockListsResponse);
      ProviderList.get().$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.items).toContain({'@type' : 'providerDetails','description' : 'Description','name' : 'ProviderName','providerId' : '5','tenantName' : 'testTenant'});
    });
  });

  describe('Post Provider', function() {

    var mockPostResponse = '{"attributeName" : "AttributeName","description" : "Description for this provider","name" : "TEST_PROVIDER","providerAttributes" : [ {"attributeName" : "attribute_name_1","description" : "random description","parameterValue" : "theValueOfThisAttribute","providerName" : "TEST_PROVIDER","tenantName" : "testTenant"}, {"attributeName" : "attribute_name_2","parameterValue" : "value","providerName" : "TEST_PROVIDER","tenantName" : "testTenant"}, {"attributeName" : "attribute_name_5","parameterValue" : "AnotherValue"} ],"providerId" : "1234","tenantName" : "testTenant"}',
        mockPostData = {'attributeName' : 'AttributeName','description' : 'Description for this provider','name' : 'TEST_PROVIDER','providerAttributes' : [ {'attributeName' : 'attribute_name_1','description' : 'random description','parameterValue' : 'theValueOfThisAttribute','providerName' : 'TEST_PROVIDER','tenantName' : 'testTenant'}, {'attributeName' : 'attribute_name_2','parameterValue' : 'value','providerName' : 'TEST_PROVIDER','tenantName' : 'testTenant'}, {'attributeName' : 'attribute_name_5','parameterValue' : 'AnotherValue'} ],'providerId' : '1234','tenantName' : 'testTenant'};

    it('should return 404 when no items available', function() {
      var results;
      mockBackend.whenPOST('/api/provider-service/1/cgsdemo/provider').respond({status: 404});
      ProviderList.save(mockPostData).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(404);
    });

    it('should return data', function() {
      var results;
      mockBackend.whenPOST('/api/provider-service/1/cgsdemo/provider').respond(mockPostResponse);
      ProviderList.save(mockPostData).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.attributeName).toBe('AttributeName');
    });
  });

  describe('Put Provider By Id', function() {

    var mockPutResponse = {'attributeName' : 'AttributeName','description' : 'Description for this provider','name' : 'TEST_PROVIDER_UPDATED','providerId' : '1234'},
        mockPutData = {'attributeName' : 'AttributeName','description' : 'Description for this provider','name' : 'TEST_PROVIDER_UPDATED','providerId' : '1234'};

    it('should return 404 when no items available', function() {
      var results;
      mockBackend.whenPUT('/api/provider-service/1/cgsdemo/provider/1234').respond({status: 404});
      ProviderById.put(mockPutData).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(404);
    });

    it('should return data', function() {
      var results;
      mockBackend.whenPUT('/api/provider-service/1/cgsdemo/provider/1234').respond(mockPutResponse);
      ProviderById.put(mockPutData).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.attributeName).toBe('AttributeName');
    });
  });

  describe('Get Provider By Id', function() {

    var mockListsResponse = '{"attributeName" : "AttributeName","description" : "Description for this provider","name" : "TEST_PROVIDER","providerAttributes" : [ {"attributeName" : "attribute_name_1","description" : "random description","parameterValue" : "theValueOfThisAttribute","providerName" : "TEST_PROVIDER","tenantName" : "testTenant"}, {"attributeName" : "attribute_name_2","parameterValue" : "value","providerName" : "TEST_PROVIDER","tenantName" : "testTenant"}, {"attributeName" : "attribute_name_5","parameterValue" : "AnotherValue"} ],"providerId" : "1234","tenantName" : "testTenant"}';

    it('should return 404 when no items available', function() {
      var results;
      mockBackend.whenGET('/api/provider-service/1/cgsdemo/provider/1234').respond({status: 404});
      ProviderById.get({'providerId': '1234'}).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(404);
    });

    it('should return data', function() {
      var results;
      mockBackend.whenGET('/api/provider-service/1/cgsdemo/provider/1234').respond(mockListsResponse);
      ProviderById.get({'providerId': '1234'}).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.attributeName).toBe('AttributeName');
    });
  });

  describe('Delete Provider By Id', function() {

    it('should return 404 when no items available', function() {
      var results;
      mockBackend.whenDELETE('/api/provider-service/1/cgsdemo/provider/1234').respond({status: 404});
      ProviderById.delete({'providerId': '1234'}).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(404);
    });

    it('should return data', function() {
      var results;
      mockBackend.whenDELETE('/api/provider-service/1/cgsdemo/provider/1234').respond({status: 200});
      ProviderById.delete({'providerId': '1234'}).$promise.then(function(response) {
          results = response;
        }, function(err){
          results = err.data;
        });
      mockBackend.flush();
      expect(results.status).toBe(200);
    });
  });

});
