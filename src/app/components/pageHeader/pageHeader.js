(function() {
  'use strict';

  angular
    .module('pageHeader', [
      'pageHeader.vm'
    ])
    .controller('PageHeaderCtrl', [
      '$state',
      'PageHeaderViewModel',
      function($state, PageHeaderViewModel) {
        //console.log($state.params);
        this.vm = PageHeaderViewModel;
        this.details = this.vm.getTitleObject($state.params);
      }
    ]);
})();
