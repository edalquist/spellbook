'use strict';

angular.module('spellbook')
  .controller('SearchCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  	var ref = new Firebase('https://amber-torch-9218.firebaseio.com/spells');
		var sync = $firebase(ref);

		var syncObject;
		var doUnSync = function() {
			if (syncObject) {
				syncObject.$destroy();
				syncObject = null;
			}
	  };

		var doSync = function() {
			doUnSync();
			// asObject starts the data download
			syncObject = sync.$asObject();
			// bind all spell data to spells object
	    syncObject.$bindTo($scope, 'spells');
	  };

		$scope.$on('$firebaseSimpleLogin:login', function() {
			console.log('login', arguments);
			$scope.$evalAsync(doSync);
		});
		$scope.$on('$firebaseSimpleLogin:logout', function() {
			console.log('logout', arguments);
			$scope.$evalAsync(doUnSync);
		});


    $scope.levels = ['Cantrip', 1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.classes = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
    $scope.schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

    $scope.search = {};
    $scope.skippedSpells = 0;

    $scope.filterSpells = function(spells) {
    	var spellCount = 0;
    	var filteredSpells = {};
    	$scope.skippedSpells = 0;
    	angular.forEach(spells, function(value, key) {
    		if (!angular.isObject(value)) {
    			return;
    		}

    		// Limit to first N spells
    		if (spellCount >= 30) {
    			$scope.skippedSpells++;
    			return;
    		}

    		// Run text search on the spell
    		var textMatches = false;
    		if (angular.isString($scope.search.text) && $scope.search.text.length > 0) {
    			var searchRegex = new RegExp($scope.search.text, "i");
    			textMatches = key.search(searchRegex) >= 0 || (value.description && value.description.search(searchRegex) >= 0);
    		} else {
    			textMatches = true;
    		}

    		// Run level filter on the spell
    		var hasLevelFilter = false;
    		var levelMatches = false;
    		angular.forEach($scope.search.level, function(checked, level) {
    			if (checked) {
	    			hasLevelFilter = true;
	    			levelMatches = levelMatches || value.level == level;
	    		}
    		});
    		levelMatches = levelMatches || !hasLevelFilter;

    		// Run class filter on the spell
    		var hasClassFilter = false;
    		var classMatches = false;
    		angular.forEach($scope.search.cls, function(checked, cls) {
    			if (checked) {
	    			hasClassFilter = true;
	    			classMatches = classMatches || value.classes[cls];
	    		}
    		});
    		classMatches = classMatches || !hasClassFilter;

    		// Run school filter on the spell
    		var hasSchoolFilter = false;
    		var schoolMatches = false;
    		angular.forEach($scope.search.school, function(checked, school) {
    			if (checked) {
	    			hasSchoolFilter = true;
	    			schoolMatches = schoolMatches || value.school == school;
	    		}
    		});
    		schoolMatches = schoolMatches || !hasSchoolFilter;

    		var concentrationMatches = false;
    		if (angular.isDefined($scope.search.concentration)) {
    			concentrationMatches = ($scope.search.concentration && value.concentration) || (!$scope.search.concentration && !value.concentration);
    		} else {
    			concentrationMatches = true;
    		}

    		var ritualMatches = false;
    		if (angular.isDefined($scope.search.ritual)) {
    			ritualMatches = ($scope.search.ritual && value.ritual) || (!$scope.search.ritual && !value.ritual);
    		} else {
    			ritualMatches = true;
    		}

			  if (textMatches && levelMatches && classMatches && schoolMatches && concentrationMatches && ritualMatches) {
			  	spellCount++;
			  	filteredSpells[key] = value;
			  }
			});
    	return filteredSpells;
    };
  }]).filter('ordinal', function() {
	  var ordinal = function(input) {
	    // Only process numeric values.
	    if (isNaN(input) || input === null) return input;

	    var s=["th","st","nd","rd"],
	    v=input%100;
	    return input+(s[(v-20)%10]||s[v]||s[0]);
	  }

	  return ordinal;
	});
