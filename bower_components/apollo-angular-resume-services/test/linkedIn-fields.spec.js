/**
 * Created by yrganta on 5/13/15.
 */
describe('linkedInTp:', function () {
  var $injector, LINKEDINFIELDS;

  beforeEach(function () {
    module('apolloAngularResumeServices.linkedInTpl');

    inject(function (_$injector_) {
      $injector = _$injector_;

      LINKEDINFIELDS = $injector.get('LINKEDINFIELDS');
    })
  });

  afterEach(function () {
    $injector = LINKEDINFIELDS = undefined;
  });


  it('Check to make sure the object is at least as defined and not changed.', function () {
    expect(angular.isString(LINKEDINFIELDS));
    expect(LINKEDINFIELDS).toEqual('first-name,last-name,headline,picture-url,industry,summary,specialties,positions,publicProfileUrl,educations,volunteer,skills,courses,honors-awards,num-recommenders');
  });
});
