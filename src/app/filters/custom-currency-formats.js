'use strict';

angular
  .module('careers')
  .filter('abbreviateUSD', function(){
      /* Example: $45K */
      return function(formattedNumber) {
        var si = ['K', 'M', 'G', 'T', 'P', 'H'];
        var exp = Math.floor(Math.log(formattedNumber) / Math.log(1000));
        var result = formattedNumber / Math.pow(1000, exp);
        if(formattedNumber < 1000) {
          result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
          return '$' + result;
        } else {
          result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
          return '$' + result + si[exp - 1];
        }
      };
    });
