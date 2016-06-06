'use strict';


(function(){

  var DataFactory = function($resource){



    return $resource('/api/teams/:team/:event',
      { team :'@team', event:'@event'});


  };

  angular.module('coderDecoder2App').factory('DataFactory', ['$resource', DataFactory]);

})();
