'use strict';

angular.module('careers', [
    'apolloAuthentication',
    'apolloProfile',
    'apolloValidation',
    'apolloAnalytics',
    'appliedJobsWidget',
    'bootstrap-has',
    'careersAutocomplete',
    'careersDropdown',
    'careersList',
    'careersRouting',
    'careersUser',
    'careerExploration',
    'cgBusy',
    'config.tenant',
    'config.uiTenant',
    'config.constants',
    'LocalStorageModule',
    'DashBoard',
    'Feedback',
    'FeedbackUOPX',
    'FeedbackFormViewModel',
    'FeedbackFormViewModelUOPX',
    'pageHeader',
    'layout',
    'header',
    'navigation',
    'milestone',
    'military',
    'JobApply',
    'JobApply.vm',
    'jobPlaylist',
    'jobsLikeThisWidget',
    'jobsDashboard',
    'JobSearch',
    'jobSearchForm',
    'jobSearchHistoryWidget',
    'labormarketServices.career.ronets',
    'labormarketServices.locationservices',
    'interestSurvey',
    'interestSurveyResults',
    'skillBuilder',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'nzScrollbar',
    'savedJobsWidget',
    'ui.bootstrap',
    'ui.router',
    'ui.select',
    'resumeBuilder',
    'apolloAngularResumeServices.config',
    'apolloJobServices.config',
    'labormarketServices.config',
    'angularApolloNotificationServices.config',
    'interviewPreparation',
    'wordUtil',
    'ncy-angular-breadcrumb',
    'emailAlertsWidget',
    'emailAlertsDashWidget',
    'uiError',
    'exceptionLogging',
    'emailAlertsManager',
    'resumeErrors',
    'coverLetter',
    'http-auth-interceptor',
    'ui.router.title',
    'ui.router.grant'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'uiSelectConfig',
    '$sceDelegateProvider',
    'cgBusyProfilesProvider',
    'localStorageServiceProvider',
    '$anchorScrollProvider',
    'tenant',
    'uiTenant',
    'CONSTANTSProvider',
    '$breadcrumbProvider',
    function($stateProvider, $urlRouterProvider, uiSelectConfig, $sceDelegateProvider, cgBusyProfilesProvider, localStorageServiceProvider, $anchorScrollProvider, tenant, uiTenant, CONSTANTSProvider, $breadcrumbProvider) {

      //ui-select default theme
      uiSelectConfig.theme = 'bootstrap';

      // trust external sites in iframes
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // smarterer skills assessments
        'https://smarterer.com/**',
        // Optimal resume.
        'https://api.optimalresume.com/**',
        // Adobe tracking
        'https://assets.adobedtm.com/**'
      ]);

      // set the tenant constant from config.tenant
      CONSTANTSProvider.setConstant('tenant', tenant);
      // sets the uiTenant constant from config.tenant
      CONSTANTSProvider.setConstant('uiTenant', uiTenant);

      // Set storage type to sessionStorage for localStorageService
      localStorageServiceProvider.setStorageType('sessionStorage');
      // set key name prefix in session storage
      localStorageServiceProvider.setPrefix('cgs');

      // do not automatically scroll on $location.hash() change
      $anchorScrollProvider.disableAutoScrolling();

      // set breadcrumb template (with ARIA)
      $breadcrumbProvider.setOptions({
        templateUrl: 'app/components/breadcrumb/breadcrumb.html'
      });

      $stateProvider
        .state('auth', {
          abstract: true,
          templateUrl: 'app/components/layout/layout.html',
          resolve: {
            'auth': ['grant', 'User', '$location', '$rootScope',
              function(grant, User, $location, $rootScope) {
                $rootScope.redirect = true;
                var toUrl = $location.url();
                // Store the url params on to user object for redirect purposes only.
                if (!User.__toUrl) {
                  Object.defineProperty(User, '__toUrl', {
                    configurable: true,
                    get: function() {
                      return toUrl;
                    }
                  });
                }

                return User.get(true)
                  .then(function() {
                    return grant.only({
                      test: 'member',
                      state: 'un-auth.login'
                    });
                  });
              }
            ]
          },
          controller: ['$rootScope', 'User', 'CONSTANTS',
            function($rootScope, User, CONSTANTS) {
              if (User.__toUrl) {
                delete User.__toUrl;
              }

              $rootScope.user = User;
              $rootScope.uiTenant = CONSTANTS.uiTenant;
            }
          ]
        })
        .state('auth.dashboard', {
          url: '/',
          views: {
            'main@auth': {
              templateUrl: 'app/components/dashboard/dashboard.html'
            }
          },
          resolve: {
            breadCrumbData: ['$rootScope',
              function($rootScope) {
                /*Set flag ,CAR 396*/
                $rootScope.isTool = false;
                $rootScope.isDashBoardView = true;
                $rootScope.isMilestoneView = false;

              }
            ]
          },
          ncyBreadcrumb: {
            label: 'Career Guidance Dashboard'
          }
        })
        .state('auth.tools', {
          url: '/tools/:toolId?id&header&from&fromAnchor',
          views: {
            'navigation@auth': {
              templateUrl: function() {
                return 'app/components/navigation/floating.html';
              }
            },
            'pageHeader@auth': {
              templateUrl: function() {
                return 'app/components/pageHeader/pageHeader.html';
              }
            },
            'main@auth': {
              templateUrl: function(stateParams) {
                // dynamic filename
                return 'app/tools/' + stateParams.toolId + '/' + stateParams.toolId + '.html';
              }
            }
          },
          params: {
            tab: '' // starting tab on pages with tabs
          },
          resolve: {
            breadCrumbData: ['$stateParams', '$rootScope', 'CONFIG',
              function($stateParams, $rootScope, CONFIG) {
                var toolFind = CONFIG.tools.find(function(tool) {
                  return 'tools.' + $stateParams.toolId === tool.identifier;
                });

                $rootScope.toolTitle = (toolFind && toolFind.title ? toolFind.title : 'Unknown');
                //openTool in ModalPopUP Flags
                $rootScope.isTool = true;
                $rootScope.isMilestoneView = false;
              }
            ]
          },
          ncyBreadcrumb: {

            parent: function(scope) {
              // dynamic parent
              return scope.breadcrumbParent && !scope.breadcrumbParent.startsWith('auth.tools') ? scope.breadcrumbParent : 'auth.dashboard';

            }
          }
        })
        // child view of tool
        .state('auth.tools.view', {
          url: '/view/:viewId?notificationid',
          views: {
            'main@auth': {
              templateUrl: function(stateParams) {
                // dynamic filename for child view based on toolId and viewId
                // e.g. for viewId resumeEditor and toolId resumeBuilder, filename is
                // app/tools/resumeBuilder/resumeBuilder.editor.html
                return 'app/tools/' + stateParams.toolId + '/' + stateParams.toolId + '.' + stateParams.viewId + '.html';
              }
            }
          },
          resolve: {
            breadCrumbData: ['$stateParams', '$rootScope', 'WordUtil',
              function($stateParams, $rootScope, WordUtil) {
                $rootScope.toolView = WordUtil.camelCaseToWords($stateParams.viewId);
              }
            ]
          },
          ncyBreadcrumb: {
            label: '{{toolTitle}} {{toolView}}'
          }
        })
        // child view of tool
        // .state('auth.toolsDeepLinkedChild', {
        //   url: '/tools-child/:toolId/view/:viewId?id',
        //   views: {
        //     'main@auth': {
        //       templateUrl: function(stateParams) {
        //         // dynamic filename for child view based on toolId and viewId
        //         // e.g. for viewId resumeEditor and toolId resumeBuilder, filename is
        //         // app/tools/resumeBuilder/resumeBuilder.editor.html
        //         return 'app/tools/' + stateParams.toolId + '/' + stateParams.toolId + '.' + stateParams.viewId + '.html';
        //       }
        //     }
        //   },
        //   resolve: {
        //     breadCrumbData: ['$stateParams', '$rootScope', 'CONFIG', 'WordUtil',
        //       function($stateParams, $rootScope, CONFIG, WordUtil) {
        //         var toolFind = CONFIG.tools.find(function(tool) {
        //           return 'tools.' + $stateParams.toolId === tool.identifier;
        //         });
        //         $rootScope.toolTitle = (toolFind && toolFind.title ? toolFind.title : 'Unknown');
        //         $rootScope.toolView = WordUtil.camelCaseToWords($stateParams.viewId);
        //       }
        //     ]
        //   },
        //   ncyBreadcrumb: {
        //     label: '{{toolTitle}} {{toolView}}',
        //     parent: function(scope) {
        //       // dynamic parent
        //       return scope.breadcrumbParent ? scope.breadcrumbParent : 'auth.dashboard';
        //     }
        //   }
        // })
        .state('auth.milestones', {
          url: '/milestones/milestone-:milestoneId',
          views: {
            'navigation@auth': {
              templateUrl: 'app/components/navigation/floating.html'
            },
            'main@auth': {
              templateUrl: 'app/components/milestones/milestone.html'
            }
          },
          resolve: {
            breadCrumbData: ['$stateParams', '$rootScope', 'CONFIG',
              function($stateParams, $rootScope, CONFIG) {
                var milestoneFind = CONFIG.milestones.find(function(milestone) {
                  return $stateParams.milestoneId == milestone.orderSequence; // jshint ignore:line
                });
                $rootScope.milestoneTitle = (milestoneFind && milestoneFind.title ? milestoneFind.title : 'Milestone');
                $rootScope.milestoneIdx = $stateParams.milestoneId;
                $rootScope.isTool = false;
                $rootScope.isMilestoneView = true;
                $rootScope.isDashBoardView = false;
              }
            ]
          },
          ncyBreadcrumb: {
            parent: 'auth.dashboard',
            label: 'Milestone {{milestoneIdx}}'
          },
          pageTitle: 'Milestone {{milestoneIdx}}: {{milestoneTitle}}'
        })
        /*
         * data/configId should match tenant config.json 'identifier' field
         * configId should match state name minus the 'auth' prefix
         * state/configId format should be parent.component (component should not have any special characters, etc.)
         * configId is inherited to children states, for instance auth.tools.jobsearch.results would inherit auth.tools.jobsearch's config, if the config is not overwritten
         */
        .state('auth.interestSurvey', {
          url: '/survey?header&from&fromAnchor&restart',
          views: {
            'main@auth': {
              templateUrl: 'app/components/interestSurvey/interestSurvey.html'
            }
          },
          resolve: {
            breadCrumbData: ['$rootScope',
              function($rootScope) {
                $rootScope.isTool = true;
                $rootScope.isMilestoneView = false;
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'Interest Survey',
            // parent: 'auth.dashboard'
            parent: function(scope) {
              // dynamic parent
              return scope.breadcrumbParent ? scope.breadcrumbParent : 'auth.dashboard';
            }
          }
        })
        .state('auth.interestSurvey.results', {
          url: '/results',
          views: {
            'main@auth': {
              templateUrl: 'app/components/interestSurvey/interestSurveyResults.html'
            }
          },
          resolve: {
            breadCrumbData: ['$rootScope',
              function($rootScope) {
                $rootScope.isTool = true;
                $rootScope.isMilestoneView = false;
              }
            ]
          },
          ncyBreadcrumb: {
            parent: 'auth.interestSurvey',
            label: 'Interest Survey Results'
          }
        })
        .state('auth.styles', {
          url: '/style-guide',
          views: {
            'main@auth': {
              templateUrl: 'app/styles/style-guide.html'
            }
          },
          pageTitle: 'Style Guide'
        })
        .state('un-auth', {
          abstract: true,
          templateUrl: 'app/components/layout/layout.html',
          //resolve: {
          //  auth: ['User',
          //    function (User) {
          //      //$state.current.redirect = false;
          //      return angular.isObject(User.$authPromise) ? User : User.get(true);
          //    }
          //  ]
          //},
          controller: ['$rootScope', 'User', 'CONSTANTS',
            function($rootScope, User, CONSTANTS) {
              $rootScope.redirect = false;
              $rootScope.user = User;
              $rootScope.uiTenant = CONSTANTS.uiTenant;
            }
          ]
        })
        .state('un-auth.login', {
          url: '/login?token',
          pageTitle: 'Sign in',
          views: {
            'pageHeader@un-auth': {
              templateUrl: 'app/components/pageHeader/pageHeader.html'
            },
            'main@un-auth': {
              templateUrl: 'app/components/login/login.html'
            }
          }
        })
        .state('un-auth.registration', {
          url: '/registration',
          pageTitle: 'Registration',
          views: {
            'pageHeader@un-auth': {
              templateUrl: 'app/components/pageHeader/pageHeader.html'
            },
            'main@un-auth': {
              templateUrl: 'app/components/login/register.html'
            }
          }
        })
        .state('un-auth.reset-password', {
          url: '/password-reset?token',
          pageTitle: 'Reset Password',
          views: {
            'pageHeader@un-auth': {
              templateUrl: 'app/components/pageHeader/pageHeader.html'
            },
            'main@un-auth': {
              templateUrl: 'app/components/login/password-reset.html'
            }
          }
        })
        .state('un-auth.forgot-password', {
          url: '/forgot-password?token',
          pageTitle: 'Forgot Password',
          views: {
            'pageHeader@un-auth': {
              templateUrl: 'app/components/pageHeader/pageHeader.html'
            },
            'main@un-auth': {
              templateUrl: 'app/components/login/forgotPassword.html'
            }
          }
        })
        .state('un-auth.emailAlertsConfirmation', {
          url: '/manage-alerts',
          views: {
            'main@un-auth': {
              templateUrl: 'app/components/emailAlertsConfirmation/emailAlertsConfirmation.html'
            }
          },
          pageTitle: 'Manage Job Alerts'
        });

      $urlRouterProvider.otherwise('/');

      // setup cgBusyProfiles
      cgBusyProfilesProvider.addProfile('default', {
        templateUrl: 'app/components/busy/busy.html',
        wrapperClass: 'apt-busy',
        message: '',
        inline: false,
        inlineReplace: false
      });
      cgBusyProfilesProvider.addProfile('fixedCenter', {
        wrapperClass: 'apt-busy-fixed-center'

      });
      cgBusyProfilesProvider.addProfile('fixedCenterSmall', {
        wrapperClass: 'apt-busy-fixed-center-small'
      });
      cgBusyProfilesProvider.addProfile('inlineReplace', {
        wrapperClass: 'apt-busy-inline-replace',
        inline: true,
        inlineReplace: true
      });
      cgBusyProfilesProvider.addProfile('inlineReplaceSmall', {
        wrapperClass: 'apt-busy-inline-replace-small',
        inline: true,
        inlineReplace: true
      });
      cgBusyProfilesProvider.addProfile('inline', {
        wrapperClass: 'apt-busy-inline',
        inline: true
      });
      cgBusyProfilesProvider.addProfile('inlineSmall', {
        wrapperClass: 'apt-busy-inline-small',
        inline: true
      });
      cgBusyProfilesProvider.addProfile('backdropOnly', {
        wrapperClass: '',
        backdrop: true
      });
    }
  ])

