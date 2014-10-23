(function () {

  'use strict';

  /**
   * @class MenuCtrl
   * @ngInject
   */
  var SearchCtrl = function($scope, $timeout, firebaseService) {
    this.firebaseService_ = firebaseService;
    this.scope_ = $scope;
    this.timeout_ = $timeout;
    this.filter = {};

    this.firebaseService_.bindTo(this.scope_, 'levels', '/attributes/level');
    this.firebaseService_.bindTo(this.scope_, 'classes', '/attributes/classes');
    this.firebaseService_.bindTo(this.scope_, 'schools', '/attributes/schools');
    this.firebaseService_.bindTo(this.scope_, 'spells', '/spells');

    this.scope_.$watch(function() {
      console.log('search digest');
    }.bind(this));
  };

  SearchCtrl.prototype.levels = function() {
    return this.scope_.levels;
  }

  SearchCtrl.prototype.classes = function() {
    return this.scope_.classes;
  }

  SearchCtrl.prototype.schools = function() {
    return this.scope_.schools;
  }

  // TODO get all angulary and fix this so it doesn't digest over and over
  SearchCtrl.prototype.getFilteredSpells = function() {
    console.log('filter should only get called once :(');
    var spellCount = 0;
    var filteredSpells = {};
    this.skippedSpells = 0;
    angular.forEach(this.scope_.spells, function(value, key) {
      if (!angular.isObject(value)) {
        return;
      }

      // Limit to first N spells
      if (spellCount >= 30) {
        this.skippedSpells++;
        return;
      }

      // Run text search on the spell
      var textMatches = false;
      if (angular.isString(this.filter.text) && this.filter.text.length > 0) {
        var searchRegex = new RegExp(this.filter.text, "i");
        textMatches = key.search(searchRegex) >= 0 || (value.description && value.description.search(searchRegex) >= 0);
      } else {
        textMatches = true;
      }

      // Run level filter on the spell
      var hasLevelFilter = false;
      var levelMatches = false;
      angular.forEach(this.filter.level, function(checked, level) {
        if (checked) {
          hasLevelFilter = true;
          levelMatches = levelMatches || value.level == level;
        }
      });
      levelMatches = levelMatches || !hasLevelFilter;

      // Run class filter on the spell
      var hasClassFilter = false;
      var classMatches = false;
      angular.forEach(this.filter.cls, function(checked, cls) {
        if (checked) {
          hasClassFilter = true;
          classMatches = classMatches || value.classes[cls];
        }
      });
      classMatches = classMatches || !hasClassFilter;

      // Run school filter on the spell
      var hasSchoolFilter = false;
      var schoolMatches = false;
      angular.forEach(this.filter.school, function(checked, school) {
        if (checked) {
          hasSchoolFilter = true;
          schoolMatches = schoolMatches || value.school == school;
        }
      });
      schoolMatches = schoolMatches || !hasSchoolFilter;

      var concentrationMatches = false;
      if (angular.isDefined(this.filter.concentration)) {
        concentrationMatches = (this.filter.concentration && value.concentration) || (!this.filter.concentration && !value.concentration);
      } else {
        concentrationMatches = true;
      }

      var ritualMatches = false;
      if (angular.isDefined(this.filter.ritual)) {
        ritualMatches = (this.filter.ritual && value.ritual) || (!this.filter.ritual && !value.ritual);
      } else {
        ritualMatches = true;
      }

      if (textMatches && levelMatches && classMatches && schoolMatches && concentrationMatches && ritualMatches) {
        spellCount++;
        filteredSpells[key] = value;
      }
    }.bind(this));
    return filteredSpells;
  }

  var OrdinalFilter = function() {
	  var ordinal = function(input) {
	    // Only process numeric values.
	    if (isNaN(input) || input === null) return input;

	    var s=["th","st","nd","rd"],
	    v=input%100;
	    return input+(s[(v-20)%10]||s[v]||s[0]);
	  }

	  return ordinal;
	};




  angular
    .module('spellbook')
    .controller('SearchCtrl', SearchCtrl)
    .filter('ordinal', OrdinalFilter);

})();
