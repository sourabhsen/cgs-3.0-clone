'use strict';

xdescribe('Directive: jobsDashboard', function () {
  var element, scope, mockBackend, jobsDashboardViewModel, compile, User, $q, CONFIG;

  beforeEach(function () {
    module('configMock');
    module('app/components/jobsDashboard/jobsDashboard.html');
    module('jobsDashboard');

  });

  beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_, _JobsDashboardViewModel_, _User_, $q, _CONFIG_) {
    scope = $rootScope.$new();
    compile = _$compile_;
    mockBackend = _$httpBackend_;
    jobsDashboardViewModel = _JobsDashboardViewModel_;
    User = _User_;
    CONFIG = _CONFIG_;

    var mockRecommendations = {
      jobs: {
        totalNumberOfResults: 5,
        results: [{
          job: {
            jobId: 27806367,
            companyId: 10057,
            providerCompanyName: 'IBM',
            title: 'Front End Developer',
            status: 'ACTIVE',
            publicIndustry: true,
            location: {
              city: 'CHICAGO',
              state: 'ILLINOIS',
              country: 'USA',
              postal: '60290 '
            },
            postingDate: '2015 - 06 - 21T00: 00: 00.000Z ',
            updateDate: '2015 - 06 - 22T22: 58: 32.000Z',
            ageInSeconds: 413653
          },
          preferredPartner: false,
          tuitionReimbursement: false,
          totalLinkedInConnections: 0,
          listId: 0,
          listItemId: 0,
          applied: false,
          recommender: 'RONET',
          score: 0,
          isSaved: false
        }]
      }
    };
    var mockAppliedJobs = {
      totalNumberOfResults: 3,
      results: [{}, {}, {}]
    };
    var mockSavedJobs = {
      jobs: {
        totalNumberOfResults: 5,
        results: [{
          job: {
            jobId: 27806367,
            companyId: 10057,
            providerCompanyName: 'IBM',
            title: 'Front End Developer',
            status: 'ACTIVE',
            publicIndustry: true,
            location: {
              city: 'CHICAGO',
              state: 'ILLINOIS',
              country: 'USA',
              postal: '60290 '
            },
            postingDate: '2015 - 06 - 21T00: 00: 00.000Z ',
            updateDate: '2015 - 06 - 22T22: 58: 32.000Z',
            ageInSeconds: 413653
          },
          preferredPartner: false,
          tuitionReimbursement: false,
          totalLinkedInConnections: 0,
          listId: 0,
          listItemId: 0,
          applied: false,
          recommender: 'RONET',
          score: 0,
          isSaved: false
        }]
      }
    };
    var mockStatuses = [];
    mockBackend.whenGET('/api/job-service/1/jobs/applications/statuses').respond(angular.fromJson(mockStatuses));

    mockBackend.whenGET('/api/job-service/1/cgsdemo/jobs/search/recommendedJobs?pageSize=3&profileId=apt_c6f05f90-07c2-4e3b-8b93-0392785447c4&programCode=BSHS&recommendationType=RONET&useRecommendation=true')
      .respond(angular.fromJson(mockRecommendations));
    mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/applications?page.size=3')
      .respond(angular.fromJson(mockAppliedJobs));
    mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/lists?page.size=3')
      .respond(angular.fromJson(mockSavedJobs));

    mockBackend.whenGET('/api/job-service/1/cgsdemo/jobs/search/recommendedJobs?pageSize=30&profileId=apt_c6f05f90-07c2-4e3b-8b93-0392785447c4&programCode=BSHS&recommendationType=RONET&useRecommendation=true')
      .respond(angular.fromJson(mockRecommendations));
    mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/applications?page.size=5')
      .respond(angular.fromJson(mockAppliedJobs));
    mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/lists?page.size=5')
      .respond(angular.fromJson(mockSavedJobs));

    mockBackend.whenGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true')
      .respond({});

    element = '<jobs-dashboard dashboard-type="{{dashboardType}}" dashboard-title="{{dashboardTitle}}" profile-id="{{profileId}}" program-code="{{programCode}}"></jobs-dashboard>';

    scope.dashboardType = 'widget';
    scope.dashboardTitle = 'My Jobs';
    User.profileId = 'apt_c6f05f90-07c2-4e3b-8b93-0392785447c4';
    scope.programCode = 'BSHS';
    scope.jobsDashboardModel = jobsDashboardViewModel;

    spyOn(User, 'get').and.callFake(function () {
      return $q.when(User);
    });
    spyOn(scope.jobsDashboardModel, 'init').and.callThrough();
    spyOn(scope.jobsDashboardModel, 'recommendedJobs').and.callThrough();
    spyOn(scope.jobsDashboardModel, 'savedJobs').and.callThrough();
    spyOn(scope.jobsDashboardModel, 'appliedJobs').and.callThrough();
  }));

  afterEach(function () {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    element = scope = mockBackend = jobsDashboardViewModel = compile = CONFIG = User = $q = undefined;
  });

  xdescribe('with any dashboardType', function () {
    beforeEach(function () {
      element = compile(element)(scope);
      scope.$digest();
    });

    it('should have three tabs', function () {
      mockBackend.flush();
      expect(element.find('tab-heading').length).toBe(3);
    });
  });

  xdescribe('with dashboardType widget', function () {
    beforeEach(function () {
      element = compile(element)(scope);
      scope.$digest();
    });
    it('should display an h3 heading', function () {
      mockBackend.flush();
      expect(element.find('h3').text()).toContain('My Jobs');
    });
    it('should call init with jobSize = CONFIG.config.widgetResults', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.init).toHaveBeenCalledWith(CONFIG.config.widgetResults, 'BSHS', 'widget');
    });
    it('when there are no recommended jobs to show, it should display a message', function () {
      mockBackend.flush();
      var noResults = {
        jobs: {
          totalNumberOfResults: 0
        }
      };
      scope.jobsDashboardModel.recommendedJobs(noResults);
      expect(element.find('.noJobs').text()).toContain('We don’t currently have any recommended jobs for you');
    });
    it('should contain a link to See More recommendations', function () {
      mockBackend.flush();
      expect(element.find('.widgetFooterCTA a').text()).toContain('See More');
    });
  });

  xdescribe('with dashboardType page', function () {
    beforeEach(function () {
      scope.dashboardType = 'page';
      element = compile(element)(scope);
      scope.$digest();
    });
    it('should display an h1 heading', function () {
      mockBackend.flush();
      expect(element.find('h1').text()).toContain('Jobs');
    });
    it('should call init with jobSize = CONFIG.config.dashboardResults', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.init).toHaveBeenCalledWith(CONFIG.config.dashboardResults, 'BSHS', 'page');
    });
    it('when there are no recommended jobs to show, it should display a message', function () {
      mockBackend.flush();
      var noResults = {
        jobs: {
          totalNumberOfResults: 0
        }
      };
      scope.jobsDashboardModel.recommendedJobs(noResults);
      expect(element.find('.noJobs').text()).toContain('We don’t currently have any recommended jobs for you. If you have already uploaded a resume and set a career goal, try changing your location to a larger city nearby');
    });
    it('should contain a link to View More recommendations', function () {
      mockBackend.flush();
      expect(element.find('.moreLink a').text()).toContain('View More');
    });
    it('should contain a link to View More recommendations', function () {
      mockBackend.flush();
      expect(element.find('.moreLink a').text()).toContain('View More');
    });
  });

  xdescribe('getRecommendedJobs()', function () {
    beforeEach(function () {
      scope.dashboardType = 'page';
      element = compile(element)(scope);
      scope.$digest();
    });
    it('should fetch recommended jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.recommendedJobs).toHaveBeenCalled();
    });
    it('should set noRecommendedResults to false when there are jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.recommendedJobs).toHaveBeenCalled();
      expect(scope.jobsDashboardModel.noRecommendedResults).toBe(false);
    });
    it('should set noRecommendedResults to true when there are no jobs', function () {
      mockBackend.flush();
      var noResults = {
        totalNumberOfResults: 0
      };
      mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/applications?page.size=5')
        .respond(angular.fromJson(noResults));
      scope.jobsDashboardModel.recommendedJobs(noResults);
      expect(scope.jobsDashboardModel.noRecommendedResults).toBe(true);
    });
  });

  xdescribe('when recommended jobs service fails', function () {
    beforeEach(angular.mock.inject(function () {
      mockBackend.whenGET('/api/job-service/1/cgsdemo/jobs/search/recommendedJobs?pageSize=3&profileId=apt_c6f05f90-07c2-4e3b-8b93-0392785447c4&programCode=&recommendationType=RONET&useRecommendation=true').respond(404, '');
      scope.programCode = null;
      element = compile(element)(scope);
      scope.$digest();
    }));
    it('data.jobs should not be defined', function () {
      scope.jobsDashboardModel.getRecommendedJobs();
      mockBackend.flush();
      expect(scope.jobsDashboardModel.data.jobs).not.toBeDefined();
    });
    it('should set noRecommendedResults to true', function () {
      scope.jobsDashboardModel.getRecommendedJobs();
      mockBackend.flush();
      expect(scope.jobsDashboardModel.noRecommendedResults).toBe(true);
    });
  });

  xdescribe('getSavedJobs()', function () {
    beforeEach(function () {
      scope.dashboardType = 'page';
      element = compile(element)(scope);
      scope.$digest();
    });
    it('should fetch saved jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.savedJobs).toHaveBeenCalled();
    });
    it('should set noSavedResults to false when there are jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.savedJobs).toHaveBeenCalled();
      expect(scope.jobsDashboardModel.noSavedResults).toBe(false);
    });
    it('should set noSavedResults to true when there are no jobs', function () {
      mockBackend.flush();
      var noResults = {
        totalNumberOfResults: 0
      };
      scope.jobsDashboardModel.savedJobs(noResults);
      expect(scope.jobsDashboardModel.noSavedResults).toBe(true);
    });
  });

  xdescribe('when saved jobs service fails', function () {
    beforeEach(angular.mock.inject(function () {
      mockBackend.expectGET('/api/job-service/1/cgsdemo/users/apt_c6f05f90-07c2-4e3b-8b93-0392785447c4/jobs/lists?page.size=5').respond(404, '');
      scope.dashboardType = 'page';
      element = compile(element)(scope);
      scope.$digest();
    }));
    it('data.savedJobs should not be defined', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.data.savedJobs).not.toBeDefined();
    });
    it('should set noSavedResults to true', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.noSavedResults).toBe(true);
    });
  });

  xdescribe('getAppliedJobs()', function () {
    beforeEach(function () {
      scope.dashboardType = 'page';
      element = compile(element)(scope);
      scope.$digest();
    });
    it('should fetch applied jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.appliedJobs).toHaveBeenCalled();
    });
    it('should set noAppliedResults to false when there are jobs', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.appliedJobs).toHaveBeenCalled();
      expect(scope.jobsDashboardModel.noAppliedResults).toBe(false);
    });
    it('should set noAppliedResults to true when there are no jobs', function () {
      mockBackend.flush();
      var noResults = {
        totalNumberOfResults: 0,
        results: []
      };
      scope.jobsDashboardModel.appliedJobs(noResults);
      expect(scope.jobsDashboardModel.noAppliedResults).toBe(true);
    });
  });

  xdescribe('when applied jobs service fails', function () {
    beforeEach(angular.mock.inject(function () {
      mockBackend.when('GET', '/api/job-service/1/cgsdemo/users/jobs/applications').respond(404, null);
      element = compile(element)(scope);
      scope.$digest();
    }));
    it('data.appliedJobs should not be defined', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.data.appliedJobs).not.toBeDefined();
    });
    it('should set noAppliedResults to true', function () {
      mockBackend.flush();
      expect(scope.jobsDashboardModel.noAppliedResults).toBe(true);
    });
  });

  xdescribe('showMoreItems()', function () {
    it('should incrememnt number of pages shown', function () {
      scope.jobsDashboardModel.pagesShown = 1;
      scope.jobsDashboardModel.showMoreItems();
      expect(scope.jobsDashboardModel.pagesShown).toEqual(2);
    });
  });
});
