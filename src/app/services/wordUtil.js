/**
 * Parses and error object (e.g. from http) and returns a human readable version
 */
(function() {
  'use strict';

  angular
    .module('wordUtil', [])
    .factory('WordUtil', function() {
      function capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
      }
      function camelCaseToWords(name) {
        var words = name.match(/[A-Za-z][a-z]*/g);

        return words.map(capitalizeWord).join(' ');
      }

      return {
        camelCaseToWords: camelCaseToWords,
        capitalizeWord: capitalizeWord
      };
    });
})();
