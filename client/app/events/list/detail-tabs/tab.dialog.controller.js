'use strict';
(function(){

  var tabDialogController = function tabDialogController(event, teamName,shortDescription,longDescription,contact,rules,link, User,ToastFactory, $sce, $cookies){
    var vm = this;
    var token = $cookies.get('token');
    vm.showRegister = false;

    if(token) {
      vm.showRegister = true
    }
if(token){
  User.get().$promise.then(function (data) {

    _.forEach(data.data.events_register, function (name) {
      if(name === event){
        vm.registerStatus = $sce.trustAsHtml('Registered<i class="material-icons md-16">done_all</i>');
      }
    })
  });
}


    vm.registerStatus = $sce.trustAsHtml('Register<i class="material-icons md-16 black007">create</i>');
    vm.event = event;
    vm.teamName = teamName;

    vm.shortDesc = shortDescription;
    vm.longDesc = longDescription;
    vm.contact = contact;
    vm.rules = rules;
    vm.link = link;


    vm.register = function(event){

      User.update({id: event},{events_register:event}).$promise.then(function (data) {

        ToastFactory.showToast(data.status);
        if(data.validity == 1){
          vm.registerStatus = $sce.trustAsHtml('Registered<i class="material-icons md-16">done_all</i>');
        }else {
          vm.registerStatus = $sce.trustAsHtml('Register<i class="material-icons md-16 black007">create</i>');
        }
      })
    };


    //DAtabase

  };

  angular.module('coderDecoder2App').controller('tabDialogController', ['event', 'teamName','shortDescription','longDescription','contact','rules','link','User','ToastFactory','$sce','$cookies',tabDialogController]);

})();
