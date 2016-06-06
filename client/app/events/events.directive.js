'use strict';
(function(){


  var sideScroll = function sideScroll(){


    return {
      restrict:'AE',
      scope:{
        'sideScroll':'='
      },

      link:function($scope, $el, $attr){

       var  elem = $($el);

        elem.mCustomScrollbar($scope.$eval($attr.sideScroll));


      }
    };

  };





  angular.module('coderDecoder2App')
    .directive('sideScroll', sideScroll)
   ;


})();
