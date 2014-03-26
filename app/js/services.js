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


/**
 * Service that models the selected character data
 */
spellbook.CharacterModel = function(spellBookService, $location) {
    // Array<Array<String>>
    this.spells = [];


    this.spellBookService_ = spellBookService;
    this.location_ = $location;
};

spellbook.CharacterModel.prototype.selectLevel = function(level) {
    this.level = level;
    this.save();
};

spellbook.CharacterModel.prototype.selectClass = function(className) {
    return this.spellBookService_.getClass(className).then(function(charClass) {
        if (charClass == null) {
            return;
        }

        var changed = this.characterClass != charClass;
        this.characterClass = charClass;

        if (changed) {
            if (charClass.specialization) {
                this.selectSpecializationType(charClass.specialization.types[0]);
            } else {
                this.selectSpecializationType(null);
            }
        }

        this.save();

    }.bind(this));
};

spellbook.CharacterModel.prototype.selectSpecializationType = function(specializationTypeName) {
    if (specializationTypeName) {
        this.specializationType = this.characterClass.specialization.getType(specializationTypeName);
    } else {
        this.specializationType = null;
    }
    this.save();
};

spellbook.CharacterModel.prototype.selectSpell = function(level, spellName) {
    var levelSpells = this.spells[level - 1] || [];
    if (levelSpells.indexOf(spellName) >= 0) {
        return;
    }
    levelSpells.push(spellName);
    this.spells[level - 1] = levelSpells;
    this.save();
};

spellbook.CharacterModel.prototype.deleteSpell = function(level, spellName) {
    var levelSpells = this.spells[level - 1] || [];
    var pos = levelSpells.indexOf(spellName);
    if (pos >= 0) {
        levelSpells.splice(pos, 1);
    }
    this.spells[level - 1] = levelSpells;
    this.save();
};

spellbook.CharacterModel.prototype.save = function() {
    if (this.loading) {
        return;
    }

    // Clears all parameters first
    this.location_.url(this.location_.path());

    this.location_.search('l', this.level);
    if (this.characterClass) {
        this.location_.search('c', this.characterClass.name);
    }
    if (this.specializationType) {
        this.location_.search('t', this.specializationType.name);
    }
    for (var i = 0; i < this.spells.length; i++) {
        if (this.spells && this.spells.length > 0) {
            this.location_.search('s' + i, this.spells[i]);
        }
    }
};

spellbook.CharacterModel.prototype.load = function() {
    this.loading = true;
    try {
        var savedState = this.location_.search();

        this.selectLevel(parseInt(savedState.l || 1));

        this.spellBookService_.getClassNames().then(function(classNames) {
            this.selectClass(savedState.c || classNames[0]).then(function() {
                this.selectSpecializationType(savedState.t);
            }.bind(this));
        }.bind(this));

        for (var i = 0; i < this.level; i++) {
            var spells = savedState['s' + i];
            if (angular.isArray(spells)) {
                this.spells[i] = spells;
            } else if (spells) {
                this.spells[i] = [spells];
            }
        }

        //this.selectSpecializationType = savedState.s;
    } finally {
        this.loading = false;
    }
};


spellBookApp.service('spellBookService', spellbook.SpellBookService);
spellBookApp.service('characterModelService', spellbook.CharacterModel);
