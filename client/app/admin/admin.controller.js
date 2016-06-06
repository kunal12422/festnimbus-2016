'use strict';
(function () {

  var adminController = function adminController(User,ToastFactory) {
    var vm = this;

    vm.user = {};

    vm.submit = function (user_details) {
      console.log(user_details);
      User.updateCoins(user_details).$promise.then(function (data) {
        ToastFactory.showToast(data.data);
        vm.user = {};
      });
    };

  };


  angular.module('coderDecoder2App').controller('adminController',['User','ToastFactory',adminController]);

})();
