'use strict';
(function () {

  var CoreTeamController = function CoreTeamController() {
    var vm = this;

    vm.coreTeam = [{
      'name':'Dr. Rajnish Shrivastava',
      'post':'Director'
    },{
      'name':'Dr. Raman Parti',
      'post':'Dean Student Welfare'
    },{
      'name':'Dr. Surender Soni',
      'post':'Faculty Coordinator'
    },{
      'name':'Ms.Venu Shree',
      'post':'Faculty Coordinator'
    },{
      'name':'Samriti Attrey',
      'post':'Student Secretary'
    },{
      'name':'Vishal Agarwal',
      'post':'Club Secretary'
    },{
      'name':'Sachin Patial',
      'post':'Finance & Treasury Secretary'
    },{
      'name':'Parul Thakur',
      'post':'Public Relation Secretary'
    },{
      'name':'Vinay Kumar',
      'post':'Hospitality & Accomodation Secretary'
    },{
      'name':'Manish Kandoria',
      'post':'Registration & Transportation Secretary'
    },{
      'name':'Shubhinder Singh',
      'post':'Creative Head'
    },{
      'name':'Prateek Bandhu',
      'post':'Graphics Head'
    },{
      'name':'Prikshit Tekta',
      'post':'Web Head'
    },{
      'name':'Sahil Badyal',
      'post':'Promotional & Marketing Secretary(App Team)'
    },{
      'name':'Shobit Kansal',
      'post':'Event Schedule Manager'
    },{
      'name':'Shubham Garg',
      'post':'Event Schedule Manager'
    },{
      'name':'Srinath K',
      'post':'Event Quality Manager'
    },{
      'name':'Mohit Sharma',
      'post':'Event Quality Manager'
    },{
      'name':'Satya Prakesh',
      'post':'Design & Decoration Secretary'
    },{
      'name':'Ankush Sharma',
      'post':'Discipline Secretary'
    },{
      'name':'Kumund Jindal',
      'post':'Discipline Joint Sercretary(Girls)'
    },{
      'name':'Rishabh Kumar',
      'post':'Discipline Joint Sercretary(Boys)'
    },{
      'name':'Aditya Mittal',
      'post':'Environment Secretary'
    },{
      'name':'Siddharth Sood',
      'post':'Environment Joint Secretary'
    },{
      'name':'Pulkit',
      'post':'Human Values & Ethics Secretary'
    },{
      'name':'Arinav Jain',
      'post':'Human Values & Ethics Joint Secretary'
    }]
  };


  angular.module('coderDecoder2App').controller('CoreTeamController', CoreTeamController);

})();
