spellBookApp.controller('SpellBookCtrl', function ($scope, spellBookService, characterModelService) {
    $scope.range = function(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    spellBookService.getClassNames().then(function(classNames) {
        $scope.classNames = classNames;
    });

    $scope.spellSelectors = [];
    $scope.model = characterModelService;

    $scope.spellSelected = function(level) {
        $scope.model.selectSpell(level, $scope.spellSelectors[level - 1]);
        $scope.spellSelectors[level - 1] = null;
    };

    $scope.filterSpells = function(level, spellName) {
        console.log(level, spellName);
        return true;
    };

    // Load the initial state
    characterModelService.load();
});
