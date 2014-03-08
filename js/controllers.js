spellBookApp.controller('SpellBookCtrl', function ($scope, $location, $http) {
	$scope.range = function(start, end) {
	    var result = [];
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }
	    return result;
	};

	$scope.findEntity = function(id, entities) {
		for (var i = 0; entities && i < entities.length; i++) {
			if (id == entities[i].id) {
				return entities[i];
			}
		}
		return null;
	};

	$scope.saveState = function() {
		// Clears all parameters first
		$location.url($location.path());

		$location.search('cid', $scope.selectedClass.id);
		if ($scope.selectedClass.specs) {
			$location.search('sid', $scope.selectedSpec.id);
		}
		$location.search('l', $scope.selectedLevel);
    };

    $scope.loadState = function() {
    	var savedState = $location.search();
	    $scope.selectedClass = $scope.findEntity(savedState.cid, $scope.classes);
	    if ($scope.selectedClass.specs) {
	    	$scope.selectedSpec = $scope.findEntity(savedState.sid, $scope.selectedClass.specs);
	    }
	    $scope.selectedLevel = savedState.l;
    };

    $scope.$on('$locationChangeSuccess', $scope.loadState);

	// Load classes
	$http.get('data/classes.json').success(function(classes) {
		$scope.classes = classes;
		
		$scope.loadState();
	});
});