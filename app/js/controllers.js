spellBookApp.controller('SpellBookCtrl', function ($scope, $location, $http) {
    $scope.character = {
        level: 1,
        spells: []
    };
    $scope.spellSelectors = [];

	$scope.range = function(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    $scope.findEntity = function(key, value, entities) {
        for (var i = 0; entities && value && i < entities.length; i++) {
            if (value == entities[i][key]) {
                return entities[i];
            }
        }
        return null;
    };

    $scope.selectLevel = function(level) {
        $scope.character.level = level;
    };
    $scope.selectClass = function(cls) {
        $scope.character.cls = cls;
        if ($scope.character.cls.spec) {
            $scope.character.spec = $scope.character.cls.spec.types[0];
        } else {
            $scope.character.spec = null;
        }
    };
    $scope.selectSpec = function(spec) {
        $scope.character.spec = spec;
    };
    $scope.spellSelected = function(level) {
        var spellName = $scope.spellSelectors[level - 1];
        var spells = $scope.character.spells[level - 1] || [];
        spells.push(spellName);
        $scope.character.spells[level - 1] = spells;
        $scope.spellSelectors[level - 1] = null;
    }

	// Load classes
	$http.get('data/classes.json').success(function(classes) {
		$scope.classes = classes;
        $scope.character.cls = $scope.classes[0];
	});

    // Load spells
    $http.get('data/spells.json').success(function(spellBook) {
        $scope.classSpells = spellBook.classes;
    });
});



/*
$scope.saveState = function() {
	// Clears all parameters first
	$location.url($location.path());

	if ($scope.selectedClass) {
		$location.search('cid', $scope.selectedClass.id);

		if ($scope.selectedClass.specs && $scope.selectedSpec) {
			$location.search('sid', $scope.selectedSpec.id);
		}
	}
	if ($scope.selectedLevel) {
		$location.search('l', $scope.selectedLevel);
	}
};

$scope.loadState = function() {
	// TODO clear state before loading
	var savedState = $location.search();
	if (savedState.cid) {
    	$scope.selectedClass = $scope.findEntity(savedState.cid, $scope.classes);
    }
    if (savedState.sid && $scope.selectedClass && $scope.selectedClass.specs) {
    	$scope.selectedSpec = $scope.findEntity(savedState.sid, $scope.selectedClass.specs);
    }
    if (savedState.l) {
    	$scope.selectedLevel = Number(savedState.l);
    }
};
*/