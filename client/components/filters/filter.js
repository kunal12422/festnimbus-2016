'use strict';
(function () {


  angular.module('coderDecoder2App').filter('startFrom', function (){

    return function (input,start) {
      start = +start;
      return input.slice(start);
    };

  });
  
})();