// setup cg-busy defaults (same as default profile)
.value('cgBusyDefaults', {
  templateUrl: 'app/components/busy/busy.html',
  wrapperClass: 'apt-busy',
  message: '',
  errorTemplateUrl: 'app/components/busy/busy-error.html',
  inline: false,
  inlineReplace: false
})

// add global exception handler
// all unhandled exceptions will be sent to ExceptionLogging
// ExceptionLogging will send to audit-service for as necessary
.config(function($provide) {
  var exceptionLogging;
  $provide.decorator('$exceptionHandler', ['$delegate', '$injector', '$window',
    function($delegate, $injector, $window) {
      return function(exception, cause) {
        exceptionLogging = exceptionLogging || $injector.get('ExceptionLogging');
        exceptionLogging.log(exception, cause);

        // if we are in test mode percolate the exception
        if ($window.__karma__) {
          $delegate(exception, cause);
        }
      };
    }
  ]);
})

.run([
  '$rootScope',
  '$state',
  '$window',
  '$document',
  '$injector',
  '$log',
  'DynamicRouting',
  'tenant',
  'apolloAngularResumeServices.config',
  'apolloJobServices.config',
  'labormarketServices.config',
  'apolloSurveyServices.config',
  'angularApolloNotificationServices.config',
  'grant',
  function($rootScope, $state, $window, $document, $injector, $log, DynamicRouting, tenant, resumeServicesConfig, jobServicesConfig, labormarketServicesConfig, surveyServicesConfig, notificationServicesConfig, grant) {
    // permission test

    grant.addTest('member', function() {
      var User = $injector.get('User');
      var CONFIG = $injector.get('CONFIG');
      return CONFIG.config.accessRequired ? User.isAuthenticated() : true;
    });

    // set tenant on services
    resumeServicesConfig.tenant = jobServicesConfig.tenant = labormarketServicesConfig.tenant = surveyServicesConfig.tenant = notificationServicesConfig.tenant = tenant;


    var history = [];
    var anchor;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams /*, fromState, fromParams*/ ) {
      if (!DynamicRouting.isStateAllowed(toState, toParams)) {
        $log.warn('State is not allowed', toState.name, toParams);
        event.preventDefault();
      }

      /*
          Watch toParams for milestone activity, specifically activation of a
          tool from a milestone or a milestone accordion state.
          Push the milestone to a ctrl.history array and notate accordion
          state if applicable.
      */
      if (Object.keys(toParams).length) {
        if (toParams.fromAnchor) {
          anchor = toParams.fromAnchor;
        }
        if (toParams.milestoneId && toParams.milestoneId !== '') {
          history.push(toParams.milestoneId);
        }
      } else {
        history = [];
      }

    });

    $rootScope.modalClose = function() {
          /*
          Upon closing the modal, this function looks at the last entry of the
          $rootScope.history array and uses that as the milestone to return to.
          If $rootScope.anchor exists, it will open that particular milestone accordion.
          If neither exist, it's time to go back to the dashboard.
          */
          if (history.length) {
            if (history.length > 1) {
              history.splice(0, history.length - 1);
            }
            if (anchor) {
              $state.go('auth.milestones', {
                milestoneId: history[0],
                '#': anchor
              });
            } else {
              $state.go('auth.milestones', {
                milestoneId: history[0]
              });
            }
          } else {
            $state.go('auth.dashboard');
          }
        };

    $rootScope.back = function() {
      $window.history.back();
    };

    // // Handle the auto transitions of views if one is missing.
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      var log = error.type === 'grant.rejected' ? $log.info : $log.error;

      log('Error changing state to', toState.name, error);

      event.preventDefault();
      // var $state = $injector.get('$state'),
      //   ErrorParser = $injector.get('ErrorParser'),
      //   errorMsg = ErrorParser.parseError(error),
      //   stateUrl = $state.href(toState, toParams);

      // return $state.go('error', {
      //   errorMsg: errorMsg,
      //   to: stateUrl
      // });
    });

    function launchLoginOnAccessError() {
      var User = $injector.get('User'),
        authService = $injector.get('authService');
      User.launchLoginModal(null, true)
        .then(angular.noop, authService.loginCancelled);
    }

    $rootScope.$on('event:auth-loginRequired', function() {
      $log.error('Access required, refreshing user and calling login modal');
      var CONFIG = $injector.get('CONFIG');
      if ($rootScope.$showSiteCurtain) {
        $rootScope.$showSiteCurtain = false;
      }

      if ($rootScope.redirect) {
        if (CONFIG.config.accessRequired) {
          $state.go('un-auth.login');
        } else {
          launchLoginOnAccessError();
        }
      }
    });
    $rootScope.$on('event:auth-forbidden', function() {
      $log.error('Access forbidden, refreshing user and calling login modal');
      ///api/resume-service/1/uopx/users/apt_54cca31f-41dc-42cf-9a40-bb4ce4f1d819/documen
      var CONFIG = $injector.get('CONFIG');
      if ($rootScope.$showSiteCurtain) {
        $rootScope.$showSiteCurtain = false;
      }

      if ($rootScope.redirect) {
        if (CONFIG.config.accessRequired) {
          $state.go('un-auth.login');
        } else {
          launchLoginOnAccessError();
        }
      }
    });

  }
]);
