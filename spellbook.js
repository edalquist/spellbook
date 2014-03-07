var spellBookApp = angular.module('spellBookApp', []); 

spellBookApp.controller('SpellBookCtrl', function ($scope, $http) {
	$scope.userData = {
		level: 1
	};

	$http.get('/data/classes.json').success(function(classes) {
		$scope.classes = classes;
		$scope.class = classes[0];

		$scope.selectClass();
	});
/*
	$http.get('/data/history.json').success(function(histories) {
		$scope.histories = histories;
	});

	$scope.generate = function() {
		angular.forEach($scope.histories, function(history) {
			var roll = Math.floor(Math.random() * 100) + 1;
			for (var i = 0; i < history.options.length; i++) {
				var option = history.options[i];
				if (option.min <= roll && option.max >= roll) {
					history.selected = i;
					break;
				}
			};
		});
	};
*/

	$scope.selectClass = function() {
		$scope.userData.classId = $scope.class.id;
		if ($scope.class.specs) {
			$scope.classSpec = $scope.class.specs[0];
		}
	};

	$scope.selectClassSpec = function() {
		$scope.userData.specId = $scope.classSpec.id;
	};

	$scope.range = function(start, end) {
	    var result = [];
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }
	    return result;
	};
});