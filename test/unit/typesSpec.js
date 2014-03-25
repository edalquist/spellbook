'use strict';

/* jasmine specs for types go here */

describe('types', function() {
  it("should create Spell", function () {
      var spell = new Spell({
            "level": 8,
            "time": "1 action",
            "range": "50 feet",
            "description": "Choose a creature within range that you can see. The target must make a Wisdom saving throw. On a failed save, you force the target's soul into a gemstone. While its soul is so trapped, the target's body and all the equipment it is carrying cease to exist. the gem is broken, at which time the target's body re-forms in an unoccupied space nearest to the gem and in the same state as when this spell was cast on it, with all the equipment it was carrying when it was trapped. telepathically with the trapped soul. Other creatures that inspect the gemstone see a tiny figure inside it. cast the spell, the target has disadvantage on the saving throw. worth at least 1,000 gp for each Hit Die of the creature you would trap. ",
            "name": "Trap the Soul",
            "duration": "Permanent",
            "school": "conjuration"
        });

      // Verify fields
      expect(spell).toBeDefined();
      expect(spell.name).toEqual('Trap the Soul');
      expect(spell.level).toEqual(8);
      expect(spell.school).toEqual('conjuration');
      expect(spell.range).toEqual('50 feet');
      expect(spell.time).toEqual('1 action');
      expect(spell.duration).toEqual('Permanent');
      expect(spell.description).toEqual("Choose a creature within range that you can see. The target must make a Wisdom saving throw. On a failed save, you force the target's soul into a gemstone. While its soul is so trapped, the target's body and all the equipment it is carrying cease to exist. the gem is broken, at which time the target's body re-forms in an unoccupied space nearest to the gem and in the same state as when this spell was cast on it, with all the equipment it was carrying when it was trapped. telepathically with the trapped soul. Other creatures that inspect the gemstone see a tiny figure inside it. cast the spell, the target has disadvantage on the saving throw. worth at least 1,000 gp for each Hit Die of the creature you would trap. ");
  });

  it("should create invalid CharacterClass", function () {
    expect(function() {
      new CharacterClass(classSpellData, {name:"foobar"});
    }).toThrow();
  });

  it("should create CharacterClass", function () {
    var characterClass = new CharacterClass(classSpecData, classSpellData);

    expect(characterClass).toBeDefined();
    expect(characterClass.name).toEqual('Cleric');
    expect(characterClass.specialization).not.toBeNull();
    expect(characterClass.getSpellNames(0)).toEqual(['Guidance', 'Light', 'Resistance', 'Sacred Flame', 'Spare the Dying', 'Thaumaturgy']);

    // Testing Specialization
    var specialization = characterClass.specialization;
    expect(specialization.name).toEqual('Domain');
    expect(specialization.getTypes()).toEqual([ 'Life', 'Light', 'War' ]);

    // Testing SpecializationType
    var lightSpec = specialization.getType('Light');
    expect(lightSpec).toBeDefined();
    expect(lightSpec.name).toEqual('Light');
    expect(lightSpec.getSpellNames(1)).toEqual([ 'Burning Hands', 'Faerie Fire' ]);

  });

  var classSpecData = {
    "name":"Cleric",
    "spec": {
      "name": "Domain",
      "types": [
        {
          "name": "Life"
        },
        {
          "name": "Light",
          "spells": [
            [
              "Burning Hands",
              "Faerie Fire"
            ],
            null,
            [
              "Flaming Sphere",
              "Scorching Ray"
            ],
            null,
            [
              "Daylight",
              "Fireball"
            ],
            null,
            [
              "Guardian of Faith",
              "Wall of Fire"
            ],
            null,
            [
              "Flame Strike",
              "True Seeing"
            ],
            null,
            [
              "Sunbeam"
            ],
            null,
            null,
            null,
            [
              "Sunburst"
            ]
          ]
        },
        {
          "name": "War"
        }
      ]
    }
  };

  var classSpellData = {
      "spells": [
          [
              "Guidance",
              "Light",
              "Resistance",
              "Sacred Flame",
              "Spare the Dying",
              "Thaumaturgy"
          ],
          [
              "Bless",
              "Cause Fear",
              "Command",
              "Create or Destroy Water",
              "Cure Wounds",
              "Detect Good and Evil",
              "Detect Magic",
              "Detect Poison and Disease",
              "Healing Word",
              "Inflict Wounds",
              "Protection from Evil",
              "Purify Food and Drink",
              "Sanctuary",
              "Shield of Faith"
          ],
          [
              "Aid",
              "Augury",
              "Gentle Repose",
              "Hold Person",
              "Lesser Restoration",
              "Prayer of Healing",
              "Protection from Poison",
              "Silence",
              "Spiritual Weapon",
              "Zone of Truth"
          ],
          [
              "Animate Dead",
              "Beacon of Hope",
              "Create Food and Water",
              "Daylight",
              "Dispel Magic",
              "Holy Vigor",
              "Mass Healing Word",
              "Prayer",
              "Protection from Energy",
              "Remove Curse",
              "Speak with Dead",
              "Water Walk"
          ],
          [
              "Air Walk",
              "Death Ward",
              "Divination",
              "Freedom of Movement",
              "Guardian of Faith"
          ],
          [
              "Commune",
              "Flame Strike",
              "Insect Plague",
              "Mass Cure Wounds",
              "Raise Dead",
              "Scrying",
              "True Seeing"
          ],
          [
              "Banishment",
              "Blade Barrier",
              "Greater Dispel Magic",
              "Harm",
              "Heal",
              "Planar Ally"
          ],
          [
              "Destruction",
              "Greater Restoration",
              "Fire Storm",
              "Holy Word",
              "Plane Shift",
              "Regenerate",
              "Resurrection"
          ],
          [
              "Antimagic Field",
              "Earthquake",
              "Holy Aura"
          ],
          [
              "Astral Projection",
              "Gate",
              "Mass Heal",
              "True Resurrection"
          ]
      ],
      "name": "Cleric"
  };
});
