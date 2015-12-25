'use strict';

describe('Service: Authentication', function() {
  var mockBackend, Auth;
  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('apolloAuthentication');
  });

  beforeEach(inject(function (_$httpBackend_, _Auth_, $cookies) {
    mockBackend = _$httpBackend_;
    Auth = _Auth_;
    $cookies.INFO = 'infoval';
    $cookies.TOKEN = 'tokenval';
  }));

  afterEach(function() {
    if (mockBackend) {
      mockBackend.verifyNoOutstandingRequest();
    }
    mockBackend = Auth = undefined;
  });

  describe('get()', function () {
    var mockUserObjResponse = {
                                'authenticated': true,
                                'identifier': 'michael.swartz@apollo.edu',
                                'lastAuthenticated': '2015-11-09T18:55:16.471+0000',
                                'loginStatus': 'LOGGEDIN',
                                'profileId': 'apt_e100f12b-d383-482a-bd65-43d3dc5be0f9',
                                'providerProps': {
                                  '_APPNAME': 'authentication-service',
                                  '_TENANT': 'cgsdemo'
                                },
                                'sessionId': 'C04063F487494CABB5E51C6015144ACC',
                                'status': 'ACTIVE',
                                'tenantProfileId': 'apt_e100f12b-d383-482a-bd65-43d3dc5be0f9',
                                'username': 'michael.swartz@apollo.edu'
                              };

    xit('should get profile', function() {
      mockBackend.whenGET('/api/authentication-service/2/cgsdemo/user/info').respond(mockUserObjResponse);
      var user = {};
      expect(user).toEqual({});

      user = Auth.get()
              .then(function(httpAuth) {
                user = httpAuth.data;
                return user;
              });
      mockBackend.flush();

      expect(user).toBeDefined();
      expect(user.profileId).toBe('apt_e100f12b-d383-482a-bd65-43d3dc5be0f9');
    });
  });

  describe('register(data, queryParams)', function () {
     var mockUserObjResponse = {'status':'200 OK'};

    xit('should post register request', function() {
      mockBackend.whenPOST('/api/authentication-service/2/cgsdemo/user/mtAuth/create').respond(mockUserObjResponse);
      var obj = {};
      expect(obj).toEqual({});

      obj = Auth.register({'username':'michael.swartz@apollo.edu', 'password':'abc123', 'confirm':'abc123'}, {'someObj': 'objValue'})
              .then(function(httpAuth) {
                obj = httpAuth.data;
                return obj;
              });
      mockBackend.flush();

      expect(obj).toBeDefined();
      expect(obj.status).toBeDefined();
    });
  });

  describe('login(data)', function () {
    var mockUserObjResponse = {'status':'200 OK'};

    xit('post login request', function() {
      mockBackend.whenPOST('/api/authentication-service/2/cgsdemo/user/login').respond(mockUserObjResponse);
      var obj = {};
      expect(obj).toEqual({});

      obj = Auth.login({'username':'michael.swartz@apollo.edu', 'password':'abc123'})
              .then(function(httpAuth) {
                obj = httpAuth.data;
                return obj;
              });
      mockBackend.flush();

      expect(obj).toBeDefined();
      expect(obj.status).toBeDefined();
    });
  });

  describe('logout()', function () {
    var mockUserObjResponse = {
                                'authenticated': false,
                                'identifier': '',
                                'lastAuthenticated': '2015-11-09T18:55:16.471+0000',
                                'loginStatus': 'LOGGEDOUT',
                                'profileId': 'apt_e100f12b-d383-482a-bd65-43d3dc5be0f9',
                                'providerProps': {
                                  '_APPNAME': 'authentication-service',
                                  '_TENANT': 'cgsdemo'
                                },
                                'sessionId': 'C04063F487494CABB5E51C6015144ACC',
                                'status': 'INACTIVE',
                                'tenantProfileId': 'apt_e100f12b-d383-482a-bd65-43d3dc5be0f9',
                                'username': ''
                              };

    xit('should logout', function() {
      mockBackend.whenGET('/api/authentication-service/2/cgsdemo/user/logout').respond(mockUserObjResponse);
      var user = {};
      expect(user).toEqual({});

      user = Auth.logout()
              .then(function(httpAuth) {
                user = httpAuth.data;
                return user;
              });
      mockBackend.flush();

      expect(user).toBeDefined();
      expect(user.authenticated).toBe(false);
    });
  });

  describe('forgotPassword(data)', function () {
    var mockUserObjResponse = {'status':'200 OK'};

    xit('post forgot password request', function() {
      mockBackend.whenPOST('/api/authentication-service/2/cgsdemo/user/mtAuth/forgotpassword').respond(mockUserObjResponse);
      var obj = {};
      expect(obj).toEqual({});

      obj = Auth.forgotPassword({'username':'michael.swartz@apollo.edu'})
              .then(function(httpAuth) {
                obj = httpAuth.data;
                return obj;
              });
      mockBackend.flush();

      expect(obj).toBeDefined();
      expect(obj.status).toBeDefined();
    });
  });

  describe('changePassword(data)', function () {
    var mockUserObjResponse = {'status':'200 OK'};

    xit('should post password change request', function() {
      mockBackend.whenPOST('/api/authentication-service/2/cgsdemo/user/mtAuth/forgotpasswordfinish').respond(mockUserObjResponse);
      var obj = {};
      expect(obj).toEqual({});

      obj = Auth.changePassword({'username':'michael.swartz@apollo.edu', 'oldpassword':'abc123', 'newpassword':'abc987'})
              .then(function(httpAuth) {
                obj = httpAuth.data;
                return obj;
              });
      mockBackend.flush();

      expect(obj).toBeDefined();
      expect(obj.status).toBeDefined();
    });
  });

  xdescribe('hasCookies()', function () {
    xit('should get cookiesObjResponse', function() {
      var obj = {};

      obj = Auth.hasCookies();

      console.log(obj);

      expect(obj).toBeDefined();
      expect(obj).toBe(true);
    });

  });

});
