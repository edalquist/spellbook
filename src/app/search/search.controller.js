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

    $scope.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.classes = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
    $scope.schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

    $scope.search = {};

    $scope.filterSpells = function(spells) {
    	var filteredSpells = {};
    	angular.forEach(spells, function(value, key) {
    		if (!angular.isObject(value)) {
    			return;
    		}

    		var include = false;
    		if (angular.isString($scope.search.text) && $scope.search.text.length > 0) {
    			var searchRegex = new RegExp($scope.search.text, "i");
    			include = key.search(searchRegex) >= 0;
    			include = include || value.description.search(searchRegex) >= 0;
    			include = include || value.duration.search(searchRegex) >= 0;
    			include = include || value.school.search(searchRegex) >= 0;
    			// TODO search the classes
    		} else {
    			include = true;
    		}

			  if (include) {
			  	filteredSpells[key] = value;
			  }
			});
    	return filteredSpells;
    };
  }]);
