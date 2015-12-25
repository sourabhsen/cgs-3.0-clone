'use strict';

describe('Controller: myGoalButtonCtrl', function() {
  var myGoalButtonCtrl, mockBackend, $rootScope, User, $scope;

  beforeEach(function() {
    module('configMock');
    module('myGoal');
  });

  beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_, _User_) {
    mockBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    User = _User_;
    this.createController = function() {
      myGoalButtonCtrl = $controller('MyGoalButtonCtrl', {
        'User': User,
        '$scope': $scope
      });
    };
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    myGoalButtonCtrl = mockBackend = $rootScope = User = $scope = undefined;
  });

  describe('activate()', function() {
    var profileId = '1111-2222-3abc',
      savedGoal = '{"name":"Social / Human Service Assistant","jobCodeType":"RONET","id":"21-1093.00","details":{"stateAreaId":639,"scopeAreaId":639,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":20,"hiringDemand":470,"salaryTrend":"$$","salaryTrendPercentile":0,"salaryTrendAverage":29450,"salaryTrendMin":"20760","salaryTrendMax":"35340","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"21-1093.00","hiringTrendVal":2},"saved":{"listItemId":185211,"listId":34329,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-06-04T18:07:48.000Z"}}',
      mockSaveResponse = '{"listId":34329,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_4cddf748-1092-4247-acc7-4b60c40df128","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-04T01:18:20.000Z","listItems":[{"listItemId":185235,"listId":34329,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-06-04T19:19:09.000Z"}]}';
    //   mockProgramResponse = '{"jobCodes":[{"name":"Social / Human Service Assistant","jobCodeType":"RONET","id":"21-1093.00"},{"name":"Social Services Manager","jobCodeType":"RONET","id":"11-9151.00"}],"noOfJobsOpenings":"656","salaryRange":"20760.0-74570.0","salaryTrendMin":20760.0,"salaryTrendMax":74570.0,"salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"52949","tenantDegrees":[{"programId":"BSHS/M","programName":"Bachelor Of Science In Human Services/Management","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/human-services/bachelors/bshs-m.html","programLevel":"Bachelors"}],"generalDegrees":[{"programId":"explorer/degrees/11004","programName":"Associate\'s Degree - Human Development and Family Studies","programLevel":"Associate"},{"programId":"explorer/degrees/11330","programName":"Associate\'s Degree - Psychology","programLevel":"Associate"},{"programId":"explorer/degrees/10502","programName":"Bachelor\'s Degree - Behavioral Sciences","programLevel":"Bachelor"},{"programId":"explorer/degrees/10712","programName":"Bachelor\'s Degree - Criminal Justice and Law Enforcement","programLevel":"Bachelor"},{"programId":"explorer/degrees/11005","programName":"Bachelor\'s Degree - Human Development and Family Studies","programLevel":"Bachelor"},{"programId":"explorer/degrees/11016","programName":"Bachelor\'s Degree - Human Services Administration and Community Organization/Advocacy","programLevel":"Bachelor"},{"programId":"explorer/degrees/11216","programName":"Bachelor\'s Degree - Non-Profit/Public/Organizational Management","programLevel":"Bachelor"},{"programId":"explorer/degrees/11331","programName":"Bachelor\'s Degree - Psychology","programLevel":"Bachelor"},{"programId":"explorer/degrees/11335","programName":"Bachelor\'s Degree - Public Health","programLevel":"Bachelor"},{"programId":"explorer/degrees/11340","programName":"Bachelor\'s Degree - Public Policy and Administration","programLevel":"Bachelor"},{"programId":"explorer/degrees/11400","programName":"Bachelor\'s Degree - Social Work","programLevel":"Bachelor"},{"programId":"explorer/degrees/11003","programName":"Certificate - Human Development and Family Studies","programLevel":"Certificate"},{"programId":"explorer/degrees/11497","programName":"Certificate - Youth Services/Administration","programLevel":"Certificate"},{"programId":"explorer/degrees/10503","programName":"Graduate/Professional Degree - Behavioral Sciences","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/10613","programName":"Graduate/Professional Degree - Clinical, Counseling and Applied Psychology","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/10713","programName":"Graduate/Professional Degree - Criminal Justice and Law Enforcement","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11006","programName":"Graduate/Professional Degree - Human Development and Family Studies","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11217","programName":"Graduate/Professional Degree - Non-Profit/Public/Organizational Management","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11332","programName":"Graduate/Professional Degree - Psychology","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11333","programName":"Graduate/Professional Degree - Public Administration","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11336","programName":"Graduate/Professional Degree - Public Health","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11401","programName":"Graduate/Professional Degree - Social Work","programLevel":"GraduateProfessional"},{"programId":"explorer/degrees/11498","programName":"Graduate/Professional Degree - Youth Services/Administration","programLevel":"GraduateProfessional"}],"familyNames":[{"id":"21-1000","name":"Counselors and Other Community and Social Service Specialists","type":"MINOR"},{"id":"11-9000","name":"Other Management Occupations","type":"MINOR"}]}',
    //   mockRonetResponse = '{"items":[{"stateAreaId":639,"scopeAreaId":639,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":20.0,"hiringDemand":470,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":29450.0,"salaryTrendMin":"20760","salaryTrendMax":"35340","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"21-1093.00"}]}',
    //   mockBadRonetResponse = '{"items":[{"stateAreaId":639,"scopeAreaId":639,"scopeAreaType":"METRO","hiringTrend":"Medium","hiringTrendPercentile":20.0,"hiringDemand":470,"salaryTrend":"$$","salaryTrendPercentile":0.0,"salaryTrendAverage":29450.0,"salaryTrendMin":"20760","salaryTrendMax":"35340","salaryTrendRealTime":"$$","salaryTrendRealTimeAverage":"39442","salaryTrendRealTimeMin":"38757","salaryTrendRealTimeMax":"40127","description":"Assists with identifying and arranging community services for clients. Works with social workers and other human services professionals. Helps with rehabilitation for people with disabilities or those in recovery, or coordinates home care services for the elderly; may also coordinate housing or job training assistance for immigrants, veterans, former inmates or families in crisis. ","id":"explorer/jobs/243","name":"Social / Human Service Assistant","degreeIntroStatement":"Depending on the applicant’s job experience, Social / Human Service Assistant positions may require one or more of the following training or degree programs:","rOnet":"foobar"}]}',
    //   mockPlaylistResponse = '{"listItems":[{"listItemId":184807,"listId":34327,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-06-03T23:20:03.000Z"}, {}]}';

    it('should throw error when no goal defined', function() {
      expect(this.createController).toThrowError('goal must be defined');
    });

    xit('should save goal to playlist', function() {
      $scope.goal = angular.fromJson(savedGoal);
      User.profileId = profileId;
      delete $scope.goal.saved;
      this.createController();

      expect(myGoalButtonCtrl.vm.reachedSavedLimit).toBeFalsy();
      spyOn(myGoalButtonCtrl.vm, 'onGoalChange');
      mockBackend.whenPOST('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists?deleteExistingItems=N&listType=RONET')
        .respond(function(method, url, data) {
          expect(data).toBe('{"name":"MyGoals","description":"My goal list","listType":"RONET","ownerType":"USER","privacyType":"Private","userIdentifier":"1111-2222-3abc","listItems":[{"itemIdentifier":"21-1093.00","itemSequence":"1","itemType":"RONET","itemStatus":"SAVED"}]}');
          return [201, mockSaveResponse, { /*headers*/ }];
        });
      myGoalButtonCtrl.saveOrRemove();
      mockBackend.flush();
      expect($scope.goal.saved).toEqual(angular.fromJson('{"listItemId":185235,"listId":34329,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-06-04T19:19:09.000Z"}'));
      expect(myGoalButtonCtrl.vm.onGoalChange).toHaveBeenCalledWith($scope.goal);

      // try invalid value on onSaveGoal
      myGoalButtonCtrl.vm.onGoalChange = undefined;
      delete $scope.goal.saved;
      myGoalButtonCtrl.saveOrRemove();
      mockBackend.flush();
    });


    xit('should delete goal from playlist', function() {
      $scope.goal = angular.fromJson(savedGoal);
      User.profileId = profileId;
      this.createController();

      expect(myGoalButtonCtrl.vm.reachedSavedLimit).toBeFalsy();
      spyOn(myGoalButtonCtrl.vm, 'onGoalChange');
      mockBackend.whenDELETE('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists/34329/items/185211').respond(200, '');
      myGoalButtonCtrl.saveOrRemove();
      mockBackend.flush();
      expect($scope.goal.saved).toBeUndefined();
      expect(myGoalButtonCtrl.vm.onGoalChange).toHaveBeenCalledWith($scope.goal);

      // try invalid value on onSaveGoal
      $scope.goal = angular.fromJson(savedGoal);
      myGoalButtonCtrl.vm.onGoalChange = null;
      myGoalButtonCtrl.saveOrRemove();
      mockBackend.flush();
    });
  });
});

describe('Directive: myGoalButton', function() {
  var $rootScope, $compile;

  beforeEach(function() {
    module('configMock');
    module('myGoal');
    module('app/components/myGoal/myGoalButton.html');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  afterEach(function() {
    $rootScope = $compile = undefined;
  });

  it('should error without goal defined', function() {
    var err, element;
    try {
      element = $compile('<my-goal-button></my-goal-button>')($rootScope);
      $rootScope.$digest();
    } catch (error) {
      err = error;
    }
    expect(err.message).toBe('goal must be defined');
  });

  xit('should initalize properly with goal defined', function() {
    $rootScope.goal = {};
    var element = $compile('<my-goal-button goal="goal"></my-goal-button>')($rootScope);
    $rootScope.$digest();
    expect(element.html().indexOf('add')).toBeGreaterThan(0);
    // console.log('HTML', element.html());
  });

});
