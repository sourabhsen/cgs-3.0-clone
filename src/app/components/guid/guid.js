(function() {
  'use strict';

  angular.module('guid', [])

  .factory('GUID', function() {
    return {
      // this pattern was taken from http://guid.us/GUID/JavaScript
      'S4': function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); // jshint ignore:line
      },
      'create': function() {
        return (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
      }
    };
  });

})();
