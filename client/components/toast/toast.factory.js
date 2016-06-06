'use strict';

(function () {

  var ToastFactory = function ToastFactory($mdToast,$state) {

    /**
     * show-toast function
     * @param message
     */

    var showToast = function showToast(message) {

      var toast = $mdToast.simple()
        .content(message)
        .position('bottom right')
        .hideDelay(5000);

      $mdToast
        .show(toast)
        .then(function(success){


          },
          function(err){

          });

    };

    return {
      showToast: showToast
    }

  };

  angular.module('coderDecoder2App').factory('ToastFactory', ['$mdToast','$state', ToastFactory]);

})();
