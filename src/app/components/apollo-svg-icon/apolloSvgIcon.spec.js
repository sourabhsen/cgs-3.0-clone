'use strict';

describe('Directive: apolloSvgIcon', function() {
  var element, $rootScope, $compile, mockBackend, $templateCache;

  beforeEach(function() {
    module('apolloSvgIcon');
  });

  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$templateCache_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    mockBackend = _$httpBackend_;
    $templateCache = _$templateCache_;
    mockBackend.when('GET','assets/images/svg-library/' + $rootScope.svgIcon + '.svg')
      .respond(200);

    $templateCache.put('app/components/apollo-svg-icon/svg-icon.html', '<div class="svg-icon-container" ng-include="assets/images/svg-library/\' + svgIcon + \'.svg"></div>');
    element = $compile('<apollo-svg-icon svg-icon="BATMAN"></apollo-svg-icon>')($rootScope);
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    $rootScope = $compile = mockBackend = $templateCache = undefined;
  });

  it('should output a div with svg icon', function() {
    $rootScope.$digest();
    // console.log( element.attr('svg-icon') );
    // console.log( element.html() );
    expect(element).toBeTruthy();
  });

});
