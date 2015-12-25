(function() {
  'use strict';

  angular
    .module('searchQuery', [
      'LocalStorageModule',
      'ngResource',
      'apolloJobServices.jobs',
      'careersUser'
    ])
    .factory('SearchQuery', [
      'localStorageService',
      '$state',
      'Jobs',
      '$location',
      'User',
      '$http',
      'CONSTANTS',
      function(localStorageService, $state, Jobs, $location, User, $http, CONSTANTS) {
        var service = {
          query: {},
          profileId: '',
          filterMap: {
            'Distance': {
              name: 'radius',
              isOpen: localStorageService.get('jobSearch.radius')
            },
            'Location': {
              name: 'locationFilter',
              isOpen: localStorageService.get('jobSearch.locationFilter')
            },
            'Academic Program': {
              name: 'programFilter',
              isOpen: localStorageService.get('jobSearch.programFilter')
            },
            'Education Level': {
              name: 'eduLevelFilter',
              isOpen: localStorageService.get('jobSearch.eduLevelFilter')
            },
            'Career Area': {
              name: 'industryFilter',
              isOpen: localStorageService.get('jobSearch.industryFilter')
            },
            'Experience Level': {
              name: 'experienceLevel',
              isOpen: localStorageService.get('jobSearch.experienceLevel')
            },
            'Company': {
              name: 'companyFilter',
              isOpen: localStorageService.get('jobSearch.companyFilter')
            },
            'Salary Range': {
              name: 'salaryRange',
              isOpen: localStorageService.get('jobSearch.salaryRange')
            },
            'Partner Employer': {
              name: 'preferredPartner',
              isOpen: localStorageService.get('jobSearch.preferredPartner')
            },
            'Tuition Assistance': {
              name: 'tuitionReimbursement',
              isOpen: localStorageService.get('jobSearch.tuitionReimbursement')
            }
          },

          filterChecked: function(filterName, value) {
            var filter = service.filterMap[filterName];
            var array = localStorageService.get('jobSearch.query')[filter.name] || [];
            return array.indexOf(value) > -1;
          },

          modifiedFilterChecked: function(filterName, value) {
            var val = value;
            val = val;
            return service.query[filterName];
          },

          filteredResults: function(name, value) {
            var facetName = service.filterMap[name].name;
            service.query[facetName] = service.query[facetName] || [];
            var index = service.query[facetName].indexOf(value);
            if (index > -1) {
              /* remove from array */
              service.query[facetName].splice(index, 1);
            } else {
              /* add to array */
              service.query[facetName].push(value);
            }
            localStorageService.set('jobSearch.query', service.query);
          },

          setQuery: function(keywordsLocation, keywords, savedQuery) {
            var keywordType = null;

            if (keywords) {
              if(savedQuery.jobCode) {
                delete savedQuery.jobCode;
              }
              localStorageService.set('jobSearch.keywords', keywords);
            } else {
              localStorageService.remove('jobSearch.keywords');
            }

            delete service.query.location;
            delete service.query['keywords.title'];
            delete service.query['keywords.company'];
            delete service.query.keywords;
            delete service.query.preferredPartner;
            delete service.query.pageNumber;
            delete service.query.jobCode;
            delete service.query.companyFilter;

            service.query.location = keywordsLocation;
            service.query.preferredPartner = false;
            service.query.pageNumber = 0;

            if (keywords && keywords.type) {
              keywordType = 'keywords.' + keywords.type;
              service.query[keywordType] = keywords.value;
            } else if (keywords === 'jobcodeid') {
              service.query.jobCode = keywords;
            } else if (keywords) {
              service.query.keywords = keywords;
            } else {

            }
            service.saveQuery(savedQuery);
          },

          setJobCodeQuery: function(keywordsLocation, jobcodeid, savedQuery) {
            if (jobcodeid) {
              localStorageService.remove('jobSearch.keywords');

              if(jobcodeid !== localStorageService.get('jobSearch.jobcode')) {
                localStorageService.set('jobSearch.jobcode', jobcodeid);
              }
            } else {
              localStorageService.remove('jobSearch.keywords');
            }

            delete service.query.location;
            delete service.query['keywords.title'];
            delete service.query['keywords.company'];
            delete service.query.keywords;
            delete service.query.preferredPartner;
            delete service.query.pageNumber;
            delete service.query.jobCode;
            delete service.query.companyFilter;

            service.query.location = keywordsLocation;
            service.query.preferredPartner = false;
            service.query.pageNumber = 0;

            if (jobcodeid) {
              service.query.jobCode = jobcodeid;
            } else {}
            service.saveQuery(savedQuery);
          },

          submitSearchForm: function(keywordsLocation, keywords) {
            // set defaults of query from queryDefaults
            delete service.query.radius;
            $state.params.notificationid = undefined;
            service.clearFilters();
            service.setQuery(keywordsLocation, keywords, {});

            if ($state.current.name === 'auth.tools.view' && $state.params.toolId === 'jobsearch' && $state.params.viewId === 'results') {
              // scrub the notificationid from URL
              $state.go('auth.tools.view', {
                toolId: 'jobsearch',
                viewId: 'results',
                notificationid: undefined
              }, {
                reload: true
              });
            } else {
              $state.go('auth.tools.view', {
                toolId: 'jobsearch',
                viewId: 'results'
              }, {
                reload: true
              });
            }

          },

          trackSearchQuery: function(obj) {
            var req = {
                       method: 'POST',
                       url: '/api/session-service/2/' + CONSTANTS.tenant + '/jobs/history/users/' + User.profileId,
                       headers: {
                         'Content-Type': 'application/json'
                       },
                       data: obj
                      };

                      $http(req).then(function(data){
                        return data;
                      }, function(err){
                        return err;
                      });
          },

          getSearchResults: function(pageNumber, isNewSearch) {
            if (pageNumber === undefined) {
              pageNumber = 0;
            }

            service.query.pageNumber = pageNumber;

            var searchObj = {
                              location: service.query.location,
                              pageNumber: service.query.pageNumber
                            },
                searchTrackObj = {};

            if (service.query.keywords) {
              searchObj.keywords = service.query.keywords;
              searchTrackObj = {'searches':[{'keywords': service.query.keywords, 'location': service.query.location}]};
            } else if (service.query['keywords.title']) {
              searchObj['keywords.title'] = service.query['keywords.title'];
              searchTrackObj = {'searches':[{'keywords.title': service.query['keywords.title'], 'location': service.query.location}]};
            } else if (service.query['keywords.company']) {
              searchObj['keywords.company'] = service.query['keywords.company'];
              searchTrackObj = {'searches':[{'keywords.company': service.query['keywords.company'], 'location': service.query.location}]};
            }  else if (service.query.jobCode) {
              //searchObj.jobcode = service.query.jobCode;
              searchTrackObj = {'searches':[{'jobcode': service.query.jobCode, 'location': service.query.location}]};
            } else if (!service.query.keywords && !service.query['keywords.title'] && !service.query['keywords.company'] && !service.query.jobCode && service.query.location) {
              searchObj.keywords = '';
              searchTrackObj = {'searches':[{'keywords': '', 'location': service.query.location}]};
            } else {
              searchObj = {};
              searchTrackObj = {};
            }

            if (isNewSearch && !service.notificationID) {
              this.trackSearchQuery(searchTrackObj);
            }

            if (!angular.isDefined(service.query.preferredPartner)) {
              service.query.preferredPartner = false;
            }

            var searchParams = Object.assign({}, $location.search(), searchObj);

            if (!isNewSearch || $location.search().notificationid) {
              $location.search(searchParams).replace();
            } else {
              $location.search(searchParams);
            }

            // setting this property for cg-busy
            service.results = Jobs.search(service.query);
            return service.results;
          },

          processResults: function(data) {
            var modifiedFacetFields = [];
            var tuitionReimbursementIndex;
            var partnerIndex;
            var tempArray = [];

            for (var i = data.facetFields.length - 1; i >= 0; i--) {
              if (data.facetFields[i].name === 'Tuition Reimbursement') {
                tuitionReimbursementIndex = i;
                //service.query.tuitionReimbursement = true;
              } else if (data.facetFields[i].name === 'Employee Partner') {
                partnerIndex = i;
                //service.query.preferredPartner = true;
              }
            }

            if (tuitionReimbursementIndex) {
              tempArray = data.facetFields.splice(tuitionReimbursementIndex, 1);
              tempArray[0].name = 'Tuition Assistance';
              modifiedFacetFields.push(tempArray[0]);
            }

            if (partnerIndex) {
              tempArray = data.facetFields.splice(partnerIndex, 1);
              tempArray[0].name = 'Partner Employer';
              modifiedFacetFields.push(tempArray[0]);
            }

            modifiedFacetFields.reverse();
            return modifiedFacetFields;
          },

          clearFilters: function(updateSaved) {
            delete service.query.radius;
            delete service.query.locationFilter;
            delete service.query.programFilter;
            delete service.query.industryFilter;
            delete service.query.experienceLevel;
            delete service.query.companyFilter;
            delete service.query.salaryRange;
            delete service.query.eduLevelFilter;
            delete service.query.tuitionReimbursement;
            delete service.query.preferredPartner;
            delete service.query.pageNumber;

            // delete any filters
            if (updateSaved) {
              var savedQuery = localStorageService.get('jobSearch.query');
              Object.keys(service.filterMap).forEach(function(key) {
                var mapped = service.filterMap[key];
                mapped.isOpen = null;
                delete savedQuery[mapped.name];
              });
              service.saveQuery(savedQuery);
            }
          },
          saveQuery: function(query) {
            if ((query && query.pageNumber > -1)) {
              service.query = query;
            }
            localStorageService.set('jobSearch.query', service.query);
          },
          init: function() {
            var searchParams = $location.search(),
              searchKeywords = localStorageService.get('jobSearch.keywords'),
              searchJobCode = localStorageService.get('jobSearch.jobcode'),
              savedQuery = localStorageService.get('jobSearch.query');

              service.notificationID = (searchParams.notificationid) ? searchParams.notificationid : undefined;

            if (searchKeywords && !searchJobCode) {
              if (savedQuery['keywords.title']) {
                service.keywords = {
                  'value': savedQuery['keywords.title'],
                  'type': 'title'
                };
              } else if (savedQuery['keywords.company']) {
                service.keywords = {
                  'value': savedQuery['keywords.company'],
                  'type': 'company'
                };
              } else {
                service.keywords = searchKeywords;
              }
            } else if (!searchKeywords && searchJobCode) {

                service.jobcode = searchJobCode;

            }

            if (searchParams.location) {
              service.query.location = searchParams.location;
            } else if (savedQuery) {
              service.query.location = savedQuery.location;
            } else if (service.keywords) {
              service.clearFilters();
              User.get().then(function() {
                service.query.location = User.profile.cgsLocation;
                service.setQuery(service.query.location, service.keywords, {});
              });
            } else if (service.jobcode) {
              service.clearFilters();
              User.get().then(function() {
                service.query.location = User.profile.cgsLocation;
                service.setJobCodeQuery(service.query.location, service.jobcode, {});
              });
            } else {
              User.get().then(function() {
                service.query.location = User.profile.cgsLocation;
              });
            }
          }
        };

        return service;
      }
    ]);
})();
