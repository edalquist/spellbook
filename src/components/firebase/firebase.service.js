(function () {

  'use strict';

  /**
   * @class FirebaseService
   * @ngInject
   */
  var FirebaseService = function($firebase, $firebaseSimpleLogin, $rootScope) {
    this.firebase_ = $firebase;
    this.firebaseRoot_ = new Firebase('https://amber-torch-9218.firebaseio.com');
    //this.angularFireRoot_ = this.firebase_(this.firebaseRoot_);
    this.authClient_ = $firebaseSimpleLogin(this.firebaseRoot_);

    this.usersNode_ = this.firebaseRoot_.child('users');
    $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
      // save the user's profile into Firebase so we can
      // list users, use them in security rules, and show profiles
      this.usersNode_.child(user.uid).update(user);
    }.bind(this));

    // Deal with bound data on login/logout
    $rootScope.$on('$firebaseSimpleLogin:login', function() {
      console.log('login');
      // $scope.$evalAsync(doSync);
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      console.log('logout');
      // $scope.$evalAsync(doUnSync);
    });

    this.objectCache_ = {};
    this.afObjectCache_ = {};
  }

  FirebaseService.prototype.isAuthenticated = function() {
    return !!this.getUser();
  }

  FirebaseService.prototype.getUser = function() {
    return this.authClient_.user;
  }

  FirebaseService.prototype.login = function() {
    this.authClient_.$login('google', { scope: 'email' });
  }

  FirebaseService.prototype.logout = function() {
    this.authClient_.$logout();
  }

  FirebaseService.prototype.getSpells = function() {
    return this.spellsNode_;
  }

  FirebaseService.prototype.bindTo = function(scope, varName, path) {
    var fbChild = this.firebaseRoot_.child(path);
    var afChild = this.firebase_(fbChild);
    var afObject = afChild.$asObject();
    afObject.$bindTo(scope, varName);
  }

  // FirebaseService.prototype.getAfObject_ = function(path) {
  //   // Check Cache
  //   var afObject = this.afObjectCache_[path];
  //   if (afObject) {
  //     return afObject;
  //   }

  //   // Get AngularFire Object
  //   afObject = this.firebase_(this.getObject_(path));

  //   // Put in Cache
  //   this.afObjectCache_[path] = afObject;

  //   return afObject;
  // }

  // // TODO is it safe or useful to cache objects like this?
  // FirebaseService.prototype.getObject_ = function(path) {
  //   if (path.indexOf('/') != 0) {
  //     throw 'Paths must start with / and a relative to the root of the firebase data';
  //   }

  //   // Check Cache
  //   var syncObject = this.objectCache_[path];
  //   if (syncObject) {
  //     return syncObject;
  //   }

  //   // Get sync object
  //   var pathParts = path.split('/');
  //   var syncObject = this.firebaseRoot_;
  //   for (var i = 1; i < pathParts.length; i++) {
  //     syncObject = syncObject.child(pathParts[i]);
  //   }

  //   // Put in Cache
  //   this.objectCache_[path] = syncObject;

  //   return syncObject;
  // }

  angular
    .module('spellbook')
    .service('firebaseService', FirebaseService);

})();
