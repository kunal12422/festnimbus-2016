'use strict';
(function () {

  var leaderBoardController = function leaderBoardController(userName, Auth, $state, $mdDialog, $timeout, User) {
    var vm = this;


    vm.userCoins = {};
    User.get().$promise.then(function (data) {
      vm.userCoins.gold_coins = data.data.gold_coins;
      vm.userCoins.silver_coins = data.data.silver_coins;
    });


    vm.userName = userName;
    vm.content = [];

    vm.headers = [{
      name: '#',
      field: 'rank'
    }, {
      name: 'Roll Number',
      field: 'rollno'
    }, {
      name: 'Name',
      field: 'name'
    }, {
      name: 'Gold Coins',
      field: 'gold_coins'
    }, {
      name: 'Silver Coins',
      field: 'silver_coins'
    }];


    User.getLb().$promise.then(function (data) {
      
      _.forEach(data.data, function (arg) {

        var fields = {
          rollno: arg.rollno,
          name: arg.name,
          gold_coins: arg.gold_coins,
          silver_coins: arg.silver_coins
        };
        vm.content.push(fields);

      });

    });


    vm.custom = {

      rollno: 'bold',
      name: 'italic',
      gold_coins: 'gold',
      silver_coins: 'silver'
    };

    vm.sortable = ['rollno', 'name', 'gold_coins', 'silver_coins'];

    vm.count = 4;


    vm.logout = function () {
      Auth.logout();

      $mdDialog.hide();
      $timeout(function () {
        $state.reload();
      }, 1000);

    }

  };


  angular.module('coderDecoder2App').controller('leaderBoardController', ['userName', 'Auth', '$state', '$mdDialog', '$timeout', 'User', leaderBoardController]);

})();
