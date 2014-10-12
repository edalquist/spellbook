'use strict';

angular.module('spellbook')
  .controller('EditCtrl', ['$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {
    var ref = new Firebase('https://amber-torch-9218.firebaseio.com/spells/' + $routeParams.name);
    var sync = $firebase(ref);
    var syncObject = sync.$asObject();

    // bind spell data to scope
    syncObject.$bindTo($scope, 'spell');

    $scope.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.classes = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
    $scope.schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
  }])

  /**
   *  Simple directive used to quickly construct `Floating Label` text fields
   *  NOTE: the label field is considered a constant specified as an attribute
   */
  .directive('tfFloat', function() {
    return {
      restrict: 'E',
      replace: true,
      scope : {
        fid : '@?',
        value : '='
      },
      compile : function() {
        return {
          pre : function(scope, element, attrs) {
            // transpose `disabled` flag
            if ( angular.isDefined(attrs.disabled) ) {
              element.attr('disabled', true);
              scope.isDisabled = true;
            }

            // transpose the `label` value
            scope.label = attrs.label || '';
            scope.fid = scope.fid || scope.label;

            // transpose optional `type` and `class` settings
            element.attr('type', attrs.type || 'text');
            element.attr('class', attrs.class );
          }
        };
      },
      template:
        '<material-input-group ng-disabled="isDisabled">' +
          '<label for="{{fid}}">{{label}}</label>' +
          '<material-input id="{{fid}}" ng-model="value">' +
        '</material-input-group>'
    };
  })
  .directive('myMaterialTextarea', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<textarea >',
      require: ['^?materialInputGroup', '?ngModel'],
      link: function(scope, element, attr, ctrls) {
        var inputGroupCtrl = ctrls[0];
        var ngModelCtrl = ctrls[1];
        if (!inputGroupCtrl) {
          return;
        }

        // TODO need access to util class scan for disabled and transpose the `type` value to the <input> element
        //var isDisabled = Util.isParentDisabled(element);

        // element.attr('tabindex', isDisabled ? -1 : 0 );

        // When the input value changes, check if it "has" a value, and
        // set the appropriate class on the input group
        if (ngModelCtrl) {
          //Add a $formatter so we don't use up the render function
          ngModelCtrl.$formatters.push(function(value) {
            inputGroupCtrl.setHasValue(!!value);
            return value;
          });
        }

        element.on('input', function() {
          inputGroupCtrl.setHasValue(!!element.val());
        });

        // When the input focuses, add the focused class to the group
        element.on('focus', function() {
          inputGroupCtrl.setFocused(true);
        });
        // When the input blurs, remove the focused class from the group
        element.on('blur', function() {
          inputGroupCtrl.setFocused(false);
        });

        scope.$on('$destroy', function() {
          inputGroupCtrl.setFocused(false);
          inputGroupCtrl.setHasValue(false);
        });
      }
    };
  })
  .directive('myMaterialSelect', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<select><option ng-repeat="opt in options">{{opt}}</option></select>',
      scope: {
        options: '=options'
      },
      require: ['^?materialInputGroup', '?ngModel'],
      link: function(scope, element, attr, ctrls) {
        var inputGroupCtrl = ctrls[0];
        var ngModelCtrl = ctrls[1];
        if (!inputGroupCtrl) {
          return;
        }

        // TODO need access to util class scan for disabled and transpose the `type` value to the <input> element
        //var isDisabled = Util.isParentDisabled(element);

        // element.attr('tabindex', isDisabled ? -1 : 0 );

        // When the input value changes, check if it "has" a value, and
        // set the appropriate class on the input group
        if (ngModelCtrl) {
          //Add a $formatter so we don't use up the render function
          ngModelCtrl.$formatters.push(function(value) {
            inputGroupCtrl.setHasValue(!!value);
            return value;
          });
        }

        element.on('input', function() {
          inputGroupCtrl.setHasValue(!!element.val());
        });

        // When the input focuses, add the focused class to the group
        element.on('focus', function() {
          inputGroupCtrl.setFocused(true);
        });
        // When the input blurs, remove the focused class from the group
        element.on('blur', function() {
          inputGroupCtrl.setFocused(false);
        });

        scope.$on('$destroy', function() {
          inputGroupCtrl.setFocused(false);
          inputGroupCtrl.setHasValue(false);
        });
      }
    };
  });
