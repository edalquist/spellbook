'use strict';

/**
 * @ngdoc function
 * @name spellbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spellbookApp
 */
angular.module('spellbookApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
