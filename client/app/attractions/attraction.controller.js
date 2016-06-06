'use strict';
(function () {

  var attractionsController = function attractionsController() {

    var vm = this;
    vm.attractions = [{
      'name': 'Zero gravity',
      'link': ''
    }, {
      'name': 'Spic Macay',
      'link': ''
    }, {
      'name': 'Motivational lectures',
      'link': ''
    }, {
      'name': 'Technovation of Vibhav',
      'link': ''
    }, {
      'name': 'Designoroom',
      'link': ''
    }, {
      'name': 'Sky Lantern',
      'link': ''
    }, {
      'name': 'DJ Night',
      'link': ''
    }];

  };

  angular.module('coderDecoder2App').controller('attractionsController', attractionsController);


})();
