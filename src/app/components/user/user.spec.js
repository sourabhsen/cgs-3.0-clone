'use strict';

describe('Service: User', function() {
  var mockBackend, $rootScope, User, $injector;

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('careersUser');
  });


  beforeEach(inject(function($httpBackend, _$rootScope_, _User_, _$injector_) {
    mockBackend = $httpBackend;
    $rootScope = _$rootScope_;
    User = _User_;
    $injector = _$injector_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    mockBackend = $rootScope = User = $injector = undefined;
  });

  describe('get()', function() {

    var mockLocationResponse = '{"IPAddress":"10.58.55.2","Country":"US","PostalCode":"98101","State":"WA","City":"SEATTLE","County":"KING","FIPS":"53033","Latitude":"47.61","Longitude":"-122.33","ConnSpeed":"broadband","AOLProxy":false,"Hostname":"10.58.55.2","ProxyType":"","AreaCode":"206","DomainName":"","USMilitary":"N"}',
      mockStateAreasResponse = '{"items":[{"stateName":"Washington","stateCode":"WA","stateAreaName":"Washington, All Areas","stateAreaCode":"explorer/stateareas/955","areaSortOrder":0,"stateAreaType":"STATE"},{"stateName":"Washington","stateCode":"WA","stateAreaName":"Kennewick Metro Area, WA","stateAreaCode":"explorer/stateareas/1174","areaSortOrder":1,"stateAreaType":"METRO"},{"stateName":"Washington","stateCode":"WA","stateAreaName":"Olympia Metro Area, WA","stateAreaCode":"explorer/stateareas/962","areaSortOrder":1,"stateAreaType":"METRO"},{"stateName":"Washington","stateCode":"WA","stateAreaName":"Portland Metro Area, WA","stateAreaCode":"explorer/stateareas/963","areaSortOrder":1,"stateAreaType":"METRO"},{"stateName":"Washington","stateCode":"WA","stateAreaName":"Seattle Metro Area, WA","stateAreaCode":"explorer/stateareas/964","areaSortOrder":1,"stateAreaType":"METRO"},{"stateName":"Washington","stateCode":"WA","stateAreaName":"Spokane Metro Area, WA","stateAreaCode":"explorer/stateareas/965","areaSortOrder":1,"stateAreaType":"METRO"}]}';


    it('should get user and location', function() {
      var mockAuthResponse = '{"username":"svc_anonymous_account","identifier":"svc_anonymous_account","profileId":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","status":"","authenticated":false,"lastAuthenticated":"2015-07-20T18:38:17.445+0000","providerProps":{},"tenantProfileId":"","loginStatus":"ANONYMOUS","sessionId":"0177ADF2F9FD4DE68C2331DD42E06F57"}',
        mockProfileResponse = '{"profileId": "apt_1750bdf9-ba94-4092-9c95-84c80697f320","anonymousProfileInd": "Y"}',
        results = null;

      mockBackend.expectGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true').respond(mockAuthResponse);
      mockBackend.expectGET('/api/profile-service/1/cgsdemo/profiles/apt_1750bdf9-ba94-4092-9c95-84c80697f320?includeStudentPrograms=true').respond(mockProfileResponse);
      mockBackend.expectGET('/api/validation-service/1/cgsdemo/address/ipaddr').respond(mockLocationResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/state/WA').respond(mockStateAreasResponse);
      User.get(function(user) {
        results = user;
      });
      expect(results).toBeNull();
      mockBackend.flush();
      // dunno
      // expect(results).toBeDefined();
      // console.log(JSON.stringify(results, null, 2));
      // expect(User.profileId).toEqual(results.profileId);
      expect(User.profileId).toBe('apt_1750bdf9-ba94-4092-9c95-84c80697f320');
      expect(User.profile.profileId).toBe('apt_1750bdf9-ba94-4092-9c95-84c80697f320');
      expect(User.profile.anonymousProfileInd).toBe('Y');
      expect(User.profile.city).toBe('SEATTLE');
      expect(User.profile.state).toBe('WA');

      //TODO call it again
    });


    it('should get user and location from savedQuery', function() {
      var mockAuthResponse = '{"username":"svc_anonymous_account","identifier":"svc_anonymous_account","profileId":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","status":"","authenticated":false,"lastAuthenticated":"2015-07-20T18:38:17.445+0000","providerProps":{},"tenantProfileId":"","loginStatus":"ANONYMOUS","sessionId":"0177ADF2F9FD4DE68C2331DD42E06F57"}',
        mockProfileResponse = '{"profileId": "apt_1750bdf9-ba94-4092-9c95-84c80697f320","anonymousProfileInd": "Y"}',
        results = null;

      var localStorageService = $injector.get('localStorageService');
      var Validation = $injector.get('Validation');

      spyOn(localStorageService, 'get').and.returnValue({location: 'SEATTLE, WA'});
      spyOn(Validation, 'ipLocation').and.callThrough();


      mockBackend.expectGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true').respond(mockAuthResponse);
      mockBackend.expectGET('/api/profile-service/1/cgsdemo/profiles/apt_1750bdf9-ba94-4092-9c95-84c80697f320?includeStudentPrograms=true').respond(mockProfileResponse);
      //mockBackend.expectGET('/api/validation-service/1/cgsdemo/address/ipaddr').respond(mockLocationResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/state/WA').respond(mockStateAreasResponse);

      expect(localStorageService.get.calls.count()).toBe(0);
      expect(Validation.ipLocation.calls.count()).toBe(0);

      User.get(function(user) {
        results = user;
      });

      expect(results).toBeNull();

      mockBackend.flush();
      // dunno
      // expect(results).toBeDefined();
      // console.log(JSON.stringify(results, null, 2));
      // expect(User.profileId).toEqual(results.profileId);
      expect(User.profileId).toBe('apt_1750bdf9-ba94-4092-9c95-84c80697f320');
      expect(User.profile.profileId).toBe('apt_1750bdf9-ba94-4092-9c95-84c80697f320');
      expect(User.profile.anonymousProfileInd).toBe('Y');
      expect(User.profile.city).toBe('SEATTLE');
      expect(User.profile.state).toBe('WA');
      // Since we always save back location to local storage.
      expect(localStorageService.get.calls.count()).toBe(1);
      expect(Validation.ipLocation.calls.count()).toBe(0);

      // Stub original behaviour
      localStorageService.get.and.stub();
      Validation.ipLocation.and.stub();

      //TODO call it again
    });


    it('should get user and location, but empty profile since in KNOWN state', function() {
      var mockAuthResponse = '{"username":"svc_anonymous_account","identifier":"svc_anonymous_account","profileId":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","status":"","authenticated":false,"lastAuthenticated":"2015-07-20T18:38:17.445+0000","providerProps":{},"tenantProfileId":"","loginStatus":"KNOWN","sessionId":"0177ADF2F9FD4DE68C2331DD42E06F57"}',
        results = null;

      var localStorageService = $injector.get('localStorageService');
      spyOn(localStorageService, 'get').and.returnValue(null);

      mockBackend.expectGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true').respond(mockAuthResponse);
      mockBackend.expectGET('/api/profile-service/1/cgsdemo/profiles/public?includeStudentPrograms=true&profileId=apt_1750bdf9-ba94-4092-9c95-84c80697f320').respond({});
      mockBackend.expectGET('/api/validation-service/1/cgsdemo/address/ipaddr').respond(mockLocationResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/state/WA').respond(mockStateAreasResponse);
      User.get(function(user) {
        results = user;
      });
      expect(results).toBeNull();
      mockBackend.flush();
      // dunno
      // expect(results).toBeDefined();
      // console.log(JSON.stringify(results, null, 2));
      // expect(User.profileId).toEqual(results.profileId);
      expect(User.profileId).toBe('apt_1750bdf9-ba94-4092-9c95-84c80697f320');
      expect(User.profile.city).toBe('SEATTLE');
      expect(User.profile.state).toBe('WA');

      //TODO call it again
    });
  });

});
