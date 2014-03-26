spellBookApp.controller('SpellBookCtrl', function ($scope, spellBookService) {
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

    spellBookService.getClassNames().then(function(classNames) {
        $scope.classNames = classNames;
        $scope.selectClass(classNames[0]);
    });

    $scope.selectLevel = function(level) {
        $scope.character.level = level;
    };
    $scope.selectClass = function(className) {
        var charClassPromise = spellBookService.getClass(className);
        charClassPromise.then(function(charClass) {
            if (charClass == null) {
                // Ignore invalid class names
                return;
            }

            $scope.character.className = charClass.name;

            // TODO figure out best practices for storing state on the scope?
            // I think this is where I create another service right?
            // Still need to expose the data on the scope right?
            $scope.selectedClass = charClass;

            if (charClass.specialization) {
                $scope.character.specializationName = charClass.specialization.getTypes()[0];
            } else {
                $scope.character.specializationName = null;
            }
        }.bind(this));
    };
    /*
    $scope.selectSpec = function(spec) {
        $scope.character.spec = spec;
    };
    $scope.spellSelected = function(level) {
        var spellName = $scope.spellSelectors[level - 1];
        var spells = $scope.character.spells[level - 1] || [];
        spells.push(spellName);
        $scope.character.spells[level - 1] = spells;
        $scope.spellSelectors[level - 1] = null;
    };
    */
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