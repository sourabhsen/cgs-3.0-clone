(function(angular) {
  'use strict';

    // initialize object right since analytics is looking for it
  window.apolloAnalytics = {}; // jshint ignore:line

  angular.module('apolloAnalytics', [
      'config.constants'
    ])
    /**
     * @ngdoc factory
     * @name BootcampAnalytics
     * @function
     *
     * @description
     * Creates and Updates an Analytics Javascript Object
     * apolloAnalytics.pageDetails = {
     * title: '',    *page title
     * name: '',    *page name - for careerbootcamp this would be the value which appears after the /#/
     * path: '',    *full url path - this would be everything after the .com
     * pathFormatted: '',    *this is likely just the same as page name, unless you have things like /#/apply/new, in which case remove the #, and convert the slashes to colons
     * pathAbsolute: '',    *this can pretty much be the same thing as the path
     * template:'',    *template name if you have them
     * version: '',    *page version id - if you have that
     * timeGenerated:'',    *time when server generated the page
     * server:'',    *server name/id
     * }
     * apolloAnalytics.targetingDetails = {
     * tenantName:'CareerBootcamp',    *whatever you want to call this as a tenant
     * collegeName:'',    *these next ones may not apply unless you are showing courses to sign up for similar to Balloon...
     * collegeId:'',
     * programId:'',
     * courseTitle:'',
     * courseName:'',
     * courseId:'',
     * coursePrefix:'',
     * }
     * apolloAnalytics.marketingTaxonomy = {
     * combined:'||||||||',    *any value on the url passed for channel, cid, provider, pvp_campaign, keyword, creative_desc, destination, initiative, and marketing program – these need to be pipe delimited - ALSO do not pass a string of empty pipes if channel does not exist on the URL
     * channel:'',   *the query param value for channel
     * cid:'',
     * provider:'',
     * pvp_campaign:'',
     * keyword:'',
     * creative_desc:'',
     * destination:'',
     * initiative:'',
     * mktg_prog:'',
     * }
     *
     */
    .run(['$rootScope', '$location', '$timeout', 'ApolloAnalytics',
      function($rootScope, $location, $timeout, ApolloAnalytics) {

        // update analytics on state change
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
          // update analytics info
          $timeout(function() {
            ApolloAnalytics.update(toState, toParams, $location);
          });
        });
      }
    ])

  .factory('ApolloAnalytics', [
    '$location',
    '$window',
    '$parse',
    'CONSTANTS',
    'CONFIG',
    function($location, $window, $parse, CONSTANTS, CONFIG) {
      var trackingTenantParser = $parse('config.tracking.tenant');

      return {
        update: function(toState, toParams) {

          // obtain tenant from CONFIG.config.tracking.tenant if available,
          // otherwise use CONSTANTS.tenant
          var trackingTenant = trackingTenantParser(CONFIG) || CONSTANTS.tenant;

          // skip any ignore analytics
          if (toState.analytics && toState.analytics.ignore) {
            return;
          }

          // Page Name
          var pageName = '';
          var counter = 0; 
          angular.forEach(toParams, function(value) {
            if (!angular.isUndefined(value)) {
              if (counter !== 0) {
                pageName = pageName + ' ';
              }
              pageName = pageName + value;
            }
            counter++;
          });

          if (pageName === '') {
            pageName = toState.url.substring(1);
          }

          // Update Object
          // remove all optional params (per Tom)
          $window.apolloAnalytics.pageDetails = {
            title: pageName,
            name: $location.path().replace(/\?.*?$/, ''),
            path: $location.url().replace(/\?.*?$/, ''),
            pathFormatted: $location.url().replace(/\?.*?$/, '').replace(/\/|#/g, ':'),
            pathAbsolute: $location.absUrl().replace(/\?.*?$/, ''),
            template: toState.name
          };

          $window.apolloAnalytics.targetingDetails = {
            tenantName: trackingTenant
          };

          if ($window._satellite) {
            $window._satellite.track('pageview');
          }

        }
      };
    }
  ]);
})(angular);
