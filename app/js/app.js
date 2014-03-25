var spellbook = {};

var spellBookApp = angular.module('spellBookApp', ['ui.bootstrap']);
spellBookApp.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});