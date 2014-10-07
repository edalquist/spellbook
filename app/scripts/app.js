'use strict';

/**
 * @ngdoc overview
 * @name spellbookApp
 * @description
 * # spellbookApp
 *
 * Main module of the application.
 */
angular
  .module('spellbookApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
