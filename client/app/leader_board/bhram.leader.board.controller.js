'use strict';
(function () {

  var BhramleaderBoardController = function BhramleaderBoardController(BhramFactory, User) {
    var vm = this;
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
      name: 'Score',
      field: 'bhram_leaderboard_score'
    }];

    vm.userScore = null;
    User.get().$promise.then(function (data) {
      vm.userScore = data.data.bhram_leaderboard_score;
    });

    BhramFactory.getLb().$promise.then(function (data) {

      _.forEach(data.data, function (arg) {

        var fields = {
          rollno: arg.rollno,
          name: arg.name,
          bhram_leaderboard_score: arg.bhram_leaderboard_score

        };
        vm.content.push(fields);

      });

    });

    vm.custom = {

      rollno: 'bold',
      name: 'italic',
      bhram_leaderboard_score: 'black'

    };

    vm.sortable = ['rollno', 'name', 'bhram_leaderboard_score'];

    vm.count = 3;

  };


  angular.module('coderDecoder2App').controller('BhramleaderBoardController', ['BhramFactory','User',BhramleaderBoardController]);

})();
