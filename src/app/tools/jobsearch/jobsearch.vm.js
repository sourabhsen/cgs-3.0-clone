(function() {
  'use strict';

  angular
    .module('JobsViewModel', [
      'apolloJobServices.jobs',
      'apolloJobServices.activity.tracker',
      'LocalStorageModule',
      'careersUser',
      'searchQuery',
      'ui.router',
      'apolloPlaylistCache',
      'ui.bootstrap',
      'angularApolloCompanyServices.companies',
      'apolloAngularResumeServices.resume',
      'angularApolloNotificationServices',
    ])
    .service('JobsViewModel', [
      'Jobs',
      'ActivityTracker',
      'User',
      'localStorageService',
      '$location',
      'SearchQuery',
      '$uibModal',
      '$state',
      '$stateParams',
      'PlaylistCache',
      '$window',
      'Companies',
      '$resumeservice',
      '$timeout',
      'Notifications',
      function(Jobs, ActivityTracker, User, localStorageService, $location, SearchQuery, $uibModal, $state, $stateParams, PlaylistCache, $window, Companies, $resumeservice, $timeout, Notifications) {
        var vm = this;
        vm.title = 'Job Search';
        vm.oneAtATime = false; /* filter accordion setting, false allows multiple open filters */
        vm.isCollapsed = true; /* default state, open or closed */
        vm.numDashboardResults = 5;
        vm.dashboardTitle = 'Jobs';
        vm.showPagination = true;
        vm.results = null;
        vm.searchQuery = SearchQuery;
        vm.reloadSaved = false;
        vm.emptyObject = true; /* Sets the state of the 'Jobs Like This' tab (disabled if the details page throws an error) */

        vm.sortCriterias = [{
          name: 'Relevancy',
          value: 'Relevancy'
        }, {
          name: 'Date Posted',
          value: 'Date'
        }];

        vm.radiusOptions = [{
            name: '5 miles',
            value: '5'
          },

          {
            name: '10 miles',
            value: '10'
          },

          {
            name: '15 miles',
            value: '15'
          },

          {
            name: '25 miles',
            value: '25'
          }, {
            name: '50 miles',
            value: '50'
          }, {
            name: '100 miles',
            value: '100'
          }
        ];

        vm.toggleDropdown = function(filterName, isOpen) {
          if (isOpen) {
            localStorageService.set('jobSearch.' + vm.searchQuery.filterMap[filterName].name, isOpen);
          } else {
            localStorageService.remove('jobSearch.' + vm.searchQuery.filterMap[filterName].name);
          }
        };

        vm.pageChanged = function(currentPageNumber) {
          vm.results(currentPageNumber - 1);
        };

        vm.sortChanged = function($item, $vm) {
          if ($vm !== vm.searchQuery.query.sortBy) {
            vm.searchQuery.query.sortBy = $vm;
            // update localstorage query to reflect sorting preference
            var savedObj = localStorageService.get('jobSearch.query');
            savedObj.sortBy = $vm;
            localStorageService.set('jobSearch.query', savedObj);
            vm.results(undefined, true);
          }
        };

        vm.radiusChanged = function($item, $vm) {
          if ($vm !== vm.searchQuery.query.radius) {
            vm.searchQuery.query.radius = $vm;
            vm.results();
          }
        };

        vm.filteredResults = function(name, value) {
          vm.searchQuery.filteredResults(name, value);
          vm.results(0);
        };

        vm.setModifiedFilter = function(name, value) {
          var savedObj = localStorageService.get('jobSearch.query');
          savedObj[name] = value;

          localStorageService.set('jobSearch.query', savedObj);
          vm.results(0);
        };

        vm.clearFilters = function() {
          vm.searchQuery.clearFilters(true);
          vm.results(0);
        };

        vm.results = function(pageNumber, isNewSearch) {
          vm.totalNumberOfResults = -1;
          return vm.searchQuery.getSearchResults(pageNumber, isNewSearch).then(function(data) {
            vm.data = data.data;
            vm.sortBy = data.data.sortBy;
            vm.serviceName = data.data.serviceName;
            vm.radius = vm.searchQuery.query.radius || '25';
            vm.totalNumberOfResults = data.data.totalNumberOfResults;
            vm.modifiedFacets = vm.searchQuery.processResults(data.data);
            vm.facetFields = data.data.facetFields;
            vm.facetRanges = data.data.facetRanges;
            vm.jobs = data;
            vm.currentPageNumber = data.data.pageNumber + 1;
            vm.showPagination = data.data.totalPages > 1;
            vm.shownLocation = ($location.search().location) ? $location.search().location : '';
          }, vm.resultsError());
        };

        vm.resultsError = function() {

        };

        vm.jobApply = function(url) {
          $window.open(url);
          if (!vm.detailsApplied) {
            vm.modalInstance = $uibModal.open({
              templateUrl: 'app/tools/jobApply/modal.html',
              backdrop: 'static'
            });
          }
        };

        vm.sendActivityApplyCliked = function() {
          var postData = {
            id: $stateParams.id,
            activityName: 'apply_clicked',
            jobId: $stateParams.id,
            userIdentifier: User.profileId,
            activityValue: 'valid'
          };

          ActivityTracker.setActivity(postData);
        };

        vm.sendActivity = function(index) {
          //all steps are exactly similar to CGS2.0
          var job = vm.data[index];

          var postData = {
            id: job.job.jobId,
            activityName: 'Job_Viewed',
            jobId: job.job.jobId,
            userIdentifier: User.profileId,
            activityValue: 'valid',
            pageName: $location.absUrl(),
            pageNameDetail: (index + 1) + ' of ' + vm.data.length + ' on pageNumber ' + (vm.data.pageNumber + 1),
            serviceNameDetail: vm.data.serviceNameDetail,
            serviceName: 'UserSearch-SolrSearch'
          };

          ActivityTracker.setActivity(postData);
        };

        vm.setDetailsError = function() {
          vm.detailsError = true;
        };

        vm.setApplicationStatus = function(data) {
          vm.detailsError = false;
          if (data.data.length) {
            vm.appliedName = 'Applied';
            vm.detailsApplied = true;
          } else {
            vm.appliedName = 'Apply';
            vm.detailsApplied = false;
          }
        };

        vm.playlistError = function() {
          vm.details.isSaved = false;
        };

        vm.getCompanyDetails = function(id) {
          Companies.companyDetails({
            companyId: id
          }).then(function(data) {
            vm.companyDetails = data.data[0];
            vm.isATSTracked = vm.companyDetails.attributes.map(function(obj) {
              return obj.attributeName;
            }).indexOf('ATS_COMPANY_NAME') < 0 ? false : true;
          }, function() {
            vm.isATSTracked = false;
          });
        };

        vm.getJobDetails = function() {
          vm.detailsPageJobId = $stateParams.id ? parseInt($stateParams.id, 10) : vm.detailsPageJobId;

          return Jobs.jobDetails({
            jobId: vm.detailsPageJobId
          }).then(function(data) {
            // replace <p> elements in description with spans to aid formatting
            if (data && data.data[0].description) {
              data.data[0].description = (data.data[0].description)
                /*   leaving most of the replacements out for now except header tags  */
                .replace(/(<p>)/g, '<span>')
                .replace(/(<\/p>)/g, '</span>') // Takes out excessive use of p tags in content
                .replace(/(<br \/>)/g, '<span></span>') // remove line-break elements
                .replace(/(<br>)/g, '<span></span>')
                // .replace(/(<span><\/span>)/g, '')  // remove empty span elements
                .replace(/(<h1>)/g, '<h3>')
                .replace(/(<\/h1>)/g, '<\/h3>')
                .replace(/(<h2>)/g, '<h3>')
                .replace(/(<\/h2>)/g, '<\/h3>')
                .replace(/(<h4>)/g, '<h3>')
                .replace(/(<\/h4>)/g, '<\/h3>')
                .replace(/(<h5>)/g, '<h3>')
                .replace(/(<\/h5>)/g, '<\/h3>');
            }
            vm.details = data.data[0];
            vm.isFocusTalent = false;

            var emptyObjectCheck = Object.keys(vm.details).length;
            if (emptyObjectCheck) {
              vm.emptyObject = false;
            }

            if (vm.details.companyId) {
              vm.getCompanyDetails(vm.details.companyId);
            } else {
              vm.isATSTracked = false;
            }
            if (vm.details && vm.details.jobAttributes) {
              for (var i = 0; i < vm.details.jobAttributes.length; i++) {
                if (vm.details.jobAttributes[i].attributeName === 'FOCUS_TALENT' && vm.details.jobAttributes[i].attributeValue === 'Y') {
                  vm.isFocusTalent = true;
                }
              }
            }

            vm.playlist = PlaylistCache.getByType('JOB')
              .then(function(playlist) {
                var match = playlist.listItems.find(function(listItem) {
                  return listItem.itemIdentifier === '' + vm.details.jobId;
                });
                if (match) {
                  vm.details.listId = match.listId;
                  vm.details.listItemId = match.listItemId;
                }
                vm.details.isSaved = match ? true : false;
              }, vm.playlistError());

            if (vm.isFocusTalent) {
              vm.getResumeList();
            }

            return ActivityTracker.getAppliedJob({
              profileId: User.profileId,
              id: vm.detailsPageJobId
            });
          }).then(function(data) {
            vm.setApplicationStatus(data);
          });
        };

        vm.getResumeList = function() {
          return $resumeservice.list(User.profileId).then(function(data) {
            vm.userResumes = data.data.items;
            angular.forEach(vm.userResumes, function(value) {
              if (value.privacySetting === 'PUBLIC') {
                vm.selectedResume = value;
                vm.focusTalentQuery = {
                  docId: value.id,
                  profileId: value.profileId,
                  sourceId: vm.details.providerSourceId
                };
              }
            });
          });
        };

        vm.resumeSelected = function(item) {
          vm.focusTalentQuery = {
            docId: item.id,
            profileId: item.profileId,
            sourceId: vm.details.providerSourceId
          };
        };

        vm.setJobActivity = function() {
          var postData = {
            id: $stateParams.id,
            activityName: 'applied',
            jobId: $stateParams.id,
            userIdentifier: User.profileId,
            activityValue: 'valid'
          };
          var promise = ActivityTracker.setActivity(postData);
          return promise;
        };

        vm.setJobAppliedStatus = function() {
          var promise = ActivityTracker.setAppliedJob({
            profileId: User.profileId,
            jobId: $stateParams.id,
          }).then(function(data) {
            vm.applicationId = data.data;
            if (vm.playlist && vm.playlist.listItems) {
              var matchIndex = vm.playlist.listItems.findIndex(function(job) {
                return job.itemIdentifier === $stateParams.id;
              });
              if (matchIndex > -1) {
                vm.playlist.listItems[matchIndex].$delete().then(function() {
                  vm.playlist.listItems.splice(matchIndex, 1);
                });
              }
            }

            vm.appliedName = 'Applied';
            vm.detailsApplied = true;
          });
          return promise;
        };

        vm.submitFocusTalentApplication = function() {
          /* set resume to searchable if private */
          vm.focusTalentAlerts = [];

          if (vm.selectedResume.privacySetting === 'PRIVATE') {
            $resumeservice.setPreference({
              profileId: User.profileId,
              docId: vm.selectedResume.id,
              payload: {
                searchable: true
              }
            });
          }

          vm.focusTalentApplicationPromise = $resumeservice.apply(vm.focusTalentQuery).then(function() {
            vm.appliedName = 'Applied';
            vm.detailsApplied = true;
            vm.setJobActivity();
            vm.setJobAppliedStatus();
            vm.focusTalentAlerts.push({
              type: 'success',
              msg: 'Your resume has been submitted'
            });
            $timeout(function() {
              vm.alertEexpired = true;
              vm.focusTalentAlerts.splice(0, 1);
            }, 2000);

          }, function() {
            vm.focusTalentAlerts.push({
              type: 'danger',
              msg: 'Please try again later.'
            });
            $timeout(function() {
              vm.alertEexpired = true;
              vm.focusTalentAlerts.splice(0, 1);
            }, 2000);
          });
          return vm.focusTalentApplicationPromise;
        };

        vm.init = function(isJobDetails, isResults) {
          vm.isJobDetails = isJobDetails;
          vm.isResults = isResults;
          vm.detailsApplied = null;
          vm.details = {};
          vm.searchQuery.query.profileId = User.profileId;

          // FIXME: Needs a refactor. There is not particular flow to the data that gets set. We
          // are having to re invoke methods to reset values specially for saved searches or have to directly
          // deal with local storage (Which will be the eseaiest way but. The controller should not be dealing with it)
          // We have to call the setQuery function to set keywords and location which are always being loaded from local
          // storage and then reset the query manually to again.
          if (vm.isJobDetails) {
            return vm.getJobDetails();
          } else if (vm.isResults) {
            var pageNumber = 0;
            var savedQuery = {};

            if (localStorageService.get('jobSearch.query')) {
              savedQuery = localStorageService.get('jobSearch.query');
            }

            return User.get().then(function(data) {

              if ($location.search().notificationid) {
                //reset location
                vm.searchQuery.query.location = '';
                //clean this up a lot
                Notifications.getById({
                  profileId: data.profileId,
                  notificationId: $location.search().notificationid
                }).then(function(data) {

                  var jsonObj, type, matchNum;
                  try {
                    jsonObj = angular.fromJson(data.data.queryString);
                  } catch (e) {
                    jsonObj = data.data.queryString;
                  }

                  vm.searchQuery.query.location = jsonObj.location;
                  var objKeys = Object.keys(jsonObj);

                  if (objKeys.indexOf('keywords') !== -1) {
                    type = 'keywords';
                    matchNum = objKeys.indexOf('keywords');
                  } else if (objKeys.indexOf('keywords.title') !== -1) {
                    type = 'keywords.title';
                    matchNum = objKeys.indexOf('keywords.title');
                  } else if (objKeys.indexOf('keywords.company') !== -1) {
                    type = 'keywords.company';
                    matchNum = objKeys.indexOf('keywords.title');
                  }

                  if (matchNum) {
                    vm.searchQuery.keywords = {
                      value: jsonObj[Object.keys(jsonObj)[matchNum]],
                      type: type
                    };
                  } else {
                    vm.searchQuery.keywords = '';
                  }

                  savedQuery = angular.fromJson(data.data.queryString);
                  localStorageService.set('jobSearch.query', savedQuery);

                }).then(function() {
                  vm.searchQuery.setQuery(vm.searchQuery.query.location, vm.searchQuery.keywords, savedQuery);
                  vm.searchQuery.init();

                  return vm.results(0);
                });

              }
              if ($location.search().jobcodeid) {

                savedQuery = (localStorageService.get('jobSearch.query')) ? localStorageService.get('jobSearch.query') : {};
                vm.searchQuery.keywords = '';
                vm.searchQuery.query.location = $location.search().location;
                vm.searchQuery.jobcodeid = $location.search().jobcodeid;
                vm.searchQuery.setJobCodeQuery(vm.searchQuery.query.location, vm.searchQuery.jobcodeid, savedQuery);
                vm.searchQuery.init();

                return vm.results(0);

              } else {

                var isNewSearch = false;
                vm.searchQuery.query.location = vm.searchQuery.query.location; // || User.profile.cgsLocation;
                vm.searchQuery.keywords = ($location.search().keywords || ($location.search()['keywords.title'] ? {
                  'value': $location.search()['keywords.title'],
                  'type': 'title'
                } : '') || ($location.search()['keywords.company'] ? {
                  'value': $location.search()['keywords.company'],
                  'type': 'company'
                } : '')) || ((savedQuery.keywords ? savedQuery.keywords : '') || (savedQuery['keywords.title'] ? {
                  'value': savedQuery['keywords.title'],
                  'type': 'title'
                } : '') || (savedQuery['keywords.company'] ? {
                  'value': savedQuery['keywords.company'],
                  'type': 'company'
                } : ''));

                //verify if the saved info matches the URL query, if it does then keep page num and filters, else clear them.
                if (($location.search().keywords && $location.search().keywords === savedQuery.keywords) || ($location.search()['keywords.title'] && $location.search()['keywords.title'] === savedQuery['keywords.title']) || ($location.search()['keywords.company'] && $location.search()['keywords.company'] === savedQuery['keywords.company'])) {
                  var locationPageNumber = ($location.search().pageNumber ? $location.search().pageNumber : 0);
                  pageNumber = (savedQuery.pageNumber ? savedQuery.pageNumber : locationPageNumber);
                  isNewSearch = false;
                  if (savedQuery.jobCode) {
                    delete savedQuery.jobCode;
                  }
                } else {
                  pageNumber = 0;
                  savedQuery = {};
                  vm.searchQuery.clearFilters();
                  isNewSearch = true;
                }
                localStorageService.remove('jobSearch');
                vm.searchQuery.setQuery(vm.searchQuery.query.location, vm.searchQuery.keywords, savedQuery);
                vm.searchQuery.init();
                return vm.results(pageNumber, isNewSearch);

              }

            });
            // }
          }
        };
      }
    ]);
})();
