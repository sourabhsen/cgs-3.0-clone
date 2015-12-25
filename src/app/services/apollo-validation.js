(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name apolloValidation
   * @description
   *
   * # apolloValidation
   *
   * The `apolloValidation` module provides authentication support with RESTful services
   * via the Authentication service.
   *
   * See {@link apolloValidation.Validation `Validation`} for usage.
   */

  /**
   * @ngdoc service
   * @name Validation
   * @requires $resource, CONSTANTS
   *
   * @description
   * A factory which constructs a resource object that lets you interact with Apollo validation services
   *
   * Requires the {@link apolloValidation `apolloValidation`} module to be installed.
   *
   * @returns {object} Returns a hash with the methods:
   *  suggestLocation: returns an authentication object.
   */


  angular.module('apolloValidation', ['config.constants'])
    .factory('Validation', [
      '$resource',
      'CONSTANTS',
      'CONFIG',
      function Validation($resource, CONSTANTS, CONFIG) {
        this.tenant = CONSTANTS.tenant;
        this.numSuggestResults = CONFIG.config.suggestResults;
        this.authValidationServicePath = '/api/validation-service/1/' + this.tenant;

        return $resource(this.validationServicePath, {
          searchTerm: '@val'
        }, {
          'suggestLocation': {
            method: 'GET',
            params: {
              noOfResults: this.numSuggestResults
            },
            url: this.authValidationServicePath + '/address/cities/suggest/:searchTerm',
            responseType: 'json'
          },
          'ipLocation': {
            method: 'GET',
            url: this.authValidationServicePath + '/address/ipaddr',
            responseType: 'json'
          }
        });
      }
    ]);

})();
