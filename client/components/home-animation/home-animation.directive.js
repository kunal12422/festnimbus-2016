'use strict';
(function () {

  var homeAnimation = function homeAnimation() {

    var link = function link($scope, $elem, $attr) {

      angular.element(document).ready(function () {
        var paths = document.getElementsByTagName('polygon');

        for (var i = 0; i < paths.length; i++) {

          paths[i].style.fillOpacity = "0";
          paths[i].style.stroke = "0.1";
        }

        var fill1 = function(p) {
          var i = 0;

          window.setInterval(function() {
            if( p.length <= i ) {return}

            p[i].style.fillOpacity = "1.0";
            p[i].style.stroke = "none";
            p[i+1].style.fillOpacity = "1.0";
            p[i+1].style.stroke = "none";
            i = i + 5;
          },14);
        };




        var fill2 = function(p) {
          var i = 0;

          var myInterval  =   window.setInterval(function() {
            if( p.length <= i ) {
              $('#enigma-svg').animate({
                'width':'240px',
                'marginTop': '-10px',
                'marginLeft':'215px'
              },1000,'linear', function () {
                $('.dialog').removeAttr('id');
              });
              clearInterval(myInterval);
              return;
            }
            p[i].style.fillOpacity = "1.0";
            p[i].style.stroke = "none";

            i = i + 1;
          },8);
        };



        // fill1(paths);
        setTimeout(function () {
          fill2(paths);
        },1500);

      });


    };


    return {
      restrict: 'EA',
      templateUrl: 'components/home-animation/home-animation.html',
      controller: [function () {

      }],
      controllerAs: 'vm',
      bindToController: true,
      link: link,
      replace: true
    }
  };

  angular.module('coderDecoder2App').directive('homeAnimation', [homeAnimation]);
})();
