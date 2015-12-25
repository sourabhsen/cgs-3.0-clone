'use strict';

describe('View Model: Career Exploration My Goals', function() {
  var vm, mockBackend, $rootScope, User,
    profileId = '1111-2222-3abc',
    mockPlaylistResponse = '{"list":[{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"1111-2222-3abc","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":193719,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193721,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193723,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":2,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193725,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.94","itemSequence":3,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193727,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":4,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193729,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":5,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"}]}]}';

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('careerExplorationMyGoals.vm');
  });


  afterEach(function() {
    if (mockBackend) {
      mockBackend.verifyNoOutstandingExpectation();
      mockBackend.verifyNoOutstandingRequest();
    }
    vm = mockBackend = $rootScope = User = undefined;
  });

  describe('getMyGoals()', function() {

    beforeEach(inject(function(CareerExplorationMyGoalsViewModel, _$httpBackend_, _$rootScope_, _User_) {
      mockBackend = _$httpBackend_;
      vm = CareerExplorationMyGoalsViewModel;
      $rootScope = _$rootScope_;
      User = _User_;
    }));

    var stateAreaId = '964',
      mockRonetsResponse = '{"items":[{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Low","hiringTrendPercentile":2.5,"hiringDemand":43,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":52870.0,"salaryTrendMin":"42150","salaryTrendMax":"61510","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"46674","salaryTrendRealTimeMin":"44330","salaryTrendRealTimeMax":"49018","description":"Coordinates internal and external communications for a company or organization.  Provides information to employees on company activities, such as the launch of a new product or a community service initiative.  Writes and edits public communications; develops media contacts and prepares material for press and media distribution; monitors media coverage. May assist with events planning. ","id":"explorer/jobs/304","name":"Communications Coordinator","degreeIntroStatement":"Depending on the applicant’s job experience, Communications Coordinator positions may require one or more of the following training or degree programs:","rOnet":"27-3031.95"},{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":35.0,"hiringDemand":613,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":28370.0,"salaryTrendMin":"22010","salaryTrendMax":"32780","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"21-1093.00"},{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":35.0,"hiringDemand":676,"salaryTrend":"$$$","salaryTrendPercentile":0.0,"salaryTrendAverage":93380.0,"salaryTrendMin":"75640","salaryTrendMax":"112710","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"73888","salaryTrendRealTimeMin":"72989","salaryTrendRealTimeMax":"74787","description":"Writes code, or instructions that a computer can follow, to create software programs.  Follows program designs created by software developers, and assists with software program design work.  Updates and expands programs,  tests for errors and fix errors.  Uses different computer languages as needed to write programs.","id":"explorer/jobs/116","name":"Computer Programmer","degreeIntroStatement":"Depending on the applicant’s job experience, Computer Programmer positions may require one or more of the following training or degree programs:","rOnet":"15-1131.91"},{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"High","hiringTrendPercentile":47.5,"hiringDemand":1108,"salaryTrend":"$$$","salaryTrendPercentile":0.0,"salaryTrendAverage":72430.0,"salaryTrendMin":"52340","salaryTrendMax":"88370","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"79404","salaryTrendRealTimeMin":"78280","salaryTrendRealTimeMax":"80527","description":"Designs and builds websites.  Works on technical as well as design aspects of sites.  Works with a company or client to plan content and format for a site, creates applications, writes code, and integrates design features including graphics, sound and video.  Monitors traffic at the site.","id":"explorer/jobs/119","name":"Web Developer","degreeIntroStatement":"Depending on the applicant’s job experience, Web Developer positions may require one or more of the following training or degree programs:","rOnet":"15-1134.92"},{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Low","hiringTrendPercentile":2.5,"hiringDemand":32,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":61850.0,"salaryTrendMin":"45790","salaryTrendMax":"73640","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"49262","salaryTrendRealTimeMin":"44938","salaryTrendRealTimeMax":"53587","description":"Coordinates public communications and media coverage, and develops and promotes a positive public image for a company or organization.  Responds to information requests. Prepares press releases, organizes press conferences or media appearances, develops media and community contacts, monitors print and online media reporting. May coordinate or speak at community events. ","id":"explorer/jobs/303","name":"Public Relations Specialist","degreeIntroStatement":"Depending on the applicant’s job experience, Public Relations Specialist positions may require one or more of the following training or degree programs:","rOnet":"27-3031.94"},{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Low","hiringTrendPercentile":2.5,"hiringDemand":20,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":61850.0,"salaryTrendMin":"45790","salaryTrendMax":"73640","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"58865","salaryTrendRealTimeMin":"50162","salaryTrendRealTimeMax":"67568","description":"Advises companies and clients on using media effectively for advertising and marketing.  Identifies target audience for advertising, researches customer demographics and cost options for different advertising outlets; reviews media programming and recommends a strategy for ad placements.","id":"explorer/jobs/302","name":"Media Planner","degreeIntroStatement":"Depending on the applicant’s job experience, Media Planner positions may require one or more of the following training or degree programs:","rOnet":"27-3031.93"}]}';

    it('should set goals to undefined if User not setup', function() {
      var result,
        errorMessage = 'User.profileId and User.profile.stateAreaId must be set';

      vm.getMyGoals().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goals).toBeUndefined();

      User.profileId = profileId;
      vm.getMyGoals().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goals).toBeUndefined();
    });

    it('should set goals when User setup', function() {
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(mockPlaylistResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=27-3031.95,21-1093.00,15-1131.91,27-3031.94,15-1134.92,27-3031.93&stateAreaId=964').respond(mockRonetsResponse);
      var playlist = null;
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId
      };
      vm.getMyGoals().then(function(data) {
        playlist = data;
      });
      expect(playlist).toBeNull();
      mockBackend.flush();
      expect(playlist).toBeDefined();
      expect(playlist).toEqual(vm.playlist);
      expect(playlist.listItems.length).toBe(6);
      expect(playlist.listItems[0].listId).toBe(34533);
      angular.forEach(playlist.listItems, function(goal) {
        expect(goal.$$details).toBeDefined();
        expect(goal.itemIdentifier).toBe(goal.$$details.rOnet);
      });

      // console.log(JSON.stringify(goals, undefined, 2));
    });

    it('should set goals to empty array when playlist returns 404', function() {
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(404, '');
      var playlist = null;
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId
      };
      vm.getMyGoals().then(function(data) {
        playlist = data;
      });
      expect(playlist).toBe(null);
      mockBackend.flush();
      expect(playlist.listItems.length).toBe(0);
      expect(playlist).toEqual(vm.playlist);
    });

    it('should reject when playlist returns non-404 error', function() {
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(503, '');
      var results = null;
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId
      };
      vm.getMyGoals().catch(function(err) {
        results = err;
      });
      mockBackend.flush();
      expect(vm.goals).toBeUndefined();
      expect(results.status).toBe(503);
    });
  });

  describe('openDeleteModal()', function() {
    beforeEach(function() {
      module('app/tools/careerExploration/myGoalDeleteModal.html');
      module('template/modal/backdrop.html');
      module('template/modal/window.html');
    });

    beforeEach(inject(function(CareerExplorationMyGoalsViewModel, _$rootScope_, $uibModal) {
      vm = CareerExplorationMyGoalsViewModel;
      $rootScope = _$rootScope_;
      this.$uibModal = $uibModal;
    }));

    it('should open modal', function() {
      var goal = {};

      spyOn(this.$uibModal, 'open').and.callThrough();

      vm.openDeleteModal(goal);
      expect(this.$uibModal.open).toHaveBeenCalled();
    });
  });

  describe('deleteGoal()', function() {

    var PlaylistCache;

    beforeEach(inject(function(CareerExplorationMyGoalsViewModel, _$httpBackend_, _$rootScope_, _User_, _PlaylistCache_) {
      mockBackend = _$httpBackend_;
      vm = CareerExplorationMyGoalsViewModel;
      $rootScope = _$rootScope_;
      User = _User_;
      PlaylistCache = _PlaylistCache_;
    }));

    it('should reject when goal not properly set', function() {
      var result,
        errorMessage = 'goal argument must be provided';

      vm.deleteGoal().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);

      vm.deleteGoal({}).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);

      vm.deleteGoal({
        listId: 1
      }).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
    });

    it('should reject profileId parameter not set', function() {
      var result,
        errorMessage = 'User.profileId must be set';

      vm.deleteGoal({
        listId: 1,
        listItemId: 2
      }).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
    });

    it('should properly delete a goal', function() {
      User.profileId = profileId;
      PlaylistCache.getByType('RONET').then(function(playlist) {
        vm.playlist = playlist;
      });
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(mockPlaylistResponse);
      mockBackend.flush();
      expect(vm.playlist.listItems.length).toBe(6);


      var goal = angular.copy(vm.playlist.listItems[2]);
      vm.deleteGoal(goal);
      mockBackend.expectDELETE('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/34533/items/193723').respond(200);
      mockBackend.flush();

      expect(vm.playlist.listItems.length).toBe(5);

      // console.log(JSON.stringify(vm.playlist, null, 2));

      // for code coverage, delete same goal again since it will not be found in master item list
      vm.deleteGoal(goal);
      mockBackend.expectDELETE('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/34533/items/193723').respond(200);
      mockBackend.flush();
      expect(vm.playlist.listItems.length).toBe(5);
    });

    it('should reject on service error', function() {
      var result;

      User.profileId = profileId;
      PlaylistCache.getByType('RONET').then(function(playlist) {
        vm.playlist = playlist;
      });
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(mockPlaylistResponse);
      mockBackend.flush();
      expect(vm.playlist.listItems.length).toBe(6);

      vm.deleteGoal(vm.playlist.listItems[4]).catch(function(err) {
        result = err;
      });
      mockBackend.expectDELETE('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/34533/items/193727').respond(503);
      mockBackend.flush();
      expect(result.status).toBe(503);
    });
  });

  describe('saveGoalOrdering()', function() {

    var PlaylistCache;

    beforeEach(inject(function(CareerExplorationMyGoalsViewModel, _$httpBackend_, _$rootScope_, _User_, _PlaylistCache_) {
      mockBackend = _$httpBackend_;
      vm = CareerExplorationMyGoalsViewModel;
      $rootScope = _$rootScope_;
      User = _User_;
      PlaylistCache = _PlaylistCache_;
    }));


    it('should reject when no goals', function() {
      var result,
        errorMessage = 'No goals to save';

      vm.saveGoalOrdering().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);

      vm.playlist = {
        listItems: []
      };
      vm.saveGoalOrdering().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
    });

    it('should reject profileId parameter not set', function() {
      var result,
        errorMessage = 'User.profileId must be set';

      vm.playlist = {
        listItems: [{
          listId: 1
        }]
      };

      vm.saveGoalOrdering().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
    });

    it('should properly save goal ordering', function() {
      var updatePlaylistResponse = '{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"1111-2222-3abc","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":193719,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193721,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193723,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":2,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193725,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.94","itemSequence":3,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193727,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":4,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"},{"listItemId":193729,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":5,"itemStatus":"SAVED","createDate":"2015-07-16T22:56:02.000Z"}]}';

      User.profileId = profileId;
      PlaylistCache.getByType('RONET').then(function(playlist) {
        vm.playlist = playlist;
      });
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(mockPlaylistResponse);
      mockBackend.flush();
      expect(vm.playlist.listItems.length).toBe(6);

      vm.saveGoalOrdering();
      mockBackend.expectPUT('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/34533').respond(200, updatePlaylistResponse);
      mockBackend.flush();

      // should be PlaylistItems
      angular.forEach(vm.playlist.listItems, function(val) {
        expect(val.$delete).toBeDefined();
      });
    });
  });

  describe('init()', function() {
    var $q;
    beforeEach(inject(function(CareerExplorationMyGoalsViewModel, _User_, _$q_, _$rootScope_) {
      vm = CareerExplorationMyGoalsViewModel;
      User = _User_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    }));

    it('should successfully init', function() {
      spyOn(User, 'get').and.callFake(function() {
        return $q.when({});
      });
      spyOn(vm, 'getMyGoals');
      vm.init();
      $rootScope.$digest();


      expect(User.get).toHaveBeenCalled();
      expect(vm.getMyGoals).toHaveBeenCalled();
    });
  });

});
