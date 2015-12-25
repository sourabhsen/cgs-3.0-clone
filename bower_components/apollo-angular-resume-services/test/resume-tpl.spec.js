/**
 * Created by yrganta on 5/13/15.
 */
describe('resumeTpl:', function () {
  var $injector, RESUMETPL;

  beforeEach(function () {
    module('apolloAngularResumeServices.resumeTpl');

    inject(function (_$injector_) {
      $injector = _$injector_;

      RESUMETPL = $injector.get('RESUMETPL');
    })
  });

  afterEach(function () {
    $injector = RESUMETPL = undefined;
  });


  it('Check to make sure the object is at least as defined and not changed.', function () {
    expect(angular.isObject(RESUMETPL));
    expect(angular.toJson(RESUMETPL)).toEqual('{"name":"","primaryInd":"Y","status":"COMPLETE","resume":{"contact":{"firstName":"","middleName":"","lastName":"","postalAddress":{"line1":"","line2":"","city":"","state":"","postalCode":"","country":""},"phones":[{"extension":"","number":""},{"extension":"","number":""}],"emailAddress":"","webSite":"","addinfo":""},"statements":{"personal":{"veteran":{}},"honors":""},"skills":{"skills":[],"languages":"","awards":"","certifications":"","volunteerWork":"","personalHobbies":""},"professional":{"publications":[]},"education":{"courses":"","schools":[]},"summary":{"includeUserSummary":false,"userSummary":"","objectives":[]},"experience":{"jobs":[]},"references":[""],"canonSkills":[],"jobPreferences":{"workOverTime":false},"additionalSections":[],"sections":[{"type":"CONTACT"},{"type":"SUMMARY"},{"type":"EXPERIENCE","subSections":[]},{"type":"EDUCATION","subSections":[]}]}}');
  });
});
