(function () {
  'use strict';

  angular.module('appliedJobsViewModel', [
    'apolloJobServices.activity.tracker',
    'config.constants'
  ])
    .factory('AppliedJobsViewModel', [
      'ActivityTracker',
      'CONFIG',
      'User',
      function (ActivityTracker, CONFIG, User) {
        var vm = {
          appliedJobsPromise: null,
          dashboardPageSize: CONFIG.config.dashboardResults,
          widgetResults: CONFIG.config.widgetResults,
          getApplicationStatuses: function () {
            vm.appliedJobsPromise = ActivityTracker.getApplicationStatuses().then(function (data) {
              return data;
            }, function () {
              vm.noAppliedResults = true;
            });
            return vm.appliedJobsPromise;
          },
          noAppliedResults: function () {
            console.log('error');
          },
          changeStatus: function (item, obj) {
            var request = {
              profileId: User.profileId,
              id: obj.id,
              applyStatus: item
            };
            vm.statusUpdatePromise = ActivityTracker.updateApplication(request);
            return vm.statusUpdatePromise;
          }
        };
        return vm;
      }
    ]);
})();
