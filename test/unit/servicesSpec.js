'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  var httpBackend, spellBookService, classesData, spellsData;

  beforeEach(module('spellBookApp'));

  beforeEach(inject(function($httpBackend, _spellBookService_) {
    //jasmine.addCustomEqualityTester();

    httpBackend = $httpBackend;
    spellBookService = _spellBookService_

    jasmine.getJSONFixtures().fixturesPath = 'base/app/data';

    classesData = getJSONFixture('classes.json');
    spellsData = getJSONFixture('spells.json');
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('spellBookService', function() {
    beforeEach(function() {
      httpBackend.when('GET', 'data/classes.json').respond(classesData);
      httpBackend.when('GET', 'data/spells.json').respond(spellsData);
      httpBackend.flush();
    });

    it('getClassNames', function() {
      spellBookService.getClassNames().then(function(data) {
        expect(data).toEqual([ 'Bard', 'Cleric', 'Druid', 'Mage', 'Paladin', 'Ranger' ]);
      });
    });

    it('getClass', function() {
      spellBookService.getClass('Bard').then(function(data) {
        expect(data.name).toEqual('Bard');
      });

      spellBookService.getClass('InvalidClass').then(function(data) {
        expect(data).not.toBeDefined();
      });
    });
  });
});
