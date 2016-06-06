'use strict';

angular.module('coderDecoder2App', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngMaterial',
    'ngScrollbars',
    'ngProgress'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $httpProvider.interceptors.push('authInterceptor');

    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        template: '',
        onEnter: function ($state) {
          if (isMobile.any()) {
            $state.go('generator.home');
          }
          var body = angular.element(document).find('body')[0];
          // body.style.overflow = "hidden";
          angular.element('canvas').show();
          body.style.maxWidth = '';
          body.style.maxHeight = '';
          body.style.background = "";
          body.style.height = '100%';
          body.style.width = '100%';
          angular.element('#top').show();
        },
        onExit: function () {
          var body = angular.element(document).find('body')[0];
          body.style.overflow = "initial";

        }
      })
      .state('generator', {
        url: '',
        abstract: true,
        templateUrl: 'app/generator/generator.html',
        controller: 'generatorController',
        controllerAs: 'vm',
        onEnter: function () {
          if (isMobile.any()) {
            console.log('YES!');

          }
          var body = angular.element(document).find('body')[0];
          angular.element('canvas').hide();
         angular.element('#top').hide();
          body.style.overflow = "initial";
          body.style.height = '';
          body.style.width = '';
          body.style.maxWidth = '1920px';
          body.style.maxHeight = '1080px';
          body.style.background = "url('../assets/images/bg-body.png') repeat-y";

        },
        onExit: function () {
          var body = angular.element(document).find('body')[0];
          body.style.overflow = "hidden";
        }


      })
      .state('generator.home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'homeController as vm'

      })

      .state('generator.events', {
        url: '/events',
        abstract: true,
        template: '<div ui-view=""></div>'
      })
      .state('generator.events.tiles', {
        url: '/',
        templateUrl: 'app/events/tiles/events.tiles.html',
        controller: 'EventsTilesController as vm'

      })
      .state('generator.events.list', {
        url: '/:team',
        templateUrl: 'app/events/list/events.list.html',
        controller: 'EventsListController as vm',
        resolve: {
          fetchListData: ['$stateParams', 'DataFactory', function ($stateParams, DataFactory) {


            return DataFactory.get({team: $stateParams.team});

          }]
        }

      })
      .state('generator.listCore', {
        url: '/core',
        templateUrl: 'app/events/core-team/core.team.html',
        controller: 'CoreTeamController as vm'

      })
      .state('generator.attractions', {
        url: '/attractions',
        templateUrl: 'app/attractions/attraction.html',
        controller: 'attractionsController as vm'

      })
      .state('generator.workshops', {
        url: '/workshops',
        templateUrl: 'app/workshops/workshop.html',
        controller: 'workshopsController as vm'

      })

      .state('generator.guest', {
        url: '',
        abstract: true,
        template: '<div ui-view=""></div>'

      })
      .state('generator.guest.list', {
        url: '/guest-lectures',
        templateUrl: 'app/guest-lectures/guest.html',
        controller: 'guestLectureController as vm'

      })
      .state('generator.guest.gallery-1', {
        url: '/guest-lecture/1',
        templateUrl: 'app/guest-lectures/zgallery/gallery-1.html'

      })
      .state('generator.guest.gallery-2', {
        url: '/guest-lecture/2',
        templateUrl: 'app/guest-lectures/zgallery/gallery-2.html'
      })
      .state('generator.guest.gallery-3', {
        url: '/guest-lecture/3',
        templateUrl: 'app/guest-lectures/zgallery/gallery-3.html'

      })
      .state('generator.iEvents', {
        url: '/iEvents',
        templateUrl: 'app/ievents/ievents.html',
        controller: 'iEventsController as vm'

      })
      .state('online',{
        url:'/online/bhram',
        templateUrl:'app/online-events/online-event.html',
        controller:'onlineEventsController as vm',
        onEnter: function () {
          if (isMobile.any()) {
            console.log('YES!');

          }
          var body = angular.element(document).find('body')[0];
          angular.element('canvas').hide();
          angular.element('#top').hide();
          body.style.overflow = "inherit";
          body.style.height = '';
          body.style.width = '';
          body.style.maxWidth = '';
          body.style.maxHeight = '';
          body.style.background = "";


        }
      })
      .state('sponsors', {
        url: '/sponsors',
        templateUrl: 'app/sponsors/sponsors.html',
        controller: 'sponsorsController as vm',
        onEnter: function () {
          if (isMobile.any()) {
            console.log('YES!');

          }
          var body = angular.element(document).find('body')[0];
          angular.element('canvas').hide();
          angular.element('#top').hide();
          body.style.overflow = "inherit";
          body.style.height = '';
          body.style.width = '';
          body.style.maxWidth = '';
          body.style.maxHeight = '';
          body.style.background = "";


        }

      })

  }])

  .factory('authInterceptor', ['$q', '$cookies', '$injector', function ($q, $cookies, $injector) {
    var state;

    return {
      request: function (config) {
        config.headers = config.headers || {};

        if ($cookies.get('token')) {

          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');

          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])
  .config(['ScrollBarsProvider', function (ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
      scrollButtons: {
        scrollAmount: 'auto',
        enable: true
      },
      axis: 'yx'
    };

  }]).run(['$rootScope','$cookies','$location','ToastFactory',
  function ($rootScope,$cookies, $location, ToastFactory) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      if(next === 'http://www.festnimbus.com/online/bhram'){
        if(!$cookies.get('token')){
          $location.path('/home');
          ToastFactory.showToast('Login to Play BHRAM 4.0');
        }
      }

    });
  }
])
;


//angular-validation-match
