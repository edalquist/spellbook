var spellbook = {};

var spellBookApp = angular.module('spellBookApp', ['ui.bootstrap']);
spellBookApp.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});


spellBookApp.filter('excludes', function() {
    return function(fullArray, excludesArray) {
        if (!excludesArray) {
            return fullArray;
        }
        var result = [];
        angular.forEach(fullArray, function(value) {
            if (excludesArray.indexOf(value) < 0) {
                result.push(value);
            }
        });
        return result;
    };
  });