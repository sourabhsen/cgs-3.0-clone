(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name profile
   * @requires $resource, CONSTANTS
   *
   * @description
   * Factory to retrieve profile information
   * built-in SAVE is overridden to use PUT instead of POST
   *
   * Add query param includeStudentPrograms=true for student programs
   *
   */
  angular.module('apolloProfile', ['config.constants', 'ngResource'])
    .factory('Profile', ['$resource',
      'CONSTANTS',
      function($resource, CONSTANTS) {
        this.profileServicePath = '/api/profile-service/1/:tenant/profiles/:profileId';
        return $resource(this.profileServicePath, {
          tenant: CONSTANTS.tenant,
          profileId: '@profileId',
          includeStudentPrograms: true
        }, {
          save: {
            method: 'PUT'
          },
          getPublic: {
            method: 'GET',
            url: '/api/profile-service/1/:tenant/profiles/public',
          }
        });

        //     this.resourceToReturn = $resource(this.profileServicepath, {
        //       id: '@id'
        //     }, {
        //       'getUserProfileData': {
        //         method: 'GET',
        //         url: this.profileServicepath + ':id',
        //         responseType: 'json'
        //       }
        //     });
        //     return this.resourceToReturn;
        //   }
        // ])
        // .factory('ProfileStudentPrograms', ['$resource',
        //   'CONSTANTS',
        //   function ProfileStudentPrograms($resource, CONSTANTS) {
        //     this.tenant = CONSTANTS.tenant;
        //     this.profileServicepath = '/api/profile-service/1/' + this.tenant + '/profiles/';
        //     this.resourceToReturn = $resource(this.profileServicepath, {
        //       id: '@id',
        //       programs: '?includeStudentPrograms=true'
        //     }, {
        //       'getUserProfileData': {
        //         method: 'GET',
        //         url: this.profileServicepath + ':id' + ':programs',
        //         responseType: 'json'
        //       }
        //     });
        //     return this.resourceToReturn;
        //   }
        // ]);
      }
    ]);
})();
