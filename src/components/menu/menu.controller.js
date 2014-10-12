'use strict';


function CreateSpellDialogController($scope, $materialDialog) {
  $scope.cancel = function() {
  	$materialDialog.hide();
  };

  $scope.create = function() {
    $materialDialog.hide($scope.spell.name);
  };
}

angular.module('spellbook')
  .controller('MenuCtrl', ['$scope', '$materialDialog', '$location', function ($scope, $materialDialog, $location) {
    $scope.spellNamePrompt = function(ev) {
	    $materialDialog.show({
	      templateUrl: 'app/create/create_spell_dialog.tmpl.html',
	      targetEvent: ev,
	      controller: CreateSpellDialogController
	    }).then(function(spellName) {
	    	$location.path('/edit/' + spellName);
	    });
	  };
  }]);
