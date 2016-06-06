'use strict';
(function () {

  var iEventsController = function iEventsController($window, $state,ToastFactory,$cookies) {
    var vm = this;

    vm.iEvents = [{
      'name':'GAMES OF CODES 3.0',
      'team':'Team .EXE',
      'link':'https://www.hackerearth.com/game_of_codes'
    },{
      'name':'FADING MOMENTS',
      'team':'Pixonoids',
      'link':'https://www.facebook.com/Pixonoids'
    },{
      'name':'Concurso‬',
      'team':'C-Helix',
      'link':'https://www.facebook.com/C-Helix-383420788341408'
    }];

    vm.checkLoginForEvent = function () {
   
      if($cookies.get('token')){
        $state.go('online');
      }else {
        ToastFactory.showToast('Login to Continue');
      }
    };

  };


  angular.module('coderDecoder2App').controller('iEventsController', ['$window','$state','ToastFactory','$cookies',iEventsController]);

})();
