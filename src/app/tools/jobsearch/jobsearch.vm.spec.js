'use strict';

describe('View Model: Job Search', function() {
  var jobsViewModel, mockBackend, localStorageService, $uibModal, ActivityTracker, User;


  var mockResponse = {
    'jobs': {
      'firstPage': true,
      'totalPages': 1,
      'lastPage': true,
      'numberOfElements': 2,
      'pageNumber': 0,
      'totalNumberOfResults': 2,
      'previousPage': -1,
      'pageSize': 10,
      'nextPage': -1,
      'results': [{
        'job': {
          'jobId': 21967845,
          'providerCompanyName': 'Mehra Innovations',
          'title': 'Java Architect',
          'status': 'ACTIVE',
          'publicIndustry': true,
          'location': {
            'city': 'SCHAUMBURG',
            'state': 'ILLINOIS',
            'country': 'USA',
            'postal': '60159'
          },
          'postingDate': '2015-04-23T00:00:00.000Z',
          'updateDate': '2015-04-25T07:54:29.000Z',
          'ageInSeconds': 493268
        },
        'preferredPartner': false,
        'tuitionReimbursement': false,
        'totalLinkedInConnections': 0,
        'listId': 0,
        'listItemId': 0,
        'applied': false,
        'score': 0.0,
        'isSaved': false
      }, {
        'job': {
          'jobId': 21669153,
          'companyId': 303567,
          'providerCompanyName': 'Sears Holdings Corporation',
          'title': 'Java Architect',
          'status': 'ACTIVE',
          'publicIndustry': true,
          'location': {
            'city': 'BARRINGTON',
            'state': 'ILLINOIS',
            'country': 'USA',
            'postal': '60010'
          },
          'postingDate': '2015-04-19T00:00:00.000Z',
          'updateDate': '2015-04-24T23:52:26.000Z',
          'ageInSeconds': 838868
        },
        'preferredPartner': false,
        'tuitionReimbursement': false,
        'totalLinkedInConnections': 0,
        'listId': 0,
        'listItemId': 0,
        'applied': false,
        'score': 0.0,
        'isSaved': false
      }]
    },
    'facetFields': [{
      'name': 'Location',
      'values': [{
        'name': 'SAN FRANCISCO, CA',
        'count': 2
      }],
      'valueCount': 2
    }]
  };

  var mockDetails = {
    'jobId': 5678,
    'providerCompanyName': 'Principle Solutions'
  };

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('JobsViewModel');
  });

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() {
      return false;
    });
  }));

  beforeEach(inject(function(_JobsViewModel_, _$httpBackend_, _localStorageService_, _$uibModal_, _ActivityTracker_, _User_) {
    localStorageService = _localStorageService_;
    mockBackend = _$httpBackend_;
    jobsViewModel = _JobsViewModel_;
    $uibModal = _$uibModal_;
    ActivityTracker = _ActivityTracker_;
    User = _User_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    jobsViewModel = mockBackend = localStorageService = $uibModal = ActivityTracker = User = undefined;
  });

  describe('toggleDropdown(filter, boolean)', function() {
    it('should persist the filter to the local session store if true', function() {
      spyOn(localStorageService, 'set').and.callFake(function() {
        return {};
      });
      jobsViewModel.toggleDropdown('Experience Level', true);
      expect(localStorageService.set).toHaveBeenCalled();
    });

    it('should delete the open filter from the local session store if the open filter is set to false', function() {
      spyOn(localStorageService, 'remove').and.callFake(function() {
        return {};
      });
      jobsViewModel.toggleDropdown('Experience Level', false);
      expect(localStorageService.remove).toHaveBeenCalled();
    });
  });

  describe('pageChanged(currentPageNumber)', function() {
    it('should fetch search results for the current page number', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      jobsViewModel.pageChanged(2);
      expect(jobsViewModel.results).toHaveBeenCalled();
    });
  });

  describe('sortChanged($item, $vm)', function() {
    xit('should fetch search results by $vm sort', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      jobsViewModel.sortChanged('item', 'Posted Date');
      expect(jobsViewModel.results).toHaveBeenCalled();
    });

    it('should not fetch search results by $vm if already sorted by $vm', function() {
      jobsViewModel.searchQuery.query.sortBy = 'Posted Date';
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      jobsViewModel.sortChanged('item', 'Posted Date');
      expect(jobsViewModel.results).not.toHaveBeenCalled();
    });
  });

  describe('radiusChanged($item, $vm)', function() {
    it('should fetch search results in radius $vm', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      jobsViewModel.radiusChanged('item', 10);
      expect(jobsViewModel.results).toHaveBeenCalled();
    });

    it('should not fetch search results in radius $vm if already done', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      jobsViewModel.searchQuery.query.radius = 10;
      jobsViewModel.radiusChanged('item', 10);
      expect(jobsViewModel.results).not.toHaveBeenCalled();
    });
  });

  describe('filteredResults(name, value)', function() {
    it('should add/remove filter values from the named filter array and then fetch filtered results', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      spyOn(jobsViewModel.searchQuery, 'filteredResults').and.callFake(function() {
        return {};
      });
      jobsViewModel.filteredResults('Location', 'SEATTLE, WA');
      expect(jobsViewModel.searchQuery.filteredResults).toHaveBeenCalled();
      expect(jobsViewModel.results).toHaveBeenCalled();
    });
  });

  describe('clearFilters()', function() {
    it('should remove applied filters and reset the search query', function() {
      spyOn(jobsViewModel, 'results').and.callFake(function() {
        return {};
      });
      spyOn(jobsViewModel.searchQuery, 'clearFilters').and.callFake(function() {
        return {};
      });
      jobsViewModel.clearFilters();
      expect(jobsViewModel.searchQuery.clearFilters).toHaveBeenCalled();
      expect(jobsViewModel.results).toHaveBeenCalled();
    });
  });

  describe('jobApply(url)', function() {
    it('should open a modal window', function() {
      spyOn($uibModal, 'open').and.callFake(function() {
        return {};
      });
      jobsViewModel.jobApply('http://www.google.com');
      expect($uibModal.open).toHaveBeenCalled();
    });
  });

  describe('results()', function() {
    var mockQuery = {
      'locationFilter': [],
      'programFilter': [],
      'industryFilter': [],
      'experienceLevel': [],
      'companyFilter': [],
      'salaryRange': [],
      'eduLevelFilter': [],
      'tuitionReimbursement': false,
      'preferredPartner': false,
      'pageNumber': 0,
      'keywords.title': 'java architect'
    };

    beforeEach(function() {
      mockBackend.whenPOST('/api/job-service/1/cgsdemo/jobs/search')
        .respond(angular.fromJson(mockResponse));
    });

    it('should fetch search results', function() {
      jobsViewModel.query = mockQuery;
      jobsViewModel.results();
      mockBackend.flush();
      expect(jobsViewModel.data).toBeDefined();
    });
  });

  xdescribe('getJobDetails()', function() {
    var profileId = 1234;

    it('should fetch job details, if there is no companyId, sets isATSTracked to false', function() {
      jobsViewModel.detailsPageJobId = 5678;
      User.profileId = profileId;

      mockBackend.expectGET('/api/job-service/1/jobs/5678').respond(mockDetails);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1234/lists').respond('');

      spyOn(jobsViewModel, 'setApplicationStatus');
      spyOn(ActivityTracker, 'getAppliedJob');

      jobsViewModel.getJobDetails();
      mockBackend.flush();
      expect(jobsViewModel.isATSTracked).toBe(false);
      expect(ActivityTracker.getAppliedJob).toHaveBeenCalled();
    });

    it('should fetch job details, if there is a companyId, it calls getCompanyDetails', function() {
      jobsViewModel.detailsPageJobId = 5678;
      mockDetails.companyId = 91011;
      User.profileId = profileId;

      mockBackend.expectGET('/api/job-service/1/jobs/5678').respond(mockDetails);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1234/lists').respond('');

      spyOn(jobsViewModel, 'setApplicationStatus');
      spyOn(ActivityTracker, 'getAppliedJob');
      spyOn(jobsViewModel, 'getCompanyDetails');

      jobsViewModel.getJobDetails();
      mockBackend.flush();
      expect(ActivityTracker.getAppliedJob).toHaveBeenCalled();
      expect(jobsViewModel.getCompanyDetails).toHaveBeenCalled();
    });
  });

  describe('getCompanyDetails()', function() {
    var companyId = 91011;

    beforeEach(function() {
      mockDetails.attributes = [{
        companyAttributeId: 1567498,
        attributeId: 1645,
        attributeName: 'PREFERRED_PARTNER'
      }, {
        companyAttributeId: 147853,
        attributeId: 2929,
        attributeName: 'LINE_OF_BUSINESS'
      }, {
        companyAttributeId: 162915,
        attributeId: 2933,
        attributeName: 'RANK'
      }, {
        companyAttributeId: 147843,
        attributeId: 2933,
        attributeName: 'RANK',
        attributeValue: 'S&P 500'
      }, {
        companyAttributeId: 147859,
        attributeId: 2947,
        attributeName: 'DUNS',
        attributeValue: '006961700'
      }, {
        companyAttributeId: 42743,
        attributeId: 1925,
        attributeName: 'DBA',
        attributeValue: ' TARGET '
      }, {
        companyAttributeId: 76033,
        attributeId: 2321,
        attributeName: 'ATS_COMPANY_NAME'
      }];
    });

    it('should fetch company details', function() {
      mockBackend.expectGET('/api/company-service/1/companies/91011').respond(mockDetails);
      jobsViewModel.getCompanyDetails(companyId);
      mockBackend.flush();
    });
    it('when company service call fails, it should isATSTracked to false', function() {
      mockBackend.whenGET('/api/company-service/1/companies/91011').respond(500, '');
      jobsViewModel.getCompanyDetails(companyId);
      mockBackend.flush();
      expect(jobsViewModel.isATSTracked).toBe(false);
    });
  });

  describe('setApplicationStatus()', function() {
    it('should set the applied status when there is data', function() {
      var data = {
        data: [1, 2, 3, 4]
      };
      jobsViewModel.setApplicationStatus(data);
      expect(jobsViewModel.appliedName).toBe('Applied');
      expect(jobsViewModel.detailsApplied).toBe(true);
    });
    it('should set the applied status when there is no data', function() {
      var data = {
        data: []
      };
      jobsViewModel.setApplicationStatus(data);
      expect(jobsViewModel.appliedName).toBe('Apply');
      expect(jobsViewModel.detailsApplied).toBe(false);
    });
  });

  describe('setDetailsError()', function() {
    it('should set detailsError to true', function() {
      jobsViewModel.setDetailsError();
      expect(jobsViewModel.detailsError).toBe(true);
    });
  });
});
