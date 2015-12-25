'use strict';

describe('View Model: JobApplyViewModel', function() {
  var $q, PlaylistCache, $resource, $rootScope, jobApplyVM, mockBackend, $uibModal, jobVM, Jobs, ActivityTracker, User, $stateParams;

  var playlistObj = {
    'list': [{
      'listId': 34741,
      'tenantName': 'uopx',
      'name': 'MyJobs',
      'listType': 'JOB',
      'ownerType': 'USER',
      'userIdentifier': 'apt_af63eee8-01dc-42df-b107-eca7afddad9d',
      'userIdentifierType': 'USER',
      'privacyType': 'Private',
      'description': 'My Saved Jobs',
      'createDate': '2015-07-09T17:15:45.000Z',
      'listItems': [{
        'listItemId': 197433,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '27144379',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T22:35:49.000Z'
      }, {
        'listItemId': 197431,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '27681431',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T22:35:46.000Z'
      }, {
        'listItemId': 196787,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '27100801',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T19:40:04.000Z'
      }, {
        'listItemId': 190021,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '24806763',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-09T17:15:48.000Z'
      }, {
        'listItemId': 190019,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '24925781',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-09T17:15:47.000Z'
      }, {
        'listItemId': 190017,
        'listId': 34741,
        'itemType': 'JOB',
        'itemIdentifier': '24926293',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-09T17:15:45.000Z'
      }]
    }, {
      'listId': 35173,
      'tenantName': 'uopx',
      'name': 'MyGoals',
      'listType': 'RONET',
      'ownerType': 'USER',
      'userIdentifier': 'apt_af63eee8-01dc-42df-b107-eca7afddad9d',
      'userIdentifierType': 'USER',
      'privacyType': 'Private',
      'description': 'My goal list',
      'createDate': '2015-07-14T17:25:00.000Z',
      'listItems': [{
        'listItemId': 196503,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '15-1131.00',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T17:25:17.000Z'
      }, {
        'listItemId': 196501,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '17-3012.00',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T17:24:16.000Z'
      }, {
        'listItemId': 196497,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '15-1199.01',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T17:24:05.000Z'
      }, {
        'listItemId': 196493,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '15-1121.00',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-21T17:23:44.000Z'
      }, {
        'listItemId': 195645,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '17-3025.00',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-20T23:11:09.000Z'
      }, {
        'listItemId': 195637,
        'listId': 35173,
        'itemType': 'RONET',
        'itemIdentifier': '13-2082.00',
        'itemSequence': 1,
        'itemStatus': 'SAVED',
        'createDate': '2015-07-20T23:10:52.000Z'
      }]
    }]
  };

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('JobApply.vm');
    module('JobsViewModel');
    module('ui.router');
    module('ngResource');
    module('apolloPlaylistCache');
  });

  beforeEach(inject(function(_$q_, _PlaylistCache_, _$resource_, _JobApplyViewModel_, _$httpBackend_, _$uibModal_, _JobsViewModel_, _Jobs_, _ActivityTracker_, _User_, _$stateParams_, _$rootScope_) {
    PlaylistCache = _PlaylistCache_;
    mockBackend = _$httpBackend_;
    jobApplyVM = _JobApplyViewModel_;
    $uibModal = _$uibModal_;
    jobVM = _JobsViewModel_;
    Jobs = _Jobs_;
    ActivityTracker = _ActivityTracker_;
    User = _User_;
    $stateParams = _$stateParams_;
    $rootScope = _$rootScope_;
    $resource = _$resource_;
    $q = _$q_;
  }));

  beforeEach(function() {

    mockBackend.whenGET('app/tools/jobApply/modal.html').respond('');
    // mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    jobVM.jobApply('http://www.google.com');
    jobVM.details = {};
    jobVM.details.companyId = 5678;
  });

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    jobApplyVM = $stateParams = mockBackend = $uibModal = jobVM = Jobs = ActivityTracker = User = undefined;
  });

  describe('function: PlaylistCache - initial load of job.', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    it('should load the playlist and apply it to the playlist variable.', function() {
      var requestPromise = PlaylistCache.getByType('JOB');

      requestPromise.then(function(playlistResponse) {
        jobApplyVM.playlist = playlistResponse;
      });

      $rootScope.$digest();
      mockBackend.flush();
      expect(jobApplyVM.playlist).toBeTruthy();
    });
  });

  describe('function: PlaylistCache - service failure (404).', function() {
    beforeEach(function() {
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/lists').respond(404, {
        data: 'Error'
      });
    });
    it('should return an empty object if 404', function() {
      jobApplyVM.playlist = null;
      var requestPromise = PlaylistCache.getByType('JOB');
      requestPromise.catch(function(err) {
        if (err.status === 404) {
          return {};
        } else {
          return $q.reject(err);
        }
      });

      $rootScope.$digest();
      mockBackend.flush();
      var objTest = Object.keys(jobApplyVM.playlist).length;
      expect(objTest).toBe(0);
    });
  });

  describe('function: PlaylistCache - service failure.', function() {
    beforeEach(function() {
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/lists').respond(500, {
        data: '500 Error'
      });
    });
    it('should return the error response.', function() {
      var err;
      jobApplyVM.playlist = null;
      var requestPromise = PlaylistCache.getByType('JOB');
      requestPromise.catch(function(err) {
        if (err.status === 404) {
          return {};
        } else {
          err = $q.reject(err);
          return $q.reject(err);
        }
      });
      $rootScope.$digest();
      mockBackend.flush();
      expect($q.reject(err)).toBeTruthy();
    });
  });

  describe('function: deleteSavedJob()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });

    it('should call callPlaylistDelete() if a saved job match is found.', function() {
      $stateParams.id = 3;
      spyOn(jobApplyVM, 'callPlaylistDelete').and.returnValue(true);
      jobApplyVM.playlist = {
        listItems: [{
          itemIdentifier: 1
        }, {
          itemIdentifier: 2
        }, {
          itemIdentifier: 3
        }, {
          itemIdentifier: 4
        }, {
          itemIdentifier: 5
        }]
      };
      jobApplyVM.deleteSavedJob();

      mockBackend.flush();
      expect(jobApplyVM.callPlaylistDelete).toHaveBeenCalled();
    });
    it('should return null if no saved job match is found.', function() {
      $stateParams.id = 3;
      spyOn(jobApplyVM, 'callPlaylistDelete').and.returnValue(true);
      jobApplyVM.playlist = {
        listItems: [{
          itemIdentifier: 1
        }, {
          itemIdentifier: 2
        }, {
          itemIdentifier: 6
        }, {
          itemIdentifier: 4
        }, {
          itemIdentifier: 5
        }]
      };
      jobApplyVM.deleteSavedJob();

      mockBackend.flush();
      expect(jobApplyVM.callPlaylistDelete).not.toHaveBeenCalled();
    });
  });

  xdescribe('function: callPlaylistDelete()', function() {
    // I do not know how to test the $delete() function.
  });

  describe('submitAppStatus()', function() {
    beforeEach(function() {
      $stateParams.id = '27144385';
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    it('should, when user has selected \'I applied for the job\', and hideConfirmation is false, call job activity and show the confirmation message', function() {
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.job.jobId = 5678;
      User.profileId = '123';
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      // POST /api/job-service/1/cgsdemo/jobs/undefined/activity
      spyOn(jobApplyVM, 'setJobActivity').and.callThrough();
      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      expect(jobApplyVM.setJobActivity).toHaveBeenCalled();
      expect(jobApplyVM.showDidApplyForm).toBe(false);
      expect(jobApplyVM.showConfirmationMessage).toBe(true);
    });
    it('should, when user has selected \'I applied for the job\', and hideConfirmation is true, call job activity, then call setJobAppliedStatus, and close the modal window', function() {
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.hideConfirmation = true;
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      spyOn(jobApplyVM, 'setJobActivity').and.callThrough();
      spyOn(jobApplyVM, 'setJobAppliedStatus');
      spyOn(jobVM.modalInstance, 'close');
      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      expect(jobApplyVM.setJobActivity).toHaveBeenCalled();
      expect(jobApplyVM.showDidApplyForm).toBe(false);
      expect(jobApplyVM.showConfirmationMessage).toBe(false);
      expect(jobApplyVM.setJobAppliedStatus).toHaveBeenCalled();
      expect(jobVM.modalInstance.close).toHaveBeenCalled();
    });
    it('should set showATSLogin to true, if job isATSTracked and user selects \'I applied for the job\'', function() {
      jobVM.isATSTracked = true;
      jobVM.details = {};
      jobVM.details.companyId = 1234;
      jobApplyVM.applicationStatus = 'yes';
      User.profileId = '123';
      var response = {
        data: {
          connectionStatus: 'ACTIVE'
        }
      };
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/123/jobs/applications/companies/1234/connections').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, response);
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      jobApplyVM.submitAppStatus();
      $rootScope.$digest();
      mockBackend.flush();
    });
    it('should set hasATSConnection to true if the job is ATS tracked', function() {
      jobApplyVM.hasATSConnection = false;
      jobVM.isATSTracked = true;
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.job.jobId = 5678;
      User.profileId = '123';
      var getObj = {connectionStatus: 'ACTIVE'};
      var result;

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/123/jobs/applications/companies/5678/connections').respond(201, getObj);

      var requestPromise = jobApplyVM.getATSConnectionStatus();
      requestPromise.then(function(data) {
        result = data;
        expect(result.data.connectionStatus).toBe('ACTIVE');
      });

      spyOn(jobApplyVM, 'confirmAndClose').and.returnValue(true);

      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      $rootScope.$apply();

      expect(jobApplyVM.hasATSConnection).toBe(true);
      expect(jobApplyVM.showDidApplyForm).toBe(false);
      expect(jobApplyVM.confirmAndClose).toHaveBeenCalled();
    });

    it('should set hasInvalidCredentials to true if the job is ATS tracked and the call returns invalid-credentials', function() {
      jobApplyVM.hasATSConnection = false;
      jobVM.isATSTracked = true;
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.job.jobId = 5678;
      User.profileId = '123';
      var getObj = {connectionStatus: 'INVALID_CREDENTIALS'};
      var result;

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/123/jobs/applications/companies/5678/connections').respond(201, getObj);

      var requestPromise = jobApplyVM.getATSConnectionStatus();
      requestPromise.then(function(data) {
        result = data;
        expect(result.data.connectionStatus).toBe('INVALID_CREDENTIALS');
      });

      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      $rootScope.$apply();

      expect(jobApplyVM.hasATSConnection).toBe(false);
      expect(jobApplyVM.hasInvalidCredentials).toBe(true);
      expect(jobApplyVM.showDidApplyForm).toBe(false);

    });

    it('should set showDidApplyForm to false and close the modal if getATSConnectionStatus returns an error.', function() {
      jobApplyVM.hasATSConnection = false;
      jobVM.isATSTracked = true;
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.job.jobId = 5678;
      User.profileId = '123';
      var getObj = {};
      var result;

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/123/jobs/applications/companies/5678/connections').respond(404, getObj);

      var requestPromise = jobApplyVM.getATSConnectionStatus();
      requestPromise.catch(function(err) {
        result = err;
        expect(result.status).toBe(404);
      });

      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      $rootScope.$apply();

      expect(jobApplyVM.showDidApplyForm).toBe(false);
      expect(jobApplyVM.showATSLogin).toBe(true);
    });

    it('should do nothing when setJobActivity service fails', function() {
      jobApplyVM.applicationStatus = 'yes';
      jobApplyVM.job = {};
      jobApplyVM.hideConfirmation = true;
      User.profileId = '123';
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/123/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(404, '');
      spyOn(jobApplyVM, 'setJobActivity').and.callThrough();
      jobApplyVM.submitAppStatus();
      mockBackend.flush();
    });
    it('should, when user has selected \'This job doesn\'t exist or no longer available.\', call job activity and close the modal window', function() {
      jobApplyVM.applicationStatus = 'missing';
      jobApplyVM.job = {};
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/27144385/activity').respond(201, '');
      spyOn(jobApplyVM, 'setJobActivity').and.callThrough();
      spyOn(jobVM.modalInstance, 'close');
      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      expect(jobApplyVM.setJobActivity).toHaveBeenCalled();
      expect(jobVM.modalInstance.close).toHaveBeenCalled();
    });
    it('should, when user has selected \'I didn\'t apply for the job.\', close the modal window', function() {
      jobApplyVM.applicationStatus = 'no';
      spyOn(jobVM.modalInstance, 'close');
      jobApplyVM.submitAppStatus();
      mockBackend.flush();
      expect(jobVM.modalInstance.close).toHaveBeenCalled();
    });
  });

  describe('function: getATSConnectionStatus', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    beforeEach(function() {
      User.profileId = 'apt_1234';
    });
    it('should return an object', function() {
      var getReq = '/api/job-service/1/cgsdemo/users/apt_1234/jobs/applications/companies/5678/connections';
      var getReqData = {};
      mockBackend.expectGET(getReq).respond(201, getReqData);
      var returnedObj = jobApplyVM.getATSConnectionStatus();
      mockBackend.flush();
      expect(typeof returnedObj).toBe('object');
    });
    it('should return an empty object if 404', function() {
      var getReq = '/api/job-service/1/cgsdemo/users/apt_1234/jobs/applications/companies/5678/connections';
      mockBackend.expectGET(getReq).respond(404);
      var returnedObj = jobApplyVM.getATSConnectionStatus();
      mockBackend.flush();
      expect(typeof returnedObj).toBe('object');
    });
  });

  describe('function: confirmAndClose()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    it('should set several variables to false.', function() {
      jobApplyVM.hideConfirmation = true;
      jobApplyVM.confirmAndClose();
      mockBackend.flush();
      expect(jobApplyVM.showATSLogin).toBe(false);
      expect(jobApplyVM.atsSuccess).toBe(false);
      expect(jobApplyVM.atsLoginError).toBe(false);
      expect(jobApplyVM.atsServiceError).toBe(false);
    });

    it('should call jobVM.modalInstance.close() when the hideConfirmation variable is true.', function() {
      jobApplyVM.hideConfirmation = true;
      spyOn(jobVM.modalInstance, 'close');
      jobApplyVM.confirmAndClose();
      mockBackend.flush();
      expect(jobApplyVM.showConfirmationMessage).toBe(false);
      expect(jobVM.modalInstance.close).toHaveBeenCalled();
    });

    it('should show the confirmation message when hideConfirmation variable is false.', function() {
      jobApplyVM.hideConfirmation = false;
      jobApplyVM.confirmAndClose();
      mockBackend.flush();
      expect(jobApplyVM.showConfirmationMessage).toBe(true);
    });
  });

  // describe('function: setJobActivity()');

  describe('function: checkJobAgain()', function() {
    it('should return an empty object when the playlist call is a 404', function() {
      var result;
      spyOn(jobApplyVM, 'deleteSavedJob').and.callThrough();
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(404, '');
      jobApplyVM.checkJobAgain();
      PlaylistCache.getByType('JOB').catch(function(err) {
        result = err;
      });
      mockBackend.flush();

      expect(result.status).toBe(404);
      expect(jobApplyVM.deleteSavedJob).not.toHaveBeenCalled();
    });
    it('should reject the promise when call fails and is not a 404.', function() {
      var result;
      spyOn(jobApplyVM, 'deleteSavedJob').and.callThrough();
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(500, '');
      jobApplyVM.checkJobAgain();
      PlaylistCache.getByType('JOB').catch(function(err) {
        result = err;
      });
      mockBackend.flush();
      expect(result.status).toBe(500);
      expect(result.data).toBe('');
      expect(jobApplyVM.deleteSavedJob).not.toHaveBeenCalled();
    });
    it('should call playlistCache "JOB" again and call deleteSavedJob() if necessary.', function() {
      var playlist;
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(200, playlistObj);
      spyOn(jobApplyVM, 'deleteSavedJob').and.callThrough();
      jobApplyVM.checkJobAgain();
      mockBackend.flush();
      PlaylistCache.getByType('JOB').then(function(data) {
        playlist = data;
        expect(playlist.listItems.length > 0).toBe(true);
        expect(jobApplyVM.deleteSavedJob).toHaveBeenCalled();
      });
    });
  });

  describe('function: setJobAppliedStatus()', function() {
    it('should set a new applied job and run deleteSavedJob() when there are listItems.', function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications').respond(200, 1211);
      spyOn(jobApplyVM, 'deleteSavedJob').and.callThrough();
      var result;
      var requestPromise = ActivityTracker.setAppliedJob({
        profileId: User.profileId,
        jobId: $stateParams.id,
        companyId: jobVM.details.companyId
      });
      requestPromise.then(function(data) {
        result = data;
        expect(result.data).toBe(1211);
      });
      jobApplyVM.setJobAppliedStatus();
      $rootScope.$apply();
      mockBackend.flush();
      expect(jobApplyVM.deleteSavedJob).toHaveBeenCalled();
    });

    it('should set a new applied job and run checkJobAgain() when there are no listItems.', function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(404, {});
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications').respond(200, 1211);
      spyOn(jobApplyVM, 'checkJobAgain').and.callThrough();
      var result;
      var requestPromise = ActivityTracker.setAppliedJob({
        profileId: User.profileId,
        jobId: $stateParams.id,
        companyId: jobVM.details.companyId
      });
      requestPromise.then(function(data) {
        result = data;
        expect(result.data).toBe(1211);
      });
      jobApplyVM.setJobAppliedStatus();
      $rootScope.$apply();
      mockBackend.flush();
      expect(jobApplyVM.checkJobAgain).toHaveBeenCalled();
    });
  });

  describe('function: getUserConfirmationPreference()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    var requestPromise, response;
    it('should should set hideConfirmation to true if users preferences are set to true.', function() {
      jobApplyVM.hideConfirmation = false;
      User.profileId = 'bleh';
      // set the mock
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/bleh/jobs/applications/confirmation').respond(201, {
        data: {
          hideMessage: true
        }
      });
      jobApplyVM.getUserConfirmationPreference();
      // set the promise to a variable (copy the code)
      requestPromise = ActivityTracker.getUserConfirmationPreference({
        profileId: User.profileId
      });
      // apply the promise modifications
      requestPromise.then(function(resp) {
        response = resp.data;
      });
      mockBackend.flush();
      $rootScope.$digest();
      expect(response.data.hideMessage).toEqual(true);
    });
    it('should set hideConfirmation to false if no value is returned from the request', function() {
      jobApplyVM.hideConfirmation = false;
      User.profileId = 'bleh';
      jobApplyVM.getUserConfirmationPreference();

      // set the mock
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/bleh/jobs/applications/confirmation').respond(404);

      // set the promise to a variable (copy the code)
      requestPromise = ActivityTracker.getUserConfirmationPreference({
        profileId: User.profileId
      });

      // apply the promise modifications
      requestPromise.then(function(resp) {
        response = resp.data;
      });

      mockBackend.flush();
      $rootScope.$digest();

      expect(jobApplyVM.hideConfirmation).toBe(false);
    });
  });

  describe('function: setUserConfirmationPreference()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    var requestPromise, response;
    it('should set the user preference to hide popup if vm.hideConfirmation is true.', function() {
      jobApplyVM.hideConfirmation = true;
      User.profileId = 'fozzyBear';
      spyOn(jobVM.modalInstance, 'close').and.callThrough();
      jobApplyVM.setUserConfirmationPreference();
      mockBackend.when('PUT', '/api/job-service/1/cgsdemo/users/fozzyBear/jobs/applications/confirmation').respond(200, {});

      requestPromise = ActivityTracker.setUserConfirmationPreference({
        profileId: User.profileId,
        hideMessage: true
      }, {
        hideMessage: false
      });

      requestPromise.then(function(resp) {
        response = resp.data;
      });

      mockBackend.flush();
      $rootScope.$digest();

      expect(jobVM.modalInstance.close).toHaveBeenCalled();


    });
  });

  describe('function: formATSLoginRequestObject', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    it('should construct and return the formATSLoginRequestObject object', function() {
      User.profileId = '1234';
      jobApplyVM.username = 'Mickey';
      jobApplyVM.password = 'Mouse';
      jobApplyVM.applicationId = '5678';
      $stateParams.id = 'beta123';
      jobVM.details = {};
      jobVM.details.companyId = 1212;

      var obj = jobApplyVM.formATSLoginRequestObject();
      mockBackend.flush();
      var isObj = typeof obj;
      expect(obj).toBeTruthy();
      expect(isObj).toBe('object');
    });
  });

  describe('function: formCredUpdateObject', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    it('should construct and return the formCredUpdateObject object', function() {
      User.profileId = '1234';
      jobApplyVM.applicationId = '5678';
      jobApplyVM.username = 'Mickey';
      jobApplyVM.password = 'Mouse';
      jobVM.details.companyId = 1212;

      var obj = jobApplyVM.formCredUpdateObject();
      var isObj = typeof obj;
      mockBackend.flush();
      expect(obj).toBeTruthy();
      expect(isObj).toBe('object');
    });
  });

  describe('submitATSLogin()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    var requestPromise;

    var ATSLoginRequestObject = {
      profileId: '1234',
      atsUserCredentials: {
        username: 'Mickey',
        password: 'Mouse'
      },
      applicationId: '5678',
      jobId: 'beta123',
      companyId: '1212'
    };
    var CredUpdateObject = {
      profileId: '1234',
      applicationId: '5678',
      username: 'Mickey',
      password: 'Mouse',
      companyId: '1212'
    };

    beforeEach(inject(function() {
      jobVM.details = {};
      jobVM.details.companyId = '1212';
      User.profileId = '1234';

      spyOn(jobApplyVM, 'formATSLoginRequestObject').and.returnValue(ATSLoginRequestObject);
      spyOn(jobApplyVM, 'formCredUpdateObject').and.returnValue(CredUpdateObject);

    }));

    it('should request an update of credentials if vm.hasInvalidCredentials is true.', function() {
      jobApplyVM.hasInvalidCredentials = true;
      mockBackend.expectPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(201, '');
      mockBackend.expectPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications/companies/undefined/credentials').respond(404, '');
      jobApplyVM.submitATSLogin();

      requestPromise = ActivityTracker.updateATSCredentials(CredUpdateObject);
      requestPromise.then(function() {
        jobApplyVM.atsPending = false;
        jobApplyVM.atsSuccess = true;
        jobApplyVM.confirmAndClose();
      });

      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.confirmAndClose).toHaveBeenCalled();
    });

    it('should set atsServiceError to true if service returns 404', function() {
      jobApplyVM.hasInvalidCredentials = true;

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(404, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications/companies/undefined/credentials').respond(404, '');
      jobApplyVM.submitATSLogin();


      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();

      expect(jobApplyVM.atsServiceError).toBe(true);

    });

    it('should set vm.atsLoginError to true if service returns a Validation error', function() {
      jobApplyVM.hasInvalidCredentials = true;

      var dataResp = {
        type: 'VALIDATION'
      };

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(404, dataResp);
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications/companies/undefined/credentials').respond(404, dataResp);
      jobApplyVM.submitATSLogin();

      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.atsLoginError).toBe(true);

    });

    it('should close the modal if credentials are valid.', function() {
      jobApplyVM.hasInvalidCredentials = false;
      jobApplyVM.hasATSConnection = true;

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications/companies/undefined/credentials').respond(201, '');
      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      jobApplyVM.submitATSLogin();

      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.confirmAndClose).toHaveBeenCalled();

    });

    it('should post updated credentials and close the modal if credentials are valid hasATSConnection is false.', function() {
      jobApplyVM.hasInvalidCredentials = false;
      jobApplyVM.hasATSConnection = false;

      jobVM.details = {};
      jobVM.details.companyId = '1212';
      User.profileId = '1234';

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications').respond(201, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications').respond(201, '');
      // mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(201, '');
      jobApplyVM.submitATSLogin();

      requestPromise = ActivityTracker.setAppliedJob(CredUpdateObject);
      requestPromise.then(function() {
        jobApplyVM.atsPending = false;
        jobApplyVM.atsSuccess = true;
        jobApplyVM.confirmAndClose();
      });

      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.confirmAndClose).toHaveBeenCalled();

    });

    it('should set vm.atsLoginError to true if service returns a Validation error', function() {
      jobApplyVM.hasInvalidCredentials = false;
      jobApplyVM.hasATSConnection = false;

      var dataResp = {
        type: 'VALIDATION'
      };

      jobVM.details = {};
      jobVM.details.companyId = '1212';
      User.profileId = '1234';

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications').respond(404, dataResp);
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications').respond(404, dataResp);
      // mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(201, '');
      jobApplyVM.submitATSLogin();

      requestPromise = ActivityTracker.setAppliedJob(CredUpdateObject);
      requestPromise.then(function() {
        jobApplyVM.atsPending = false;
        jobApplyVM.atsSuccess = true;
        jobApplyVM.confirmAndClose();
      });

      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.atsLoginError).toBe(true);
    });

    it('should set vm.atsLoginError to true if service returns a Validation error', function() {
      jobApplyVM.hasInvalidCredentials = false;
      jobApplyVM.hasATSConnection = false;

      jobVM.details = {};
      jobVM.details.companyId = '1212';
      User.profileId = '1234';

      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications').respond(404, '');
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/undefined/jobs/applications').respond(404, '');
      // mockBackend.whenPOST('/api/job-service/1/cgsdemo/users/1234/jobs/applications/companies/1212/credentials').respond(201, '');
      jobApplyVM.submitATSLogin();

      requestPromise = ActivityTracker.setAppliedJob(CredUpdateObject);
      requestPromise.then(function() {
        jobApplyVM.atsPending = false;
        jobApplyVM.atsSuccess = true;
        jobApplyVM.confirmAndClose();
      });

      spyOn(jobApplyVM, 'confirmAndClose').and.callThrough();
      $rootScope.$digest();
      mockBackend.flush();

      expect(jobApplyVM.formATSLoginRequestObject).toHaveBeenCalled();
      expect(jobApplyVM.formCredUpdateObject).toHaveBeenCalled();
      expect(jobApplyVM.atsServiceError).toBe(true);
    });
  });

  describe('function: initModal()', function() {
    beforeEach(function() {
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(playlistObj);
    });
    beforeEach(function() {
      spyOn(jobApplyVM, 'getUserConfirmationPreference').and.returnValue(true);
      jobApplyVM.initModal();
      mockBackend.flush();
    });
    it('should set several module variables to false.', function() {
      expect(jobApplyVM.atsSuccess).toBe(false);
      expect(jobApplyVM.atsLoginError).toBe(false);
      expect(jobApplyVM.atsServiceError).toBe(false);
      expect(jobApplyVM.atsPending).toBe(false);
      expect(jobApplyVM.showATSLogin).toBe(false);
      expect(jobApplyVM.showFocusTalent).toBe(false);
      expect(jobApplyVM.showConfirmationMessage).toBe(false);
    });
    it('should set showDidApplyForm to true', function() {
      expect(jobApplyVM.showDidApplyForm).toBe(true);
    });
    it('should set applicationStatus to null for some reason', function() {
      expect(jobApplyVM.applicationStatus).toBe(null);
    });
    it('should get the users preferences.', function() {
      expect(jobApplyVM.getUserConfirmationPreference).toHaveBeenCalled();
    });
  });

});
