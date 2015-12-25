'use strict';

describe('View Model: Interest Survey Results', function() {
  var vm, mockBackend, $rootScope, User,
    mockAnswerResponse = '{"questions":[{"itemId":"1","optionValues":["2"]},{"itemId":"2","optionValues":["2"]},{"itemId":"3","optionValues":["2"]},{"itemId":"4","optionValues":["2"]},{"itemId":"5","optionValues":["2"]},{"itemId":"6","optionValues":["2"]},{"itemId":"7","optionValues":["2"]},{"itemId":"8","optionValues":["2"]},{"itemId":"9","optionValues":["2"]},{"itemId":"10","optionValues":["2"]},{"itemId":"11","optionValues":["2"]},{"itemId":"12","optionValues":["2"]},{"itemId":"13","optionValues":["2"]},{"itemId":"14","optionValues":["2"]},{"itemId":"15","optionValues":["2"]},{"itemId":"16","optionValues":["3"]},{"itemId":"17","optionValues":["1"]},{"itemId":"18","optionValues":["2"]},{"itemId":"19","optionValues":["3"]},{"itemId":"20","optionValues":["1"]},{"itemId":"21","optionValues":["1"]},{"itemId":"22","optionValues":["2"]},{"itemId":"23","optionValues":["3"]},{"itemId":"24","optionValues":["3"]},{"itemId":"25","optionValues":["4"]},{"itemId":"26","optionValues":["2"]},{"itemId":"27","optionValues":["2"]},{"itemId":"28","optionValues":["0"]},{"itemId":"29","optionValues":["0"]},{"itemId":"30","optionValues":["4"]},{"itemId":"31","optionValues":["2"]},{"itemId":"32","optionValues":["4"]},{"itemId":"33","optionValues":["3"]},{"itemId":"34","optionValues":["2"]},{"itemId":"35","optionValues":["0"]},{"itemId":"36","optionValues":["1"]},{"itemId":"37","optionValues":["2"]},{"itemId":"38","optionValues":["1"]},{"itemId":"39","optionValues":["1"]},{"itemId":"40","optionValues":["2"]},{"itemId":"41","optionValues":["3"]},{"itemId":"42","optionValues":["3"]},{"itemId":"43","optionValues":["3"]},{"itemId":"44","optionValues":["3"]},{"itemId":"45","optionValues":["2"]},{"itemId":"46","optionValues":["2"]},{"itemId":"47","optionValues":["4"]},{"itemId":"48","optionValues":["1"]},{"itemId":"49","optionValues":["3"]},{"itemId":"50","optionValues":["2"]},{"itemId":"51","optionValues":["3"]},{"itemId":"52","optionValues":["3"]},{"itemId":"53","optionValues":["1"]},{"itemId":"54","optionValues":["1"]},{"itemId":"55","optionValues":["4"]},{"itemId":"56","optionValues":["4"]},{"itemId":"57","optionValues":["2"]},{"itemId":"58","optionValues":["1"]},{"itemId":"59","optionValues":["1"]},{"itemId":"60","optionValues":["3"]}],"name":"holland","created":"2015-05-28T17:08:57.459Z","lastModified":"2015-05-29T17:10:48.973Z","scores":[{"category":"categoryValueSum","scores":[{"scoreName":"Social","scoreValue":"28.0"},{"scoreName":"Realistic","scoreValue":"22.0"},{"scoreName":"Investigative","scoreValue":"20.0"},{"scoreName":"Conventional","scoreValue":"20.0"},{"scoreName":"Enterprising","scoreValue":"19.0"},{"scoreName":"Artistic","scoreValue":"19.0"}]},{"category":"adjustedCategoryValueSum","scores":[{"scoreName":"Social","scoreValue":"28.0"},{"scoreName":"Realistic","scoreValue":"22.0"},{"scoreName":"Investigative","scoreValue":"20.0"},{"scoreName":"Conventional","scoreValue":"20.0"},{"scoreName":"Enterprising","scoreValue":"19.0"},{"scoreName":"Artistic","scoreValue":"19.0"}]},{"status":"success","category":"onetCareerMatchScoringAlgorithm","scores":[{"scoreName":"matchingCareer","scoreValue":"29-2041.00","scoreDescription":"Emergency Medical Technicians & Paramedics","algorithm":"fit=Best,brightOutlook=false,apprenticeship=true,green=false"},{"scoreName":"matchingCareer","scoreValue":"31-1011.00","scoreDescription":"Home Health Aides","algorithm":"fit=Best,brightOutlook=false,apprenticeship=true,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-9021.00","scoreDescription":"Farm & Home Management Advisors","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=true"},{"scoreName":"matchingCareer","scoreValue":"29-1199.01","scoreDescription":"Acupuncturists","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-1141.01","scoreDescription":"Acute Care Nurses","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-2059.01","scoreDescription":"Adapted Physical Education Specialists","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-1041.00","scoreDescription":"Agricultural Sciences Teachers, Postsecondary","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-1031.00","scoreDescription":"Architecture Teachers, Postsecondary","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-9091.00","scoreDescription":"Athletic Trainers","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-2032.00","scoreDescription":"Career/Technical Education Teachers, Secondary School","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"21-1094.00","scoreDescription":"Community Health Workers","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-1141.03","scoreDescription":"Critical Care Nurses","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-2021.00","scoreDescription":"Dental Hygienists","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-2051.00","scoreDescription":"Dietetic Technicians","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"25-1032.00","scoreDescription":"Engineering Teachers, Postsecondary","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-1128.00","scoreDescription":"Exercise Physiologists","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"39-9031.00","scoreDescription":"Fitness Trainers & Aerobics Instructors","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"35-3041.00","scoreDescription":"Food Servers, Nonrestaurant","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"39-4021.00","scoreDescription":"Funeral Attendants","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"},{"scoreName":"matchingCareer","scoreValue":"29-1069.03","scoreDescription":"Hospitalists","algorithm":"fit=Best,brightOutlook=false,apprenticeship=false,green=false"}]},{"status":"success","category":"riasec","scores":[{"scoreName":"riasec","scoreValue":"SRCIAE"},{"scoreName":"riasec","scoreValue":"SRICAE"},{"scoreName":"riasec","scoreValue":"SRCIEA"},{"scoreName":"riasec","scoreValue":"SRICEA"}]},{"status":"success","category":"legacyInterestSurveyScore","scores":[{"scoreName":"Social","scoreValue":"28.0"},{"scoreName":"Realistic","scoreValue":"22.0"},{"scoreName":"Investigative","scoreValue":"20.0"},{"scoreName":"Conventional","scoreValue":"20.0"},{"scoreName":"Enterprising","scoreValue":"19.0"},{"scoreName":"Artistic","scoreValue":"19.0"}]},{"status":"success","category":"answeredQuestionCategoryPercentage","scores":[{"scoreName":"Social","scoreValue":"100.0"},{"scoreName":"Realistic","scoreValue":"100.0"},{"scoreName":"Investigative","scoreValue":"100.0"},{"scoreName":"Enterprising","scoreValue":"100.0"},{"scoreName":"Conventional","scoreValue":"100.0"},{"scoreName":"Artistic","scoreValue":"100.0"}]},{"status":"success","category":"answeredQuestionPercentage","scores":[{"scoreName":"totalQuestions","scoreValue":"60","scoreDescription":"Total number of questions in survey"},{"scoreName":"answeredQuestions","scoreValue":"60","scoreDescription":"Total number of answered questions in survey"},{"scoreName":"percentageAnswered","scoreValue":"100.0","scoreDescription":"Percentage of questions answered in survey"}]}]}';

  beforeEach(function() {
    module('multiTenantHttpBackend');
    module('configMock');
    module('interestSurveyResults.vm');
  });

  beforeEach(inject(function(_InterestSurveyResultsViewModel_, _$httpBackend_, _$rootScope_, _User_) {
    mockBackend = _$httpBackend_;
    vm = _InterestSurveyResultsViewModel_;
    $rootScope = _$rootScope_;
    User = _User_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    vm = mockBackend = $rootScope = User = undefined;
  });

  describe('getAnswers()', function() {
    it('should get answers', function() {
      var answers = null;
      User.profileId = 1111;
      spyOn(vm, 'parseAnswers').and.callThrough();
      mockBackend.whenGET('/api/survey-service/2/cgsdemo/users/1111/mc/holland').respond(angular.fromJson(mockAnswerResponse));
      vm.getAnswers().then(function(data) {
        answers = data;
      });
      mockBackend.flush();

      expect(answers).toBeDefined();
      expect(vm.parseAnswers).toHaveBeenCalled();
      expect(answers.length).toBe(6);
      expect(vm.scores).toBe(answers);
    });

    it('should reject promise when error in parsing', function() {
      var error;
      User.profileId = 1111;
      spyOn(vm, 'parseAnswers').and.callThrough();
      mockBackend.whenGET('/api/survey-service/2/cgsdemo/users/1111/mc/holland').respond({});
      vm.getAnswers().catch(function(err) {
        error = err;
      });
      mockBackend.flush();

      expect(vm.parseAnswers).toHaveBeenCalled();
      expect(error).toBe('Cannot find scores in survey answer response');
    });
  });

  describe('parseAnswers()', function() {
    it('should correctly parse answers', function() {
      var parsed = vm.parseAnswers(angular.fromJson(mockAnswerResponse));
      // console.log(JSON.stringify(parsed));

      expect(parsed).toBeDefined();
      expect(parsed.length).toBe(6);
      expect(parsed[0].scoreName).toBe('Social');
      expect(parsed[0].scoreValue).toBe(28);
      expect(parsed[0].rank).toBe(1);
      expect(parsed[0].scorePct).toBe(22);

      expect(parsed[5].scoreName).toBe('Artistic');
      expect(parsed[5].scoreValue).toBe(19);
      expect(parsed[5].rank).toBe(6);
      expect(parsed[5].scorePct).toBe(15);

      var pctTotal = parsed.reduce(function(total, val) {
        return total + val.scorePct;
      }, 0);
      expect(pctTotal).toBe(101);
    });

    it('should throw error when input is undefined', function() {
      expect(vm.parseAnswers.bind(vm, undefined)).toThrowError('Cannot find scores in survey answer response');
    });

    it('should throw error when scores property is not found', function() {
      var input = {
        scorez: {}
      };
      expect(vm.parseAnswers.bind(vm, input)).toThrowError('Cannot find scores in survey answer response');
    });

    it('should throw error when scores property is not an array', function() {
      var input = {
        scores: {}
      };
      expect(vm.parseAnswers.bind(vm, input)).toThrowError('Cannot find scores in survey answer response');
    });

    it('should throw error when adjustedCategoryValueSum not found', function() {
      var input = {
        scores: [{
          category: 'foo'
        }, {}]
      };
      expect(vm.parseAnswers.bind(vm, input)).toThrowError('Cannot find adjustedCategoryValueSum in survey answer scores');
    });
  });

  describe('getInterestCategories()', function() {
    var categoriesRespopnse = '{"occupationalInterest":[{"elementId":"1.B.1.a","name":"Realistic","description":"Realistic occupations frequently involve work activities that include practical, hands-on problems and solutions. They often deal with plants, animals, and real-world materials like wood, tools, and machinery. Many of the occupations require working outside, and do not involve a lot of paperwork or working closely with others."},{"elementId":"1.B.1.b","name":"Investigative","description":"Investigative occupations frequently involve working with ideas, and require an extensive amount of thinking. These occupations can involve searching for facts and figuring out problems mentally."},{"elementId":"1.B.1.c","name":"Artistic","description":"Artistic occupations frequently involve working with forms, designs and patterns. They often require self-expression and the work can be done without following a clear set of rules."},{"elementId":"1.B.1.d","name":"Social","description":"Social occupations frequently involve working with, communicating with, and teaching people. These occupations often involve helping or providing service to others."},{"elementId":"1.B.1.e","name":"Enterprising","description":"Enterprising occupations frequently involve starting up and carrying out projects. These occupations can involve leading people and making many decisions. Sometimes they require risk taking and often deal with business."},{"elementId":"1.B.1.f","name":"Conventional","description":"Conventional occupations frequently involve following set procedures and routines. These occupations can include working with data and details more than with ideas. Usually there is a clear line of authority to follow."}]}';

    it('should get interest categories', function() {
      var categories = null;
      mockBackend.whenGET('/api/onet-service/1/cgsdemo/occupationalInterest').respond(angular.fromJson(categoriesRespopnse));
      vm.getInterestCategories().then(function(data) {
        categories = data;
      });
      mockBackend.flush();

      expect(categories).toBeDefined();
      // console.log(JSON.stringify(categories));
      expect(categories.length).toBe(6);
      expect(vm.categories).toBe(categories);
    });

    it('should reject promise when occupationalInterest property not found', function() {
      var input = {},
        error;
      mockBackend.whenGET('/api/onet-service/1/cgsdemo/occupationalInterest').respond(input);
      vm.getInterestCategories().catch(function(err) {
        error = err;
      });
      mockBackend.flush();

      expect(error).toBe('Cannot obtain interest survey categories');
    });
  });

  describe('init()', function() {
    it('should call functions appropriately', function() {
      spyOn(vm, 'getAnswers');
      spyOn(vm, 'getInterestCategories');
      vm.init();
      $rootScope.$digest();

      expect(vm.getAnswers).toHaveBeenCalled();
      expect(vm.getInterestCategories).toHaveBeenCalled();
    });
  });

});
