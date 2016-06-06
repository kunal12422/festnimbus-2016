'use strict';
(function () {

  var workshopsController = function workshopsController() {
    var vm = this;

    vm.workshopList = [{
      'name': 'BlueBot Workshop',
      'by': 'Team Vibhav'
    }, {
      'name': 'Ball Following Bot Workshop',
      'by': 'Team Vibhav'
    }, {
      'name': 'Auto CAD Workshop',
      'by': 'Team C-Helix'
    }, {
      'name': 'STAAD Pro Workshop',
      'by': 'Team C-Helix'
    }, {
      'name': 'SOLARISER Workshop',
      'by': 'Team Ojas'
    }, {
      'name': 'Linux Command Line Workshop',
      'by': 'Team .EXE'
    }, {
      'name': 'Ethical Hacking Workshop',
      'by': 'Team .EXE'
    }, {
      'name': 'ASPEN Workshop',
      'by': 'Team Hermetica'
    },{
      'name':'CATIA Workshop',
      'by':'Team MEDextrous'
    },{
      'name':'Aeromodeling & Aerodynamics workshop',
      'by':'Team MEDextrous'
    }]

  };


  angular.module('coderDecoder2App').controller('workshopsController', workshopsController);

})();
