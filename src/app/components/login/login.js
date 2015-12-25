(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name login
   * @description
   *
   *
   * The `login` module provides a reusable ui Login Authentication modal.
   *
   * See {@link login.LoginModal `open`} for usage.
   */
  angular.module('login', [
    'config.constants',
    'careersUser',
    'apolloAuthentication',
    'ui.bootstrap.modal',
    'ui.validate',
    'ui.router',
    'triggerChange',
    'focus-if'
  ])


  /**
   * @ngdoc controller
   * @name login.LoginMainCtrl
   *
   * @description
   * Login Main Controller - controls which mode user is in, login or register.
   *
   */
    .controller('LoginMainCtrl', [
      'showAccessMessage',

      function (showAccessMessage) {
        this.mode = 'login';
        this.showAccessMessage = showAccessMessage;

        this.go = function ($event, view) {
          $event.preventDefault();
          this.mode = view;
        };
      }
    ])

  /**
   * @ngdoc controller
   * @name login.LoginModalCtrl
   *
   * @description
   * Login Modal Controller - used by {@link login.LoginModal `open`}.
   *
   */
    .controller('LoginCtrl', [
      '$log',
      '$scope',
      'User',
      'Auth',
      '$state',
      '$location',
      'CONFIG',
      function ($log, $scope, User, Auth, $state, $location, CONFIG) {
        var ctrl = this;

        if (User.__toUrl) {
          $location.search('redirectTo', User.__toUrl);
        }

        ctrl.formValues = {};

        ctrl.loginNative = function () {
          ctrl.server = false;
          ctrl.errorAuth = false;

          if (ctrl.loginForm.$valid) {
            return Auth.login(ctrl.formValues).then(
              function (http) {
                if (http && http.data && http.data.authenticated && http.data.loginStatus === 'LOGGEDIN') {
                  return ctrl.complete();
                } else {
                  ctrl.errorAuth = true;
                }
              },
              function () {
                ctrl.server = true;
              }
            );
          } else {
            return false;
          }
        };

        // $scope.login = function (provider) {
        //   // store toUrl in local storage for later redirect after login (in app.js)
        //   if ($state.params.to) {
        //     localStorageService.set('social-to-url', $state.params.to.replace(/^\#/, ''));
        //   }

        //   // redirect to the url based on the provider
        //   $window.location.href = CONSTANTS[provider];
        // };

        ctrl.complete = function () {
          return User.reload()
            .then(function () {
              if (!CONFIG.config.accessRequired && angular.isFunction($scope.$close)) {
                $scope.$close();
              }
              else {
                var queryParams = $location.search();
                if (queryParams && queryParams.redirectTo) {
                  $location.url(queryParams.redirectTo);
                }
                else {
                  $state.go('auth.dashboard');
                }
              }
            });
        };

        ctrl.init = function () {
          if (User.isAuthenticated()) {
            ctrl.complete();
          }
        };

        // on start
        ctrl.init();
      }
    ])

  /**
   * @ngdoc service
   * @name login.LoginModal
   *
   * @description
   * Service to launch Login Modal as needed.
   * Only opens one login modal at a time.
   *
   */
    .factory('LoginModal', [
      '$uibModal',
      function ($uibModal) {
        var factory = this,
          modalOpen = false,
          modalPromise;

        factory.open = function (showAccessMessage) {
          var modalInstance;

          if (modalOpen && modalPromise) {
            return modalPromise;
          }

          modalInstance = $uibModal.open({
            templateUrl: 'app/components/login/loginModal-main.html',
            // size: 'lg',
            controller: 'LoginMainCtrl as main',
            resolve: {
              showAccessMessage: angular.identity.bind(this, showAccessMessage)
            }
          });

          modalOpen = true;

          modalPromise = modalInstance.result
            .finally(function () {
              modalOpen = false;
            });

          return modalPromise;
        };

        return factory;
      }
    ])

  /**
   * @ngdoc controller
   * @name login.RegisterModalCtrl
   *
   * @description
   * Login Modal Controller.
   *
   */
    .controller('RegisterCtrl', [
      '$q',
      '$log',
      '$scope',
      'User',
      'Auth',
      '$state',
      '$location',
      function ($q, $log, $scope, User, Auth, $state, $location) {
        var ctrl = this;
        var queryParams = $location.search();

        ctrl.formValues = {};
        if (queryParams.emailAddress) {
          ctrl.formValues.username = queryParams.emailAddress;
        }

        ctrl.register = function () {
          ctrl.alreadyExists = undefined;
          ctrl.errorReg = undefined;
          if (ctrl.regForm.$valid) {

            // email is required (same as username)
            ctrl.formValues.email = ctrl.formValues.username;

            // parse out preregistertoken if available on url and send it to service for registration
            var authzParams = '';
            if (queryParams.preregistertoken) {
              authzParams += 'preregistertoken=' + queryParams.preregistertoken;
            }

            return Auth.register(ctrl.formValues, authzParams)
              .then(function () {
                return User.reload()
                  .then(function () {
                    if (angular.isFunction($scope.$close)) {
                      $scope.$close();
                    }
                    else {
                      $state.go('auth.dashboard');
                    }
                  });
              },
              function (err) {
                $log.error('Error registering', err);

                switch(err.status) {
                  case 409: ctrl.alreadyExists = true;
                        break;
                  case 404: ctrl.errorRegMsg = 'Invalid token. Please use the link provided in the email to' +
                    ' register';
                        ctrl.errorReg = true;
                        break;
                  default: ctrl.errorRegMsg = 'There was a problem registering your user. Please try again.';
                        return $q.reject(err);
                }
              }
            );
          }
        };
      }
    ])
  /**
   * @ngdoc controller
   * @name login.loginModal-password.html
   *
   * @description
   * Forgot Password Modal Controller.
   *
   */
    .controller('ForgotPasswordCtrl', [
      '$q',
      '$log',
      '$scope',
      'User',
      'Auth',
      '$location',
      function ($q, $log, $scope, User, Auth, $location) {
        var ctrl = this;

        ctrl.inModal = function() {
          return angular.isFunction($scope.$close);
        };

        ctrl.formValues = {
          linkurl: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#/password-reset?token=${token}',
        };

        ctrl.password = function () {
          ctrl.success = false;
          ctrl.server = false;

          if (ctrl.passwordForm.$valid) {
            // copy username to email
            ctrl.formValues.email = ctrl.formValues.username;

            return Auth.forgotPassword(ctrl.formValues)
              .then(function () {
                ctrl.success = true;
              }, function (err) {
                $log.error('Failed to reset password:', err);
                if (err.status === 404) {
                  ctrl.server = true;
                }
              });
          }
        };
      }
    ])

    .controller('PasswordResetCtrl', [
      '$state',
      'Auth',
      'User',
      'LoginModal',
      '$q',
      '$log',
      'CONFIG',
      function ($state, Auth, User, LoginModal, $q, $log, CONFIG) {
        var ctrl = this;

        ctrl.formValues = {};
        ctrl.successfullyReset = false;
        ctrl.server = false;
        ctrl.accessRequired = CONFIG.config.accessRequired;

        ctrl.resetPassword = function () {
          if (ctrl.resetForm.$valid) {
            var params = {
              newpassword: ctrl.formValues.password,
              token: $state.params.token
            };

            return Auth.changePassword(params)
              .then(function () {
                ctrl.successfullyReset = true;
              }, function (err) {
                if (err.status === 400 &&
                      err.data && err.data.message &&
                      (err.data.message.indexOf('Token has expired') > -1 ||
                        err.data.message.indexOf('Invalid token') > -1)) {
                  $log.error('Rest password link has expired:', err);
                  ctrl.server = true;
                }
                else {
                  return $q.reject(err);
                }
              });
          }
        };
      }
    ]);

})();
