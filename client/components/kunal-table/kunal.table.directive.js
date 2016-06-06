'use strict';
(function () {

  var kunalTable = function kunalTable() {

    var link = function link($scope, $elem, $attr) {

    };


    return {
      restrict: 'EA',
      scope: {
        headers: '=',
        content: '=',
        customClass: '=customClass',
        sortable: '=',
        count: '='
      },
      templateUrl: 'components/kunal-table/kunal.table.html',
      controller: ['$filter', function ($filter) {
        var vm = this;

        var orderBy = $filter('orderBy');




        vm.handleSort = function (field) {

          if (vm.sortable.indexOf(field) > -1) {
            return true;
          } else {
            return false;
          }
        };

        vm.order = function (predicate, reverse) {
          vm.content = orderBy(vm.content, predicate, reverse);
          vm.predicate = predicate;
        };

        vm.order(vm.sortable[0], false);



      }],
      controllerAs: 'vm',
      bindToController: true,
      link: link
    }
  };

  angular.module('coderDecoder2App').directive('kunalTable', [kunalTable]);
})();
