'use strict';
(function () {

  var loginController = function loginController(Auth, ToastFactory, $state, $mdDialog, $timeout, ngProgressFactory) {

    var vm = this, temp;
    vm.user = {};
    vm.check = false;
    vm.topStatus = 'Login';
    vm.bottomStatus = 'Register';
    vm.isRegistering = false;

    vm.progressBar = ngProgressFactory.createInstance();

    /**
     * showing or hiding field;
     * swapping top and bottom status;
     */
    vm.wantsToRegister = function () {

      vm.isRegistering = !vm.isRegistering;

      temp = vm.topStatus;
      vm.topStatus = vm.bottomStatus;
      vm.bottomStatus = temp;
    };

    vm.submit = function (user) {
      vm.progressBar.start();

      if (vm.isRegistering) {

        Auth.createUser(user).then(function (data) {
          vm.progressBar.complete();
          ToastFactory.showToast(data.data);
          vm.topStatus = 'Login';
          vm.bottomStatus = 'Register';
          vm.isRegistering = false;


        }, function (data) {
          ToastFactory.showToast(data.status);
        })
      } else {
        Auth.login(user).then(function (data) {
          vm.progressBar.complete();

          ToastFactory.showToast('Hey! Welcome');
          $mdDialog.hide();
          $timeout(function () {
            $state.reload();
          }, 1000);

        }, function (data) {

          ToastFactory.showToast(data.status);
        });
      }

    };


  };


  angular.module('coderDecoder2App').controller('loginController', ['Auth', 'ToastFactory', '$state', '$mdDialog', '$timeout', 'ngProgressFactory', loginController]);

})();
