// 'use strict';

// describe('Directive: appliedJobsWidget', function() {
//   var element, scope, mockBackend, compile, appliedJobs;

//   beforeEach(function() {
//     module('configMock');
//     module('app/components/appliedJobsWidget/appliedJobsWidget.html');
//     module('appliedJobsWidget');
//   });

//   beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
//     scope = _$rootScope_;
//     compile = _$compile_;
//     mockBackend = _$httpBackend_;
//     mockBackend.whenGET('/api/job-service/1/cgsdemo/users/apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3/jobs/applications?page.size=3')
//       .respond(201, appliedJobs);
//     scope.$new();
//     scope.profileId = 'apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3';
//     element = '<applied-jobs-widget profile-id=\'{{profileId}}\'></applied-jobs-widget>';
//     element = compile(element)(scope);
//     scope.$digest();
//   }));

//   afterEach(function() {
//     mockBackend.verifyNoOutstandingExpectation();
//     mockBackend.verifyNoOutstandingRequest();
//   });

//   describe('widget should always', function() {
//     beforeEach(function() {
//       appliedJobs = {
//         'lastPage': false,
//         'totalPages': 37,
//         'numberOfElements': 3,
//         'pageNumber': 0,
//         'totalNumberOfResults': 110,
//         'pageSize': 3,
//         'firstPage': true,
//         'nextPage': 1,
//         'previousPage': -1,
//         'results': [{
//           'appliedDate': '2014-08-05T00:00:00.000Z',
//           'jobTitle': 'Test Title',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'Seattle, WA',
//           'id': 1601,
//           'applyStatus': 'Received a job offer',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }, {
//           'appliedDate': '2014-08-07T00:00:00.000Z',
//           'jobId': 6940995,
//           'jobTitle': 'Principal Biostatistician',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'BRIDGEWATER, NJ',
//           'id': 1677,
//           'jobStatus': 'EXPIRED',
//           'applyStatus': '1st interview scheduled (or offered)',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }, {
//           'appliedDate': '2014-08-12T00:00:00.000Z',
//           'jobTitle': 'Tester QA',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'Seattle, WA',
//           'id': 1603,
//           'applyStatus': '1st interview completed',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }]
//       };
//     });
//     xit('display a title', function() {
//       mockBackend.flush();
//       expect(element.find('h3 a').text()).toContain('Applied Jobs');
//     });
//   });

//   describe('when a user has applied jobs, widget', function() {
//     beforeEach(function() {
//       appliedJobs = {
//         'lastPage': false,
//         'totalPages': 37,
//         'numberOfElements': 3,
//         'pageNumber': 0,
//         'totalNumberOfResults': 110,
//         'pageSize': 3,
//         'firstPage': true,
//         'nextPage': 1,
//         'previousPage': -1,
//         'results': [{
//           'appliedDate': '2014-08-05T00:00:00.000Z',
//           'jobTitle': 'Test Title',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'Seattle, WA',
//           'id': 1601,
//           'applyStatus': 'Received a job offer',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }, {
//           'appliedDate': '2014-08-07T00:00:00.000Z',
//           'jobId': 6940995,
//           'jobTitle': 'Principal Biostatistician',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'BRIDGEWATER, NJ',
//           'id': 1677,
//           'jobStatus': 'EXPIRED',
//           'applyStatus': '1st interview scheduled (or offered)',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }, {
//           'appliedDate': '2014-08-12T00:00:00.000Z',
//           'jobTitle': 'Tester QA',
//           'company': 'Allergan, Inc.',
//           'companyId': 303651,
//           'location': 'Seattle, WA',
//           'id': 1603,
//           'applyStatus': '1st interview completed',
//           'status': 'ACTIVE',
//           'connectionStatus': 'ACTIVE',
//           'lastUpdatedDate': '2015-06-08T12:00:01.000Z',
//           'trackingType': 'MANUAL',
//           'hideTrackingMessage': 'Y',
//           'atsTracked': true
//         }]
//       };
//     });
//     xit('should display the total number of jobs', function() {
//       mockBackend.flush();
//       expect(element.find('.itemcount').text()).toContain('( 110 )');
//     });

//     xit('should display at least one applied job', function() {
//       mockBackend.flush();
//       expect(element.find('.job').length).toBeGreaterThan(0);
//     });

//     xit('should display at most 3', function() {
//       mockBackend.flush();
//       expect(element.find('.job').length).toBeLessThan(4);
//     });

//     xit('should display a \'See all applied jobs\' link', function() {
//       mockBackend.flush();
//       expect(element.find('.small-link-bold a').text()).toContain('See all applied jobs');
//     });
//   });

//   describe('when user has no applied jobs, widget', function() {
//     beforeEach(function() {
//       appliedJobs = {
//         'nextPage': -1,
//         'totalNumberOfResults': 0,
//         'pageSize': 3,
//         'numberOfElements': 0,
//         'previousPage': -1,
//         'totalPages': 1,
//         'firstPage': true,
//         'lastPage': true,
//         'pageNumber': 0,
//         'results': []
//       };
//       mockBackend.when('GET', '/api/job-service/1/cgsdemo/users/apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3/jobs/applications?page.size=3').respond(201, appliedJobs);
//     });
//     xit('should display no applied jobs message', function() {
//       expect(element.find('.no-results').text()).toContain('You have not applied to any jobs.');
//       mockBackend.flush();
//     });

//     xit('should not display a count', function() {
//       mockBackend.flush();
//       expect('.itemcount:hidden').toBeTruthy();
//     });

//     xit('should not display results', function() {
//       mockBackend.flush();
//       expect('.job:hidden').toBeTruthy();
//     });

//     xit('should not display a \'See all applied jobs\' link', function() {
//       mockBackend.flush();
//       expect('.small-link-bold:hidden').toBeTruthy();
//     });
//   });

//   describe('when the applied jobs service fails', function() {
//     beforeEach(function() {
//       mockBackend.when('GET', '/api/job-service/1/cgsdemo/users/apt_7ff47619-0c95-4388-bf7d-bcf75274e8d3/jobs/applications?page.size=3').respond(500, '');
//     });
//     xit('should display no applied jobs message', function() {
//       expect(element.find('.no-results').text()).toContain('You have not applied to any jobs.');
//       mockBackend.flush();
//     });

//     xit('should not display a count', function() {
//       mockBackend.flush();
//       expect('.itemcount:hidden').toBeTruthy();
//     });

//     xit('should not display results', function() {
//       mockBackend.flush();
//       expect('.job:hidden').toBeTruthy();
//     });

//     xit('should not display a \'See all applied jobs\' link', function() {
//       mockBackend.flush();
//       expect('.small-link-bold:hidden').toBeTruthy();
//     });
//   });
// });
