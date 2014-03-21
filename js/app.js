var spellBookApp = angular.module('spellBookApp', []);
spellBookApp.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});