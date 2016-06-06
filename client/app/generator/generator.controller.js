'use strict';
(function () {

  var generatorController = function generatorController($mdDialog, User, Auth,$cookies, $state,ToastFactory) {

    var vm = this;

    vm.UserName = '';

    /**
     * TODO - ##1<> temporary solution; need to find alternative of this hack;
     * @author - ks
     * @date - 23/3/16
     * @time - 12:12 PM
     */

    vm.isAdmin = false;

    if ($cookies.get('token')) {

      Auth.getCurrentUser().then(function (data) {


        vm.UserName = data.data.name;
        vm.isAdmin = data.data.isAdmin;
      });

    }


    vm.openAdminPanel = function () {
      $mdDialog.show({
        controller: 'adminController as vm',
        templateUrl: 'app/admin/admin.dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true

      });
    };



    vm.showLogin = function () {

      $mdDialog.show({
        controller: 'loginController as vm',
        templateUrl: 'app/login/login.dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true

      });
    };


    vm.showProfile = function () {
      $mdDialog.show({
        controller: 'leaderBoardController as vm',
        templateUrl: 'app/leader_board/lb.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        locals: {
          userName: vm.userName
        }

      });
    };

  };


  angular.module('coderDecoder2App').controller('generatorController', ['$mdDialog', 'User', 'Auth','$cookies','$state','ToastFactory', generatorController]);

})();
