'use strict';

describe('PlaylistCache Cache Service: Functions', function() {
  var PlaylistCache, mockBackend, User, $rootScope,
    profileId = 'apt_1750bdf9-ba94-4092-9c95-84c80697f320';

  // Load module
  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('apolloPlaylistCache');
  });

  beforeEach(inject(function(_$httpBackend_, _User_, _$rootScope_, _PlaylistCache_) {
    mockBackend = _$httpBackend_;
    User = _User_;
    User.profileId = profileId;
    $rootScope = _$rootScope_;
    PlaylistCache = _PlaylistCache_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    PlaylistCache = mockBackend = User = $rootScope = undefined;
  });

  describe('getByType()', function() {

    var mockNoListsResponse = '{"message":"Lists does not exist for the given user.","status":"404 Not Found","type":"ITEM_NOT_FOUND","transactionId":"030ff9a6-eafb-4bcc-8345-ebabd40b011d"}',
      mockListsResponse = '{"list":[{"listId":35735,"tenantName":"uopx","name":"CAREER PLAN","listType":"CAREER_PLAN_STEP","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-07-20T17:12:52.000Z","listItems":[{"listItemId":195095,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-exploration","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:14:40.000Z"},{"listItemId":195093,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-plan/milestones/goals/chart-your-career-path","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:12:52.000Z"}]},{"listId":34719,"tenantName":"uopx","name":"MyJobs","listType":"JOB","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My Saved Jobs","createDate":"2015-07-08T18:05:11.000Z","listItems":[{"listItemId":194249,"listId":34719,"itemType":"JOB","itemIdentifier":"27228305","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-17T10:20:12.000Z"},{"listItemId":189957,"listId":34719,"itemType":"JOB","itemIdentifier":"27168595","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:14.000Z"},{"listItemId":189955,"listId":34719,"itemType":"JOB","itemIdentifier":"27379725","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:13.000Z"},{"listItemId":189953,"listId":34719,"itemType":"JOB","itemIdentifier":"27411037","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:12.000Z"},{"listItemId":189951,"listId":34719,"itemType":"JOB","itemIdentifier":"26604571","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:11.000Z"}]},{"listId":34531,"tenantName":"uopx","name":"CAREER_SETTINGS","listType":"CAREER_SETTINGS","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-06-24T18:25:03.000Z","listItems":[{"listItemId":188625,"listId":34531,"itemType":"CAREER_SETTINGS","itemIdentifier":"DO_NOT_SHOW_SKILL_WELCOME_SCREEN","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-06-24T18:25:03.000Z"}]},{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":194245,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:20.000Z"},{"listItemId":194213,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:11.000Z"},{"listItemId":194197,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:05.000Z"},{"listItemId":194107,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"},{"listItemId":194181,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.02","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:55.000Z"},{"listItemId":194163,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:51.000Z"},{"listItemId":194145,"listId":34533,"itemType":"RONET","itemIdentifier":"43-1011.98","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:47.000Z"},{"listItemId":194127,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:43.000Z"},{"listItemId":194109,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"}]},{"listId":34535,"tenantName":"uopx","name":"Skills","listType":"SKILL","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My skill level list","createDate":"2015-06-24T18:26:12.000Z","listItems":[{"listItemId":189925,"listId":34535,"itemType":"SKILL","itemIdentifier":"219097","itemSequence":1,"itemStatus":"SAVED","priority":"Intermediate","createDate":"2015-07-08T00:46:26.000Z"},{"listItemId":189923,"listId":34535,"itemType":"SKILL","itemIdentifier":"242223","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-08T00:34:26.000Z"},{"listItemId":189899,"listId":34535,"itemType":"SKILL","itemIdentifier":"211875","itemSequence":1,"itemStatus":"COMPLETE","priority":"Intermediate","createDate":"2015-07-07T21:27:05.000Z"},{"listItemId":189897,"listId":34535,"itemType":"SKILL","itemIdentifier":"185287","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:53.000Z"},{"listItemId":189895,"listId":34535,"itemType":"SKILL","itemIdentifier":"211815","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:50.000Z"},{"listItemId":189641,"listId":34535,"itemType":"SKILL","itemIdentifier":"223731","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T17:23:53.000Z"},{"listItemId":189005,"listId":34535,"itemType":"SKILL","itemIdentifier":"242207","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:33.000Z"},{"listItemId":189003,"listId":34535,"itemType":"SKILL","itemIdentifier":"251147","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:22.000Z"},{"listItemId":189001,"listId":34535,"itemType":"SKILL","itemIdentifier":"173195","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:15.000Z"},{"listItemId":188737,"listId":34535,"itemType":"SKILL","itemIdentifier":"254005","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-24T22:59:39.000Z"},{"listItemId":188701,"listId":34535,"itemType":"SKILL","itemIdentifier":"231483","itemSequence":1,"itemStatus":"SAVED","priority":"Beginner","createDate":"2015-06-24T22:34:38.000Z"},{"listItemId":188687,"listId":34535,"itemType":"SKILL","itemIdentifier":"243619","itemSequence":1,"itemStatus":"COMPLETE","priority":"Advanced","createDate":"2015-06-24T20:55:13.000Z"}]}]}';

    it('should return 404 when no lists available', function() {
      var results;

      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/' + profileId + '/lists').respond(404, mockNoListsResponse);
      PlaylistCache.getByType('RONET').catch(function(err) {
        results = err;
      });
      mockBackend.flush();
      expect(results.message).toBe('List not found');
      expect(results.status).toBe(404);

      // console.log('results', results);
    });

    it('should return list resource when found', function() {
      var results;

      // mockBackend.expectGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true').respond(200, mockAuthResponse);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/' + profileId + '/lists').respond(mockListsResponse);
      PlaylistCache.getByType('RONET').then(function(list) {
        results = list;
      });
      mockBackend.flush();

      // should have resource methods
      expect(angular.isFunction(results.$save)).toBeTruthy();

      // each list item should be a resource
      results.listItems.forEach(function(listItem) {
        expect(angular.isFunction(listItem.$save)).toBeTruthy();
      });
    });

    it('should maintain cache consistency', function() {
      var results;

      // mockBackend.expectGET('/api/authentication-service/2/cgsdemo/user/info?createAnonymousProfile=true').respond(200, mockAuthResponse);
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/' + profileId + '/lists').respond(mockListsResponse);
      PlaylistCache.getByType('RONET').then(function(list) {
        results = list;
      });
      mockBackend.flush();

      // console.log('cache', JSON.stringify(results, null, 2));

      var itemCount = results.listItems.length;
      // console.log('itemCount', itemCount);
      results.listItems[0].$delete().then(function() {
        results.listItems.splice(0, 1);
        itemCount--;
      });
      mockBackend.expectDELETE('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists/34533/items/194245').respond(200, '');
      mockBackend.flush();
      expect(results.listItems.length).toBe(itemCount);

      results = null;
      PlaylistCache.getByType('RONET').then(function(list) {
        results = list;
      });
      $rootScope.$digest();
      expect(results.listItems.length).toBe(itemCount);
    });

  });

  describe('save()', function() {
    var mockSavePayload = '{"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"itemType":"RONET","itemIdentifier":"15-1111.00","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-21T17:31:33.000Z","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819"},{"itemType":"RONET","itemIdentifier":"11-3031.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-21T18:08:47.000Z","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819"},{"itemType":"RONET","itemIdentifier":"13-2082.00","itemSequence":2,"itemStatus":"SAVED","createDate":"2015-07-21T18:08:46.000Z","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819"}]}',
      mockSaveResponse = '{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":196703,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1111.00","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-21T17:31:33.000Z"},{"listItemId":196705,"listId":34533,"itemType":"RONET","itemIdentifier":"11-3031.00","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-21T18:08:47.000Z"},{"listItemId":196707,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2082.00","itemSequence":2,"itemStatus":"SAVED","createDate":"2015-07-21T18:08:46.000Z"}]}';


    it('should reject if invalid input', function() {
      var errMessage = 'listData argument must contain listType and listItems',
        error;

      PlaylistCache.save().catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage);

      PlaylistCache.save({}).catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage);

      PlaylistCache.save({
        listType: 'RONET'
      }).catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage);

      PlaylistCache.save({
        listType: 'RONET',
        listItems: {}
      }).catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage);
    });

    it('should reject if no base data', function() {
      var errMessage = 'PlaylistBaseData does not exist for listType "foo"',
        error;

      PlaylistCache.save({
        listType: 'foo',
        listItems: []
      }).catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage);
    });

    it('should save and return correctly transformed saved data', function() {
      var playlist;

      // empty cache
      PlaylistCache.getByType('RONET');
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists').respond(404, 'error message');
      mockBackend.flush();

      expect(PlaylistCache.$lists.length = 0);

      PlaylistCache.save(angular.fromJson(mockSavePayload));
      mockBackend.expectPOST('/api/playlist-service/1/cgsdemo/users/apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819/lists').respond(201, mockSaveResponse);
      mockBackend.flush();

      expect(PlaylistCache.$lists.length).toBe(1);
      PlaylistCache.getByType('RONET').then(function(pl) {
        playlist = pl;
      });
      $rootScope.$digest();
      expect(playlist.listItems.length).toBe(3);
      angular.forEach(playlist.listItems, function(listItem) {
        expect(listItem.userIdentifier).toBe(profileId);
        expect(listItem.$save).toBeDefined();
      });

      // should update list now
      var newSavePayload = angular.fromJson(mockSavePayload),
        newSaveResponse = angular.fromJson(mockSaveResponse);
      newSavePayload.listItems.pop();
      newSaveResponse.listItems.pop();
      PlaylistCache.save(newSavePayload);
      mockBackend.expectPOST('/api/playlist-service/1/cgsdemo/users/apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819/lists').respond(201, angular.toJson(newSaveResponse));
      mockBackend.flush();

      expect(PlaylistCache.$lists.length).toBe(1);
      PlaylistCache.getByType('RONET').then(function(pl) {
        playlist = pl;
      });
      $rootScope.$digest();
      expect(playlist.listItems.length).toBe(2);
    });
  });

  describe('addListItem()', function() {

    it('should reject if invalid input', function() {
      var errMessage1 = 'listType argument must be provided',
        errMessage2 = 'listItemData argument must contain itemIdentifier',
        error;


      PlaylistCache.addListItem().catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage1);

      PlaylistCache.addListItem('RONET').catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage2);

      PlaylistCache.addListItem('RONET', {}).catch(function(err) {
        error = err;
      });
      $rootScope.$digest();
      expect(error).toBe(errMessage2);
    });

    it('should add list item when no existing lists', function() {
      var playlist,
        listItem = '{"itemIdentifier":"13-2011.02","itemSequence":0,"itemType":"RONET","itemStatus":"SAVED"}',
        mockSavePayload = '{"userIdentifier":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","listType":"RONET","listItems":[{"itemType":"RONET","userIdentifier":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","itemIdentifier":"13-2011.02","itemSequence":0,"itemStatus":"SAVED"}],"name":"MyGoals","description":"My goal list","ownerType":"USER","privacyType":"Private"}',
        mockSaveResponse = '{"listId":36529,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_c7276012-903f-43d3-95e0-f6da6332ae99","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-07-22T19:37:46.463Z","listItems":[{"listItemId":198053,"listId":36529,"itemType":"RONET","itemIdentifier":"13-2011.02","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-22T19:37:46.000Z"}]}';


      // empty cache
      PlaylistCache.getByType('RONET');
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists').respond(404, 'error message');
      mockBackend.flush();

      expect(PlaylistCache.$lists.length).toBe(0);

      PlaylistCache.addListItem('RONET', angular.fromJson(listItem));
      mockBackend.expectPOST('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists').respond(function(method, url, data) {
        expect(data).toBe(mockSavePayload);
        return [201, mockSaveResponse, { /*headers*/ }];
      });
      mockBackend.flush();

      expect(PlaylistCache.$lists.length).toBe(1);
      PlaylistCache.getByType('RONET').then(function(pl) {
        playlist = pl;
      });
      $rootScope.$digest();
      expect(playlist.listItems.length).toBe(1);
      angular.forEach(playlist.listItems, function(listItem) {
        expect(listItem.userIdentifier).toBe(profileId);
        expect(listItem.$save).toBeDefined();
      });
    });

    it('should add list item when existing list', function() {
      var playlist,
        newListItem,
        mockListsResponse = '{"list":[{"listId":35735,"tenantName":"uopx","name":"CAREER PLAN","listType":"CAREER_PLAN_STEP","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-07-20T17:12:52.000Z","listItems":[{"listItemId":195095,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-exploration","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:14:40.000Z"},{"listItemId":195093,"listId":35735,"itemType":"CAREER_PLAN_STEP","itemIdentifier":"/career-plan/milestones/goals/chart-your-career-path","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-07-20T17:12:52.000Z"}]},{"listId":34719,"tenantName":"uopx","name":"MyJobs","listType":"JOB","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My Saved Jobs","createDate":"2015-07-08T18:05:11.000Z","listItems":[{"listItemId":194249,"listId":34719,"itemType":"JOB","itemIdentifier":"27228305","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-17T10:20:12.000Z"},{"listItemId":189957,"listId":34719,"itemType":"JOB","itemIdentifier":"27168595","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:14.000Z"},{"listItemId":189955,"listId":34719,"itemType":"JOB","itemIdentifier":"27379725","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:13.000Z"},{"listItemId":189953,"listId":34719,"itemType":"JOB","itemIdentifier":"27411037","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:12.000Z"},{"listItemId":189951,"listId":34719,"itemType":"JOB","itemIdentifier":"26604571","itemSequence":1,"itemStatus":"SAVED","createDate":"2015-07-08T18:05:11.000Z"}]},{"listId":34531,"tenantName":"uopx","name":"CAREER_SETTINGS","listType":"CAREER_SETTINGS","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","createDate":"2015-06-24T18:25:03.000Z","listItems":[{"listItemId":188625,"listId":34531,"itemType":"CAREER_SETTINGS","itemIdentifier":"DO_NOT_SHOW_SKILL_WELCOME_SCREEN","itemSequence":1,"itemStatus":"COMPLETE","createDate":"2015-06-24T18:25:03.000Z"}]},{"listId":34533,"tenantName":"uopx","name":"MyGoals","listType":"RONET","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My goal list","createDate":"2015-06-24T18:25:55.000Z","listItems":[{"listItemId":194245,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1131.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:20.000Z"},{"listItemId":194213,"listId":34533,"itemType":"RONET","itemIdentifier":"21-1093.00","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:11.000Z"},{"listItemId":194197,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.91","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T07:00:05.000Z"},{"listItemId":194107,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.93","itemSequence":7,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"},{"listItemId":194181,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.02","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:55.000Z"},{"listItemId":194163,"listId":34533,"itemType":"RONET","itemIdentifier":"13-2011.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:51.000Z"},{"listItemId":194145,"listId":34533,"itemType":"RONET","itemIdentifier":"43-1011.98","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:47.000Z"},{"listItemId":194127,"listId":34533,"itemType":"RONET","itemIdentifier":"27-3031.95","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:43.000Z"},{"listItemId":194109,"listId":34533,"itemType":"RONET","itemIdentifier":"15-1134.92","itemSequence":8,"itemStatus":"SAVED","createDate":"2015-07-17T06:59:38.000Z"}]},{"listId":34535,"tenantName":"uopx","name":"Skills","listType":"SKILL","ownerType":"USER","userIdentifier":"apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819","userIdentifierType":"USER","privacyType":"Private","description":"My skill level list","createDate":"2015-06-24T18:26:12.000Z","listItems":[{"listItemId":189925,"listId":34535,"itemType":"SKILL","itemIdentifier":"219097","itemSequence":1,"itemStatus":"SAVED","priority":"Intermediate","createDate":"2015-07-08T00:46:26.000Z"},{"listItemId":189923,"listId":34535,"itemType":"SKILL","itemIdentifier":"242223","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-08T00:34:26.000Z"},{"listItemId":189899,"listId":34535,"itemType":"SKILL","itemIdentifier":"211875","itemSequence":1,"itemStatus":"COMPLETE","priority":"Intermediate","createDate":"2015-07-07T21:27:05.000Z"},{"listItemId":189897,"listId":34535,"itemType":"SKILL","itemIdentifier":"185287","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:53.000Z"},{"listItemId":189895,"listId":34535,"itemType":"SKILL","itemIdentifier":"211815","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T21:26:50.000Z"},{"listItemId":189641,"listId":34535,"itemType":"SKILL","itemIdentifier":"223731","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-07-07T17:23:53.000Z"},{"listItemId":189005,"listId":34535,"itemType":"SKILL","itemIdentifier":"242207","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:33.000Z"},{"listItemId":189003,"listId":34535,"itemType":"SKILL","itemIdentifier":"251147","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:22.000Z"},{"listItemId":189001,"listId":34535,"itemType":"SKILL","itemIdentifier":"173195","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-29T22:28:15.000Z"},{"listItemId":188737,"listId":34535,"itemType":"SKILL","itemIdentifier":"254005","itemSequence":1,"itemStatus":"SAVED","priority":"Advanced","createDate":"2015-06-24T22:59:39.000Z"},{"listItemId":188701,"listId":34535,"itemType":"SKILL","itemIdentifier":"231483","itemSequence":1,"itemStatus":"SAVED","priority":"Beginner","createDate":"2015-06-24T22:34:38.000Z"},{"listItemId":188687,"listId":34535,"itemType":"SKILL","itemIdentifier":"243619","itemSequence":1,"itemStatus":"COMPLETE","priority":"Advanced","createDate":"2015-06-24T20:55:13.000Z"}]}]}',
        listItem = '{"itemIdentifier":"15-1131.00","itemSequence":0,"itemType":"RONET","itemStatus":"SAVED"}',
        mockSavePayload = '{"itemType":"RONET","userIdentifier":"apt_1750bdf9-ba94-4092-9c95-84c80697f320","itemIdentifier":"15-1131.00","itemSequence":0,"itemStatus":"SAVED","listId":34533}',
        mockSaveResponse = '{"listItemId":198137,"listId":36529,"itemType":"RONET","itemIdentifier":"15-1131.00","itemSequence":0,"itemStatus":"SAVED","createDate":"2015-07-22T20:25:46.146Z"}';


      // empty cache
      PlaylistCache.getByType('RONET').then(function(pl) {
        playlist = pl;
      });
      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists').respond(mockListsResponse);
      mockBackend.flush();

      expect(PlaylistCache.$lists.length).toBe(5);
      expect(playlist.listItems.length).toBe(9);

      PlaylistCache.addListItem('RONET', angular.fromJson(listItem))
        .then(function(li) {
          newListItem = li;
        });
      mockBackend.expectPOST('/api/playlist-service/1/cgsdemo/users/apt_1750bdf9-ba94-4092-9c95-84c80697f320/lists/34533/items').respond(function(method, url, data) {
        expect(data).toBe(mockSavePayload);
        return [201, mockSaveResponse, { /*headers*/ }];
      });
      mockBackend.flush();

      expect(newListItem.$update).toBeDefined();
      expect(playlist.listItems.length).toBe(10);
    });


  });

});
