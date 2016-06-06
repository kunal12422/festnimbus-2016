'use strict';
(function () {

  var guestLectureController = function guestLectureController($mdDialog) {
    var vm = this;
    vm.guestLectures = [{
      'lecture':'Electronic Industry to start Carrier',
      'author':'Mr. Rajesh Naveen',
      'number':1
    },{
      'lecture':'ARM Microcontrollers',
      'author':'Prof. Ramesh Gaonkar',
      'number':2
    },{
      'lecture':'Entrepreneurship',
      'author':'Ar. Vishal & Ar. Gaurav',
      'number':3
    },{
      'lecture':'VLSI Industry',
      'author':'Mr. Samarth Saxena',
      'number':4
    }];

    vm.showGallery = function (lecture, author, index) {


    };

  };


  angular.module('coderDecoder2App').controller('guestLectureController', ['$mdDialog', guestLectureController]);

})();
