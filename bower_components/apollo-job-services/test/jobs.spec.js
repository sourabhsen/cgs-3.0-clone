/**
 * Created by yrganta on 5/5/15.
 */
describe('Jobs:', function () {
  var $rootScope, $injector, Jobs, $httpBackend;

  beforeEach(function () {
    module('apolloJobServices.jobs');

    inject(function (_$injector_) {
      $injector = _$injector_;

      $httpBackend = $injector.get('$httpBackend');

      Jobs = $injector.get('Jobs');

      $rootScope = $injector.get('$rootScope');
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();

    $rootScope = $injector = Jobs = $httpBackend = undefined;
  });

  describe('`search` method units::', function () {
    var search, requestHandler;

    beforeEach(function () {
      search = Jobs.search;

      requestHandler = $httpBackend.expectPOST(/\/api\/job-service\/\d+\/\w+\/jobs\/search/);
    });

    afterEach(function () {
      search = requestHandler = undefined;
    });

    it('Calling search without any user configuration should return a list of jobs and pass the default config.', function () {
      var jobs, responseHandler, $http, postParams;

      requestHandler.respond('{"sortBy":"Relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"job-service","jobs":{"pageNumber":0,"numberOfElements":10,"lastPage":false,"firstPage":true,"totalPages":21616,"nextPage":1,"totalNumberOfResults":216159,"pageSize":10,"previousPage":-1,"results":[{"job":{"jobId":25542409,"providerCompanyName":"Analyst International","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"ATLANTA","state":"GEORGIA","country":"USA","postal":"30317"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:31:47.000Z","ageInSeconds":759339},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24914759,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:30:00.000Z","ageInSeconds":1364139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":23739633,"providerCompanyName":"Software Analysts Corporation","title":"Software Development Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"SAINT PAUL","state":"MINNESOTA","country":"USA","postal":"55121"},"postingDate":"2015-04-06T00:00:00.000Z","updateDate":"2015-04-07T21:50:22.000Z","ageInSeconds":2746539},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":25033341,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Junior Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-23T00:00:00.000Z","updateDate":"2015-04-25T06:10:31.000Z","ageInSeconds":1277739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24699607,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Software Development Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-18T00:00:00.000Z","updateDate":"2015-04-19T22:36:38.000Z","ageInSeconds":1709739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24698589,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Junior Software Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-18T00:00:00.000Z","updateDate":"2015-04-19T22:36:25.000Z","ageInSeconds":1709739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24559105,"providerCompanyName":"Data Systems Analysts","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"HONOLULU","state":"HAWAII","country":"USA","postal":"96801"},"postingDate":"2015-04-16T00:00:00.000Z","updateDate":"2015-04-18T00:04:24.000Z","ageInSeconds":1882539},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22730395,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"HONOLULU","state":"HAWAII","country":"USA","postal":"96801"},"postingDate":"2015-03-23T00:00:00.000Z","updateDate":"2015-03-25T03:06:31.000Z","ageInSeconds":3956139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22278763,"providerCompanyName":"Bronto Software Incorporated","title":"IS Software Analyst","status":"ACTIVE","publicIndustry":true,"location":{"city":"DURHAM","state":"NORTH CAROLINA","country":"USA","postal":"27701"},"postingDate":"2015-03-18T00:00:00.000Z","updateDate":"2015-03-20T02:34:36.000Z","ageInSeconds":4388139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22874553,"providerCompanyName":"Montefiore","title":"Software Analyst","status":"ACTIVE","publicIndustry":true,"location":{"city":"NEW YORK","state":"NEW YORK","country":"USA","postal":"10001"},"postingDate":"2015-03-25T00:00:00.000Z","updateDate":"2015-03-27T03:55:03.000Z","ageInSeconds":3783339},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false}]},"facetFields":[{"name":"Company","values":[{"name":"Oracle","count":6164},{"name":"Accenture Inc.","count":5331},{"name":"Bullhorn Reach","count":3965},{"name":"Job represented by Kelly Services (a staffing company)","count":1670},{"name":"The Home Depot Incorporated","count":1613},{"name":"General Dynamics","count":1609},{"name":"Oregon.gov","count":1528},{"name":"Compunnel Software Group, Inc.","count":1401},{"name":"Hewlett-Packard Company","count":1232},{"name":"Xerox Corporation","count":1126},{"name":"UnitedHealth Group Incorporated","count":1103},{"name":"Pricewaterhousecoopers","count":1087},{"name":"The PNC Financial Services Group, Inc.","count":1083},{"name":"Amazon.com, Inc.","count":1048},{"name":"Dell Inc.","count":989},{"name":"Medical Management International, Inc.","count":904},{"name":"Computer Sciences Corporation","count":902},{"name":"IBM","count":883},{"name":"Anthem Blue Cross","count":818},{"name":"Rgbsi.Com","count":759},{"name":"Capital One Financial Corporation","count":729},{"name":"Verizon Communications Inc.","count":705},{"name":"EMC","count":685},{"name":"Synchrony Financial","count":668},{"name":"US Department of Veterans Affairs","count":654},{"name":"JP Morgan Chase Company","count":631},{"name":"Raytheon Company","count":626},{"name":"Kaiser Permanente","count":608},{"name":"Bank of America Corporation","count":576},{"name":"MANUFACTURERS AND TRADERS TRUST COMPANY","count":562},{"name":"M&T Bank","count":551},{"name":"Booz Allen Hamilton Inc.","count":542},{"name":"CVS Caremark Corporation","count":540},{"name":"Job represented by Experis (a staffing company)","count":530},{"name":"CITIGROUP INC.","count":469},{"name":"Chrysler Group LLC","count":467},{"name":"Cisco Systems Incorporated","count":465},{"name":"Deloitte","count":456},{"name":"Fresenius","count":452},{"name":"Northrop Grumman","count":447},{"name":"The Brickman Group, Ltd","count":431},{"name":"Job represented by Manpower (a staffing company)","count":418},{"name":"Salesforce.Com","count":416},{"name":"ManTech International Corporation","count":415},{"name":"GENERAL ELECTRIC COMPANY","count":410},{"name":"CenturyLink, Inc.","count":397},{"name":"Safelite Auto Glass","count":393},{"name":"Advance Auto Parts Incorporated","count":385},{"name":"The Sports Authority","count":380},{"name":"The Allstate Corporation","count":373}],"valueCount":50},{"name":"Location","values":[{"name":"NEW YORK, NY","count":7474},{"name":"CHICAGO, IL","count":4151},{"name":"SAN FRANCISCO, CA","count":3746},{"name":"SEATTLE, WA","count":3509},{"name":"WASHINGTON, DC","count":3335},{"name":"PHOENIX, AZ","count":3283},{"name":"PITTSBURGH, PA","count":3041},{"name":"HOUSTON, TX","count":2972},{"name":"ATLANTA, GA","count":2954},{"name":"AUSTIN, TX","count":2947},{"name":"PORTLAND, OR","count":2724},{"name":"BOSTON, MA","count":2363},{"name":"CHARLOTTE, NC","count":2324},{"name":"DALLAS, TX","count":2268},{"name":"CLEVELAND, OH","count":2186},{"name":"DENVER, CO","count":2170},{"name":"MINNEAPOLIS, MN","count":1983},{"name":"LOS ANGELES, CA","count":1942},{"name":"SAN DIEGO, CA","count":1685},{"name":"PHILADELPHIA, PA","count":1615},{"name":"SAN ANTONIO, TX","count":1578},{"name":"CINCINNATI, OH","count":1490},{"name":"INDIANAPOLIS, IN","count":1466},{"name":"SAN JOSE, CA","count":1309},{"name":"TAMPA, FL","count":1234},{"name":"SAINT LOUIS, MO","count":1219},{"name":"COLUMBUS, OH","count":1118},{"name":"NASHVILLE, TN","count":1038},{"name":"RICHMOND, VA","count":1016},{"name":"BALTIMORE, MD","count":996},{"name":"IRVINE, CA","count":978},{"name":"MIAMI, FL","count":912},{"name":"SCOTTSDALE, AZ","count":897},{"name":"ARLINGTON, VA","count":886},{"name":"ORLANDO, FL","count":851},{"name":"TUCSON, AZ","count":847},{"name":"RALEIGH, NC","count":845},{"name":"SALT LAKE CITY, UT","count":839},{"name":"BELLEVUE, WA","count":830},{"name":"PALO ALTO, CA","count":828},{"name":"MILWAUKEE, WI","count":814},{"name":"RESTON, VA","count":792},{"name":"LOUISVILLE, KY","count":784},{"name":"SANTA CLARA, CA","count":769},{"name":"SIOUX FALLS, SD","count":763},{"name":"MC LEAN, VA","count":745},{"name":"ENGLEWOOD, CO","count":738},{"name":"DETROIT, MI","count":711},{"name":"SAINT PAUL, MN","count":711},{"name":"COLORADO SPRINGS, CO","count":710}],"valueCount":50},{"name":"Academic Program","values":[{"name":"Bachelor Of Science In Information Technology With Health Care Information Technology Certificate","count":42128},{"name":"Bachelor Of Science In Information Technology With Network Support Certificate","count":42063},{"name":"Bachelor Of Science In Information Technology With Advanced Networking Certificate","count":41668},{"name":"Bachelor Of Science In Information Technology With Advanced Information Systems Security Certificate","count":40709},{"name":"Bachelor Of Science In Information Technology With Information Assurance And Security Certificate","count":40709},{"name":"Bachelor Of Science In Information Technology With Associate Of Arts Concentration In Information Technology","count":40512},{"name":"Bachelor Of Science In Information Technology With Advanced Business Analytics Certificate","count":39752},{"name":"Bachelor Of Science In Information Technology With A Database Administration Certificate","count":38847},{"name":"Bachelor Of Science In Information Technology With Advanced Multimedia Development Certificate","count":38802},{"name":"Bachelor Of Science In Information Technology With Cisco Networking Certificate","count":38233},{"name":"Bachelor Of Science In Information Technology With Desktop Support Certificate","count":38233},{"name":"Bachelor Of Science In Information Technology With A Programming Certificate","count":36470},{"name":"Bachelor Of Science In Information Technology With Advanced Software Developer Certificate","count":36470},{"name":"Associate Of Arts Concentration In Information Technology With Programming Certificate","count":36433},{"name":"Bachelor Of Science In Information Technology With A Web Administration Certificate","count":33779},{"name":"Bachelor Of Science In Information Technology","count":32287},{"name":"Bachelor Of Science In Accounting With An Associate Of Arts With A Concentration In Business Fundamentals","count":31710},{"name":"Advanced Mobile Development Certificate","count":29401},{"name":"Advanced Software Developer Certificate (Undergraduate)","count":28208},{"name":"Associate Of Arts With A Concentration In Information Technology/Programming","count":28208},{"name":"Programming Certificate (Undergraduate)","count":28208},{"name":"Bachelor Of Science In Information Technology With A Concentration In Mobile Development","count":27002},{"name":"Bachelor Of Science In Information Technology With A Concentration In Software Engineering","count":27002},{"name":"Graduate Information Systems Audit And Control Certificate","count":25968},{"name":"Master Of Information Systems With Information Systems Audit And Control Certificate","count":25968},{"name":"Master Of Business Administration With A Concentration In Finance","count":25279},{"name":"Doctor Of Business Administration","count":24196},{"name":"Bachelor Of Science In Business With Associate Of Arts Concentration In Business Fundamentals","count":17822},{"name":"Master Of Business Administration With A Concentration In Global Management","count":17306},{"name":"Master Of Management","count":17306},{"name":"Associate Of Arts Concentration In Business Fundamentals","count":16815},{"name":"Bachelor Of Science In Information Technology With A Concentration In Business Systems Analysis","count":15809},{"name":"Graduate Information Systems Management Certificate","count":15480},{"name":"Master Of Information Systems With Information Systems Management Certificate","count":15480},{"name":"Bachelor Of Science In Business With A Concentration In Accounting","count":15273},{"name":"Bachelor Of Science In Accounting","count":14895},{"name":"Associate Of Arts Concentration In Information Technology With Database Administration Certificate","count":14785},{"name":"Master Of Information Systems With Business Analytics Certificate","count":14727},{"name":"Bachelor Of Science In Business With A Concentration In Finance","count":13885},{"name":"Advanced Business Analytics Certificate","count":13433},{"name":"Graduate Business Analytics Certificate","count":13433},{"name":"Graduate Project Management Certificate","count":13211},{"name":"Bachelor Of Science In Business With Sales Management Certificate","count":12963},{"name":"Associate Of Arts Concentration In Information Technology With Information Assurance And Security Certificate","count":12817},{"name":"Master Of Health Administration/Master Of Business Administration/Project Management","count":12699},{"name":"Associate Of Arts Concentration In Retail Management (Certificate Track)","count":12557},{"name":"Retail Management Certificate","count":12557},{"name":"Bachelor Of Science In Business With A Concentration In Administration","count":12333},{"name":"Bachelor Of Science In Business With A Concentration In Global Management","count":12333},{"name":"Bachelor Of Science In Business With A Concentration In Management","count":12333}],"valueCount":50},{"name":"Career Area","values":[{"name":"Computer and Mathematical Occupations","count":75385},{"name":"Business and Financial Operations Occupations","count":31208},{"name":"Management Occupations","count":26243},{"name":"Office and Administrative Support Occupations","count":20074},{"name":"Sales and Related Occupations","count":19784},{"name":"Architecture and Engineering Occupations","count":9723},{"name":"Healthcare Practitioners and Technical Occupations","count":6517},{"name":"Arts, Design, Entertainment, Sports, and Media Occupations","count":3960},{"name":"Installation, Maintenance, and Repair Occupations","count":3957},{"name":"Life, Physical, and Social Science Occupations","count":2914},{"name":"Education, Training, and Library Occupations","count":2637},{"name":"Transportation and Material Moving Occupations","count":2306},{"name":"Production Occupations","count":2098},{"name":"Food Preparation and Serving Related Occupations","count":2077},{"name":"Protective Service Occupations","count":1642},{"name":"Healthcare Support Occupations","count":1447},{"name":"Community and Social Service Occupations","count":1022},{"name":"Legal Occupations","count":875},{"name":"Personal Care and Service Occupations","count":736},{"name":"Construction and Extraction Occupations","count":723},{"name":"Building and Grounds Cleaning and Maintenance Occupations","count":474},{"name":"Farming, Fishing, and Forestry Occupations","count":180}],"valueCount":22},{"name":"Education Level","values":[{"name":"4 year Degree","count":112856},{"name":"None Specified","count":58295},{"name":"High School","count":29135},{"name":"2 year Degree","count":7789},{"name":"Graduate Degree","count":6284},{"name":"Post Graduate Degree","count":1800}],"valueCount":6},{"name":"Employee Partner","values":[{"name":"uopx","count":13848}],"valueCount":1},{"name":"Tuition Reimbursement","values":[{"name":"uopx","count":34497}],"valueCount":1}],"facetRanges":[{"name":"Experience Level","counts":[{"value":"5-10","count":63953},{"value":"2-5","count":93897},{"value":"10+","count":12954},{"value":"0-2","count":43792}]}]}');

      $http = $injector.get('$http');
      spyOn($http, 'post').and.callThrough();

      // Show there are no call happening before we call search
      expect($http.post.calls.count()).toBe(0);

      responseHandler = search();

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();
      expect($http.post.calls.count()).toBe(1);

      postParams = $http.post.calls.mostRecent().args[1];

      expect(postParams['keywords.title']).toEqual('');
      expect(postParams.tuitionReimbursement).toEqual(false);
      expect(postParams.preferredPartner).toEqual(true);
      expect(postParams.radius).toEqual(25);
      expect(postParams.programFilter.length).toBe(0);

      $httpBackend.flush(1);

      expect(jobs).toBeDefined();
      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(10);
      expect(angular.isArray(jobs.facetFields)).toEqual(true);
      expect(angular.isArray(jobs.facetRanges)).toEqual(true);
    });

    it('Calling search with custom user config should pass the config as query params to search service.', function () {
      var jobs, responseHandler, $http, postParams;

      $http = $injector.get('$http');
      spyOn($http, 'post').and.callThrough();

      requestHandler.respond('{"sortBy":"Relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"job-service","jobs":{"pageNumber":0,"numberOfElements":10,"lastPage":false,"firstPage":true,"totalPages":21616,"nextPage":1,"totalNumberOfResults":216159,"pageSize":10,"previousPage":-1,"results":[{"job":{"jobId":25542409,"providerCompanyName":"Analyst International","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"ATLANTA","state":"GEORGIA","country":"USA","postal":"30317"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:31:47.000Z","ageInSeconds":759339},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24914759,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:30:00.000Z","ageInSeconds":1364139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":23739633,"providerCompanyName":"Software Analysts Corporation","title":"Software Development Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"SAINT PAUL","state":"MINNESOTA","country":"USA","postal":"55121"},"postingDate":"2015-04-06T00:00:00.000Z","updateDate":"2015-04-07T21:50:22.000Z","ageInSeconds":2746539},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":25033341,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Junior Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-23T00:00:00.000Z","updateDate":"2015-04-25T06:10:31.000Z","ageInSeconds":1277739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24699607,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Software Development Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-18T00:00:00.000Z","updateDate":"2015-04-19T22:36:38.000Z","ageInSeconds":1709739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24698589,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Junior Software Engineer","status":"ACTIVE","publicIndustry":true,"location":{"city":"O FALLON","state":"ILLINOIS","country":"USA","postal":"62269"},"postingDate":"2015-04-18T00:00:00.000Z","updateDate":"2015-04-19T22:36:25.000Z","ageInSeconds":1709739},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":24559105,"providerCompanyName":"Data Systems Analysts","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"HONOLULU","state":"HAWAII","country":"USA","postal":"96801"},"postingDate":"2015-04-16T00:00:00.000Z","updateDate":"2015-04-18T00:04:24.000Z","ageInSeconds":1882539},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22730395,"providerCompanyName":"Data Systems Analysts Incorporated","title":"Java Software Developer","status":"ACTIVE","publicIndustry":true,"location":{"city":"HONOLULU","state":"HAWAII","country":"USA","postal":"96801"},"postingDate":"2015-03-23T00:00:00.000Z","updateDate":"2015-03-25T03:06:31.000Z","ageInSeconds":3956139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22278763,"providerCompanyName":"Bronto Software Incorporated","title":"IS Software Analyst","status":"ACTIVE","publicIndustry":true,"location":{"city":"DURHAM","state":"NORTH CAROLINA","country":"USA","postal":"27701"},"postingDate":"2015-03-18T00:00:00.000Z","updateDate":"2015-03-20T02:34:36.000Z","ageInSeconds":4388139},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false},{"job":{"jobId":22874553,"providerCompanyName":"Montefiore","title":"Software Analyst","status":"ACTIVE","publicIndustry":true,"location":{"city":"NEW YORK","state":"NEW YORK","country":"USA","postal":"10001"},"postingDate":"2015-03-25T00:00:00.000Z","updateDate":"2015-03-27T03:55:03.000Z","ageInSeconds":3783339},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"score":0.0,"isSaved":false}]},"facetFields":[{"name":"Company","values":[{"name":"Oracle","count":6164},{"name":"Accenture Inc.","count":5331},{"name":"Bullhorn Reach","count":3965},{"name":"Job represented by Kelly Services (a staffing company)","count":1670},{"name":"The Home Depot Incorporated","count":1613},{"name":"General Dynamics","count":1609},{"name":"Oregon.gov","count":1528},{"name":"Compunnel Software Group, Inc.","count":1401},{"name":"Hewlett-Packard Company","count":1232},{"name":"Xerox Corporation","count":1126},{"name":"UnitedHealth Group Incorporated","count":1103},{"name":"Pricewaterhousecoopers","count":1087},{"name":"The PNC Financial Services Group, Inc.","count":1083},{"name":"Amazon.com, Inc.","count":1048},{"name":"Dell Inc.","count":989},{"name":"Medical Management International, Inc.","count":904},{"name":"Computer Sciences Corporation","count":902},{"name":"IBM","count":883},{"name":"Anthem Blue Cross","count":818},{"name":"Rgbsi.Com","count":759},{"name":"Capital One Financial Corporation","count":729},{"name":"Verizon Communications Inc.","count":705},{"name":"EMC","count":685},{"name":"Synchrony Financial","count":668},{"name":"US Department of Veterans Affairs","count":654},{"name":"JP Morgan Chase Company","count":631},{"name":"Raytheon Company","count":626},{"name":"Kaiser Permanente","count":608},{"name":"Bank of America Corporation","count":576},{"name":"MANUFACTURERS AND TRADERS TRUST COMPANY","count":562},{"name":"M&T Bank","count":551},{"name":"Booz Allen Hamilton Inc.","count":542},{"name":"CVS Caremark Corporation","count":540},{"name":"Job represented by Experis (a staffing company)","count":530},{"name":"CITIGROUP INC.","count":469},{"name":"Chrysler Group LLC","count":467},{"name":"Cisco Systems Incorporated","count":465},{"name":"Deloitte","count":456},{"name":"Fresenius","count":452},{"name":"Northrop Grumman","count":447},{"name":"The Brickman Group, Ltd","count":431},{"name":"Job represented by Manpower (a staffing company)","count":418},{"name":"Salesforce.Com","count":416},{"name":"ManTech International Corporation","count":415},{"name":"GENERAL ELECTRIC COMPANY","count":410},{"name":"CenturyLink, Inc.","count":397},{"name":"Safelite Auto Glass","count":393},{"name":"Advance Auto Parts Incorporated","count":385},{"name":"The Sports Authority","count":380},{"name":"The Allstate Corporation","count":373}],"valueCount":50},{"name":"Location","values":[{"name":"NEW YORK, NY","count":7474},{"name":"CHICAGO, IL","count":4151},{"name":"SAN FRANCISCO, CA","count":3746},{"name":"SEATTLE, WA","count":3509},{"name":"WASHINGTON, DC","count":3335},{"name":"PHOENIX, AZ","count":3283},{"name":"PITTSBURGH, PA","count":3041},{"name":"HOUSTON, TX","count":2972},{"name":"ATLANTA, GA","count":2954},{"name":"AUSTIN, TX","count":2947},{"name":"PORTLAND, OR","count":2724},{"name":"BOSTON, MA","count":2363},{"name":"CHARLOTTE, NC","count":2324},{"name":"DALLAS, TX","count":2268},{"name":"CLEVELAND, OH","count":2186},{"name":"DENVER, CO","count":2170},{"name":"MINNEAPOLIS, MN","count":1983},{"name":"LOS ANGELES, CA","count":1942},{"name":"SAN DIEGO, CA","count":1685},{"name":"PHILADELPHIA, PA","count":1615},{"name":"SAN ANTONIO, TX","count":1578},{"name":"CINCINNATI, OH","count":1490},{"name":"INDIANAPOLIS, IN","count":1466},{"name":"SAN JOSE, CA","count":1309},{"name":"TAMPA, FL","count":1234},{"name":"SAINT LOUIS, MO","count":1219},{"name":"COLUMBUS, OH","count":1118},{"name":"NASHVILLE, TN","count":1038},{"name":"RICHMOND, VA","count":1016},{"name":"BALTIMORE, MD","count":996},{"name":"IRVINE, CA","count":978},{"name":"MIAMI, FL","count":912},{"name":"SCOTTSDALE, AZ","count":897},{"name":"ARLINGTON, VA","count":886},{"name":"ORLANDO, FL","count":851},{"name":"TUCSON, AZ","count":847},{"name":"RALEIGH, NC","count":845},{"name":"SALT LAKE CITY, UT","count":839},{"name":"BELLEVUE, WA","count":830},{"name":"PALO ALTO, CA","count":828},{"name":"MILWAUKEE, WI","count":814},{"name":"RESTON, VA","count":792},{"name":"LOUISVILLE, KY","count":784},{"name":"SANTA CLARA, CA","count":769},{"name":"SIOUX FALLS, SD","count":763},{"name":"MC LEAN, VA","count":745},{"name":"ENGLEWOOD, CO","count":738},{"name":"DETROIT, MI","count":711},{"name":"SAINT PAUL, MN","count":711},{"name":"COLORADO SPRINGS, CO","count":710}],"valueCount":50},{"name":"Academic Program","values":[{"name":"Bachelor Of Science In Information Technology With Health Care Information Technology Certificate","count":42128},{"name":"Bachelor Of Science In Information Technology With Network Support Certificate","count":42063},{"name":"Bachelor Of Science In Information Technology With Advanced Networking Certificate","count":41668},{"name":"Bachelor Of Science In Information Technology With Advanced Information Systems Security Certificate","count":40709},{"name":"Bachelor Of Science In Information Technology With Information Assurance And Security Certificate","count":40709},{"name":"Bachelor Of Science In Information Technology With Associate Of Arts Concentration In Information Technology","count":40512},{"name":"Bachelor Of Science In Information Technology With Advanced Business Analytics Certificate","count":39752},{"name":"Bachelor Of Science In Information Technology With A Database Administration Certificate","count":38847},{"name":"Bachelor Of Science In Information Technology With Advanced Multimedia Development Certificate","count":38802},{"name":"Bachelor Of Science In Information Technology With Cisco Networking Certificate","count":38233},{"name":"Bachelor Of Science In Information Technology With Desktop Support Certificate","count":38233},{"name":"Bachelor Of Science In Information Technology With A Programming Certificate","count":36470},{"name":"Bachelor Of Science In Information Technology With Advanced Software Developer Certificate","count":36470},{"name":"Associate Of Arts Concentration In Information Technology With Programming Certificate","count":36433},{"name":"Bachelor Of Science In Information Technology With A Web Administration Certificate","count":33779},{"name":"Bachelor Of Science In Information Technology","count":32287},{"name":"Bachelor Of Science In Accounting With An Associate Of Arts With A Concentration In Business Fundamentals","count":31710},{"name":"Advanced Mobile Development Certificate","count":29401},{"name":"Advanced Software Developer Certificate (Undergraduate)","count":28208},{"name":"Associate Of Arts With A Concentration In Information Technology/Programming","count":28208},{"name":"Programming Certificate (Undergraduate)","count":28208},{"name":"Bachelor Of Science In Information Technology With A Concentration In Mobile Development","count":27002},{"name":"Bachelor Of Science In Information Technology With A Concentration In Software Engineering","count":27002},{"name":"Graduate Information Systems Audit And Control Certificate","count":25968},{"name":"Master Of Information Systems With Information Systems Audit And Control Certificate","count":25968},{"name":"Master Of Business Administration With A Concentration In Finance","count":25279},{"name":"Doctor Of Business Administration","count":24196},{"name":"Bachelor Of Science In Business With Associate Of Arts Concentration In Business Fundamentals","count":17822},{"name":"Master Of Business Administration With A Concentration In Global Management","count":17306},{"name":"Master Of Management","count":17306},{"name":"Associate Of Arts Concentration In Business Fundamentals","count":16815},{"name":"Bachelor Of Science In Information Technology With A Concentration In Business Systems Analysis","count":15809},{"name":"Graduate Information Systems Management Certificate","count":15480},{"name":"Master Of Information Systems With Information Systems Management Certificate","count":15480},{"name":"Bachelor Of Science In Business With A Concentration In Accounting","count":15273},{"name":"Bachelor Of Science In Accounting","count":14895},{"name":"Associate Of Arts Concentration In Information Technology With Database Administration Certificate","count":14785},{"name":"Master Of Information Systems With Business Analytics Certificate","count":14727},{"name":"Bachelor Of Science In Business With A Concentration In Finance","count":13885},{"name":"Advanced Business Analytics Certificate","count":13433},{"name":"Graduate Business Analytics Certificate","count":13433},{"name":"Graduate Project Management Certificate","count":13211},{"name":"Bachelor Of Science In Business With Sales Management Certificate","count":12963},{"name":"Associate Of Arts Concentration In Information Technology With Information Assurance And Security Certificate","count":12817},{"name":"Master Of Health Administration/Master Of Business Administration/Project Management","count":12699},{"name":"Associate Of Arts Concentration In Retail Management (Certificate Track)","count":12557},{"name":"Retail Management Certificate","count":12557},{"name":"Bachelor Of Science In Business With A Concentration In Administration","count":12333},{"name":"Bachelor Of Science In Business With A Concentration In Global Management","count":12333},{"name":"Bachelor Of Science In Business With A Concentration In Management","count":12333}],"valueCount":50},{"name":"Career Area","values":[{"name":"Computer and Mathematical Occupations","count":75385},{"name":"Business and Financial Operations Occupations","count":31208},{"name":"Management Occupations","count":26243},{"name":"Office and Administrative Support Occupations","count":20074},{"name":"Sales and Related Occupations","count":19784},{"name":"Architecture and Engineering Occupations","count":9723},{"name":"Healthcare Practitioners and Technical Occupations","count":6517},{"name":"Arts, Design, Entertainment, Sports, and Media Occupations","count":3960},{"name":"Installation, Maintenance, and Repair Occupations","count":3957},{"name":"Life, Physical, and Social Science Occupations","count":2914},{"name":"Education, Training, and Library Occupations","count":2637},{"name":"Transportation and Material Moving Occupations","count":2306},{"name":"Production Occupations","count":2098},{"name":"Food Preparation and Serving Related Occupations","count":2077},{"name":"Protective Service Occupations","count":1642},{"name":"Healthcare Support Occupations","count":1447},{"name":"Community and Social Service Occupations","count":1022},{"name":"Legal Occupations","count":875},{"name":"Personal Care and Service Occupations","count":736},{"name":"Construction and Extraction Occupations","count":723},{"name":"Building and Grounds Cleaning and Maintenance Occupations","count":474},{"name":"Farming, Fishing, and Forestry Occupations","count":180}],"valueCount":22},{"name":"Education Level","values":[{"name":"4 year Degree","count":112856},{"name":"None Specified","count":58295},{"name":"High School","count":29135},{"name":"2 year Degree","count":7789},{"name":"Graduate Degree","count":6284},{"name":"Post Graduate Degree","count":1800}],"valueCount":6},{"name":"Employee Partner","values":[{"name":"uopx","count":13848}],"valueCount":1},{"name":"Tuition Reimbursement","values":[{"name":"uopx","count":34497}],"valueCount":1}],"facetRanges":[{"name":"Experience Level","counts":[{"value":"5-10","count":63953},{"value":"2-5","count":93897},{"value":"10+","count":12954},{"value":"0-2","count":43792}]}]}');

      // Show there are no call happening before we call search
      expect($http.post.calls.count()).toBe(0);


      responseHandler = search({
        'keywords.title': 'software analyst',
        'profileId': 'e815ecfe-b387-4cc1-af2f-c08980829400',
        'radius': 25,
        'programFilter': [],
        'programCode': [],
        'industryFilter': [],
        'experienceLevel': [],
        'companyFilter': [],
        'jobTitle': [],
        'jobType': [],
        'jobCode': '',
        'eduLevelFilter': [],
        'salaryRange': [],
        'salaryFrequency': [],
        'tuitionReimbursement': false,
        'preferredPartner': false,
        'getLinkedInConnections': true,
        'pageNumber': 0,
        'pageSize': '10',
        'sortBy': 'Relevancy',
        'locationFilter': []
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      expect(jobs).toBeUndefined();
      expect($http.post.calls.count()).toBe(1);

      // show the passed in parameters were in fact passed in as post params.
      postParams = $http.post.calls.mostRecent().args[1];

      expect(postParams['keywords.title']).toEqual('software analyst');
      expect(postParams.programFilter).toEqual([]);

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toEqual(true);
    });

    xit('If service throws a 404 exception should return an empty list of jobs.', function () {
      var jobs, responseHandler;

      requestHandler.respond(404, '');

      responseHandler = search({
        'keywords.title': 'software analyst',
        'profileId': 'e815ecfe-b387-4cc1-af2f-c08980829400',
        'radius': 25,
        'programFilter': [],
        'programCode': [],
        'industryFilter': [],
        'experienceLevel': [],
        'companyFilter': [],
        'jobTitle': [],
        'jobType': [],
        'jobCode': '',
        'eduLevelFilter': [],
        'salaryRange': [],
        'salaryFrequency': [],
        'tuitionReimbursement': false,
        'preferredPartner': false,
        'getLinkedInConnections': true,
        'pageNumber': 0,
        'pageSize': '10',
        'sortBy': 'Relevancy',
        'locationFilter': []
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });


      expect(jobs).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toEqual(true);
      expect(jobs.length).toBe(0);
    });


    it('Service error should throw the control into error block.', function () {
      var responseHandler, jobs, errorResponse,
        responseText = '<html><body><p>Sample 500 error page!</p></body></html>';

      requestHandler.respond(500, responseText);

      responseHandler = search({
        'keywords.title': 'software analyst',
        'profileId': 'e815ecfe-b387-4cc1-af2f-c08980829400',
        'radius': 25,
        'programFilter': [],
        'programCode': [],
        'industryFilter': [],
        'experienceLevel': [],
        'companyFilter': [],
        'jobTitle': [],
        'jobType': [],
        'jobCode': '',
        'eduLevelFilter': [],
        'salaryRange': [],
        'salaryFrequency': [],
        'tuitionReimbursement': false,
        'preferredPartner': false,
        'getLinkedInConnections': true,
        'pageNumber': 0,
        'pageSize': '10',
        'sortBy': 'Relevancy',
        'locationFilter': []
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse.status).toBe(500);
      expect(errorResponse.data).toEqual(responseText);
    });

  });

  describe('`suggest` method units::', function () {
    var suggest, requestHandler;

    beforeEach(function () {
      suggest = Jobs.suggest;

      requestHandler = $httpBackend.expectGET('');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      suggest = requestHandler = undefined;
    });

    it('When a key word is passed in should return a list of suggests.', function () {
      var suggestions, responseHandler, $http, params;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('[{"value":"<b>sof</b>a mart, oak express, bedroom expressions and furniture row","type":"company"},{"value":"<b>sof</b>tware analyst","type":"title"},{"value":"<b>sof</b>tware application developer","type":"title"},{"value":"<b>sof</b>tware application engineer","type":"title"},{"value":"<b>sof</b>tware architect","type":"title"},{"value":"<b>sof</b>tware consultant","type":"title"},{"value":"<b>sof</b>tware design engineer","type":"title"},{"value":"<b>sof</b>tware developer","type":"title"},{"value":"<b>sof</b>tware developer / engineer","type":"title"},{"value":"<b>sof</b>tware development director","type":"title"},{"value":"<b>sof</b>tware development engineer","type":"title"},{"value":"<b>sof</b>tware development manager","type":"title"},{"value":"<b>sof</b>tware director","type":"title"},{"value":"<b>sof</b>tware embedded engineer","type":"title"},{"value":"<b>sof</b>tware engineer","type":"title"},{"value":"<b>sof</b>tware engineering institute","type":"company"},{"value":"<b>sof</b>tware manager","type":"title"},{"value":"<b>sof</b>tware principal","type":"title"},{"value":"<b>sof</b>tware programmer","type":"title"},{"value":"<b>sof</b>tware qa engineer / tester","type":"title"}]');

      expect(suggestions).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      responseHandler = suggest({
        q: 'sof'
      });

      expect($http.get.calls.count()).toBe(1);

      params = $http.get.calls.mostRecent().args[1].params;

      expect(params.q).toEqual('sof');

      responseHandler.then(function (res) {
        suggestions = res.data;
      });

      $httpBackend.flush(1);

      expect(suggestions).toBeDefined();
      expect(angular.isArray(suggestions)).toEqual(true);
      expect(suggestions.length).toBe(20);
    });

    it('When "q" parameter is not passed in should return an empty list of suggestions without making any service call.', function () {
      var $http, responseHandler, suggestions;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('[{"value":"<b>sof</b>a mart, oak express, bedroom expressions and furniture row","type":"company"},{"value":"<b>sof</b>tware analyst","type":"title"},{"value":"<b>sof</b>tware application developer","type":"title"},{"value":"<b>sof</b>tware application engineer","type":"title"},{"value":"<b>sof</b>tware architect","type":"title"},{"value":"<b>sof</b>tware consultant","type":"title"},{"value":"<b>sof</b>tware design engineer","type":"title"},{"value":"<b>sof</b>tware developer","type":"title"},{"value":"<b>sof</b>tware developer / engineer","type":"title"},{"value":"<b>sof</b>tware development director","type":"title"},{"value":"<b>sof</b>tware development engineer","type":"title"},{"value":"<b>sof</b>tware development manager","type":"title"},{"value":"<b>sof</b>tware director","type":"title"},{"value":"<b>sof</b>tware embedded engineer","type":"title"},{"value":"<b>sof</b>tware engineer","type":"title"},{"value":"<b>sof</b>tware engineering institute","type":"company"},{"value":"<b>sof</b>tware manager","type":"title"},{"value":"<b>sof</b>tware principal","type":"title"},{"value":"<b>sof</b>tware programmer","type":"title"},{"value":"<b>sof</b>tware qa engineer / tester","type":"title"}]');

      expect(suggestions).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      responseHandler = suggest({
        key: 'sof'
      });

      responseHandler.then(function (res) {
        suggestions = res.data;
      });


      $rootScope.$digest();

      // signifies the http call has not been made
      expect($http.get.calls.count()).toBe(0);
      expect(angular.isArray(suggestions)).toBeTruthy();
      expect(suggestions.length).toBe(0);


      $httpBackend.resetExpectations();

      $http = responseHandler = suggestions = undefined;
    });


    xit('If the service return a 404 return an emtpy list fo suggestions and treat it as a success call.', function () {
      var suggestions, responseHandler;

      requestHandler.respond(404, '');

      responseHandler = suggest({
        q: 'sof'
      });

      responseHandler.then(function (res) {
        suggestions = res.data;
      });

      expect(suggestions).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(suggestions)).toBeTruthy();
      expect(suggestions.length).toBe(0);
    });


    it('On service error other than 404 control should return to error state.', function () {
      var suggestions, responseHandler, errorResponse,
        responseText = '<html><body><p>Sample 500 error page!</p></body></html>';

      requestHandler.respond(500, responseText);

      responseHandler = suggest({
        q: 'sof'
      });

      responseHandler.then(function (res) {
        suggestions = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(suggestions).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(suggestions).toBeUndefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse.status).toBe(500);
      expect(errorResponse.data).toEqual(responseText);
    });

  });

  describe('`recommendedJobs` tests::', function () {
    var recommendedJobs, requestHandler;

    beforeEach(function () {
      recommendedJobs = Jobs.recommendedJobs;

      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/\w+\/jobs\/search\/recommendedJobs/);
    });

    afterEach(function () {
      recommendedJobs = requestHandler = undefined;
    });

    it('When profileId is passed in should return a list of recommended jobs.', function () {
      var jobs, responseHandler, $http, params;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('{"sortBy":"relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"recommendation-service","jobs":{"nextPage":-1,"totalNumberOfResults":30,"pageSize":30,"firstPage":true,"numberOfElements":30,"pageNumber":0,"totalPages":1,"lastPage":true,"previousPage":-1,"results":[{"job":{"jobId":21979289,"providerCompanyName":"Provider Of Microcomputer Hardware And Softwares","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-15T00:00:00.000Z","updateDate":"2015-03-17T16:56:00.000Z","ageInSeconds":4657170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21947993,"providerCompanyName":"Multinational Information Technology Company","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"REDMOND","state":"WASHINGTON","country":"USA","postal":"98052"},"postingDate":"2015-03-15T00:00:00.000Z","updateDate":"2015-03-17T16:49:02.000Z","ageInSeconds":4657170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23509115,"providerCompanyName":"Ppg Architectural Coatings","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"TACOMA","state":"WASHINGTON","country":"USA","postal":"98401"},"postingDate":"2015-04-02T00:00:00.000Z","updateDate":"2015-04-03T22:55:15.000Z","ageInSeconds":3101970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23539961,"companyId":671107,"providerCompanyName":"Staples, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"AUBURN","state":"WASHINGTON","country":"USA","postal":"98001"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":3015570},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23747793,"providerCompanyName":"Level 3 Communications Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-06T00:00:00.000Z","updateDate":"2015-04-07T21:52:00.000Z","ageInSeconds":2756370},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23775957,"providerCompanyName":"Nestle USA Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-07T00:00:00.000Z","updateDate":"2015-04-08T21:44:32.000Z","ageInSeconds":2669970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23476001,"companyId":669555,"providerCompanyName":"Dell Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-02T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":3101970},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25284327,"companyId":669555,"providerCompanyName":"Dell Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-25T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":1114770},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21760583,"companyId":671501,"providerCompanyName":"Amazon.com, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-13T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":4829970},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":22975461,"companyId":713901,"providerCompanyName":"ALLEGIANCE CREDIT UNION","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-26T00:00:00.000Z","updateDate":"2015-03-28T03:24:00.000Z","ageInSeconds":3706770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23568371,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:24:40.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23588797,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:29:00.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23591809,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:29:39.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21780963,"providerCompanyName":"Internet Based Travel Company","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004"},"postingDate":"2015-03-13T00:00:00.000Z","updateDate":"2015-03-15T01:35:05.000Z","ageInSeconds":4829970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25648851,"companyId":673755,"providerCompanyName":"UnitedHealth Group Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-06T16:13:47.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":22237949,"providerCompanyName":"Travelers Insurance","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-18T00:00:00.000Z","updateDate":"2015-03-20T02:25:45.000Z","ageInSeconds":4397970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25644587,"providerCompanyName":"Emd","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-01T23:41:03.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25257811,"companyId":715373,"providerCompanyName":"Kotis Design LLC","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-25T00:00:00.000Z","updateDate":"2015-04-27T01:16:33.000Z","ageInSeconds":1114770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25655753,"providerCompanyName":"Greenheck","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-01T23:43:25.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25538339,"providerCompanyName":"Lsg Sky Chefs","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:30:54.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25519771,"companyId":671477,"providerCompanyName":"Wyndham Worldwide Corporation","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"REDMOND","state":"WASHINGTON","country":"USA","postal":"98052"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25518025,"companyId":671131,"providerCompanyName":"Coca-Cola Refreshments USA, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25809491,"companyId":711563,"providerCompanyName":"GLOBAL WEB SALES LTD","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BREMERTON","state":"WASHINGTON","country":"USA","postal":"98310"},"postingDate":"2015-05-02T00:00:00.000Z","updateDate":"2015-05-03T23:46:54.000Z","ageInSeconds":509970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25499167,"providerCompanyName":"Deloitte","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:22:12.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24982301,"providerCompanyName":"It Consulting Firm","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:43:58.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24987613,"providerCompanyName":"Ey","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:44:58.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24989669,"companyId":1386,"providerCompanyName":"EMC","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:45:23.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25122151,"providerCompanyName":"Architectural Coatings","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-24T00:00:00.000Z","updateDate":"2015-04-25T23:06:04.000Z","ageInSeconds":1201170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":26069269,"providerCompanyName":"Oxford Global Resources","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"TACOMA","state":"WASHINGTON","country":"USA","postal":"98401"},"postingDate":"2015-05-05T00:00:00.000Z","updateDate":"2015-05-06T23:16:17.000Z","ageInSeconds":250770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":26046823,"providerCompanyName":"Porch","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-05-05T00:00:00.000Z","updateDate":"2015-05-06T23:11:18.000Z","ageInSeconds":250770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false}]},"totals":"0, 30","errors":["no ProgramCode -> no Solr fallback","Solr results from simple query only"]}');

      expect(jobs).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      responseHandler = recommendedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      expect($http.get.calls.count()).toBe(1);

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      $httpBackend.flush(1);

      params = $http.get.calls.mostRecent().args[1].params;

      expect(params.profileId).toEqual('e815ecfe-b387-4cc1-af2f-c08980829400');
      expect(angular.isArray(jobs)).toBeTruthy();
      expect(jobs.length).toBe(30);
      expect(jobs.numberOfElements).toBe(30);
      expect(jobs.serviceName).toEqual('recommendation-service');
      expect(jobs.totals).toEqual('0, 30');
    });

    it('When profileId is not passed in the call return an empty list with out making any external service calls.', function () {
      var $http, jobs, responseHandler;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('{"sortBy":"relevancy","getLinkedInConnections":false,"radiusUsed":false,"serviceName":"recommendation-service","jobs":{"nextPage":-1,"totalNumberOfResults":30,"pageSize":30,"firstPage":true,"numberOfElements":30,"pageNumber":0,"totalPages":1,"lastPage":true,"previousPage":-1,"results":[{"job":{"jobId":21979289,"providerCompanyName":"Provider Of Microcomputer Hardware And Softwares","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-15T00:00:00.000Z","updateDate":"2015-03-17T16:56:00.000Z","ageInSeconds":4657170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21947993,"providerCompanyName":"Multinational Information Technology Company","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"REDMOND","state":"WASHINGTON","country":"USA","postal":"98052"},"postingDate":"2015-03-15T00:00:00.000Z","updateDate":"2015-03-17T16:49:02.000Z","ageInSeconds":4657170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23509115,"providerCompanyName":"Ppg Architectural Coatings","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"TACOMA","state":"WASHINGTON","country":"USA","postal":"98401"},"postingDate":"2015-04-02T00:00:00.000Z","updateDate":"2015-04-03T22:55:15.000Z","ageInSeconds":3101970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23539961,"companyId":671107,"providerCompanyName":"Staples, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"AUBURN","state":"WASHINGTON","country":"USA","postal":"98001"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":3015570},"preferredPartner":true,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23747793,"providerCompanyName":"Level 3 Communications Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-06T00:00:00.000Z","updateDate":"2015-04-07T21:52:00.000Z","ageInSeconds":2756370},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23775957,"providerCompanyName":"Nestle USA Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-07T00:00:00.000Z","updateDate":"2015-04-08T21:44:32.000Z","ageInSeconds":2669970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23476001,"companyId":669555,"providerCompanyName":"Dell Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-02T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":3101970},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25284327,"companyId":669555,"providerCompanyName":"Dell Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-25T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":1114770},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21760583,"companyId":671501,"providerCompanyName":"Amazon.com, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-13T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":4829970},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":22975461,"companyId":713901,"providerCompanyName":"ALLEGIANCE CREDIT UNION","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-26T00:00:00.000Z","updateDate":"2015-03-28T03:24:00.000Z","ageInSeconds":3706770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23568371,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:24:40.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23588797,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:29:00.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":23591809,"providerCompanyName":"Docusign Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-03T00:00:00.000Z","updateDate":"2015-04-04T22:29:39.000Z","ageInSeconds":3015570},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":21780963,"providerCompanyName":"Internet Based Travel Company","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004"},"postingDate":"2015-03-13T00:00:00.000Z","updateDate":"2015-03-15T01:35:05.000Z","ageInSeconds":4829970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25648851,"companyId":673755,"providerCompanyName":"UnitedHealth Group Incorporated","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-06T16:13:47.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":22237949,"providerCompanyName":"Travelers Insurance","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-03-18T00:00:00.000Z","updateDate":"2015-03-20T02:25:45.000Z","ageInSeconds":4397970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25644587,"providerCompanyName":"Emd","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-01T23:41:03.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25257811,"companyId":715373,"providerCompanyName":"Kotis Design LLC","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-25T00:00:00.000Z","updateDate":"2015-04-27T01:16:33.000Z","ageInSeconds":1114770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25655753,"providerCompanyName":"Greenheck","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-30T00:00:00.000Z","updateDate":"2015-05-01T23:43:25.000Z","ageInSeconds":682770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25538339,"providerCompanyName":"Lsg Sky Chefs","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:30:54.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25519771,"companyId":671477,"providerCompanyName":"Wyndham Worldwide Corporation","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"REDMOND","state":"WASHINGTON","country":"USA","postal":"98052"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25518025,"companyId":671131,"providerCompanyName":"Coca-Cola Refreshments USA, Inc.","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BELLEVUE","state":"WASHINGTON","country":"USA","postal":"98004"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-05-06T16:13:46.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":true,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25809491,"companyId":711563,"providerCompanyName":"GLOBAL WEB SALES LTD","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"BREMERTON","state":"WASHINGTON","country":"USA","postal":"98310"},"postingDate":"2015-05-02T00:00:00.000Z","updateDate":"2015-05-03T23:46:54.000Z","ageInSeconds":509970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25499167,"providerCompanyName":"Deloitte","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-29T00:00:00.000Z","updateDate":"2015-04-30T23:22:12.000Z","ageInSeconds":769170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24982301,"providerCompanyName":"It Consulting Firm","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:43:58.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24987613,"providerCompanyName":"Ey","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:44:58.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":24989669,"companyId":1386,"providerCompanyName":"EMC","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-22T00:00:00.000Z","updateDate":"2015-04-24T00:45:23.000Z","ageInSeconds":1373970},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":25122151,"providerCompanyName":"Architectural Coatings","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-04-24T00:00:00.000Z","updateDate":"2015-04-25T23:06:04.000Z","ageInSeconds":1201170},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":26069269,"providerCompanyName":"Oxford Global Resources","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"TACOMA","state":"WASHINGTON","country":"USA","postal":"98401"},"postingDate":"2015-05-05T00:00:00.000Z","updateDate":"2015-05-06T23:16:17.000Z","ageInSeconds":250770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false},{"job":{"jobId":26046823,"providerCompanyName":"Porch","title":"Account Manager","status":"ACTIVE","publicIndustry":true,"location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101"},"postingDate":"2015-05-05T00:00:00.000Z","updateDate":"2015-05-06T23:11:18.000Z","ageInSeconds":250770},"preferredPartner":false,"tuitionReimbursement":false,"totalLinkedInConnections":0,"listId":0,"listItemId":0,"applied":false,"recommender":"Mahout","score":0.0,"isSaved":false}]},"totals":"0, 30","errors":["no ProgramCode -> no Solr fallback","Solr results from simple query only"]}');

      expect(jobs).toBeUndefined();
      expect($http.get.calls.count()).toBe(0);

      responseHandler = recommendedJobs({
        id: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      });

      $rootScope.$digest();

      // shouldn't have made any backend calls. Count should be 0.
      expect($http.get.calls.count()).toBe(0);

      expect(angular.isArray(jobs)).toBeTruthy();
      expect(jobs.length).toBe(0);


      $httpBackend.resetExpectations();
    });

    it('On service errors control should switch to error flow.', function () {
      var errorResponse, jobs, responseHandler,
        responseText = '<html><body><p>Sample 500 error page!</p></body></html>';

      requestHandler.respond(500, responseText);

      responseHandler = recommendedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse.status).toBe(500);
      expect(errorResponse.data).toEqual(responseText);
    });

    xit('404 exceptions should still return an empty list of jobs and treat it as success.', function () {
      var errorResponse, jobs, responseHandler;

      requestHandler.respond(404, '');

      responseHandler = recommendedJobs({
        profileId: 'e815ecfe-b387-4cc1-af2f-c08980829400'
      });

      responseHandler.then(function (res) {
        jobs = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(jobs).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(angular.isArray(jobs)).toBeTruthy();
      expect(jobs.length).toBe(0);
      expect(errorResponse).toBeUndefined();
    });

  });


  describe('`jobDetails` tests::', function () {
    var jobDetails, requestHandler;

    beforeEach(function () {
      jobDetails = Jobs.jobDetails;

      requestHandler = $httpBackend.expectGET(/\/api\/job-service\/\d+\/jobs\/\d+/);
    });

    afterEach(function () {
      jobDetails = requestHandler = undefined;
    });

    it('If called with a jobId should make a service call with passed in jobId as end point and return job details.', function () {
      var responseHandler, details, $http;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('{"jobId":21979289,"providerCompanyName":"Provider Of Microcomputer Hardware And Softwares","providerName":"BURNING_GLASS","providerSourceId":"37877873769","title":"Account Manager","titleRaw":"Strategic Account Manager","description":"Strategic Account Manager<br />    <br /><br />Company: Provider of Microcomputer Hardware and Softwares<br />Location: Seattle<br />Posted on: March 15, 2015<br /><br />Job Description:<br /><br />* Generate and execute annual territory sales plan that ensures strategic and financial targets are met for across both the Data Center/VAD and Core businesses.<br />* Leveraging Tech Data s account plan tools and collaborate with internal and external stakeholders.<br />* Expands Tech Datas presence and market share in the defined geographical territory.<br />* Identifies sales opportuni...<br /><br />Keywords: Provider of Microcomputer Hardware and Softwares, Seattle, Strategic Account Manager, Management & Business, Seattle, Washington","status":"ACTIVE","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.seattlerecruiter.com/all-jobs/268168029/strategic-account-manager","location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101","latitude":"47.6117","longitude":"-122.333"},"postingDate":"2015-03-15T00:00:00.000Z","dateOpening":"2015-03-15T04:00:00.000Z","ageInSeconds":4664340,"jobCode":"13-2011.S4","jobCodeType":"RONET","tenants":[{"tenantName":"ltspd"},{"tenantName":"UOPX"},{"tenantName":"cpbc"},{"tenantName":"unit-test-tenant"},{"tenantName":"west"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"41-4012.00"}],"skills":[{"skillName":"Sales Planning","assignmentType":"canonSkillsFromBg"}]}');

      expect($http.get.calls.count()).toBe(0);
      expect(details).toBeUndefined();

      responseHandler = jobDetails({
        jobId: 21979289
      });

      expect($http.get.calls.count()).toBe(1);
      // Test for the jobId as end point in the url.
      expect($http.get.calls.mostRecent().args[0].search(/21979289$/)).toBeTruthy();

      responseHandler.then(function (res) {
        details = res.data;
      });

      $httpBackend.flush(1);

      expect(details).toBeDefined();
      expect(angular.isArray(details)).toBeTruthy();
      expect(details.length).toBe(1);
      expect(details[0].jobId).toBe(21979289);
    });

    it('Call made with out passing in jobId should return an empty list with out making any external call.', function () {
      var responseHandler, $http, details;

      $http = $injector.get('$http');
      spyOn($http, 'get').and.callThrough();

      requestHandler.respond('{"jobId":21979289,"providerCompanyName":"Provider Of Microcomputer Hardware And Softwares","providerName":"BURNING_GLASS","providerSourceId":"37877873769","title":"Account Manager","titleRaw":"Strategic Account Manager","description":"Strategic Account Manager<br />    <br /><br />Company: Provider of Microcomputer Hardware and Softwares<br />Location: Seattle<br />Posted on: March 15, 2015<br /><br />Job Description:<br /><br />* Generate and execute annual territory sales plan that ensures strategic and financial targets are met for across both the Data Center/VAD and Core businesses.<br />* Leveraging Tech Data s account plan tools and collaborate with internal and external stakeholders.<br />* Expands Tech Datas presence and market share in the defined geographical territory.<br />* Identifies sales opportuni...<br /><br />Keywords: Provider of Microcomputer Hardware and Softwares, Seattle, Strategic Account Manager, Management & Business, Seattle, Washington","status":"ACTIVE","publicIndustry":true,"jobCount":1,"applyUrl":"http://www.seattlerecruiter.com/all-jobs/268168029/strategic-account-manager","location":{"city":"SEATTLE","state":"WASHINGTON","country":"USA","postal":"98101","latitude":"47.6117","longitude":"-122.333"},"postingDate":"2015-03-15T00:00:00.000Z","dateOpening":"2015-03-15T04:00:00.000Z","ageInSeconds":4664340,"jobCode":"13-2011.S4","jobCodeType":"RONET","tenants":[{"tenantName":"ltspd"},{"tenantName":"UOPX"},{"tenantName":"cpbc"},{"tenantName":"unit-test-tenant"},{"tenantName":"west"},{"tenantName":"rockit"}],"jobAttributes":[{"attributeName":"ONETSOC_CODE","attributeValue":"41-4012.00"}],"skills":[{"skillName":"Sales Planning","assignmentType":"canonSkillsFromBg"}]}');

      expect($http.get.calls.count()).toBe(0);

      responseHandler = jobDetails({
        id: 21979289
      });

      expect(details).toBeUndefined();
      // since profileId is not passed in should not make any
      // backend call.
      expect($http.get.calls.count()).toBe(0);

      responseHandler.then(function (res) {
        details = res.data;
      });

      $rootScope.$digest();

      expect(angular.isArray(details)).toBeTruthy();
      expect(details.length).toBe(0);

      $httpBackend.resetExpectations();
    });

    it('All service exceptions should reject promise returned from service call.', function () {
      var responseHandler, details, errorResponse,
        responseText = '<html><body><p>Sample 500 error page!</p></body></html>';

      requestHandler.respond(500, responseText);

      responseHandler = jobDetails({
        jobId: 21979289
      });

      responseHandler.then(function (res) {
        details = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(details).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(details).toBeUndefined();
      expect(errorResponse).toBeDefined();
      expect(errorResponse.status).toBe(500);
      expect(errorResponse.data).toEqual(responseText);
    });

    xit('404 exceptions should still resolve the promise with empty list.', function () {
      var responseHandler, details, errorResponse;

      requestHandler.respond(404, '');

      responseHandler = jobDetails({
        jobId: 21979289
      });

      responseHandler.then(function (res) {
        details = res.data;
      }, function (err) {
        errorResponse = err;
      });

      expect(details).toBeUndefined();
      expect(errorResponse).toBeUndefined();

      $httpBackend.flush(1);

      expect(errorResponse).toBeUndefined();
      expect(details).toBeDefined();
      expect(angular.isArray(details)).toBeTruthy();
      expect(details.length).toBe(0);
    });
  });

});
