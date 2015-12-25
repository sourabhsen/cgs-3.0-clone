'use strict';

describe('View Model: Career Exploration Details', function() {
  var vm, mockBackend, $rootScope, User;

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('careerExplorationDetails.vm');
  });

  beforeEach(inject(function(CareerExplorationDetailsViewModel, _$httpBackend_, _$rootScope_, _User_) {
    mockBackend = _$httpBackend_;
    vm = CareerExplorationDetailsViewModel;
    $rootScope = _$rootScope_;
    User = _User_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    vm = mockBackend = User = undefined;
  });

  describe('getGoalDetails()', function() {
    var profileId = '1111-2222-3abc',
      ronetId = '15-1131.00',
      stateAreaId = '964',
      cityState = 'SEATTLE, WA',
      mockCareerResponse = '{"laborData":{"stateAreaId":964,"scopeAreaId":964,"scopeAreaType":"METRO","hiringTrend":"Very High","hiringTrendPercentile":90.0,"hiringDemand":24821,"salaryTrend":"$$$","salaryTrendPercentile":0.0,"salaryTrendAverage":100160.0,"salaryTrendMin":"81860","salaryTrendMax":"118660","salaryTrendRealTime":"$$$","salaryTrendRealTimeAverage":"91812","salaryTrendRealTimeMin":"91411","salaryTrendRealTimeMax":"92213","description":"Designs or improves computer software.  Oversees the entire software development process.  Analyzes customer or user needs, designs programs, writes code or instructs computer programmers, tests design, and documents programs. May assist with upgrades or maintenance. May specialize in the design of computer applications or computer systems.","id":"explorer/jobs/115","name":"Software Developer / Engineer","degreeIntroStatement":"Depending on the applicant’s job experience, Software Developer / Engineer positions may require one or more of the following training or degree programs:","degrees":"explorer/job/115/degrees","rOnet":"15-1131.00","certifications":[{"name":"Capability Model Maturity Integration (CMMI) Certification","demandPercentile":10.5641},{"name":"Project Management Professional Certification","demandPercentile":7.5657},{"name":"Cisco Certified Network Professional (CCNP)","demandPercentile":5.546},{"name":"Certified Information Systems Security Professional (CISSP)","demandPercentile":5.1749},{"name":"Cisco Certified Internetwork Expert (CCIE)","demandPercentile":3.7056},{"name":"IT Infrastructure Library Certification","demandPercentile":3.6907},{"name":"Certified Java Associate","demandPercentile":3.4317},{"name":"Microsoft Certified Solution Developer (MCSD)","demandPercentile":3.2325},{"name":"Certified Salesforce.Com Developer","demandPercentile":2.829},{"name":"VMWare Certified Professional","demandPercentile":2.7867},{"name":"Microsoft Certified Technology Specialist (MCTS)","demandPercentile":2.4953},{"name":"Certified Scrum Professional","demandPercentile":1.3722},{"name":"Microsoft Certified Systems Administrator (MCSA)","demandPercentile":1.28},{"name":"Cisco Certified Design Professional (CCDP)","demandPercentile":1.0584},{"name":"Certified A+ Technician","demandPercentile":0.7845},{"name":"Oracle Certified Associate","demandPercentile":0.767},{"name":"Mbe Certified","demandPercentile":0.4931},{"name":"Certified Salesforce.Com Administrator","demandPercentile":0.3362},{"name":"Certified Salesforce.Com Architect","demandPercentile":0.3163},{"name":"Microsoft Certified Application Developer","demandPercentile":0.2789},{"name":"Certified Programmer","demandPercentile":0.2764},{"name":"Oracle Certified Professional, Java Ee 5 Web Component Developer","demandPercentile":0.1121},{"name":"Oracle Certified Professional, Java Ee 5 Web Services Developer","demandPercentile":0.0996},{"name":"Sap Certification","demandPercentile":0.0623},{"name":"Oracle Certified Professional, Java Ee 5 Business Component Developer","demandPercentile":0.0598}],"educationRequirements":[{"educationRequirementType":"HighSchoolTechnicalTraining","requirementPercentile":8.0},{"educationRequirementType":"AssociatesDegree","requirementPercentile":3.0},{"educationRequirementType":"BachelorsDegree","requirementPercentile":82.0},{"educationRequirementType":"GraduateProfessionalDegree","requirementPercentile":6.0}],"experienceLevels":[{"experienceLevel":"LessThanTwoYears","experiencePercentile":6.0},{"experienceLevel":"TwoToFiveYears","experiencePercentile":36.0},{"experienceLevel":"FiveToEightYears","experiencePercentile":41.0},{"experienceLevel":"EightPlusYears","experiencePercentile":17.0}]},"degreeList":[{"degreeName":"Computer Engineering","id":"explorer/degrees/10653","name":"Bachelor\'s Degree - Computer Engineering","educationLevel":"Bachelor"},{"degreeName":"Computer Engineering","id":"explorer/degrees/10654","name":"Graduate/Professional Degree - Computer Engineering","educationLevel":"GraduateProfessional"},{"degreeName":"Computer Programming","id":"explorer/degrees/10668","name":"Bachelor\'s Degree - Computer Programming","educationLevel":"Bachelor"},{"degreeName":"Computer Science and Information Technology","id":"explorer/degrees/10671","name":"Bachelor\'s Degree - Computer Science and Information Technology","educationLevel":"Bachelor"},{"degreeName":"Computer Science and Information Technology","id":"explorer/degrees/10672","name":"Graduate/Professional Degree - Computer Science and Information Technology","educationLevel":"GraduateProfessional"},{"degreeName":"Electrical, Electronics and Communications Engineering","id":"explorer/degrees/10811","name":"Bachelor\'s Degree - Electrical, Electronics and Communications Engineering","educationLevel":"Bachelor"},{"degreeName":"Electrical, Electronics and Communications Engineering","id":"explorer/degrees/10812","name":"Graduate/Professional Degree - Electrical, Electronics and Communications Engineering","educationLevel":"GraduateProfessional"},{"degreeName":"Management Information Systems and Services","id":"explorer/degrees/11120","name":"Bachelor\'s Degree - Management Information Systems and Services","educationLevel":"Bachelor"},{"degreeName":"Management Information Systems and Services","id":"explorer/degrees/11121","name":"Graduate/Professional Degree - Management Information Systems and Services","educationLevel":"GraduateProfessional"}],"programs":[{"programId":"AAIT/PRG","programName":"Associate Of Arts With A Concentration In Information Technology/Programming","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/technology/associates/aait-prg.html","programLevel":"Associates"},{"programId":"BSIT","programName":"Bachelor Of Science In Information Technology","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/technology/bachelors/bsit.html","programLevel":"Bachelors"},{"programId":"BSIT/MD","programName":"Bachelor Of Science In Information Technology With A Concentration In Mobile Development","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/technology/bachelors/bsit-md.html","programLevel":"Bachelors"},{"programId":"BSIT/SE","programName":"Bachelor Of Science In Information Technology With A Concentration In Software Engineering","programLink":"http://www.qa.aptimus.phoenix.edu/programs/degree-programs/technology/bachelors/bsit-se.html","programLevel":"Bachelors"}],"jobTitles":[{"name":"Software Engineer","id":"explorer/jobtitles/3890"},{"name":"JAVA Developer","id":"explorer/jobtitles/2144"},{"name":".Net Developer","id":"explorer/jobtitles/1"},{"name":"Senior Software Engineer","id":"explorer/jobtitles/3760"},{"name":"Software Developer","id":"explorer/jobtitles/3889"},{"name":"Senior JAVA Developer","id":"explorer/jobtitles/3681"},{"name":"Senior Net Developer","id":"explorer/jobtitles/3704"},{"name":"Application Developer","id":"explorer/jobtitles/157"},{"name":"Senior Software Developer","id":"explorer/jobtitles/3759"},{"name":"Software Developer / Engineer","id":"explorer/jobtitles/4797"}],"skills":{"foundation":[{"id":"explorer/skills/21832","name":"Communication Skills","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":35.5721},{"id":"explorer/skills/22015","name":"Writing","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":26.7003},{"id":"explorer/skills/21945","name":"Problem Solving","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":20.5304},{"id":"explorer/skills/22005","name":"Troubleshooting","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":15.9088},{"id":"explorer/skills/21920","name":"Organizational Skills","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":15.1862},{"id":"explorer/skills/21887","name":"Leadership","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":15.0091},{"id":"explorer/skills/21962","name":"Quality Assurance and Control","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":12.2164},{"id":"explorer/skills/21957","name":"Project Management","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":12.0705},{"id":"explorer/skills/21930","name":"Planning","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":11.5021},{"id":"explorer/skills/21968","name":"Research","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":11.0504},{"id":"explorer/skills/21903","name":"Management","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":7.357},{"id":"explorer/skills/21853","name":"Detail-Oriented","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":6.7796},{"id":"explorer/skills/21846","name":"Customer service","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":6.7766},{"id":"explorer/skills/21994","name":"Team Work","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":5.3764},{"id":"explorer/skills/21844","name":"Creativity","skillType":"Foundation","jobSkillType":"Demanded","demandPercentile":5.3219}],"specialized":[{"id":"explorer/skills/19982","name":"Software Engineering","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":28.6384},{"id":"explorer/skills/19980","name":"Software Development","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":18.9011},{"id":"explorer/skills/13432","name":"Debugging","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":9.9597},{"id":"explorer/skills/21355","name":"Web Application Development","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":8.7278},{"id":"explorer/skills/21373","name":"Web Site Development","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":8.0947},{"id":"explorer/skills/19978","name":"Software Architecture","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":7.7432},{"id":"explorer/skills/19353","name":"Relational Databases","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":7.046},{"id":"explorer/skills/20626","name":"Technical Writing / Editing","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":5.4771},{"id":"explorer/skills/21766","name":"Systems Development Life Cycle (SDLC)","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":5.2534},{"id":"explorer/skills/18894","name":"Product Development","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":5.1573},{"id":"explorer/skills/12963","name":"Computer Engineering","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":5.1479},{"id":"explorer/skills/21904","name":"Mathematics","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":5.1094},{"id":"explorer/skills/13974","name":"Electrical Engineering","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.6857},{"id":"explorer/skills/12204","name":"Business Process","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.6599},{"id":"explorer/skills/14552","name":"Extensible Stylesheet Language XSL","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.471},{"id":"explorer/skills/13397","name":"Database Design","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.4297},{"id":"explorer/skills/17277","name":"Mentoring","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.2187},{"id":"explorer/skills/13033","name":"Configuration Management","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":4.1439},{"id":"explorer/skills/17701","name":"Network Hardware/Software Maintenance","skillType":"Specialized","jobSkillType":"Demanded","demandPercentile":3.8519}],"software":[{"id":"explorer/skills/21669","name":"Java","skillType":"Software","jobSkillType":"Demanded","demandPercentile":38.5244},{"id":"explorer/skills/21757","name":"SQL","skillType":"Software","jobSkillType":"Demanded","demandPercentile":28.49},{"id":"explorer/skills/21674","name":"JavaScript","skillType":"Software","jobSkillType":"Demanded","demandPercentile":21.0718},{"id":"explorer/skills/21698","name":"Microsoft C#","skillType":"Software","jobSkillType":"Demanded","demandPercentile":20.6842},{"id":"explorer/skills/21615","name":"C++","skillType":"Software","jobSkillType":"Demanded","demandPercentile":19.701},{"id":"explorer/skills/21582","name":".NET Programming","skillType":"Software","jobSkillType":"Demanded","demandPercentile":18.9871},{"id":"explorer/skills/21680","name":"LINUX","skillType":"Software","jobSkillType":"Demanded","demandPercentile":18.5273},{"id":"explorer/skills/21641","name":"Extensible Markup Language (XML)","skillType":"Software","jobSkillType":"Demanded","demandPercentile":18.5174},{"id":"explorer/skills/21723","name":"Oracle","skillType":"Software","jobSkillType":"Demanded","demandPercentile":18.3122},{"id":"explorer/skills/21720","name":"Object-Oriented Analysis and Design (OOAD)","skillType":"Software","jobSkillType":"Demanded","demandPercentile":17.3862},{"id":"explorer/skills/21710","name":"Microsoft Windows","skillType":"Software","jobSkillType":"Demanded","demandPercentile":15.7615},{"id":"explorer/skills/21774","name":"UNIX","skillType":"Software","jobSkillType":"Demanded","demandPercentile":13.4625},{"id":"explorer/skills/21758","name":"SQL Server","skillType":"Software","jobSkillType":"Demanded","demandPercentile":12.2941},{"id":"explorer/skills/21606","name":"AJAX","skillType":"Software","jobSkillType":"Demanded","demandPercentile":10.0277},{"id":"explorer/skills/21729","name":"PERL","skillType":"Software","jobSkillType":"Demanded","demandPercentile":9.1961},{"id":"explorer/skills/16427","name":"jQuery","skillType":"Software","jobSkillType":"Demanded","demandPercentile":8.9016},{"id":"explorer/skills/21696","name":"Microsoft","skillType":"Software","jobSkillType":"Demanded","demandPercentile":8.4435},{"id":"explorer/skills/21735","name":"Python","skillType":"Software","jobSkillType":"Demanded","demandPercentile":8.2518},{"id":"explorer/skills/21783","name":"Visual Studio","skillType":"Software","jobSkillType":"Demanded","demandPercentile":6.7488},{"id":"explorer/skills/21671","name":"Java Server Pages (JSP)","skillType":"Software","jobSkillType":"Demanded","demandPercentile":6.3115},{"id":"explorer/skills/24673","name":"HTML5","skillType":"Software","jobSkillType":"Demanded","demandPercentile":4.2366}],"empty":false},"tenantDesc":"University of Phoenix"}',
      mockPlaylistResponse = '{"list":[{"listId":36529,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"1111-2222-3abc","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-07-22T19:37:46.000Z","listItems":[{"listItemId":191451,"listId":34533,"itemType":"RONET","itemIdentifier":"explorer/jobs/115","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-14T21:43:38.000Z"},{"listItemId":191421,"listId":34533,"itemType":"RONET","itemIdentifier":"explorer/jobs/116","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-14T18:23:48.000Z"},{"listItemId":189531,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-02T17:13:32.000Z"},{"listItemId":189529,"listId":34533,"itemType":"RONET","itemIdentifier":"11-9151.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-02T17:13:31.000Z"},{"listItemId":188629,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-06-24T18:25:59.000Z"},{"listItemId":188631,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":2,"itemStatus":"SAVED","createDate":"2015-06-24T18:26:00.000Z"}]}]}',
      mockJobsResponse = '{"sortBy":"Relevancy","getLinkedInConnections":false,"radiusUsed":true,"serviceName":"job-service","jobs":{"nextPage":1,"previousPage":-1,"firstPage":true,"totalPages":176,"lastPage":false,"totalNumberOfResults":877,"numberOfElements":5,"pageNumber":0,"results":[{"job":{"jobId":27918655,"providerCompanyName":"Job represented by Experis (a staffing company)","providerName":"Manpower","title":"Lead Electrical Design Eng","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98141"},"postingDate":"2015-07-13T17:52:31.000Z","updateDate":"2015-07-13T18:12:54.000Z","ageInSeconds":98840},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":27272793,"providerCompanyName":"Job represented by Experis (a staffing company)","providerName":"Manpower","title":"Build Engineer Sr.","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98141"},"postingDate":"2015-07-13T17:52:31.000Z","updateDate":"2015-07-13T18:13:07.000Z","ageInSeconds":98840},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":26485329,"providerCompanyName":"Job represented by Experis (a staffing company)","providerName":"Manpower","title":"Cloud-Software Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98141"},"postingDate":"2015-07-13T17:52:31.000Z","updateDate":"2015-07-13T18:10:41.000Z","ageInSeconds":98840},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":26439343,"providerCompanyName":"Job represented by Experis (a staffing company)","providerName":"Manpower","title":"Software Developer V","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98141"},"postingDate":"2015-07-13T17:52:31.000Z","updateDate":"2015-07-13T18:12:57.000Z","ageInSeconds":98840},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":27956939,"companyId":305785,"providerCompanyName":"Amazon.com, Inc.","providerName":"BURNING_GLASS","title":"Software Development Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-07-12T00:00:00.000Z","updateDate":"2015-07-14T08:11:16.000Z","ageInSeconds":249591},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false}],"pageSize":5},"facetFields":[{"name":"Company","values":[{"name":"Microsoft Corporation","count":156},{"name":"Amazon.com, Inc.","count":109},{"name":"Nordstrom, Inc.","count":32},{"name":"Job represented by Experis (a staffing company)","count":20},{"name":"Groupon","count":16},{"name":"Oracle","count":13},{"name":"Accenture","count":12},{"name":"AT&T Inc.","count":11},{"name":"Disney","count":11},{"name":"Vertical Move","count":11},{"name":"Tableau","count":9},{"name":"Zillow","count":9},{"name":"Starbucks Corporation","count":8},{"name":"Vanderhouwen & Associates","count":8},{"name":"Dealersocket","count":7},{"name":"Ge Healthcare Worldwide","count":7},{"name":"Hewlett-Packard Company","count":7},{"name":"T Mobile Usa Incorporated","count":7},{"name":"The Boeing Company","count":7},{"name":"Deloitte","count":6},{"name":"Expedia, Inc","count":6},{"name":"Siemens Corporation","count":6},{"name":"Concur","count":5},{"name":"Consulting Incorporated","count":5},{"name":"Ericsson","count":5},{"name":"Koninklijke Philips N.V","count":5},{"name":"Prokarma","count":5},{"name":"Providence Health & Services","count":5},{"name":"Reqroute Inc","count":5},{"name":"Synchrony Financial","count":5},{"name":"Wimmer Solutions","count":5},{"name":"Avalara Incorporated","count":4},{"name":"Cdk Global","count":4},{"name":"Compunnel","count":4},{"name":"Dell","count":4},{"name":"First Tek","count":4},{"name":"Honeywell","count":4},{"name":"McGraw-Hill Company Incorporated","count":4},{"name":"Remitly","count":4},{"name":"Spacex","count":4},{"name":"Uievolution Incorporated","count":4},{"name":"Wipro","count":4},{"name":"24Seven Inc","count":3},{"name":"Bowker","count":3},{"name":"Chameleon Technologies","count":3},{"name":"Ciber, Inc.","count":3},{"name":"Cypress Semiconductor","count":3},{"name":"EMC","count":3},{"name":"Facebook","count":3},{"name":"GENERAL ELECTRIC COMPANY","count":3}],"valueCount":50},{"name":"Location","values":[{"name":"SEATTLE, WA","count":483},{"name":"REDMOND, WA","count":175},{"name":"BELLEVUE, WA","count":107},{"name":"BOTHELL, WA","count":32},{"name":"ISSAQUAH, WA","count":16},{"name":"KIRKLAND, WA","count":14},{"name":"RENTON, WA","count":14},{"name":"TACOMA, WA","count":11},{"name":"AUBURN, WA","count":4},{"name":"KENT, WA","count":4},{"name":"KEYPORT, WA","count":4},{"name":"LYNNWOOD, WA","count":4},{"name":"BREMERTON, WA","count":3},{"name":"WOODINVILLE, WA","count":3},{"name":"FEDERAL WAY, WA","count":2},{"name":"SILVERDALE, WA","count":2},{"name":"GIG HARBOR, WA","count":1},{"name":"MOUNTLAKE TERRACE, WA","count":1}],"valueCount":18},{"name":"Academic Program","values":[{"name":"Bachelor Of Science In Information Technology","count":880},{"name":"Associate Of Arts With A Concentration In Information Technology/Programming","count":877},{"name":"Bachelor Of Science In Information Technology With A Concentration In Mobile Development","count":877},{"name":"Bachelor Of Science In Information Technology With A Concentration In Software Engineering","count":877}],"valueCount":4},{"name":"Career Area","values":[{"name":"Computer and Mathematical Occupations","count":880}],"valueCount":1},{"name":"Education Level","values":[{"name":"4 year Degree","count":573},{"name":"None Specified","count":247},{"name":"High School","count":43},{"name":"Graduate Degree","count":10},{"name":"2 year Degree","count":6},{"name":"Post Graduate Degree","count":1}],"valueCount":6},{"name":"Employee Partner","values":[{"name":"uopx","count":21}],"valueCount":1},{"name":"Tuition Reimbursement","values":[{"name":"uopx","count":331}],"valueCount":1}],"facetRanges":[{"name":"Experience Level","counts":[{"value":"5-10","count":323},{"value":"2-5","count":400},{"value":"10+","count":43},{"value":"0-2","count":80}]}],"logSolrQuery":"*:*","logSolrFilter":"[tenant:\\"uopx\\", jobCode:\\"15-1131.00\\", {!geofilt pt=47.61,-122.33 sfield=geo d=40.2335}]"}';

    it('should set goals to undefined if no arguments provided', function() {
      var result,
        errorMessage = 'ronet argument, User.profileId, User.profile.stateAreaId, User.profile.cityState must be set';

      vm.getGoalDetails().catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goal).toBeUndefined();

      vm.getGoalDetails(ronetId).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goal).toBeUndefined();

      User.profileId = profileId;
      vm.getGoalDetails(ronetId).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goal).toBeUndefined();

      User.profile = {
        stateAreaId: stateAreaId
      };
      vm.getGoalDetails(ronetId).catch(function(err) {
        result = err;
      });
      $rootScope.$digest();
      expect(result).toBe(errorMessage);
      expect(vm.goal).toBeUndefined();
    });

    it('should set goals when arguments provided', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/career/15-1131.00/details?fallback=national&laborMarketDetails=true&stateAreaId=964').respond(mockCareerResponse);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(mockPlaylistResponse);
      mockBackend.expectPOST('/api/job-service/1/cgsdemo/jobs/search').respond(function(method, url, data) {
        expect(data).toBe('{"programFilter":[],"programCode":[],"industryFilter":[],"experienceLevel":[],"companyFilter":[],"jobTitle":[],"jobType":[],"jobCode":"15-1131.00","eduLevelFilter":[],"salaryRange":[],"salaryFrequency":[],"pageNumber":0,"pageSize":5,"sortBy":"Relevancy","locationFilter":[],"location":"SEATTLE, WA"}');
        return [200, mockJobsResponse, { /*headers*/ }];
      });
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId,
        cgsLocation: cityState
      };
      var goal = null;
      vm.getGoalDetails(ronetId).then(function(data) {
        goal = data;
      });
      expect(goal).toBeNull();
      mockBackend.flush();
      expect(goal).toBeDefined();
      expect(goal).toEqual(vm.goal);
      expect(goal.laborData.name).toBe('Software Developer / Engineer');
      expect(goal.laborData.saved).toBeDefined();
      expect(goal.laborData.certifications.length).toBe(25);
      expect(goal.laborData.educationRequirements.length).toBe(4);
      expect(goal.degreeList.length).toBe(9);
      expect(goal.programs.length).toBe(4);
      expect(goal.jobTitles.length).toBe(10);
      expect(goal.skills.foundation.length).toBe(15);
      expect(goal.skills.software.length).toBe(21);
      expect(goal.jobs.length).toBe(5);

      // console.log(JSON.stringify(goal, undefined, 2));
    });

    it('should set goals when arguments provided and playlist returns 404', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/career/15-1131.00/details?fallback=national&laborMarketDetails=true&stateAreaId=964').respond(mockCareerResponse);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(404, '');
      mockBackend.expectPOST('/api/job-service/1/cgsdemo/jobs/search').respond(function(method, url, data) {
        expect(data).toBe('{"programFilter":[],"programCode":[],"industryFilter":[],"experienceLevel":[],"companyFilter":[],"jobTitle":[],"jobType":[],"jobCode":"15-1131.00","eduLevelFilter":[],"salaryRange":[],"salaryFrequency":[],"pageNumber":0,"pageSize":5,"sortBy":"Relevancy","locationFilter":[],"location":"SEATTLE, WA"}');
        return [200, mockJobsResponse, { /*headers*/ }];
      });
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId,
        cgsLocation: cityState
      };
      var goal = null;
      vm.getGoalDetails(ronetId).then(function(data) {
        goal = data;
      });
      expect(goal).toBeNull();
      mockBackend.flush();
      expect(goal).toBeDefined();
      expect(goal).toEqual(vm.goal);
      expect(goal.laborData.saved).toBeUndefined();
      // console.log(JSON.stringify(goal.laborData, undefined, 2));
    });

    it('should reject when playlist returns non-404 error', function() {
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/career/15-1131.00/details?fallback=national&laborMarketDetails=true&stateAreaId=964').respond(mockCareerResponse);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2222-3abc/lists').respond(503, '');
      User.profileId = profileId;
      User.profile = {
        stateAreaId: stateAreaId,
        cgsLocation: cityState
      };
      var results = null;
      vm.getGoalDetails(ronetId).catch(function(err) {
        results = err;
      });
      mockBackend.flush();
      expect(vm.goal).toBeUndefined();
      expect(results.status).toBe(503);
      // console.log(JSON.stringify(goal.laborData, undefined, 2));
    });
  });

});
