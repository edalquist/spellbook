/**
 * Create a new SpellBook Service
 */

spellbook.SpellBookService = function($http, $q) {
    this.q_ = $q;

    this.charClasses_ = {};
    this.spells_ = {};
    this.dataLoadedDeferred_ = $q.defer();

    // Start load of data
    var classesPromise = $http.get('data/classes.json');
    var spellsPromise = $http.get('data/spells.json');
    var allDataLoaded = $q.all({
        classes: classesPromise,
        spells: spellsPromise
    });

    // Once both XHRs return builds the class and spell data
    allDataLoaded.then(function(responses) {
        var classSpecs = {};
        angular.forEach(responses.classes.data, function(classSpec) {
            classSpecs[classSpec.name] = classSpec;
        });

        angular.forEach(responses.spells.data.classes, function(classSpell) {
            var classSpec = classSpecs[classSpell.name];
            var charClass = new CharacterClass(classSpec, classSpell);
            this.charClasses_[charClass.name] = charClass;
        }.bind(this));

        angular.forEach(responses.spells.data.spells, function(spellData) {
            var spell = new Spell(spellData);
            this.spells_[spell.name] = spell;
        }.bind(this));

        // Mark the load tracking promise resolved
        this.dataLoadedDeferred_.resolve();
    }.bind(this));
};

/**
 * Get array of class names
 *
 * @return Promise<Array<String>>
 */
spellbook.SpellBookService.prototype.getClassNames = function() {
    var deferred = this.q_.defer();
    this.dataLoadedDeferred_.promise.then(function(data) {
        deferred.resolve(Object.keys(this.charClasses_));
    }.bind(this));
    return deferred.promise;
};

/**
 * Get a specific CharacterClass by name
 *
 * @return Promise<CharacterClass>
 */
spellbook.SpellBookService.prototype.getClass = function(name) {
    var deferred = this.q_.defer();
    this.dataLoadedDeferred_.promise.then(function(data) {
        deferred.resolve(this.charClasses_[name]);
    }.bind(this));
    return deferred.promise;
};



spellBookApp.service('spellBookService', spellbook.SpellBookService);
