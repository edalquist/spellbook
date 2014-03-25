'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  var httpBackend, spellBookService;

  beforeEach(module('spellBookApp'));

  beforeEach(inject(function($httpBackend, _spellBookService_) {
    httpBackend = $httpBackend;
    spellBookService = _spellBookService_
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('version', function() {
    it('should return current version', function() {
      httpBackend.when('GET', 'data/classes.json').respond(classData);
      httpBackend.when('GET', 'data/spells.json').respond(spellData);
      httpBackend.flush();

      //httpBackend.
      expect(spellBookService.getClasses()).toEqual('classes');
    });
  });

  var spellData = {};

  var classData = [
    {
      "name": "Bard",
      "spec": {
        "name": "College",
        "types": [
          {
            "name":"Valor"
          },
          {
            "name":"Wit"
          }
        ]
      }
    }
  ];
});
