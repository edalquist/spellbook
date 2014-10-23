(function () {

  'use strict';

  /**
   * @class MenuCtrl
   * @ngInject
   */
  function MenuCtrl (firebaseService) {
    this.firebaseService_ = firebaseService;
  };

  MenuCtrl.prototype.isAuthenticated = function() {
    return this.firebaseService_.isAuthenticated();
  }

  MenuCtrl.prototype.getUser = function() {
    return this.firebaseService_.getUser();
  }

  MenuCtrl.prototype.login = function() {
    this.firebaseService_.login();
  }

  MenuCtrl.prototype.logout = function() {
    this.firebaseService_.logout();
  }


  angular
    .module('spellbook')
    .controller('MenuCtrl', MenuCtrl);

})();



// function CreateSpellDialogController($scope, $mdDialog) {
//   $scope.cancel = function() {
//    $mdDialog.hide();
//   };

//   $scope.create = function() {
//     $mdDialog.hide($scope.spell.name);
//   };
// }



    //  $scope.spellNamePrompt = function(ev) {
    //   $mdDialog.show({
    //     templateUrl: 'app/create/create_spell_dialog.tmpl.html',
    //     targetEvent: ev,
    //     controller: ['$scope', '$mdDialog', CreateSpellDialogController]
    //   }).then(function(spellName) {
    //    $location.path('/edit/' + spellName);
    //   });
    // };