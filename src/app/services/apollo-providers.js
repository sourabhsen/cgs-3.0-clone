(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name apolloPlaylistCache
   * @description
   *
   *
   * The `apolloProvider` module provides a wrapper module to Provider Services
   *
   */
  angular.module('apolloProvider', [
    'config.constants',
    'ngResource',
    'careersUser',
  ])

  /*
  POST/{tenantId}/provider  Creates a Provider using the data inside the request
  GET/{tenantId}/provider Retrieves a list of providers.
  PUT/{tenantId}/provider/{id}  Updates a Provider using the data inside the request. Does not update any of the ProviderAttributes. To update ProviderAttributes see resource : PUT provider-service/{version}/{tenant}/provider/{providerId}/attributes
  DELETE/{tenantId}/provider/{id} Deletes the provider with the given Id
  GET/{tenantId}/provider/{id}  Gets a given provider by id.
  GET/{tenantId}/provider/id/{id} Gets a given provider by id.
  GET/{tenantId}/provider/name/{name} Gets a given provider by name.
  GET/{tenantId}/provider/name/{name}/attribute/{attribute} Gets a given attribute value
  POST/{tenantId}/provider/{providerId}/attributes  Creates a ProviderAttribute from the provider attribute passed through the body
  GET/{tenantId}/provider/{providerId}/attributes Retrieves all ProviderAttributes for a tenant and provider
  PUT/{tenantId}/provider/{providerId}/attributes Updates multiple ProviderAttributes from the provider attribute passed through the body. All the existing ProviderAttributes get deleted, and all the new ProviderAttributes get added.
  GET/{tenantId}/provider/{providerId}/attributes/{id}  Retrieves a ProviderAttribute using a ProviderAttributeID
  DELETE/{tenantId}/provider/{providerId}/attributes/{id} Deletes a ProviderAttribute using the ProviderAttributeID
  GET/{tenantId}/provider/{providerId}/attributes/name/{name} Retrieves a ProviderAttribute by the attribute name
  PUT/{tenantId}/provider/{providerId}/attributes/name/{name} Update the ProviderAttribute using the attribute name in the provider attribute passed through the body
  DELETE/{tenantId}/provider/{providerId}/attributes/name/{name}  Deletes the ProviderAttribute using the attribute name
  */

  /**
   * @ngdoc service
   * @name ProviderList
   * @requires $resource, CONSTANTS
   *
   * @description
   * A factory that wraps Provider Service calls to get a provider items list.
   *
   *
   * @returns {object} :
   *  getProviderList: returns all items
   */
  .factory('ProviderList', [
    '$resource',
    'CONSTANTS',
    function($resource, CONSTANTS) {
      this.tenant = CONSTANTS.tenant;
      this.providerServicePath = '/api/provider-service/1/' + this.tenant + '/provider';
      return $resource(this.providerServicePath);
    }
  ])

/*
PUT/{tenantId}/provider/{id}  Updates a Provider using the data inside the request. Does not update any of the ProviderAttributes. To update ProviderAttributes see resource : PUT provider-service/{version}/{tenant}/provider/{providerId}/attributes
DELETE/{tenantId}/provider/{id} Deletes the provider with the given Id
GET/{tenantId}/provider/{id}  Gets a given provider by id.
GET/{tenantId}/provider/id/{id} Gets a given provider by id.
*/

  /**
   * @ngdoc service
   * @name ProviderById
   * @requires $resource, CONSTANTS
   *
   * @description
   * A factory that wraps Provider Service calls to GET, PUT, DELETE provider by ID.
   *
   *
   * @returns {object} :
   *  getProviderById: returns provider data by ID
   */
  .factory('ProviderById', [
    '$resource',
    'CONSTANTS',
    function($resource, CONSTANTS) {
      this.tenant = CONSTANTS.tenant;
      this.providerServicePath = '/api/provider-service/1/' + this.tenant + '/provider/:providerId';
      return $resource(this.providerServicePath,
              {
                providerId: '@providerId'
              },
              {
                'put': {
                  method: 'PUT',
                  url: this.providerServicePath,
                  responseType: 'json'
                }
              });
    }
  ]);

})();
