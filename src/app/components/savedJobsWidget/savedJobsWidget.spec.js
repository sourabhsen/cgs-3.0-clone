'use strict';

xdescribe('Directive: savedJobsWidget', function () {
  var element, scope, mockBackend, compile, savedJobs;

  beforeEach(function () {
    module('savedJobsWidget');
    module('app/components/savedJobsWidget/savedJobsWidget.html');
  });

  beforeEach(inject(function (_$rootScope_, _$compile_, _$httpBackend_) {
    scope = _$rootScope_;
    compile = _$compile_;
    mockBackend = _$httpBackend_;
    scope.$new();
    savedJobs = {'sortBy':'relevancy','getLinkedInConnections':false,'radiusUsed':false,'serviceName':'job-service','jobs':{'totalPages':2,'lastPage':false,'firstPage':true,'pageSize':3,'numberOfElements':3,'totalNumberOfResults':6,'pageNumber':0,'nextPage':1,'previousPage':-1,'results':[{'job':{'jobId':22422109,'providerCompanyName':'Job represented by Experis (a staffing company)','providerName':'Manpower','providerSourceId':'61509.30677','title':'Java Developer','titleRaw':'Java Developer','status':'ACTIVE','publicIndustry':true,'jobCount':1,'applyUrl':'http://www.aplitrak.com/?adid=dXM2NzY4Ny42MTUwOS43MjczQG1hbnBvd2VyZm94bmEuYXBsaXRyYWsuY29t','location':{'city':'MIAMI','state':'FLORIDA','country':'USA','postal':'33101','latitude':'25.774252','longitude':'-80.190262'},'qualify':{'educationLevelMinYears':16},'experience':{'min':72,'minInterval':'months'},'postingDate':'2015-05-17T20:40:16.000Z','updateDate':'2015-05-17T20:57:27.000Z','ageInSeconds':96131,'jobCode':'15-1131.00','jobCodeType':'RONET','tenants':[{'tenantName':'west'},{'tenantName':'ltspd'},{'tenantName':'cpbc'},{'tenantName':'rockit'},{'tenantName':'unit-test-tenant'},{'tenantName':'uopx'}]},'preferredPartner':false,'tuitionReimbursement':false,'totalLinkedInConnections':0,'listId':33615,'listItemId':179075,'applied':false,'savedDate':'2015-05-18T23:22:27.000Z','score':0.0,'isSaved':true},{'job':{'jobId':21365043,'providerCompanyName':'Job represented by Experis (a staffing company)','providerName':'Manpower','providerSourceId':'14088.94850','title':'Java Developer','titleRaw':'Java Developer','status':'ACTIVE','publicIndustry':true,'jobCount':1,'applyUrl':'http://www.aplitrak.com/?adid=dXM2NzY4Ny4xNDA4OC43MjczQG1hbnBvd2VyZm94bmEuYXBsaXRyYWsuY29t','location':{'city':'MIAMI','state':'FLORIDA','country':'USA','postal':'33101','latitude':'25.774252','longitude':'-80.190262'},'qualify':{'educationLevelMinYears':16},'experience':{'min':72,'minInterval':'months'},'postingDate':'2015-05-15T20:37:11.000Z','updateDate':'2015-05-15T20:57:21.000Z','ageInSeconds':269116,'jobCode':'15-1131.00','jobCodeType':'RONET','tenants':[{'tenantName':'unit-test-tenant'},{'tenantName':'cpbc'},{'tenantName':'west'},{'tenantName':'uopx'},{'tenantName':'rockit'},{'tenantName':'ltspd'}]},'preferredPartner':false,'tuitionReimbursement':false,'totalLinkedInConnections':0,'listId':33615,'listItemId':179073,'applied':false,'savedDate':'2015-05-18T23:22:26.000Z','score':0.0,'isSaved':true},{'job':{'jobId':22160397,'providerCompanyName':'Job represented by Experis (a staffing company)','providerName':'Manpower','providerSourceId':'79511.52675','title':'Java Developer','titleRaw':'Java Developer','status':'ACTIVE','publicIndustry':true,'jobCount':1,'applyUrl':'http://www.aplitrak.com/?adid=QUwxOTgwLjc5NTExLjcyNzNAbWFucG93ZXJmb3huYS5hcGxpdHJhay5jb20','location':{'city':'FORT LAUDERDALE','state':'FLORIDA','country':'USA','postal':'33305','latitude':'26.137289','longitude':'-80.129677'},'qualify':{'educationLevelMinYears':16},'experience':{'min':0,'minInterval':'months'},'postingDate':'2015-05-03T19:51:20.000Z','updateDate':'2015-05-03T20:03:02.000Z','ageInSeconds':1308667,'jobCode':'15-1131.00','jobCodeType':'RONET','tenants':[{'tenantName':'west'},{'tenantName':'unit-test-tenant'},{'tenantName':'rockit'},{'tenantName':'cpbc'},{'tenantName':'ltspd'},{'tenantName':'uopx'}]},'preferredPartner':false,'tuitionReimbursement':false,'totalLinkedInConnections':0,'listId':33615,'listItemId':179071,'applied':false,'savedDate':'2015-05-18T23:22:24.000Z','score':0.0,'isSaved':true}]}};
    mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3/jobs/lists?page.size=3')
        .respond(angular.fromJson(savedJobs));
    element = '<saved-jobs-widget profile-id="{{profileId}}" reload-saved-results="reloadSavedResults"></saved-jobs-widget>';
    scope.reloadSavedResults = 'true';
    scope.profileId = 'apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3';
    element = compile(element)(scope);
    scope.$digest();
  }));

  afterEach(function () {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });

  xdescribe('widget should always', function () {
    it('should display a title', function () {
      mockBackend.flush();
      expect(element.find('h3').text()).toContain('Saved Jobs');
    });
  });

  describe('when user has no saved jobs, widget', function () {
    beforeEach(angular.mock.inject(function ($httpBackend) {
      $httpBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3/jobs/lists?page.size=3').respond(404, '');
    }));
    it('should display no saved jobs message', function () {
      mockBackend.flush();
      expect(element.find('.no-results').text()).toContain('You have not saved any jobs.');
    });

    it('should not display a count', function() {
      mockBackend.flush();
      expect('.itemcount:hidden').toBeTruthy();
    });

    it('should not display results', function() {
      mockBackend.flush();
      expect('.job:hidden').toBeTruthy();
    });

    it('should not display a "See all saved jobs" link', function() {
      mockBackend.flush();
      expect('.small-link-bold:hidden').toBeTruthy();
    });
  });

  xdescribe('when a user has saved jobs, widget', function () {
    it('should display the total number of jobs', function () {
      mockBackend.flush();
      expect(element.find('.itemcount').text()).toContain('( 6 )');
    });

    it('should display at least one saved job', function() {
      mockBackend.flush();
      expect(element.find('.job').length).toBeGreaterThan(0);
    });

    it('should display at most 3', function() {
      mockBackend.flush();
      expect(element.find('.job').length).toBeLessThan(4);
    });

    it('should display a "See all saved jobs" link', function() {
      mockBackend.flush();
      expect(element.find('.small-link-bold a').text()).toContain('See all saved jobs');
    });
  });
});
