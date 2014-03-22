//TODO setup unit tests for this!

/**
 * Create a new SpellBook Service
 */
SpellBookService = funtion($http, $q) {
    var that = this;
    this.http_ = $http;

    // Data fields
    this.spellDetails_ = [];
    this.classSpells_ = [];
    this.classDomains_ = [];

    var classesPromise = $http.get('data/classes.json').success(function(classes) {
        that.classDomains = classes;
    });
    var spellbookPromise = $http.get('data/spells.json').success(function(spellBook) {
        that.spellDetails = spellBook.spells;
        that.classSeplls = spellBook.classes;
    });

    this.dataLoadPromise_ = $q.all([classesPromise, spellbookPromise]).then(function() {
        //TODO merge classes into one array
    });
};

SpellBookService.prototype.getClasses = function() {
    var that = this;
    return this.dataLoadPromise_.then(function() {
        that.
    });
}


spellBookApp.service('spellBookService', SpellBookService);
