/**
 * Specialization type for a class, has a name and a list of spells by level
 */
SpecializationType = function(data) {
    // String
    this.name = data.name;
    // Array<Array<String>>
    this.spellNamesByLevel = data.spells;
};

/**
 * Get the list of specialization spells for the spefied level
 */
SpecializationType.prototype.getSpellNames = function(level) {
    return this.spellNamesByLevel[level - 1] || [];
};



/**
 * Specialization for a class, include the name of the specialization and builds
 * the types of specializations
 */
Specialization = function(data) {
    this.name = data.name;
    var types = {};
    angular.forEach(data.types, function(type) {
        var specType = new SpecializationType(type);
        types[specType.name] = specType;
    });
    this.types = types;
};

/**
 * Get the SpecialiationType for the specified name
 */
Specialization.prototype.getType = function(name) {
    return this.types[name];
};

/**
 * Returns Array<String> of the names of the specialization types
 */
Specialization.prototype.getTypes = function() {
    return Object.keys(this.types);
};



/**
 * A character class,
 *
 * specData - class data from classes.json
 * spellData - class fata from spells.json
 */
CharacterClass = function(specData, spellData) {
    if (specData.name != spellData.name) {
        throw "specData and spellData names do not match! '" + specData.name + "' != '" + spellData.name + "'";
    }

    // String
    this.name = specData.name;

    if (specData.spec) {
        this.specialization = new Specialization(specData.spec);
    } else {
        this.specialization = null;
    }

    // Array<Array<String>>
    this.spellNamesByLevel = spellData.spells;
};

/**
 * Get array of spell names for the specified level
 */
CharacterClass.prototype.getSpellNames = function(level) {
    return this.spellNamesByLevel[level] || [];
};


/**
 * A spell
 */
Spell = function(data) {
    this.name = data.name;
    this.level = data.level;
    this.time = data.time;
    this.range = data.range;
    this.duration = data.duration;
    this.school = data.school;
    this.description = data.description;
};
