'use strict';
(function () {

  var guestLectureGalleryController = function guestLectureGalleryController($state) {
    var vm = this;

console.log('called');
vm.closeFB = function () {
  $state.go('generator.guest.list');
  setTimeout(function () {
    window.location.reload();
  },0);
}

  };


  angular.module('coderDecoder2App').controller('guestLectureGalleryController', ['$state',guestLectureGalleryController]);

})();
