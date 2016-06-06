'use strict';


(function(){

  var BhramFactory = function($resource){



    return $resource('/api/bhram/:level/:index/:answer',
      { level :'@level', index:'@index', answer:'@answer'},
      {
        check: {
          method:'POST'
        },
        getLb: {
          method: 'GET'
        }
      });

  };

  angular.module('coderDecoder2App').factory('BhramFactory', ['$resource', BhramFactory]);

})();

