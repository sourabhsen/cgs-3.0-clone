(function () {
  'use strict';

  angular.module('careerExplorationViewModel', [
    'labormarketServices.career.program',
    'labormarketServices.career.programsearch',
    'labormarketServices.career.ronets',
    'labormarketServices.career.search',
    'careersUser',
    'config.constants',
    'apolloInterestSurvey.directive.interestSurvey.vm',
    'LocalStorageModule',
    'labormarketServices.career.categories',
    'labormarketServices.career.related',
    'labormarketServices.career.details',
    'infinite-scroll'
  ])
    .directive('myEnter', function () {
      return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.myEnter);
            });
            event.preventDefault();
          }
        });
      };
    })
    .factory('CareerExplorationViewModel', [
      '$parse',
      '$q',
      'CareerProgram',
      'CareerProgramSearch',
      'Ronets',
      'CareerSearch',
      'User',
      'CONSTANTS',
      'CONFIG',
      'InterestSurveyViewModel',
      'localStorageService',
      'CareerCategories',
      'RelatedCareers',
      'CareerDetails',
      'Validation',
      function ($parse, $q, CareerProgram, CareerProgramSearch, Ronets, CareerSearch, User, CONSTANTS, CONFIG, InterestSurveyViewModel, localStorageService, CareerCategories, RelatedCareers, CareerDetails, Validation) {

        var
          scrollGroup = 0,
          recommendedGoalsArray = [],
          careerAreaGoalsArray = [],
          busy = false,
          busyCareerArea = false;

        var vm = {
          params: {
            programCode: undefined,
            programName: undefined
          },
          goals: undefined,
          interestSurvey: {
            completed: false,
            pctComplete: 0
          },
          selectedTab: 'careerExploration.selectedProgram',
          selectedProgram: undefined,
          selectedOccupation: undefined,
          occupation: {error: false},
          selectedCareer: undefined,
          activeTab: [{
            active: true
          }, {
            active: false
          }, {
            active: false
          }],
          recTilesView: false,
          recTableView: true,
          occTilesView: false,
          occTableView: true,
          caTilesView: false,
          caTableView: true,
          careerAreaGoals: {}
        };

        var setRecView = function() {
          vm.recTilesView = (localStorageService.get('careerExploration.recTilesView') !== undefined) ? localStorageService.get('careerExploration.recTilesView') : false;
          vm.recTableView = (localStorageService.get('careerExploration.recTableView') !== undefined) ? localStorageService.get('careerExploration.recTableView') : true;

          vm.recTilesView =  (vm.recTilesView !== null) ? vm.recTilesView : false;
          vm.recTableView =  (vm.recTableView !== null) ? vm.recTableView : true;

          vm.occTilesView =  vm.recTilesView;
          vm.occTableView =  vm.recTableView;
          vm.caTilesView  =  vm.recTilesView;
          vm.caTableView  =  vm.recTableView;
        };

        var setOccView = function() {
          vm.occTilesView = (localStorageService.get('careerExploration.occTilesView') !== undefined) ? localStorageService.get('careerExploration.occTilesView') : false;
          vm.occTableView = (localStorageService.get('careerExploration.occTableView') !== undefined) ? localStorageService.get('careerExploration.occTableView') : true;

          vm.occTilesView =  (vm.occTilesView !== null) ? vm.occTilesView : false;
          vm.occTableView =  (vm.occTableView !== null) ? vm.occTableView : true;

          vm.recTilesView =  vm.occTilesView;
          vm.recTableView =  vm.occTableView;
          vm.caTilesView  =  vm.occTilesView;
          vm.caTableView  =  vm.occTableView;
        };

        var setCaView = function() {
          vm.caTilesView  = (localStorageService.get('careerExploration.caTilesView') !== undefined) ? localStorageService.get('careerExploration.caTilesView') : false;
          vm.caTableView  = (localStorageService.get('careerExploration.caTilesView') !== undefined) ? localStorageService.get('careerExploration.caTableView') : true;

          vm.caTilesView =  (vm.caTilesView !== null) ? vm.caTilesView : false;
          vm.caTableView =  (vm.caTableView !== null) ? vm.caTableView : true;

          vm.recTilesView =  vm.caTilesView;
          vm.recTableView =  vm.caTableView;
          vm.occTilesView =  vm.caTilesView;
          vm.occTableView =  vm.caTableView;
        };

        /**********CGS-345- FUNCTION- TO PERSIST TILES VIEW BETWEEN TABS***********/
        var setTilesView = function(){
          vm.recTilesView = vm.occTilesView = vm.caTilesView = true;
          vm.recTableView = vm.occTableView = vm.caTableView = false;
        };
        /**********CGS-345-FUNCTION- TO PERSIST TABLE VIEW BETWEEN TABS***********/
        var setTableView = function(){
          vm.recTilesView = vm.occTilesView = vm.caTilesView = false;
          vm.recTableView = vm.occTableView = vm.caTableView = true;
        };

        vm.occupationDataCheck = function (obj) {
          if (obj && !obj.id) {
            vm.occupation.error = true;
          } else {
            vm.occupation.error = false;
          }
        };

        vm.setRecTiles = function () {
          localStorageService.set('careerExploration.recTilesView', true);
          localStorageService.set('careerExploration.recTableView', false);

          /*** making tabtilesview true for other tab eg: Occupation and careers *****/
          localStorageService.set('careerExploration.occTilesView', true);
          localStorageService.set('careerExploration.occTableView', false);
          localStorageService.set('careerExploration.caTilesView', true);
          localStorageService.set('careerExploration.caTableView', false);

          /*****Fuction to render the tab view for all tabs ***/
          setTilesView();
        };

        vm.setRecTable = function () {
          localStorageService.set('careerExploration.recTilesView', false);
          localStorageService.set('careerExploration.recTableView', true);

          /*** making tabtableview true for other tab eg: Occupation and careers *****/
          localStorageService.set('careerExploration.occTilesView', false);
          localStorageService.set('careerExploration.occTableView', true);
          localStorageService.set('careerExploration.caTilesView', false);
          localStorageService.set('careerExploration.caTableView', true);

          /*****Fuction to render the tab view for all tabs ***/
          setTableView();
        };

        vm.setOccTiles = function () {
          localStorageService.set('careerExploration.occTilesView', true);
          localStorageService.set('careerExploration.occTableView', false);

          /*** making tabtilesview true for other tab eg: recommendation and careers *****/
          localStorageService.set('careerExploration.recTilesView', true);
          localStorageService.set('careerExploration.recTableView', false);
          localStorageService.set('careerExploration.caTilesView', true);
          localStorageService.set('careerExploration.caTableView', false);

          /*****Fuction to render the tab view for all tabs ***/
          setTilesView();
        };

        vm.setOccTable = function () {
          localStorageService.set('careerExploration.occTilesView', false);
          localStorageService.set('careerExploration.occTableView', true);

          /*** making tabtilesview true for other tab eg: recommendation and careers *****/
          localStorageService.set('careerExploration.recTilesView', false);
          localStorageService.set('careerExploration.recTableView', true);
          localStorageService.set('careerExploration.caTilesView', false);
          localStorageService.set('careerExploration.caTableView', true);

          /*****Fuction to render the tab view for all tabs ***/
          setTableView();
        };

        vm.setCaTiles = function () {
          localStorageService.set('careerExploration.caTilesView', true);
          localStorageService.set('careerExploration.caTableView', false);

          /*** making tabtilesview true for other tab eg: recommendation and occupation *****/
          localStorageService.set('careerExploration.recTilesView', true);
          localStorageService.set('careerExploration.recTableView', false);
          localStorageService.set('careerExploration.occTilesView', true);
          localStorageService.set('careerExploration.occTableView', false);

          /*****Fuction to render the tab view for all tabs ***/
          setTilesView();
        };

        vm.setCaTable = function () {
          localStorageService.set('careerExploration.caTilesView', false);
          localStorageService.set('careerExploration.caTableView', true);

          /*** making tabtilesview true for other tab eg: recommendation and occupation *****/
          localStorageService.set('careerExploration.recTilesView', false);
          localStorageService.set('careerExploration.recTableView', true);
          localStorageService.set('careerExploration.occTilesView', false);
          localStorageService.set('careerExploration.occTableView', true);

          /*****Fuction to render the tab view for all tabs ***/
          setTableView();
        };


        vm.onBeforeSaveFired = function (thisObj) {
          if (thisObj && thisObj.$data && thisObj.$data.programId && thisObj.$data.programName) {
            // Continue as normal;
          } else {
            return false;
          }
        };

       /**********CGS-345************/
       /*getTabView: Function to get which tabview is selected
        *tabItem is a param which contains tab active object
        */
        vm.getTabView = function(tabItem){
          var indexes;
          angular.forEach(tabItem, function(values,index) {
              if(values.active === true) {
                  indexes =  index;
              }
           });

           switch(indexes){
            case 0: setRecView();
                    break;
            case 1: setOccView();
                    break;
            case 2: setCaView();
                     break;
           }
        };

        vm.activateTab = function (tabItem) {
          localStorageService.set('careerExploration.activeTab', [{
            active: 0 === tabItem
          }, {
            active: 1 === tabItem
          }, {
            active: 2 === tabItem
          }]);
        };


        //Temp
        vm.suggestLocations = function (val) {
          var location = Validation.suggestLocation({
            searchTerm: val
          });
          return location.$promise.then(function (response) {
            return response.resultList.map(function (item) {
              item.location = item.city + ', ' + item.state;
              return item;
            });
          });
        };

        vm.updateCgsLocation = function (data) {
          var re = /([A-Za-z\s]+),\s([A-Za-z]+)/;
          var loc = data.match(re);
          if (loc) {
            vm.updateStateAreaId(loc)
              .then(function () {
                // If there are career selection reload the data
                if (vm.selectedCareer) {
                  vm.selectedCareer = localStorageService.get('careerExploration.selectedCareer');
                  vm.careerSelected(vm.selectedCareer);
                }

                // If selected occupation
                if (vm.selectedOccupation) {
                  vm.onProgramNameSelect(vm.selectedOccupation, 'careerExploration.selectedOccupation');
                }

                // if selected program
                if (vm.selectedProgram.programName) {
                  //vm.onProgramNameSelect(vm.selectedProgram.programName, 'careerExploration.selectedProgram');
                  vm.onProgramNameSelect(vm.selectedProgram, 'careerExploration.selectedProgram');
                }
              });
            return true;
          } else {
            return false;
          }
        };

        vm.updateStateAreaId = function (location) {
          return User.setStateAreaId(location[1], location[2]);
        };

        //Temp end

        vm.getOnetNameBySearch = function (val) {
          var results = '';
          return CareerSearch.filter([{
            searchTerm: val
          }])
            .then(function (data) {
              if (data.data) {
                results = data.data;
              } else {
                results = [];
              }
              return results;
            });
        };

        vm.getProgramCodeBySearch = function (val) {
          var results = '';
          return CareerProgramSearch.filter({
            searchTerm: val
          })
            .then(function (data) {
              if (data.data) {
                results = data.data;
              } else {
                results = [];
              }
              return results;
            });
        };

        vm.onProgramNameSelect = function (obj, selectedTab) {
          // reset program name to incoming obj.programName if not matching
          if (obj.programName && (vm.selectedProgram.programName !== obj.programName)) {
            vm.selectedProgram.programName = obj.programName;
          }

          return User.get().then(function () {
            vm.selectedTab = selectedTab;

            if (obj) {
              localStorageService.set(vm.selectedTab, obj);
            } else {
              localStorageService.remove(vm.selectedTab);
            }

            if (vm.selectedTab === 'careerExploration.selectedProgram') {
              vm.goalsByProgram = {};
              vm.programPromise = vm.getGoalsByProgram(obj.programId, true);
              return vm.programPromise;
            } else if (vm.selectedTab === 'careerExploration.selectedOccupation') {
              vm.getOccupations(obj);
            } else {
              return;
            }
          });
        };

        vm.getOccupations = function (obj) {
          vm.goalsByOccupation = {};
          vm.occupationPromise = CareerDetails.getByOnetId({
            jobCode: obj.id,
            stateAreaId: User.profile.stateAreaId
          }).then(function (data) {
            var occupation = data.data;
            var jobId = data.data[0].laborMarketData.id;
            jobId = jobId.substring(jobId.lastIndexOf('/') + 1);
            return RelatedCareers.get({
              jobId: jobId,
              stateAreaId: User.profile.stateAreaId
            }).then(function (data) {
              data.data.unshift(occupation[0].laborMarketData);
              vm.goalsByOccupation = data.data;
            }, function () {
              return {};
            });
          }, function() {
              return {};
          });
          return vm.occupationPromise;
        };

        vm.getInterestSurveyPercentComplete = function () {
          return InterestSurveyViewModel.getSurveyCompleted(User.profileId)
            .then(function (data) {
              if (data) {
                vm.interestSurvey.pctComplete = data;
                if (data === 100) {
                  vm.interestSurvey.completed = true;
                } else {
                  vm.interestSurvey.completed = false;
                }
              } else {
                vm.interestSurvey.completed = false;
              }
            }, function(){
              vm.interestSurvey.completed = false;
            });

        };

        vm.getGoalsByProgram = function (code, firstTime) {

          if (!busy) {
            busy = true;
            return User.get().then(function () {

              if (firstTime) {
                recommendedGoalsArray = [];
                scrollGroup = 0;
              } else {
                scrollGroup = ((!vm.params.programCode && !code && !vm.interestSurvey.completed) || (vm.params.programCode !== code)) ? 0 : scrollGroup;

                if (recommendedGoalsArray.length > 0) {
                  recommendedGoalsArray = ((!vm.params.programCode && !code && !vm.interestSurvey.completed) || ((vm.params.programCode !== code) && !vm.interestSurvey.completed) ? [] : recommendedGoalsArray);
                }
              }

              vm.params.programCode = code;

              scrollGroup++;

              vm.programPromise = CareerSearch.getUserRecommended({
                profileId: User.profileId,
                programCode: code
              }).then(function (http) {
                var ronetArray = (http.data || []).map(function (val) {
                  return val.id;
                });

                if (ronetArray.length) {

                  var arrays = [],
                    size = 12;
                  while (ronetArray.length > 0) {
                    arrays.push(ronetArray.splice(0, size));
                  }

                  var item = scrollGroup - 1;
                  if (item < arrays.length) {
                    vm.selectedTab = 'careerExploration.selectedProgram';
                    return vm.getGoalsByOnet(arrays[item].toString());
                  } else {
                    busy = false;
                    return;
                  }

                } else {
                  vm.selectedTab = 'careerExploration.selectedProgram';
                  return vm.getGoalsByOnet(undefined);
                }
              }, function () {
                return vm.getGoalsByOnet(undefined);
              });

              return vm.programPromise;

            });
          }
        };

        vm.setTabData = function () {
          switch (vm.selectedTab) {
            case 'careerExploration.selectedProgram':
              vm.goalsByProgram = recommendedGoalsArray;
              return vm.goalsByProgram;
            case 'careerExploration.selectedOccupation':
              vm.goalsByOccupation = ''; //goals;
              return vm.goalsByOccupation;
            default:
              vm.goalsByCareerArea = ''; //goals;
              return vm.goalsByCareerArea;
          }
        };

        vm.getGoalsByOnet = function (onetCode) {
          return User.get().then(function () {

            if (onetCode !== undefined || recommendedGoalsArray.length) {
              return Ronets.getLaborData({
                ronets: onetCode,
                stateAreaId: User.profile.stateAreaId
              })
                .then(function (http) {
                  Array.prototype.push.apply(recommendedGoalsArray, http.data);
                  vm.setTabData();
                  busy = false;
                });

            } else {
              vm.getInterestSurveyPercentComplete();
              busy = false;
              vm.goalsByProgram = [];
              return {};
            }
          });
        };

        vm.getCareerAreaByOnet = function (onetCode) {
          return User.get().then(function () {

            if (onetCode !== undefined || careerAreaGoalsArray.length) {
              return Ronets.getLaborData({
                ronets: onetCode,
                stateAreaId: User.profile.stateAreaId
              })
                .then(function (http) {
                  Array.prototype.push.apply(careerAreaGoalsArray, http.data);
                  vm.setTabData();
                  busyCareerArea = false;
                });

            } else {
              busyCareerArea = false;
              return {};
            }
          });
        };

        vm.suggestOccupations = function (val) {
          var career = CareerSearch.filter({
            searchTerm: val
          });
          return career.then(function (response) {
            return response.data.map(function (item) {
              return item;
            });
          });
        };

        vm.careerAreaSelected = function ($item) {
          localStorageService.set('careerExploration.selectedCareerArea', $item);
          vm.selectedCareer = '';
          return CareerCategories.getSubCategories({
            majorId: $item.id
          }).then(function (data) {
            vm.careers = data.data;
            return;
          });
        };



        vm.getGoalsByCareerArea = function (isFirstTime) {
          var filterObj = localStorageService.get('careerExploration.selectedCareerObj');
          if (!busyCareerArea || isFirstTime) {
            busyCareerArea = true;
            return User.get().then(function () {

              if (isFirstTime) {
                careerAreaGoalsArray = [];
                scrollGroup = 0;
              } else {
                if (careerAreaGoalsArray.length > 0) {
                  careerAreaGoalsArray = (!filterObj && !vm.interestSurvey.completed) ? [] : careerAreaGoalsArray;
                }
              }

              scrollGroup++;

              if (filterObj.length > 0) {
                var arrays = [],
                  size = 12;

                var tempArray = filterObj;
                while (tempArray.length > 0) {
                  arrays.push(tempArray.splice(0, size));
                }

                var item = scrollGroup - 1;
                if (item < arrays.length) {
                  var existingData = vm.careerAreaGoals;
                  vm.selectedTab = 'careerExploration.selectedCareer';
                  return vm.getCareerAreaByOnet(arrays[item].toString()).then(function(){
                    busyCareerArea = false;
                    vm.careerAreaGoals = angular.extend(careerAreaGoalsArray, existingData);
                  });

                } else {
                  busyCareerArea = true;

                  return vm.careerAreaGoals;
                }

              } else {
                vm.selectedTab = 'careerExploration.selectedCareer';
                  vm.careerAreaGoals = {};
                  return vm.careerAreaGoals;
              }
              return vm.programPromise;
            });
          } else {
            return;
          }
        };

        vm.careerSelected = function ($item) {
          return User.get().then(function () {
            localStorageService.set('careerExploration.selectedCareer', $item);
            vm.careersPromise = CareerCategories.browse({
              majorId: $item.id,
              stateAreaId: User.profile.stateAreaId,
              fallback: 'national'
            }).then(function (data) {
              var filterObj = data.data.filter(function (obj) {
                if (!obj.id) {
                  return false;
                } else {
                  return obj;
                }
              }).map(function(obj){
                if(obj.id) {
                  return obj.id;
                } else {
                  vm.careerAreaGoals = {};
                  return vm.careerAreaGoals;
                }
              });
              return filterObj;
            }).then(function(filterObj){
              localStorageService.set('careerExploration.selectedCareerObj',filterObj);
              vm.careerAreaGoals = vm.getGoalsByCareerArea(true);
              return vm.careerAreaGoals;
            }, function () {
                vm.selectedTab = 'careerExploration.selectedCareer';
                vm.careerAreaGoals = {};
                return vm.careerAreaGoals;
            });
            return vm.careersPromise;
          });
        };

        // setup parameters, call getGoalsByProgram
        vm.init = function () {

          // TODO deal with data already loaded.. quick load things, switch tab info, etc

          //TODO what is this for?
          // if (!User.profileId) {
          //   vm.detailsPageGoalId = parseInt($state.params.id, 10);
          // }

          var selectedProgram = localStorageService.get('careerExploration.selectedProgram'),
            selectedCareerArea = localStorageService.get('careerExploration.selectedCareerArea'),
            selectedOccupation = localStorageService.get('careerExploration.selectedOccupation'),
            selectedCareer = localStorageService.get('careerExploration.selectedCareer'),
            currentTab = localStorageService.get('careerExploration.activeTab');

          if (currentTab) {
            vm.activeTab = currentTab;
          } else {
            vm.activeTab = [{
              'active': true
            }, {
              'active': false
            }, {
              'active': false
            }];
          }

          CareerCategories.query().then(function (data) {
            vm.careerAreas = data.data;
          });

          if (selectedOccupation) {
            vm.selectedOccupation = selectedOccupation;
            User.get().then(function () {
              vm.getOccupations(vm.selectedOccupation);
            });
          }

          if (selectedCareerArea) {
            vm.selectedCareerArea = selectedCareerArea;
            User.get().then(function () {
              vm.careerAreaSelected(vm.selectedCareerArea).then(function () {
                if (selectedCareer) {
                  vm.selectedCareer = selectedCareer;
                  vm.careerSelected(vm.selectedCareer);
                }
              });
            });
          }

          if (selectedProgram) {
            vm.selectedProgram = selectedProgram;
          } else {
            vm.selectedProgram = '';
          }
          vm.params.programCode = vm.selectedProgram.programId ? vm.selectedProgram.programId : User.profile.programCode;
          vm.params.programName = vm.selectedProgram.programName ? vm.selectedProgram.programName : undefined;
          vm.setTabData();
          vm.getInterestSurveyPercentComplete();
          vm.getGoalsByProgram(vm.params.programCode, true);

         // vm.setRecTable();
         // vm.setOccTable();
         // vm.setCaTable();

           /**********CGS-345-********/
            vm.getTabView(currentTab);

          return;

        };
        return vm;
      }
    ]);
})();
