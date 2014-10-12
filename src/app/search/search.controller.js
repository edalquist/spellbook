'use strict';

angular.module('spellbook')
  .controller('SearchCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  	var ref = new Firebase('https://amber-torch-9218.firebaseio.com/spells');
		var sync = $firebase(ref);
    var syncObject = sync.$asObject();

    // bind all spell data to spells object
    syncObject.$bindTo($scope, 'spells');

  }]);
