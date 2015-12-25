'use strict';

describe('Service: appliedJobsWidgetViewModel', function() {
  var vm, $rootScope, mockBackend, User, CONSTANTS, ActivityTracker;
  // jshint quotmark: true
  var lists = {
    "list": [{
      "listId": 45237,
      "tenantName": "cgsdemo",
      "name": "MyGoals",
      "listType": "RONET",
      "ownerType": "USER",
      "userIdentifier": "apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d",
      "userIdentifierType": "USER",
      "privacyType": "Private",
      "description": "My goal list",
      "createDate": "2015-09-22T19:43:41.000Z",
      "listItems": [{
        "listItemId": 244353,
        "listId": 45237,
        "itemType": "RONET",
        "itemIdentifier": "51-9071.00",
        "itemSequence": 0,
        "itemStatus": "SAVED",
        "createDate": "2015-11-03T00:48:16.000Z"
      }]
    }, {
      "listId": 48723,
      "tenantName": "cgsdemo",
      "name": "Skills",
      "listType": "SKILL",
      "ownerType": "USER",
      "userIdentifier": "apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d",
      "userIdentifierType": "USER",
      "privacyType": "Private",
      "description": "My skill level list",
      "createDate": "2015-10-07T20:20:28.000Z",
      "listItems": [{
        "listItemId": 236373,
        "listId": 48723,
        "itemType": "SKILL",
        "itemIdentifier": "176119",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "priority": "Intermediate",
        "createDate": "2015-10-14T22:03:56.000Z"
      }, {
        "listItemId": 236371,
        "listId": 48723,
        "itemType": "SKILL",
        "itemIdentifier": "185287",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "priority": "Intermediate",
        "createDate": "2015-10-14T22:03:54.000Z"
      }, {
        "listItemId": 230239,
        "listId": 48723,
        "itemType": "SKILL",
        "itemIdentifier": "213295",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "priority": "Advanced",
        "createDate": "2015-10-07T20:20:28.000Z",
        "updateDate": "2015-10-16T17:34:45.000Z"
      }, {
        "listItemId": 236369,
        "listId": 48723,
        "itemType": "SKILL",
        "itemIdentifier": "229263",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "priority": "Intermediate",
        "createDate": "2015-10-14T22:03:43.000Z",
        "updateDate": "2015-10-14T22:03:47.000Z"
      }]
    }, {
      "listId": 49139,
      "tenantName": "cgsdemo",
      "name": "CAREER PLAN",
      "listType": "CAREER_PLAN_STEP",
      "ownerType": "USER",
      "userIdentifier": "apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d",
      "userIdentifierType": "USER",
      "privacyType": "Private",
      "createDate": "2015-10-09T02:30:38.000Z",
      "listItems": [{
        "listItemId": 240173,
        "listId": 49139,
        "itemType": "CAREER_PLAN_STEP",
        "itemIdentifier": "/career-plan/milestones/skills/skill-basics",
        "itemSequence": 1,
        "itemStatus": "COMPLETE",
        "createDate": "2015-10-16T19:46:48.000Z"
      }, {
        "listItemId": 231247,
        "listId": 49139,
        "itemType": "CAREER_PLAN_STEP",
        "itemIdentifier": "/career-plan/milestones/skills/gaining-experience",
        "itemSequence": 1,
        "itemStatus": "COMPLETE",
        "createDate": "2015-10-09T02:30:48.000Z"
      }, {
        "listItemId": 231239,
        "listId": 49139,
        "itemType": "CAREER_PLAN_STEP",
        "itemIdentifier": "/career-exploration",
        "itemSequence": 1,
        "itemStatus": "COMPLETE",
        "createDate": "2015-10-16T21:35:52.000Z",
        "updateDate": "2015-10-16T21:35:52.000Z"
      }, {
        "listItemId": 231251,
        "listId": 49139,
        "itemType": "CAREER_PLAN_STEP",
        "itemIdentifier": "/career-plan/milestones/goals/chart-your-career-path",
        "itemSequence": 1,
        "itemStatus": "COMPLETE",
        "createDate": "2015-10-16T21:35:49.000Z",
        "updateDate": "2015-10-16T21:35:49.000Z"
      }]
    }, {
      "listId": 46895,
      "tenantName": "cgsdemo",
      "name": "MyJobs",
      "listType": "JOB",
      "ownerType": "USER",
      "userIdentifier": "apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d",
      "userIdentifierType": "USER",
      "privacyType": "Private",
      "description": "My Saved Jobs",
      "createDate": "2015-09-25T17:04:54.000Z",
      "listItems": [{
        "listItemId": 254537,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "43806529",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-12-15T22:00:12.000Z"
      }, {
        "listItemId": 254535,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "42361681",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-12-15T22:00:10.000Z"
      }, {
        "listItemId": 254533,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "43644645",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-12-15T22:00:08.000Z"
      }, {
        "listItemId": 254531,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "43803807",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-12-15T22:00:07.000Z"
      }, {
        "listItemId": 249007,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "33966651",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-11-29T07:32:18.000Z"
      }, {
        "listItemId": 249005,
        "listId": 46895,
        "itemType": "JOB",
        "itemIdentifier": "42399069",
        "itemSequence": 1,
        "itemStatus": "SAVED",
        "createDate": "2015-11-29T07:32:17.000Z"
      }]
    }]
  };
  var statuses = ["Applied", "1st interview scheduled (or offered)", "1st interview completed", "Follow-up interview scheduled (or offered)", "Follow-up interview completed", "Received a job offer", "Job offer accepted", "Employer not interested", "I declined to pursue further"];
  var applications = {
    "totalPages": 8,
    "pageNumber": 0,
    "pageSize": 3,
    "results": [{
      "appliedDate": "2015-12-16T00:00:00.000Z",
      "jobId": 42362147,
      "jobTitle": "JavaScript Developer - 100% REMOTE - JavaScript,  JQuery Mobile",
      "company": "CyberCoders",
      "location": "Seattle, WA",
      "id": 12149,
      "jobStatus": "ACTIVE",
      "applyStatus": "Applied",
      "status": "ACTIVE",
      "lastUpdatedDate": "2015-12-16T21:35:12.000Z",
      "trackingType": "MANUAL",
      "atsTracked": false
    }, {
      "appliedDate": "2015-12-16T00:00:00.000Z",
      "jobId": 42781671,
      "jobTitle": "Senior Front End Engineer - HTML5, CSS, JavaScript",
      "company": "CyberCoders",
      "location": "Seattle, WA",
      "id": 12147,
      "jobStatus": "ACTIVE",
      "applyStatus": "Applied",
      "status": "ACTIVE",
      "lastUpdatedDate": "2015-12-16T21:09:00.000Z",
      "trackingType": "MANUAL",
      "atsTracked": false
    }, {
      "appliedDate": "2015-12-16T00:00:00.000Z",
      "jobId": 43641637,
      "jobTitle": "Front End Web Developer -",
      "company": "CyberCoders",
      "location": "Bellevue, WA",
      "id": 12145,
      "jobStatus": "ACTIVE",
      "applyStatus": "Applied",
      "status": "ACTIVE",
      "lastUpdatedDate": "2015-12-16T21:08:31.000Z",
      "trackingType": "MANUAL",
      "atsTracked": false
    }],
    "numberOfElements": 3,
    "totalNumberOfResults": 24,
    "nextPage": 1,
    "previousPage": -1,
    "firstPage": true,
    "lastPage": false
  };
  // jshint quotmark: single


  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('appliedJobsWidget');
    module('apolloJobServices.activity.tracker');
  });

  beforeEach(inject(function(_appliedJobsWidgetViewModel_, _$rootScope_, _$httpBackend_, _User_, _CONSTANTS_, _ActivityTracker_, _AppliedJobsViewModel_, _$uibModal_) {
    mockBackend = _$httpBackend_;
    vm = _appliedJobsWidgetViewModel_;
    vm.appliedJobsVM = _AppliedJobsViewModel_;
    $rootScope = _$rootScope_;
    User = _User_;
    CONSTANTS = _CONSTANTS_;
    ActivityTracker = _ActivityTracker_;
    vm.username = 'Flynn';
    vm.password = 'Hair';
    vm.modalInstance = _$uibModal_;
  }));

  beforeEach(function() {
    // set module assignments
    User.profileId = 'apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d';
    vm.profileId = User.profileId;
    CONSTANTS.tenant = 'cgsdemo';
  });

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    vm = mockBackend = undefined;
  });

  describe('function: setATSVariables()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });
    it('should set local variables and fire off two functions.', function() {
      spyOn(vm, 'getAppliedJobs').and.callFake(function() {
        return true;
      });
      vm.setATSVariables();
      mockBackend.flush();
      expect(vm.atsLoginError).toBe(false);
      expect(vm.atsServiceError).toBe(false);
      expect(vm.atsPending).toBe(false);
      expect(vm.atsSuccess).toBe(true);
      expect(vm.getAppliedJobs).toHaveBeenCalled();
    });
  });

  describe('function: createLoginObj()', function() {
    var connectionStatus = 'connected';
    var id = 'abc123';
    var companyId = 'zyx321';
    var jobId = 'anotherID';

    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });

    it('should create and return an object when the status is "firstTime"', function() {
      var obj = vm.createLoginObj(id, jobId, companyId, connectionStatus, 'firstTime');
      mockBackend.flush();
      expect(obj).toBeTruthy();
      var objLength = Object.keys(obj).length;
      expect(objLength).not.toBe(0);
      expect(objLength > 0).toBe(true);
    });
    it('should create and return an object when the status is "update"', function() {
      var obj = vm.createLoginObj(id, jobId, companyId, connectionStatus, 'update');
      mockBackend.flush();
      expect(obj).toBeTruthy();
      var objLength = Object.keys(obj).length;
      expect(objLength).not.toBe(0);
      expect(objLength > 0).toBe(true);
    });
    it('should create an empty object when anything else is passed in ... (or nothing).', function() {
      var obj = vm.createLoginObj(id, jobId, companyId, connectionStatus);
      mockBackend.flush();
      expect(obj).toBeTruthy();
      var objLength = Object.keys(obj).length;
      expect(objLength).toBe(0);
      expect(objLength > 0).toBe(false);
    });
  });

  describe('function: init()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
      mockBackend.whenGET('/api/job-service/1/jobs/applications/statuses').respond(201, statuses);
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications').respond(200, applications);
    });
    it('should get the job status categories.', function() {
      vm.firstAppliedTabClick = true;
      spyOn(vm, 'updateServer').and.callFake(function() {
        return true;
      });
      var result;
      var promise = vm.appliedJobsVM.getApplicationStatuses();
      promise.then(function(data) {
        result = data.data;
        expect(result).toEqual(statuses);
      });

      vm.init();
      mockBackend.flush();
      expect(vm.manualStatuses).toEqual(statuses);
      expect(vm.updateServer).toHaveBeenCalled();
    });
    it('should break if vm.firstAppliedTabClick is false', function() {
      vm.firstAppliedTabClick = false;
      spyOn(vm, 'updateServer').and.callFake(function() {
        return true;
      });
      vm.init();
      mockBackend.flush();
      expect(vm.updateServer).not.toHaveBeenCalled();
    });
  });

  describe('function: updateServer()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });
    it('should fire a PUT call to trigger a job on the back-end.', function() {
      mockBackend.when('PUT', '/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications').respond(204);
      spyOn(vm, 'updateServer').and.callThrough();
      vm.updateServer();
      mockBackend.flush();
      expect(vm.updateServer).toHaveBeenCalled();
    });
    it('shouldn\'t care if the call fails.', function() {
      mockBackend.when('PUT', '/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications').respond(404);
      spyOn(vm, 'updateServer').and.callThrough();
      vm.updateServer();
      mockBackend.flush();
      expect(vm.updateServer).toHaveBeenCalled();
    });
  });

  describe('function: sendActivity()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });
    it('should build an object to pass into ActivityTracker.sendActivity()', function() {
      var index = 2;
      // jshint quotmark: true
      vm.results = [{
        "appliedDate": "2015-12-16T00:00:00.000Z",
        "jobId": 42362147,
        "jobTitle": "JavaScript Developer - 100% REMOTE - JavaScript,  JQuery Mobile",
        "company": "CyberCoders",
        "location": "Seattle, WA",
        "id": 12149,
        "jobStatus": "ACTIVE",
        "applyStatus": "Applied",
        "status": "ACTIVE",
        "lastUpdatedDate": "2015-12-16T21:35:12.000Z",
        "trackingType": "MANUAL",
        "atsTracked": false,
        "$$hashKey": "object:359"
      }, {
        "appliedDate": "2015-12-16T00:00:00.000Z",
        "jobId": 42781671,
        "jobTitle": "Senior Front End Engineer - HTML5, CSS, JavaScript",
        "company": "CyberCoders",
        "location": "Seattle, WA",
        "id": 12147,
        "jobStatus": "ACTIVE",
        "applyStatus": "Applied",
        "status": "ACTIVE",
        "lastUpdatedDate": "2015-12-16T21:09:00.000Z",
        "trackingType": "MANUAL",
        "atsTracked": false,
        "$$hashKey": "object:360"
      }, {
        "appliedDate": "2015-12-16T00:00:00.000Z",
        "jobId": 43641637,
        "jobTitle": "Front End Web Developer -",
        "company": "CyberCoders",
        "location": "Bellevue, WA",
        "id": 12145,
        "jobStatus": "ACTIVE",
        "applyStatus": "Applied",
        "status": "ACTIVE",
        "lastUpdatedDate": "2015-12-16T21:08:31.000Z",
        "trackingType": "MANUAL",
        "atsTracked": false,
        "$$hashKey": "object:361"
      }];
      // jshint quotmark: single

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/ghi/activity').respond(200, {});
      spyOn(ActivityTracker, 'setActivity');
      vm.sendActivity(index);
      mockBackend.flush();
      $rootScope.$digest();
      expect(ActivityTracker.setActivity).toHaveBeenCalled();
    });
  });

  describe('function: removeAppliedJob()', function() {
    var $uibModal;

    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });

    beforeEach(inject(function(_$uibModal_) {
      $uibModal = _$uibModal_;
    }));

    xit('should fire a $http promise and triger vm.init()', function() {
      var id = 'job007';
      mockBackend.whenPUT('/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications/job007')
        .respond(201, '{"status":"INACTIVE"}');
      mockBackend.whenGET('app/components/appliedJobsWidget/delete-job.html').respond(200, '<div></div>');
      spyOn(vm, 'init').and.callFake(function() {
        return true;
      });

      var result;
      var templatePromise = $uibModal.open({
        templateUrl: 'app/components/appliedJobsWidget/delete-job.html',
        size: 'md'
      });
      $rootScope.$apply();

      var promise = templatePromise.result;
      promise.then(function(response) {
        result = response;
        console.log(result);
        expect(response).toBeTruthy();
      });
      $rootScope.$apply();

      vm.removeAppliedJob(id);

      mockBackend.flush();
      expect(vm.init).toHaveBeenCalled();
    });

    xit('should fire a $http promise and triger vm.init() even after 404', function() {
      var id = 'job007';
      mockBackend.whenPUT('/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications/job007')
        .respond(404, '{}');
      spyOn(vm, 'init').and.callFake(function() {
        return true;
      });
      vm.removeAppliedJob(id);
      mockBackend.flush();
      expect(vm.init).toHaveBeenCalled();
    });
  });

  describe('function: showMoreItems()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });
    it('should increment vm.limit by one each time it is called.', function() {
      vm.limit = 1;
      spyOn(vm, 'getAppliedJobs').and.callFake(function() {
        return true;
      });
      vm.showMoreItems();
      // $rootScope.$digest();
      mockBackend.flush();
      expect(vm.limit).toEqual(2);
    });
    it('should call the function, getAppliedJobs()', function() {
      spyOn(vm, 'getAppliedJobs').and.callFake(function() {
        return true;
      });
      vm.showMoreItems();
      // $rootScope.$digest();
      mockBackend.flush();
      expect(vm.getAppliedJobs).toHaveBeenCalled();
    });
  });

  describe('function: getAppliedJobs()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, lists);
    });
    it('should break if vm.firstAppliedTabClick is false.', function() {
      vm.firstAppliedTabClick = false;
      vm.getAppliedJobs();
      mockBackend.flush();
      expect(vm.firstAppliedTabClick).toBe(false);
    });
    xit('should toggle firstAppliedTabClick to false if it is true.', function() {
      vm.firstAppliedTabClick = true;
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_dee999f6-d92d-4c59-8d43-83d3379b0b9d/jobs/applications')
        .respond(200, applications);
      vm.getAppliedJobs();
      mockBackend.flush();
      $rootScope.$apply();
      expect(vm.firstAppliedTabClick).toBe(false);
    });
  });

  xdescribe('function: appliedJobsError()', function() {
    it('should set vm.totalNumberOfResults to zero.', function() {
      vm.totalNumberOfResults = null;
      vm.appliedJobsError();
      $rootScope.$digest();
      mockBackend.flush();
      expect(vm.totalNumberOfResults).toBe(' 0 ');
    });
  });

  xdescribe('function: jobApply', function() {
    beforeEach(inject(function() {
      mockBackend.expectGET('app/components/appliedJobsWidget/atsModal.html').respond(201, {
        bleh: 'bleh'
      });
    }));
    it('should fire $uibModal.open and pass in an object.', function() {
      vm.jobApply();
      mockBackend.flush();
      expect(vm.modalInstance).toBeTruthy();
    });
  });

  xdescribe('variable: vm.data post-initialization', function() {
    it('should not reinitialize the array if it already defined.', function() {
      vm.data = ['a', 'b', 'c'];
      var lengthOfArray = vm.data.length;
      $rootScope.$digest();
      mockBackend.flush();
      expect(lengthOfArray).not.toBe(0);
      expect(lengthOfArray).toEqual(3);
      expect(vm.data).toEqual(['a', 'b', 'c']);
    });
  });

  xdescribe('variable: vm.data pre-initialization', function() {
    it('should initialize with an empty array if not already defined.', function() {
      var lengthOfArray = vm.data.length;
      mockBackend.flush();
      expect(lengthOfArray).toBe(0);
    });
  });

  xdescribe('function: submitATSLogin', function() {
    it('should call createFirstTimeLoginObj.', function() {

    });
  });
});
