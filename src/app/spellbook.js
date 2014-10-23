(function () {

  'use strict';

  /**
   * @param {angular.$routeProvider} $routeProvider
   * @ngInject
   */
  var configureApp = function($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
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
  };

  angular
    .module('spellbook', [
      'ngMaterial',
      'ngRoute',
      'firebase',
      'yaru22.md', // markdown renderer
      'angularStats'])
    .config(configureApp);

})();
