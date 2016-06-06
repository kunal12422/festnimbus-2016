'use strict';
(function () {

  var sponsorsController = function sponsorsController($mdSidenav, $mdToast) {
    var vm = this;

    vm.toggleSidenav = function(menu) {
      $mdSidenav(menu).toggle();
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
        icon: 'record_voice_over'
      }, {
        link: 'generator.attractions',
        title: 'Main Attractions',
        icon: 'message'
      }
    ];
    vm.admin = [

      {
        link: 'generator.home',
        title: 'Login/Logout',
        icon: 'touch_app'
      }
    ];


    vm.sponsoers = [{
      'partner': 'Educational Partners',
      'link': ['neer-2',
        'ait-1',
        'aptron'
      ]
    }, {
      'partner': 'Electronic Partner',
      'link': ['zebronics-2']
    },{
      'partner':'Radio Partner',
      'link': ['big-fm-2']
    },{
      'partner':'Banking Partners',
      'link':['coperative-bank', 'uco']
    },{
		'partner':'Prize Partners',
		'link':['eWools','eCools']
		},{
      'partner': 'Sponsors',
      link: ['honda-2', 'renault-2', 'tata-2', 'mahindra-2', 'made_easy_2', 'ace', 'app4pc', 'ebay', 'archies', 'tatasky-2', 'cadd-2','astha','hpseb']
    }];


  };


  angular.module('coderDecoder2App').controller('sponsorsController', ['$mdSidenav', '$mdToast', sponsorsController]);

})();








