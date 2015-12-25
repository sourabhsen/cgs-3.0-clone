'use strict';

describe('Factory: Milestones', function () {
  var DynamicRouting, mockBackend, Milestones, CONFIG, rootScope, $injector;

  // Load module
  beforeEach(function () {
    module('configMock');
    module('careersRouting');
    module('milestones');
  });

  beforeEach(inject(function (_DynamicRouting_, _$httpBackend_, _Milestones_, _CONFIG_, _$rootScope_, _$injector_) {
    mockBackend = _$httpBackend_;
    DynamicRouting = _DynamicRouting_;
    Milestones = _Milestones_;
    CONFIG = _CONFIG_;
    rootScope = _$rootScope_;
    $injector = _$injector_;


    // Request handler setup
    var mockListsResponse = '{"list":[{"listId":35735,"tenantName":"uopx","name":"CAREER PLAN","listType":"CAREER_PLAN_STEP","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-07-20T17:12:52.000Z","listItems":[{"listItemId":195095,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-exploration","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:14:40.000Z"},{"listItemId":195093,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-plan/milestones/goals/chart-your-career-path","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:12:52.000Z"}]},{"listId":34719,"tenantName":"uopx","name":"MyJobs","listType":"JOB","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My Saved Jobs","createDate":"2015-07-08T18:05:11.000Z","listItems":[{"listItemId":194249,"listId":34719,"itemType":"JOB","itemIdentifier":"27228305","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-17T10:20:12.000Z"},{"listItemId":189957,"listId":34719,"itemType":"JOB","itemIdentifier":"27168595","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:14.000Z"},{"listItemId":189955,"listId":34719,"itemType":"JOB","itemIdentifier":"27379725","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:13.000Z"},{"listItemId":189953,"listId":34719,"itemType":"JOB","itemIdentifier":"27411037","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:12.000Z"},{"listItemId":189951,"listId":34719,"itemType":"JOB","itemIdentifier":"26604571","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:11.000Z"}]},{"listId":34531,"tenantName":"uopx","name":"CAREER_SETTINGS","listType":"CAREER_SETTINGS","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-06-24T18:25:03.000Z","listItems":[{"listItemId":188625,"listId":34531,"itemType":"CAREER_SETTINGS","itemIdentifier":"DO_NOT_SHOW_SKILL_WELCOME_SCREEN","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-06-24T18:25:03.000Z"}]},{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":194245,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:20.000Z"},{"listItemId":194213,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:11.000Z"},{"listItemId":194197,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:05.000Z"},{"listItemId":194107,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"},{"listItemId":194181,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.02","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:55.000Z"},{"listItemId":194163,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:51.000Z"},{"listItemId":194145,"listId":34533,"itemType":"RONET","itemIdentifier":"43-1011.98","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:47.000Z"},{"listItemId":194127,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:43.000Z"},{"listItemId":194109,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"}]},{"listId":34535,"tenantName":"uopx","name":"Skills","listType":"SKILL","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My skill level list","createDate":"2015-06-24T18:26:12.000Z","listItems":[{"listItemId":189925,"listId":34535,"itemType":"SKILL","itemIdentifier":"219097","itemSequence":1,"itemStatus":"SAVED","priority":"Intermediate","createDate":"2015-07-08T00:46:26.000Z"},{"listItemId":189923,"listId":34535,"itemType":"SKILL","itemIdentifier":"242223","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-08T00:34:26.000Z"},{"listItemId":189899,"listId":34535,"itemType":"SKILL","itemIdentifier":"211875","itemSequence":1,"itemStatus":"COMPLETE","priority":"Intermediate","createDate":"2015-07-07T21:27:05.000Z"},{"listItemId":189897,"listId":34535,"itemType":"SKILL","itemIdentifier":"185287","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:53.000Z"},{"listItemId":189895,"listId":34535,"itemType":"SKILL","itemIdentifier":"211815","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:50.000Z"},{"listItemId":189641,"listId":34535,"itemType":"SKILL","itemIdentifier":"223731","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T17:23:53.000Z"},{"listItemId":189005,"listId":34535,"itemType":"SKILL","itemIdentifier":"242207","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:33.000Z"},{"listItemId":189003,"listId":34535,"itemType":"SKILL","itemIdentifier":"251147","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:22.000Z"},{"listItemId":189001,"listId":34535,"itemType":"SKILL","itemIdentifier":"173195","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:15.000Z"},{"listItemId":188737,"listId":34535,"itemType":"SKILL","itemIdentifier":"254005","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-24T22:59:39.000Z"},{"listItemId":188701,"listId":34535,"itemType":"SKILL","itemIdentifier":"231483","itemSequence":1,"itemStatus":"SAVED","priority":"Beginner","createDate":"2015-06-24T22:34:38.000Z"},{"listItemId":188687,"listId":34535,"itemType":"SKILL","itemIdentifier":"243619","itemSequence":1,"itemStatus":"COMPLETE","priority":"Advanced","createDate":"2015-06-24T20:55:13.000Z"}]}]}';
    mockBackend.whenGET(/\/api\/playlist-service\/\d+\/cgsdemo\/users\/lists/).respond(200, mockListsResponse);

    mockBackend.whenGET(/\/api\/utility\/\d+\/cgsdemo\/config\/app\/cgs\/module\/content/).respond(404, '');
  }));

  afterEach(function () {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    DynamicRouting = mockBackend = Milestones = CONFIG = rootScope = $injector = undefined;
  });

  describe('Check if the service is initialized', function () {
    it('Check to see the methods exist on the service', function () {
      //Milestones
      expect(angular.isObject(Milestones.init)).toBe(true);
      expect(angular.isFunction(Milestones.init.then)).toBe(true);
      expect(angular.isFunction(Milestones.getMilestones)).toBe(true);
      expect(angular.isFunction(Milestones.getMilestoneById)).toBe(true);
      expect(angular.isFunction(Milestones.getMilestoneNamedArray)).toBe(true);
      expect(angular.isFunction(Milestones.getPlaylist)).toBe(true);
      expect(angular.isFunction(Milestones.saveActivity)).toBe(true);

      // flush out pending playlist and content requests
      mockBackend.flush();
    });
  });

  describe('Check Initial Data Objects', function () {
    it('milestones object in config should not be empty', function () {
      expect(CONFIG.milestones).toBeDefined();
      expect(angular.isArray(CONFIG.milestones)).toBe(true);

      // flush out pending playlist and content requests
      mockBackend.flush();
    });

    // NOTE: not sure what was being tested for here.
    xit('activities should be empty when initalized without a milestone ID', function () {
      var details = Milestones.getDetails(''),
        emptyObject = {};
      expect(details).toEqual(emptyObject);
      expect(details.activities).not.toBeDefined();
    });
  });

  xdescribe('Get Activities', function () {
    it('should be able to get activities object for all CONFIG milestones', function () {
      angular.forEach(CONFIG.milestones, function (key) {
        var milestoneID = '',
          details = [];
        milestoneID = key.identifier.split('.')[1];
        details = Milestones.getDetails(milestoneID);
        expect(details.orderSequence).toBeDefined();
        expect(details.activities).toBeDefined();
        expect(details.activities.length).not.toEqual(0);
      });
    });
  });

  // Below method seem pretty useless. They don't seem to be doing
  // what their name suggests and they don't seem being usedanyways.
  xit('Verify if Milestones.getMilestones return a promise', function () {
    var milestones = Milestones.getMilestones();
    expect(angular.isObject(milestones)).toBe(true);
    expect(angular.isFunction(milestones.then)).toBe(true);
  });

  it('Verify Milestones.getMilestoneById returns a promise resolved with a milestone of given id', function () {
    // get a reference to a mile stone from available milestones.
    var milestone = CONFIG.milestones[3];

    // since the arrays are zero indexed we want the
    // fourth element form the list.
    var milestoneFromService;


    Milestones.getMilestoneById(4)
      .then(function (value) {
        milestoneFromService = value;
        expect(milestone.orderSequence).toEqual(milestoneFromService.orderSequence);
        expect(milestone.identifier).toEqual(milestoneFromService.identifier);
      });

    rootScope.$digest();
    mockBackend.flush();
  });


  it('Verify Milestones.getMilestoneNamedArray return a promise with milestone names and order sequence as' +
    ' key, value pairs', function () {
    var namedMilestones = angular.fromJson('{"goals":1,"skills":2,"resume":3,"image":4,"network":5,"letter":6,"interview":7,"strategies":8,"apply":9,"career-management":10}');

    var namedMilestonesFromService;

    Milestones.getMilestoneNamedArray().then(function (value) {
      namedMilestonesFromService = value;

      expect(namedMilestones).toEqual(namedMilestonesFromService);
    });

    rootScope.$digest();
    mockBackend.flush();
  });


  describe('Test to verify scenarios for Milestones.getPlaylist', function () {

    afterEach(function () {
      mockBackend.flush();
    });

    it('Verify calling playlist service always returns a promise object', function () {
      var playlistPromise;

      playlistPromise = Milestones.getPlaylist();
      expect(angular.isObject(playlistPromise)).toBe(true);

      playlistPromise = Milestones.getPlaylist(true);
      expect(angular.isObject(playlistPromise)).toBe(true);
    });


    it('Verify getPlaylist returns a promise that is resolved with list items', function () {
      var listItems;

      Milestones.getPlaylist().then(function (value) {
        listItems = value;

        expect(angular.isArray(listItems)).toBe(true);
        expect(listItems.length).toBe(2);
      });

      rootScope.$digest();
    });
  });

  describe('Tests to verify Milestones.saveActivity method', function () {
    afterEach(function () {
      mockBackend.flush();
    });

    it('verify saveActivity always return back a promise when an activity is passed in', function () {
      var saveActivityPromise;

      expect(saveActivityPromise).toBeUndefined();

      saveActivityPromise = Milestones.saveActivity({});

      rootScope.$digest();

      expect(saveActivityPromise).toBeDefined();
      expect(angular.isObject(saveActivityPromise)).toBe(true);
      expect(angular.isFunction(saveActivityPromise.then)).toBe(true);
    });

    it('when saveActivity is called without any params should throw an js error', function () {
      expect(Milestones.saveActivity).toThrowError(TypeError);
    });


    it('Passing an activity with a playlist associated and completed should be removed from playlist', function () {
      var listItems, $q = $injector.get('$q');

      Milestones.getPlaylist().then(function (value) {
        listItems = value;

        expect(listItems.length).toBe(2);
      })
        .then(function () {
          var deferred = $q.defer();
          var temp = {
            completed: true
            , playlist: {
              listItemId: listItems[0].listItemId
              , $delete: function () {
                return deferred.promise;
              }
            }
          };

          deferred.resolve();
          Milestones.saveActivity(temp);

          // Re get the playlist and verify that an item should be deleted
          Milestones.getPlaylist().then(function (value) {
            expect(value.length).toBe(1);
          });
        });

      rootScope.$digest();
    });


    xit('When an activity with no playlist associated is passed it should be added to playlist', function () {
      var listItems, $q = $injector.get('$q');

      Milestones.getPlaylist().then(function (value) {
        listItems = value;

        expect(listItems.length).toBe(2);
      })
        .then(function () {
          var deferred = $q.defer();
          var temp = angular.copy(listItems[0]);
          temp.playlistId = 22;
          temp.completed = false;

          deferred.resolve();
          Milestones.saveActivity(temp);

          // Re get the playlist and verify that an item should be deleted
          Milestones.getPlaylist().then(function (value) {
            expect(value.length).toBe(3);
          });
        });

      rootScope.$digest();

    });
  });
});
