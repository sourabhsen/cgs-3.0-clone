(function() {
  'use strict';

  /**
   * @ngdoc provider
   * @name config.CONSTANTS
   *
   * @description
   * A configurable constants component.  Use setConstant in configuration stage to add or change values.
   *
   * Note: ** Only use this for change that will not change.
   *          Everything configurable is in the config service **
   *
   */

  angular.module('config.constants', [])
    .provider('CONSTANTS', function() {

      // See note at top, do not put configurable values here
      var constants = {
        tenant: 'cgsdemo',  // dynamically replace by config.tenant
        uiTenant: 'cgsdemo', // tenant used for style sheets, header, footer (replaced by config.uiTenant)

        hiringTrends: {
          Low: 1,
          Medium: 2,
          High: 3,
          'Very High': 4
        },
        educationLevelNames: {
          'HighSchoolTechnicalTraining': 'High School / Technical Training',
          'AssociatesDegree': 'Associate Degree',
          'BachelorsDegree': 'Bachelor\'s Degree',
          'GraduateProfessionalDegree': 'Master\'s Degree',
          'DoctoralDegree': 'Doctorate Degree'
        },
        experienceLevelNames: {
          'LessThanTwoYears': 'Less than 2 years experience',
          'TwoToFiveYears': '2 - 5 years experience',
          'FiveToEightYears': '5 - 8 years experience',
          'EightPlusYears': '8+ years experience'
        }

      };

      this.setConstant = function(name, val) {
        constants[name] = val;
        return constants[name];
      };

      this.$get = function() {
        return constants;
      };
    });

})();
