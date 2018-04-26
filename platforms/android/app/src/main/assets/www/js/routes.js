angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('tabsController.scanQRCode', {
    url: '/scan',
    views: {
      'tab1': {
        templateUrl: 'templates/scanQRCode.html',
        controller: 'scanQRCodeCtrl'
      }
    }
  })

  .state('tabsController.lesExposants', {
    url: '/exposant',
    views: {
      'tab2': {
        templateUrl: 'templates/lesExposants.html',
        controller: 'lesExposantsCtrl'
      }
    }
  })
    .state('tabsController.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account.html',
        controller: 'cloudTabDefaultPageCtrl'
      }
    }
  })
  .state('tabsController.exposant', {
    url: '/exposant-choix/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/exposant.html',
        controller: 'lesExposantsCtrl'
      }
    }
  })
  .state('tabsController.cloudTabDefaultPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/cloudTabDefaultPage.html',
        controller: 'cloudTabDefaultPageCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',


        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'


  })

  .state('connection', {
    url: '/connection',


        templateUrl: 'templates/connection.html',
        controller: 'loginCtrl'


  })




  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/scan')


});
