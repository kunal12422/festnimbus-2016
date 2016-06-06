'use strict';
(function () {

  var onlineEventsController = function onlineEventsController($mdBottomSheet, $mdSidenav, $mdDialog, BhramFactory, $cookies, Auth, ToastFactory, $state, $sce) {







    var vm = this;
    vm.bhram = {};
    vm.activity = [];
    vm.completed = [];
    vm.raise = false;
    vm.defaultLevel = 'first';

    if ($cookies.get('token')) {


      Auth.getCurrentUser().then(function (data) {

        vm.UserName = data.data.name;
        vm.UserEmail = data.data.email;

        _.forEach(data.data.bhram_level_status, function (arg) {

          var fields = {
            level: arg.level,
            index: arg.index

          };
          vm.completed.push(fields);

        });

      });

    }

    vm.checkIfDone = function (level, index) {


      if (_.result(_.find(vm.completed, {'level': level, 'index': index}), 'level')) {
        return true;
      } else {
        return false;
      }

    };
    vm.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    BhramFactory.get({level:vm.defaultLevel }).$promise.then(function (data) {

      _.forEach(data.data, function (arg) {

        var fields = {
          hints: arg.hints,
          question: arg.question,
          rules: arg.rules,
          level: arg.level,
          index: arg.index

        };
        vm.activity.push(fields);

      });

    });


    vm.postAnswer = function (event, level, index) {


    if(vm.bhram.answer){
      BhramFactory.check({level: level, index: index, answer: vm.bhram.answer}).$promise.then(function (data) {




        vm.countLeft = 5 - data.countLeft;

        Auth.getCurrentUser().then(function (data) {



          _.forEach(data.data.bhram_level_status, function (arg) {

            var fields = {
              level: arg.level,
              index: arg.index

            };
            vm.completed.push(fields);

          });

        });
        vm.bhram.answer = '';


        if(data.status ==='level5_save'){
          vm.raised_index = parseInt(data.index,10);
          vm.raise = true;
          vm.response = $sce.trustAsHtml('You are left with ' + vm.countLeft + ' submission(s)!');
        }
        ToastFactory.showToast(data.data);
      });
    }


    };
    vm.menu = [
      {
        link: 'generator.home',
        title: 'Home',
        icon: 'dashboard'
      },
      {
        link: 'generator.events.tiles',
        title: 'Events',
        icon: 'group'
      },
      {
        link: 'generator.home',
        title: 'Workshops',
        icon: 'message'
      }
    ];
    vm.admin = [

      {
        link: '',
        title: 'Logout',
        icon: 'touch_app'
      }
    ];


    vm.logout = function () {

      Auth.logout();
      $state.go('generator.home');
    };

    vm.moveToLevel = function (level) {
      BhramFactory.get({level:level }).$promise.then(function (data) {
      if(data.status === 'cannot_proceed_furthur' || data.status === 'not_available'){
        ToastFactory.showToast(data.data);
      }else{
        vm.activity = [];
        vm.defaultLevel = level;
        _.forEach(data.data, function (arg) {

          var fields = {
            hints: arg.hints,
            question: arg.question,
            rules: arg.rules,
            level: arg.level,
            index: arg.index

          };
          vm.activity.push(fields);

        });
      }


      });
    };


    vm.bhramLeaderBoard = function () {
      $mdDialog.show({
        controller: 'BhramleaderBoardController as vm',
        templateUrl: 'app/leader_board/bhram.lb.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        locals: {
          userName: vm.userName
        }

      });
    }
  };


  angular.module('coderDecoder2App')
    .controller('onlineEventsController', ['$mdBottomSheet', '$mdSidenav', '$mdDialog', 'BhramFactory', '$cookies', 'Auth', 'ToastFactory','$state','$sce', onlineEventsController])
    ;

})();
