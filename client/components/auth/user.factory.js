'use strict';


(function () {

  var User = function ($resource) {


    return $resource('/api/user/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        params: {
          id: 'profile'
        }
      },
      getLb: {
        method: 'GET',
        params: {
          id: 'glb'
        }
      },
      update: {
        method: 'PUT'
      },
      updateCoins: {
        method: 'PUT',
        params: {
          id: 'update-coins'
        }
      }
    });


  };

  angular.module('coderDecoder2App').factory('User', ['$resource', User]);

})();
