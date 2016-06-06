'use strict';
(function () {

  var EventsListController = function EventsListController(fetchListData, $state, $mdDialog, DataFactory) {

    var vm = this;
    vm.teamEvents = [];
    vm.teamName = '';

    fetchListData.$promise.then(function (data) {

      vm.teamName = data.data[0].teamName;
      vm.teamEvents = data.data[0].events;
      angular.element(".loader").hide();
    });

    vm.closeDialog = function () {
      $state.go('generator.events.tiles');
    };

    vm.showTabDialog = function (ev, teamName, event) {
      DataFactory
        .get({team: teamName, event: event})
        .$promise
        .then(function (data) {

        
          /**
           * Show md-dialog after fetching the data /api/teams/:team/:event
           */
          $mdDialog.show({
            controller: 'tabDialogController as vm',
            templateUrl: 'app/events/list/detail-tabs/tab.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              event: event,
              teamName: teamName,
              shortDescription: data.data[0].shortD,
              longDescription: data.data[0].longD,
              contact: data.data[0].Contact,
              rules: data.data[0].rules,
              link: data.data[0].link
            }
          })

        });


    };

  };


  angular.module('coderDecoder2App')
    .controller('EventsListController', ['fetchListData', '$state', '$mdDialog', 'DataFactory', EventsListController]);


})();
