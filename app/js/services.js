/**
 * Create a new SpellBook Service
 */

spellbook.SpellBookService = function($http, $q) {
    this.http_ = $http;

    var classesPromise = $http.get('data/classes.json');
    var spellsPromise = $http.get('data/spells.json');

    this.dataLoadedDeferred = $q.defer();

    var allDataLoaded = $q.all({
        classes: classesPromise,
        spells: spellsPromise
    });

    var that = this;
    allDataLoaded.then(function(responses) {
        //TODO build classes and spells hashes
        that.dataLoadedDeferred.resolve("foo");
    });
};

spellbook.SpellBookService.prototype.getClasses = function() {
    this.dataLoadedDeferred.promise.then(function(data) {
        console.log(data);
    });
    return "classes";
};


spellBookApp.service('spellBookService', spellbook.SpellBookService);
