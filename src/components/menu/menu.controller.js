'use strict';


// function CreateSpellDialogController($scope, $mdDialog) {
//   $scope.cancel = function() {
//   	$mdDialog.hide();
//   };

//   $scope.create = function() {
//     $mdDialog.hide($scope.spell.name);
//   };
// }

angular.module('spellbook')
  .controller('MenuCtrl', ['$scope', '$firebaseSimpleLogin', '$mdDialog', '$location', function ($scope, $firebaseSimpleLogin, $mdDialog, $location) {
    // TODO turn this into services & factories
    var ref = new Firebase('https://amber-torch-9218.firebaseio.com');
    var authClient = $firebaseSimpleLogin(ref);

    $scope.auth = authClient;

    // TODO need to reload data correctly after auth

    //  $scope.spellNamePrompt = function(ev) {
	  //   $mdDialog.show({
	  //     templateUrl: 'app/create/create_spell_dialog.tmpl.html',
	  //     targetEvent: ev,
	  //     controller: ['$scope', '$mdDialog', CreateSpellDialogController]
	  //   }).then(function(spellName) {
	  //   	$location.path('/edit/' + spellName);
	  //   });
	  // };
  }]);
