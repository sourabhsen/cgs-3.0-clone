/**
 * Created by yrganta on 5/5/15.
 */
describe('ActivityTracker:', function () {
  var $rootScope, $injector, ActivityTracker, $httpBackend;

  beforeEach(function () {
    module('apolloJobServices.activity.tracker');

    inject(function (_$injector_) {
      $injector = _$injector_;

      $httpBackend = $injector.get('$httpBackend');

      ActivityTracker = $injector.get('ActivityTracker');

      $rootScope = $injector.get('$rootScope');
    });
  });

  afterEach(function () {
    $httpBackend = $rootScope = ActivityTracker = $injector = undefined;
  });

  describe('resultsResponseTransforms', function () {
    var savedJobs, requestHandler;

    beforeEach(function () {
      savedJobs = ActivityTracker.savedJobs;

      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/lists/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      savedJobs = requestHandler = undefined;
    });

    it('it should return an empty array when the response is an object without results', function () {
      var $http, responseHandler, jobs;

      requestHandler.respond(201, {
        totalNumberOfResults: 0
      });

      responseHandler = savedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function () {
        // error case
        jobs = [];
      });

      $httpBackend.flush(1);
      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(0);
    });
  });

  describe('`savedJobs` method units::', function () {
    var savedJobs, requestHandler;

    beforeEach(function () {
      savedJobs = ActivityTracker.savedJobs;

      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/lists/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      savedJobs = requestHandler = undefined;

    });


    it('When user profile id is passed it should return a list of saved jobs', function () {
      var responseHandler, jobs;

      requestHandler.respond('{"sortBy":"relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"job-service","jobs":{"previousPage":-1,"nextPage":1,"totalPages":3,"lastPage":false,"firstPage":true,"totalNumberOfResults":11,"pageSize":5,"numberOfElements":5,"pageNumber":0,"results":[{"job":{"jobId":25508457,"companyName":"The Allstate Corporation","companyId":670699,"providerCompanyName":"Allstate","providerName":"BURNING_GLASS","providerSourceId":"37893585529","title":"Customer Service Representative","titleRaw":"Allstate Insurance CSR and Sales Producer","status":"EXPIRED","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.everettrecruiter.com/all-jobs/282542103/allstate-insurance-csr-and-sales-producer","location":{"city":"FEDERAL WAY","state":"WASHINGTON","country":"USA","postal":"98003","latitude":"47.3099","longitude":"-122.314"},"postingDate":"2015-04-29T00:00:00.000Z","dateOpening":"2015-04-27T04:00:00.000Z","updateDate":"2015-05-04T23:53:44.000Z","ageInSeconds":604880,"jobCode":"41-3021.00","jobCodeType":"RONET","tenants":[{"tenantName":"west"},{"tenantName":"UOPX"},{"tenantName":"unit-test-tenant"},{"tenantName":"ltspd"},{"tenantName":"cpbc"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"41-3021.00"}],"skills":[{"skillName":"Sales","assignmentType":"canonSkillsFromBg"},{"skillName":"Customer Service","assignmentType":"canonSkillsFromBg"}],"segments":[{"type":"Industry","name":"Finance and Insurance"}]},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":252410,"listItemId":2388704,"applied":false,"savedDate":"2015-05-01T15:43:54.000Z","score":0.0,"isSaved":true},{"job":{"jobId":22870431,"companyName":"The Allstate Corporation","companyId":670699,"providerCompanyName":"Allstate","providerName":"BURNING_GLASS","providerSourceId":"37881507248","title":"Account Manager","titleRaw":"Commercial Lines Account Manager","status":"ACTIVE","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.my.jobs/williamsville-ny/commercial-lines-account-manager/20CF4A32B3934513A9128F91B4D0B2F9/job/","location":{"city":"BUFFALO","state":"NEW YORK","country":"USA","postal":"14221","latitude":"42.9816","longitude":"-78.7262"},"qualify":{"educationLevelMinYears":16},"postingDate":"2015-03-25T00:00:00.000Z","ageInSeconds":3628880,"jobCode":"13-2011.S4","jobCodeType":"RONET","tenants":[{"tenantName":"UOPX"},{"tenantName":"cpbc"},{"tenantName":"rockit"},{"tenantName":"west"},{"tenantName":"ltspd"},{"tenantName":"unit-test-tenant"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"13-2052.00"}],"skills":[{"skillName":"Microsoft Office","assignmentType":"canonSkillsFromBg"},{"skillName":"Microsoft Excel","assignmentType":"canonSkillsFromBg"},{"skillName":"Service Level Agreements","assignmentType":"canonSkillsFromBg"},{"skillName":"Building Effective Relationships","assignmentType":"canonSkillsFromBg"},{"skillName":"Account Management","assignmentType":"canonSkillsFromBg"}],"segments":[{"type":"Industry","name":"Finance and Insurance"}]},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":252410,"listItemId":2254149,"applied":false,"savedDate":"2015-04-30T22:32:49.000Z","score":0.0,"isSaved":true},{"job":{"jobId":25027983,"providerCompanyName":"Consulting Incorporated","providerName":"BURNING_GLASS","providerSourceId":"37891592692","title":"Software Developer","titleRaw":"Sr. Software Developer","status":"ACTIVE","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.110consulting.com/careers/JobDetails?ID=606","location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004","latitude":"47.6156","longitude":"-122.211"},"postingDate":"2015-04-23T00:00:00.000Z","ageInSeconds":1123280,"jobCode":"15-1131.00","jobCodeType":"RONET","tenants":[{"tenantName":"ltspd"},{"tenantName":"cpbc"},{"tenantName":"unit-test-tenant"},{"tenantName":"UOPX"},{"tenantName":"rockit"},{"tenantName":"west"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"15-1132.00"}],"skills":[{"skillName":"SQL","assignmentType":"canonSkillsFromBg"},{"skillName":"Contract Management","assignmentType":"canonSkillsFromBg"},{"skillName":"Software Development","assignmentType":"canonSkillsFromBg"},{"skillName":"jQuery","assignmentType":"canonSkillsFromBg"},{"skillName":"Visual Studio","assignmentType":"canonSkillsFromBg"},{"skillName":"JavaScript","assignmentType":"canonSkillsFromBg"}]},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":252410,"listItemId":2211287,"applied":false,"savedDate":"2015-04-27T18:44:20.000Z","score":0.0,"isSaved":true},{"job":{"jobId":24340655,"companyName":"The Allstate Corporation","companyId":670699,"providerCompanyName":"Allstate","providerName":"BURNING_GLASS","providerSourceId":"37888117017","title":"Software Developer","titleRaw":"J2EE Software Developer","status":"ACTIVE","publicIndustry":true,"jobCount":1,"applyUrl":"http://jobs.insyncstaffing.jobs/candidates/myjobs/openjob_outside.jsp?a=ctjdnw8w4096zxm7t7e3mwmlhm5coi0050l06d9xf4embdmvkn2nkez1xeeukr0g&from=COMP&id=8567151&SearchString=&StatesString=&jobseq=4&rowsperpage=30&divisions=&divisions2=","location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004","latitude":"47.6156","longitude":"-122.211"},"postingDate":"2015-04-14T00:00:00.000Z","ageInSeconds":1900880,"jobCode":"15-1131.00","jobCodeType":"RONET","tenants":[{"tenantName":"cpbc"},{"tenantName":"unit-test-tenant"},{"tenantName":"west"},{"tenantName":"UOPX"},{"tenantName":"ltspd"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"15-1132.00"}],"skills":[{"skillName":"Software Development","assignmentType":"canonSkillsFromBg"},{"skillName":"Web Site Development","assignmentType":"canonSkillsFromBg"}],"segments":[{"type":"Industry","name":"Finance and Insurance"}]},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":252410,"listItemId":2211281,"applied":false,"savedDate":"2015-04-27T18:43:32.000Z","score":0.0,"isSaved":true},{"job":{"jobId":20511095,"providerCompanyName":"Mysource Consulting","providerName":"BURNING_GLASS","providerSourceId":"37872429578","title":"Java Engineer","titleRaw":"Java J2SE Engineer","status":"EXPIRED","publicIndustry":true,"jobCount":1,"applyUrl":"http://IT-Computer.Jobs.net/Job.asp?jid=JHS11C6LGFK549134KP","salary":{"minimum":"114400.00","maximum":"124800.00","currency":"USD","frequency":"yearly"},"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101","latitude":"47.6117","longitude":"-122.333"},"experience":{"min":60,"minInterval":"months"},"postingDate":"2015-02-26T00:00:00.000Z","updateDate":"2015-04-27T15:32:51.000Z","ageInSeconds":5961680,"jobCode":"15-1131.00","jobCodeType":"RONET","tenants":[{"tenantName":"cpbc"},{"tenantName":"ltspd"},{"tenantName":"UOPX"},{"tenantName":"west"},{"tenantName":"unit-test-tenant"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"JOB_EXPIRED_REASON","attributeValue":"older_than_60_days"},{"attributeName":"ONETSOC_CODE","attributeValue":"15-1132.00"}],"skills":[{"skillName":"Transact-SQL","assignmentType":"canonSkillsFromBg"},{"skillName":"Object-Oriented Analysis and Design (OOAD)","assignmentType":"canonSkillsFromBg"},{"skillName":"JAVA","assignmentType":"canonSkillsFromBg"},{"skillName":"Problem Solving","assignmentType":"canonSkillsFromBg"},{"skillName":"Scrum","assignmentType":"canonSkillsFromBg"},{"skillName":"Design and Construction","assignmentType":"canonSkillsFromBg"},{"skillName":"Kanban","assignmentType":"canonSkillsFromBg"},{"skillName":"Database Design","assignmentType":"canonSkillsFromBg"},{"skillName":"Unified Modeling Language (UML)","assignmentType":"canonSkillsFromBg"},{"skillName":"Agile Development","assignmentType":"canonSkillsFromBg"}]},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":252410,"listItemId":2218912,"applied":false,"savedDate":"2015-04-17T15:20:24.000Z","score":0.0,"isSaved":true}]}}');

      responseHandler = savedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(5);
      expect(jobs.totalNumberOfResults).toBe(11);
      expect(jobs.pageNumber).toBe(0);
      expect(jobs.nextPage).toBe(1);
    });

    it('When user profile id is passed and service returns single object should return list of saved jobs', function () {
      var responseHandler, jobs;

      requestHandler.respond('{"sortBy":"relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"job-service","jobs":{"previousPage":-1,"nextPage":-1,"totalPages":1,"lastPage":true,"firstPage":true,"totalNumberOfResults":1,"pageSize":5,"numberOfElements":1,"pageNumber":0,"results":{"job":{"jobId":25508457,"companyName":"The Allstate Corporation","companyId":670699,"providerCompanyName":"Allstate","providerName":"BURNING_GLASS","providerSourceId":"37893585529","title":"Customer Service Representative","titleRaw":"Allstate Insurance CSR and Sales Producer","status":"EXPIRED","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.everettrecruiter.com/all-jobs/282542103/allstate-insurance-csr-and-sales-producer","location":{"city":"FEDERAL WAY","state":"WASHINGTON","country":"USA","postal":"98003","latitude":"47.3099","longitude":"-122.314"},"postingDate":"2015-04-29T00:00:00.000Z","dateOpening":"2015-04-27T04:00:00.000Z","updateDate":"2015-05-04T23:53:44.000Z","ageInSeconds":604880,"jobCode":"41-3021.00","jobCodeType":"RONET","tenants":[{"tenantName":"west"},{"tenantName":"UOPX"},{"tenantName":"unit-test-tenant"},{"tenantName":"ltspd"},{"tenantName":"cpbc"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"41-3021.00"}],"skills":[{"skillName":"Sales","assignmentType":"canonSkillsFromBg"},{"skillName":"Customer Service","assignmentType":"canonSkillsFromBg"}],"segments":[{"type":"Industry","name":"Finance and Insurance"}]},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":252410,"listItemId":2388704,"applied":false,"savedDate":"2015-05-01T15:43:54.000Z","score":0,"isSaved":true}}}');

      responseHandler = savedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(1);
      expect(jobs[0].listId).toBe(252410);
      expect(jobs.totalNumberOfResults).toBe(1);
      expect(jobs.pageNumber).toBe(0);
      expect(jobs.nextPage).toBe(-1);

    });

    it('When profileId is not passed return an empty list of jobs without making any service calls', function () {
      var responseHandler, jobs, $http;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      responseHandler = savedJobs({});

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      $rootScope.$digest();

      expect($http.get.calls.count()).toBe(0);
      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(0);

      // Reset spies.
      $http.get.calls.reset();

      $httpBackend.resetExpectations();
    });


    it('When service return 404 return an empty list to calling function', function () {
      var $http, responseHandler, jobs;

      requestHandler.respond(404, '');

      responseHandler = savedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function () {
        // error case
        jobs = [];
      });
      $httpBackend.flush(1);
      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(0);
    });

    it('On all other service exceptions except 404 should put the control into error state.', function () {
      var responseHandler, jobs, errorResponse,
        responseText = '<html><body><p>Sample 500 error page!</p></body></html>';

      requestHandler.respond(500, responseText);

      responseHandler = savedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {

      }, function (err) {
        errorResponse = err;
      });

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse.status).toBe(500);
      expect(errorResponse.data).toEqual(responseText);
    });

  });


  describe('`appliedJobs` units::', function () {
    var appliedJobs, requestHandler;

    beforeEach(function () {
      appliedJobs = ActivityTracker.appliedJobs;

      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/applications/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      appliedJobs = requestHandler = undefined;
    });

    it('With all the required parameters passed in should make a service call to retrieve list of applied jobs', function () {
      var responseHandler, jobs;

      requestHandler.respond('{"totalPages":2,"firstPage":true,"lastPage":false,"previousPage":-1,"totalNumberOfResults":9,"pageSize":5,"numberOfElements":5,"nextPage":1,"pageNumber":0,"results":[{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25922707,"jobTitle":"Pharmacy Cashier","company":"Rite Aid Corporation","companyId":670481,"location":"GIG HARBOR, WA","id":40010,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:41:06.000Z","trackingType":"MANUAL","atsTracked":true},{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25831893,"jobTitle":"Manager/Senior Manager, Merchant Onboarding Process Management","company":"American Express Company","companyId":671101,"location":"HELENA, MT","id":43553,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:39:22.000Z","trackingType":"MANUAL","atsTracked":false},{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25903697,"jobTitle":"Finance Manager","company":"Amazon.com, Inc.","companyId":671501,"location":"SEATTLE, WA","id":43551,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:38:30.000Z","trackingType":"MANUAL","atsTracked":false},{"appliedDate":"2015-04-17T00:00:00.000Z","jobId":23798707,"jobTitle":"SEM Analyst","company":"Apollo Education Group, Inc.","companyId":709443,"location":"SEATTLE, WA","id":36726,"jobStatus":"EXPIRED","applyStatus":"Applied","status":"ACTIVE","connectionStatus":"ACTIVE","lastUpdatedDate":"2015-05-05T12:00:41.000Z","trackingType":"MANUAL","atsTracked":true},{"appliedDate":"2015-04-27T00:00:00.000Z","jobId":24497985,"jobTitle":"Software Development Engineer","company":"Apollo Education Group, Inc.","companyId":709443,"location":"SEATTLE, WA","id":42173,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","connectionStatus":"ACTIVE","lastUpdatedDate":"2015-05-05T12:00:41.000Z","trackingType":"MANUAL","atsTracked":true}]}');

      responseHandler = appliedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(5);
      expect(jobs.totalNumberOfResults).toBe(9);
      expect(jobs.pageNumber).toBe(0);
      expect(jobs.numberOfElements).toBe(5);
      expect(jobs.nextPage).toBe(1);
    });


    it('When ever profileId is not passed as part of user configuration object return an empty list without making any backend call.', function () {
      var responseHandler, jobs, $http;

      $http = $injector.get('$http');
      spyOn($http, 'get');

      requestHandler.respond('{"totalPages":2,"firstPage":true,"lastPage":false,"previousPage":-1,"totalNumberOfResults":9,"pageSize":5,"numberOfElements":5,"nextPage":1,"pageNumber":0,"results":[{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25922707,"jobTitle":"Pharmacy Cashier","company":"Rite Aid Corporation","companyId":670481,"location":"GIG HARBOR, WA","id":40010,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:41:06.000Z","trackingType":"MANUAL","atsTracked":true},{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25831893,"jobTitle":"Manager/Senior Manager, Merchant Onboarding Process Management","company":"American Express Company","companyId":671101,"location":"HELENA, MT","id":43553,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:39:22.000Z","trackingType":"MANUAL","atsTracked":false},{"appliedDate":"2015-05-05T00:00:00.000Z","jobId":25903697,"jobTitle":"Finance Manager","company":"Amazon.com, Inc.","companyId":671501,"location":"SEATTLE, WA","id":43551,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","lastUpdatedDate":"2015-05-05T23:38:30.000Z","trackingType":"MANUAL","atsTracked":false},{"appliedDate":"2015-04-17T00:00:00.000Z","jobId":23798707,"jobTitle":"SEM Analyst","company":"Apollo Education Group, Inc.","companyId":709443,"location":"SEATTLE, WA","id":36726,"jobStatus":"EXPIRED","applyStatus":"Applied","status":"ACTIVE","connectionStatus":"ACTIVE","lastUpdatedDate":"2015-05-05T12:00:41.000Z","trackingType":"MANUAL","atsTracked":true},{"appliedDate":"2015-04-27T00:00:00.000Z","jobId":24497985,"jobTitle":"Software Development Engineer","company":"Apollo Education Group, Inc.","companyId":709443,"location":"SEATTLE, WA","id":42173,"jobStatus":"ACTIVE","applyStatus":"Applied","status":"ACTIVE","connectionStatus":"ACTIVE","lastUpdatedDate":"2015-05-05T12:00:41.000Z","trackingType":"MANUAL","atsTracked":true}]}');

      expect(jobs).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      responseHandler = appliedJobs({
        someId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      $rootScope.$digest();

      expect($http.get.calls.count()).toBe(0);
      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(0);


      // Since no backend call has been made reset expectation else the test will fail.
      $httpBackend.resetExpectations();
    });

    it('If the service fails, it should fall into the error case', function () {
      var responseHandler, jobs, $http, errorResponse;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond(500, '');

      expect($http.get.calls.count()).toBe(0);

      responseHandler = appliedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function (err) {
        errorResponse = err;
      });

      $httpBackend.flush(1);

      expect(jobs).toBeUndefined();
      expect($http.get.calls.count()).toBe(1);
      expect(errorResponse).toBeDefined();
    });
  });

  describe('`setActivity` units::', function () {
    var setActivity, requestHandler;

    beforeEach(function () {
      setActivity = ActivityTracker.setActivity;
      requestHandler = $httpBackend.expectPOST(/\/api\/job-service\/\d+\/\w+\/jobs\/\d+\/activity/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should post a job activity', function () {
      var responseHandler, jobActivity;

      var response = {
        'jobActivityId': 53953,
        'activityId': 43,
        'jobId': 1234,
        'userIdentifier': 'apt_b82d9a9d-a7eb-48ee-91d0-dc614b73d438',
        'activityValue': 'valid',
        'activityName': 'applied',
        'tenantName': 'uopx',
        'createDate': '2015-06-16T22:43:52.595Z'
      };

      requestHandler.respond(response);

      responseHandler = setActivity({
        id: '1234'
      });

      responseHandler.then(function (res) {
        jobActivity = res.data;
      });

      $httpBackend.flush(1);

      expect(jobActivity.jobId).toBe(1234);
    });
  });
  describe('`setAppliedJob` units::', function () {
    var application, requestHandler;

    beforeEach(function () {
      application = ActivityTracker.setAppliedJob;
      requestHandler = $httpBackend.expectPOST(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/applications/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should set a job application', function () {
      var responseHandler, jobActivity;

      var response = 50515;

      requestHandler.respond(201, response);

      responseHandler = application({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400',
        id: 1234
      });

      responseHandler.then(function (res) {
        jobActivity = res.data;
      }, function () {

      });

      $httpBackend.flush(1);

      expect(jobActivity).toBe(50515);
    });
  });
  describe('`getAppliedJob` units::', function () {
    var application, requestHandler;

    beforeEach(function () {
      application = ActivityTracker.getAppliedJob;
      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/\d+\/activity\/applied/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get a job application', function () {
      var responseHandler, jobActivity;

      var response = 50515;

      requestHandler.respond(201, response);

      responseHandler = application({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400',
        id: 1234
      });

      responseHandler.then(function (res) {
        jobActivity = res.data;
      }, function () {

      });

      $httpBackend.flush(1);

      expect(jobActivity).toBe(50515);
    });
  });
  describe('`getUserConfirmationPreference` units::', function () {
    var userPreference, requestHandler;

    beforeEach(function () {
      userPreference = ActivityTracker.getUserConfirmationPreference;
      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/applications\/confirmation/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get the user\'s confirmation preference', function () {
      var responseHandler, preference;

      var response = {
        hideMessage: true
      };

      requestHandler.respond(201, response);

      responseHandler = userPreference({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400',
      });

      responseHandler.then(function (res) {
        preference = res.data.hideMessage;
      }, function () {

      });

      $httpBackend.flush(1);

      expect(preference).toBe(true);
    });
  });
  describe('`setUserConfirmationPreference` units::', function () {
    var userPreference, requestHandler;

    beforeEach(function () {
      userPreference = ActivityTracker.setUserConfirmationPreference;
      requestHandler = $httpBackend.expectPUT(/\/api\/job-service\/\d+\/\w+\/users\/[\w-]+\/jobs\/applications\/confirmation/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should set the user\'s confirmation preference', function () {
      var responseHandler, preference;

      var response = {
        hideMessage: true
      };

      requestHandler.respond(201, response);

      responseHandler = userPreference({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400',
        hideMessage: true
      });

      responseHandler.then(function (res) {
        preference = res.data.hideMessage;
      }, function () {

      });

      $httpBackend.flush(1);

      expect(preference).toBe(true);
    });
  });
  describe('`getApplicationStatuses` units::', function () {
    var applicationStatuses, requestHandler;

    beforeEach(function () {
      applicationStatuses = ActivityTracker.getApplicationStatuses;
      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/jobs\/applications\/statuses/);
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should set the user\'s confirmation preference', function () {
      var responseHandler, statuses;

      var response = ["Applied", "1st interview scheduled (or offered)", "1st interview completed", "Follow-up interview scheduled (or offered)", "Follow-up interview completed", "Received a job offer", "Job offer accepted", "Employer not interested", "I declined to pursue further"];

      requestHandler.respond(201, response);

      responseHandler = applicationStatuses();

      responseHandler.then(function (res) {
        statuses = res.data;
      }, function () {

      });

      $httpBackend.flush(1);

      expect(angular.isArray(statuses)).toBe(true);
      expect(statuses.length).toBeGreaterThan(0);
    });
  });
});
