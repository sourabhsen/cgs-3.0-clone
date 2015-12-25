'use strict';

describe('View Model: Career Exploration', function() {
  var CareerExplorationViewModel, mockBackend, $rootScope, User;

  var CONFIG = {
    'config.constants': {
      'goalCounter': {
        'offset': 100
      }
    }
  };

  beforeEach(function() {
    module('careerExploration', function($provide) {
      $provide.value('CONFIG', CONFIG);
    });
  });

  beforeEach(inject(function(_CareerExplorationViewModel_, _$httpBackend_, _$rootScope_,  _User_) {
    mockBackend = _$httpBackend_;
    CareerExplorationViewModel = _CareerExplorationViewModel_;
    $rootScope = _$rootScope_;
    User = _User_;
    User.profileId = '1111-2222-3abc';
    User.profile = {
      programCode: 'BSHS/M',
      stateAreaId: 639
    };

  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    CareerExplorationViewModel = mockBackend = $rootScope = User = undefined;
  });

  xdescribe('getGoalsByProgram()', function() {
    var mockProgramResponse = '{"jobCodes":[{"name":"Social / Human Service Assistant","jobCodeType":"RONET","id":"21-1093.00"},{"name":"Social Services Manager","jobCodeType":"RONET","id":"11-9151.00"}],"noOfJobsOpenings":"656","salaryRange":"20760.0-74570.0","salaryTrendMin":20760.0,"salaryTrendMax":74570.0,"salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"52949","tenantDegrees":[{"programId":"BSHS/M","programName":"Bachelor Of Science In Human Services/Management","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/human-services/bachelors/bshs-m.html","programLevel":"Bachelors"}],"generalDegrees":[{"programId":"explorer/degrees/11004","programName":"Associate\'s Degree - Human Development and Family Studies","programLevel":"Associate"},{"programId":"explorer/degrees/11330","programName":"Associate\'s Degree - Psychology","programLevel":"Associate"},{"programId":"explorer/degrees/10502","programName":"Bachelor\'s Degree - Behavioral Sciences","programLevel":"Bachelor"},{"programId":"explorer/degrees/10712","programName":"Bachelor\'s Degree - Criminal Justice and Law Enforcement","programLevel":"Bachelor"},{"programId":"explorer/degrees/11005","programName":"Bachelor\'s Degree - Human Development and Family Studies","programLevel":"Bachelor"},{"programId":"explorer/degrees/11016","programName":"Bachelor\'s Degree - Human Services Administration and Community Organization/Advocacy","programLevel":"Bachelor"},{"programId":"explorer/degrees/11216","programName":"Bachelor\'s Degree - Non-Profit/Public/Organizational Management","programLevel":"Bachelor"},{"programId":"explorer/degrees/11331","programName":"Bachelor\'s Degree - Psychology","programLevel":"Bachelor"},{"programId":"explorer/degrees/11335","programName":"Bachelor\'s Degree - Public Health","programLevel":"Bachelor"},{"programId":"explorer/degrees/11340","programName":"Bachelor\'s Degree - Public Policy and Administration","programLevel":"Bachelor"},{"programId":"explorer/degrees/11400","programName":"Bachelor\'s Degree - Social Work","programLevel":"Bachelor"},{"programId":"explorer/degrees/11003","programName":"Certificate - Human Development and Family Studies","programLevel":"Certificate"},{"programId":"explorer/degrees/11497","programName":"Certificate - Youth Services/Administration","programLevel":"Certificate"},{"programId":"explorer/degrees/10503","programName":"Graduate/Professional Degree - Behavioral Sciences","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/10613","programName":"Graduate/Professional Degree - Clinical, Counseling and Applied Psychology","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/10713","programName":"Graduate/Professional Degree - Criminal Justice and Law Enforcement","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11006","programName":"Graduate/Professional Degree - Human Development and Family Studies","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11217","programName":"Graduate/Professional Degree - Non-Profit/Public/Organizational Management","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11332","programName":"Graduate/Professional Degree - Psychology","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11333","programName":"Graduate/Professional Degree - Public Administration","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11336","programName":"Graduate/Professional Degree - Public Health","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11401","programName":"Graduate/Professional Degree - Social Work","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11498","programName":"Graduate/Professional Degree - Youth Services/Administration","programLevel":"GraduateProfessional"}],"familyNames":[{"id":"21-1000","name":"Counselors and Other Community and Social Service Specialists","type":"MINOR"},{"id":"11-9000","name":"Other Management Occupations","type":"MINOR"}]}',
      mockRonetResponse = '{"items":[{"stateAreaId":639,"scopeAreaId":639,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":20.0,"hiringDemand":470,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":29450.0,"salaryTrendMin":"20760","salaryTrendMax":"35340","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"21-1093.00"}]}',
      //mockBadRonetResponse = '{"items":[{"stateAreaId":639,"scopeAreaId":639,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":20.0,"hiringDemand":470,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":29450.0,"salaryTrendMin":"20760","salaryTrendMax":"35340","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"foobar"}]}',
      mockPlaylistResponse = '{"listItems":[{"listItemId":184807,"listId":34327,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-06-03T23:20:03.000Z"}, {}]}';

    xit('should set goals to empty object if no arguments provided', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(mockProgramResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=21-1093.00,11-9151.00&stateAreaId=639').respond(mockRonetResponse);
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond(mockPlaylistResponse);

      var goals;
      expect(goals).toBeUndefined();
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId, 1).then(function(data) {
        CareerExplorationViewModel.goals = data;
      });
      mockBackend.flush();
      //$rootScope.$digest();
      expect(CareerExplorationViewModel.goals).toBeDefined();
    });

    xit('should set goals when arguments provided', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(mockProgramResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=21-1093.00,11-9151.00&stateAreaId=639').respond(mockRonetResponse);
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond(mockPlaylistResponse);
      var goals;
      expect(goals).toBeUndefined();
      spyOn(CareerExplorationViewModel, 'updateGoalSavedInfo').and.callThrough();
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).then(function(data) {
        goals = data;
      });
      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals.length).toBe(1);
      expect(goals[0].description).toBeDefined();
      // console.log(JSON.stringify(goals));
      expect(CareerExplorationViewModel.goals).toBeDefined();
      expect(CareerExplorationViewModel.updateGoalSavedInfo).toHaveBeenCalled();
      expect(CareerExplorationViewModel.totalSaved).toBe(2);
      expect(CareerExplorationViewModel.reachedSavedLimit).toBeFalsy();
    });

    it('should be undefined when no RONET data returned', function() {
      mockBackend.expectGET(/\/api\/labormarket-service\/1\/uopx\/explorer\/program\/results.*$/).respond(mockProgramResponse);
      mockBackend.expectGET(/\/api\/labormarket-service\/1\/uopx\/ronets\/labordata.*$/).respond({});
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond(mockPlaylistResponse);
      var goals;
      expect(goals).toBeUndefined();
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).then(function(data) {
        goals = data;
      });
      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals.length).toBe(0);
    });

    it('should be undefined when bad RONET data returned', function() {
      mockBackend.expectGET(/\/api\/labormarket-service\/1\/uopx\/explorer\/program\/results.*$/).respond(mockProgramResponse);
      mockBackend.expectGET(/\/api\/labormarket-service\/1\/uopx\/ronets\/labordata.*$/).respond({});
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond({});
      var goals;
      expect(goals).toBeUndefined();
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).then(function(data) {
        goals = data;
      });
      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals.length).toBe(0);
    });

    it('should reject when labormarket returns error', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(503, '');
      var err = null;
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).catch(function(error) {
        err = error;
      });
      mockBackend.flush();
      expect(err).toBeDefined();
      expect(err.status).toBe(503);
    });

    it('should reject when ronets returns error', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(mockProgramResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=21-1093.00,11-9151.00&stateAreaId=639').respond(503, '');
      var err = null;
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).catch(function(error) {
        err = error;
      });
      mockBackend.flush();
      expect(err).toBeDefined();
      expect(err.status).toBe(503);
    });

    xit('should set goals when arguments provided and playlist returns 404', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(mockProgramResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=21-1093.00,11-9151.00&stateAreaId=639').respond(mockRonetResponse);
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond(404, '');
      var goals;
      expect(goals).toBeUndefined();
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).then(function(data) {
        goals = data;
      });
      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals.length).toBe(1);
      expect(goals[0].description).toBeDefined();
      expect(goals[0].saved).toBeUndefined();
      // console.log(JSON.stringify(goals));
      expect(CareerExplorationViewModel.goals).toBeDefined();
    });

    it('should reject when playlist returns non-404 error', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/explorer/program/results?fallback=national&laborMarketDetails=false&programCode=BSHS%2FM&stateAreaId=639').respond(mockProgramResponse);
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=21-1093.00,11-9151.00&stateAreaId=639').respond(mockRonetResponse);
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/type/RONET').respond(503, '');
      var err = null;
      CareerExplorationViewModel.getGoalsByProgram(User.profile.programCode, User.profile.stateAreaId).catch(function(error) {
        err = error;
      });
      mockBackend.flush();
      expect(err).toBeDefined();
      expect(err.status).toBe(503);
    });
  });

  xdescribe('init()', function() {

    it('should initialize properly', function() {
      var $scope = $rootScope.$new();
      spyOn(CareerExplorationViewModel, 'addGoalChangeBindings');
      spyOn(CareerExplorationViewModel, 'getGoalsByProgram');

      mockBackend.whenGET('/api/survey-service/2/cgsdemo/users/1111-2222-3abc/mc/holland').respond(404, '');

      CareerExplorationViewModel.init($scope);
      mockBackend.flush();

      expect(CareerExplorationViewModel.params.$scope).toEqual($scope);
      expect(CareerExplorationViewModel.params.profileId).toEqual(User.profile.profileId);
      expect(CareerExplorationViewModel.params.programCode).toEqual(User.profile.programCode);
      expect(CareerExplorationViewModel.params.stateAreaId).toEqual(User.profile.stateAreaId);
      expect(CareerExplorationViewModel.addGoalChangeBindings).toHaveBeenCalledWith($scope);
      expect(CareerExplorationViewModel.getGoalsByProgram).toHaveBeenCalledWith(User.profile.programCode, User.profile.stateAreaId, 1);
    });
  });
});
