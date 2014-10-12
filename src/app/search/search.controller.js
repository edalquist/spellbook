'use strict';

angular.module('spellbook')
  .controller('SearchCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  	var ref = new Firebase('https://amber-torch-9218.firebaseio.com/spells');
		var sync = $firebase(ref);

		// asObject starts the data download
		var syncObject = sync.$asObject();

    // bind all spell data to spells object
    var bindP = syncObject.$bindTo($scope, 'spells');
    bindP.then(function() {
    	console.log($scope.spells);
    });
  }]);
