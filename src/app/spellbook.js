'use strict';

angular.module('spellbook', ['ngMaterial', 'ngRoute', 'firebase', 'yaru22.md', 'angularStats'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      })
      .when('/edit/:name', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      })
      .when('/create', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/search'
      });
  }]);
