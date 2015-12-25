'use strict';

describe('Dashboard View Model', function() {
  var scope, compile, mockBackend, DashboardViewModel, profileFactory, CONSTANTS;

  beforeEach(function() {
    var data = {
      'config': {
        'defaultLocation': {
          'stateAreaId': 525,
          'city': '',
          'state': ''
        },
      },
      'tools': [{
        'identifier': 'tools.careerexploration',
        'title': 'Career Exploration',
        'url': 'tools/career-exploration',
        'orderSequence': 1
      }],
      'milestones': [{
        'identifier': 'milestones.goals',
        'title': 'Set Your Goals',
        'url': 'career-plan/goals',
        'description': 'Get on the right career track by targeting the specific jobs you’re interested in. In this milestone, you’ll explore careers, choose your favorites and begin building your list of career goals.',
        'orderSequence': 1,
        'activities': [{
          'identifier': 'goals-chart',
          'playlistId': '/milestones/goals/chart-your-career-path',
          'title': 'Chart your career path',
          'url': 'career-plan/goals/chart-your-career-path',
          'description': 'Learn why it’s important to establish clear goals and how to research your options.',
          'orderSequence': 1
        }, {
          'identifier': 'goals-set',
          'playlistId': '/career-exploration',
          'title': 'Set your career goals',
          'url': 'career-plan/goals/set-your-career-goals',
          'description': 'Use the Career Exploration Tool to browse job types, and begin your career goal list.',
          'orderSequence': 2
        }]
      }]
    };

    module('multiTenantHttpBackend');
    module('DashBoard', function($provide) {
      $provide.value('CONFIG', data);
    });

  });

  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, _DashboardViewModel_, _$httpBackend_, _CONSTANTS_) {
    scope = _$rootScope_;
    compile = _$compile_;
    mockBackend = _$httpBackend_;
    DashboardViewModel = _DashboardViewModel_;
    CONSTANTS = _CONSTANTS_;
    profileFactory = $injector.get('Profile');
  }));

  beforeEach(function() {
    scope.profileId = 'apt_303bbed2-f685-489f-8a31-3d970d8d7a87';
    scope.programCode = 'BSHS';
    scope.dashboardModel = DashboardViewModel;

    // scope.dashboardModel.init(scope.profileId);

    // scope.dashboardModel.getCareerPlanPercentComplete(scope.profileId);
    // scope.dashboardModel.getCareerPlanItemsComplete(scope.profileId);
    // scope.dashboardModel.getUserProfileData(scope.profileId);
  });

  afterEach(function() {
    DashboardViewModel = mockBackend = undefined;
  });

  describe('Call init function', function() {
    var mockUserResponse = {
        'username': 'svc_anonymous_account',
        'identifier': 'svc_anonymous_account',
        'profileId': 'apt_303bbed2-f685-489f-8a31-3d970d8d7a87',
        'authenticated': false,
        'lastAuthenticated': '2015-05-06T19:52:17.170+0000',
        'providerProps': {},
        'loginStatus': 'ANONYMOUS',
        'sessionId': '0465927ECD4E42A5B68459DEC7798136'
      },
      mockConfigMilestonesList = {
        'config.constants': {
          'defaultLocation': {
            'stateAreaId': 525,
            'city': 'Phoenix',
            'state': 'AZ'
          },
        },
        'tools': [],
        'milestones': [{
          'identifier': 'milestones.goals',
          'title': 'Set Your Goals',
          'url': 'career-plan/goals',
          'description': 'Get on the right career track by targeting the specific jobs you’re interested in. In this milestone, you’ll explore careers, choose your favorites and begin building your list of career goals.',
          'orderSequence': 1,
          'activities': [{
            'identifier': 'goals-chart',
            'playlistId': '/milestones/goals/chart-your-career-path',
            'title': 'Chart your career path',
            'url': 'career-plan/goals/chart-your-career-path',
            'description': 'Learn why it’s important to establish clear goals and how to research your options.',
            'orderSequence': 1
          }, {
            'identifier': 'goals-set',
            'playlistId': '/career-exploration',
            'title': 'Set your career goals',
            'url': 'career-plan/goals/set-your-career-goals',
            'description': 'Use the Career Exploration Tool to browse job types, and begin your career goal list.',
            'orderSequence': 2
          }]
        }]
      },
      mockPlaylistResponse = '{"list":[{"listId":35735,"tenantName":"uopx","name":"CAREER PLAN","listType":"CAREER_PLAN_STEP","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-07-20T17:12:52.000Z","listItems":[{"listItemId":195095,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-exploration","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:14:40.000Z"},{"listItemId":195093,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-plan/milestones/goals/chart-your-career-path","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:12:52.000Z"}]},{"listId":34719,"tenantName":"uopx","name":"MyJobs","listType":"JOB","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My Saved Jobs","createDate":"2015-07-08T18:05:11.000Z","listItems":[{"listItemId":194249,"listId":34719,"itemType":"JOB","itemIdentifier":"27228305","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-17T10:20:12.000Z"},{"listItemId":189957,"listId":34719,"itemType":"JOB","itemIdentifier":"27168595","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:14.000Z"},{"listItemId":189955,"listId":34719,"itemType":"JOB","itemIdentifier":"27379725","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:13.000Z"},{"listItemId":189953,"listId":34719,"itemType":"JOB","itemIdentifier":"27411037","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:12.000Z"},{"listItemId":189951,"listId":34719,"itemType":"JOB","itemIdentifier":"26604571","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:11.000Z"}]},{"listId":34531,"tenantName":"uopx","name":"CAREER_SETTINGS","listType":"CAREER_SETTINGS","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-06-24T18:25:03.000Z","listItems":[{"listItemId":188625,"listId":34531,"itemType":"CAREER_SETTINGS","itemIdentifier":"DO_NOT_SHOW_SKILL_WELCOME_SCREEN","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-06-24T18:25:03.000Z"}]},{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":194245,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.94","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:20.000Z"},{"listItemId":194213,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:11.000Z"},{"listItemId":194197,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:05.000Z"},{"listItemId":194107,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"},{"listItemId":194181,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.02","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:55.000Z"},{"listItemId":194163,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:51.000Z"},{"listItemId":194145,"listId":34533,"itemType":"RONET","itemIdentifier":"43-1011.98","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:47.000Z"},{"listItemId":194127,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:43.000Z"},{"listItemId":194109,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"}]},{"listId":34535,"tenantName":"uopx","name":"Skills","listType":"SKILL","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My skill level list","createDate":"2015-06-24T18:26:12.000Z","listItems":[{"listItemId":189925,"listId":34535,"itemType":"SKILL","itemIdentifier":"219097","itemSequence":1,"itemStatus":"SAVED","priority":"Intermediate","createDate":"2015-07-08T00:46:26.000Z"},{"listItemId":189923,"listId":34535,"itemType":"SKILL","itemIdentifier":"242223","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-08T00:34:26.000Z"},{"listItemId":189899,"listId":34535,"itemType":"SKILL","itemIdentifier":"211875","itemSequence":1,"itemStatus":"COMPLETE","priority":"Intermediate","createDate":"2015-07-07T21:27:05.000Z"},{"listItemId":189897,"listId":34535,"itemType":"SKILL","itemIdentifier":"185287","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:53.000Z"},{"listItemId":189895,"listId":34535,"itemType":"SKILL","itemIdentifier":"211815","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:50.000Z"},{"listItemId":189641,"listId":34535,"itemType":"SKILL","itemIdentifier":"223731","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T17:23:53.000Z"},{"listItemId":189005,"listId":34535,"itemType":"SKILL","itemIdentifier":"242207","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:33.000Z"},{"listItemId":189003,"listId":34535,"itemType":"SKILL","itemIdentifier":"251147","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:22.000Z"},{"listItemId":189001,"listId":34535,"itemType":"SKILL","itemIdentifier":"173195","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:15.000Z"},{"listItemId":188737,"listId":34535,"itemType":"SKILL","itemIdentifier":"254005","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-24T22:59:39.000Z"},{"listItemId":188701,"listId":34535,"itemType":"SKILL","itemIdentifier":"231483","itemSequence":1,"itemStatus":"SAVED","priority":"Beginner","createDate":"2015-06-24T22:34:38.000Z"},{"listItemId":188687,"listId":34535,"itemType":"SKILL","itemIdentifier":"243619","itemSequence":1,"itemStatus":"COMPLETE","priority":"Advanced","createDate":"2015-06-24T20:55:13.000Z"}]}]}',
      mockUserIPResponse = {
        'IPAddress': '10.54.25.227',
        'Country': 'US',
        'PostalCode': '98101',
        'State': 'WA',
        'City': 'SEATTLE',
        'County': 'KING',
        'FIPS': '53033',
        'Latitude': '47.61',
        'Longitude': '-122.33',
        'ConnSpeed': 'broadband',
        'AOLProxy': false,
        'Hostname': '10.54.25.227',
        'ProxyType': '',
        'AreaCode': '206',
        'DomainName': '',
        'USMilitary': 'N'
      },
      mockUserStateResponse = {
        'items': [{
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Washington, All Areas',
          'stateAreaCode': 'explorer/stateareas/955',
          'areaSortOrder': 0,
          'stateAreaType': 'STATE'
        }, {
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Kennewick Metro Area, WA',
          'stateAreaCode': 'explorer/stateareas/1174',
          'areaSortOrder': 1,
          'stateAreaType': 'METRO'
        }, {
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Olympia Metro Area, WA',
          'stateAreaCode': 'explorer/stateareas/962',
          'areaSortOrder': 1,
          'stateAreaType': 'METRO'
        }, {
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Portland Metro Area, WA',
          'stateAreaCode': 'explorer/stateareas/963',
          'areaSortOrder': 1,
          'stateAreaType': 'METRO'
        }, {
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Seattle Metro Area, WA',
          'stateAreaCode': 'explorer/stateareas/964',
          'areaSortOrder': 1,
          'stateAreaType': 'METRO'
        }, {
          'stateName': 'Washington',
          'stateCode': 'WA',
          'stateAreaName': 'Spokane Metro Area, WA',
          'stateAreaCode': 'explorer/stateareas/965',
          'areaSortOrder': 1,
          'stateAreaType': 'METRO'
        }]
      },
      mockUserLaborData = {
        'items': [{
          'stateAreaId': 955,
          'scopeAreaId': 955,
          'scopeAreaType': 'STATE',
          'hiringTrend': 'Low',
          'hiringTrendPercentile': 2.5,
          'hiringDemand': 48,
          'salaryTrend': '$$',
          'salaryTrendPercentile': 0.0,
          'salaryTrendAverage': 61850.0,
          'salaryTrendMin': '45790',
          'salaryTrendMax': '73640',
          'salaryTrendRealTime': '$$',
          'salaryTrendRealTimeAverage': '49262',
          'salaryTrendRealTimeMin': '44938',
          'salaryTrendRealTimeMax': '53587',
          'description': 'Coordinates public communications and media coverage, and develops and promotes a positive public image for a company or organization.  Responds to information requests. Prepares press releases, organizes press conferences or media appearances, develops media and community contacts, monitors print and online media reporting. May coordinate or speak at community events. ',
          'id': 'explorer/jobs/303',
          'name': 'Public Relations Specialist',
          'degreeIntroStatement': 'Depending on the applicant’s job experience, Public Relations Specialist positions may require one or more of the following training or degree programs:',
          'rOnet': '27-3031.94'
        }]
      };

    beforeEach(function() {
      mockBackend.whenGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true')
        .respond(mockUserResponse);
      mockBackend.whenGET('/api/profile-service/1/cgsdemo/profiles/apt_303bbed2-f685-489f-8a31-3d970d8d7a87?includeStudentPrograms=true').respond('{}');
      mockBackend.whenGET('/api/playlist-service/1/cgsdemo/users/lists').respond(mockPlaylistResponse);
      mockBackend.whenGET('/api/validation-service/1/cgsdemo/address/ipaddr')
        .respond(mockUserIPResponse);
      mockBackend.whenGET('/api/labormarket-service/1/cgsdemo/state/WA')
        .respond(mockUserStateResponse);
      mockBackend.whenGET('/api/labormarket-service/1/cgsdemo/ronets/labordata?fallback=national&ronets=27-3031.94&stateAreaId=964')
        .respond(mockUserLaborData);
    });

    it('Should call init function', function() {
      //TODO use a spy on User.get rather than capturing requests if we don't need User/profile data
      spyOn(scope.dashboardModel, 'init').and.callThrough();
      scope.dashboardModel.init(scope.profileId);
      expect(scope.dashboardModel.init).toHaveBeenCalled();
      mockBackend.flush();
    });

    xit('should get and compare Career Plan Steps list config to actual Milestones completed', function() {
      var careerPlanStepsCompleted = [];

      DashboardViewModel.getCareerPlanItemsComplete(scope.profileId, mockConfigMilestonesList)
        .then(function(itemsComplete) {
          careerPlanStepsCompleted = itemsComplete;
        });

      mockBackend.flush();

      expect(scope.profileId).toBeDefined();
      expect(scope.profileId).toEqual('apt_303bbed2-f685-489f-8a31-3d970d8d7a87');
      expect(careerPlanStepsCompleted).toBeDefined();
      expect(typeof careerPlanStepsCompleted).toEqual('object');

    });

  });

});
