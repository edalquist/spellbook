@Grab(group='org.ccil.cowan.tagsoup',
      module='tagsoup', version='1.2' )

def cli = new CliBuilder(usage: 'parseSpells.groovy spells.html');
def options = cli.parse(args);
if (!options) {
  System.exit(-1);
}

def extraArguments = options.arguments()
if (!extraArguments) {
  cli.usage();
  System.exit(-1);
}

def spellsFile = new File(extraArguments[0]);
if (!spellsFile.exists()) {
  println "'" + spellsFile + "' does not exist"; 
  cli.usage();
  System.exit(-1);
}


// Setup HTML friendly parser
def tagsoupParser = new org.ccil.cowan.tagsoup.Parser()
def slurper = new XmlSlurper(tagsoupParser)
def htmlNode = slurper.parse(new File(extraArguments[0]));


enum ParseStep { CLASS_SPELLS, SPELL_DETAILS }

class SpellBook { List classes = []; List spells = []; }
class Class { String name; List spells = []; }
class Spell { String name; Integer level; String school; String time; String range; String duration; String description = ""; }


SpellBook data = new SpellBook();


ParseStep currentStep = null;
Class currentClass = null;
Spell currentSpell = null;
Integer spellLevel = null;
for (def line in htmlNode.body.div.children()) {
  // Switch parse step as appropriate
  switch (line['@class']) {
    case "cls_003":
      currentStep = ParseStep.CLASS_SPELLS;
      currentClass = null;
      currentSpell = null
      spellLevel = null;
      break;
    case "cls_009":
      currentStep = ParseStep.SPELL_DETAILS;
      currentClass = null;
      currentSpell = null
      spellLevel = null;
      break;
  }

  if (currentStep == ParseStep.CLASS_SPELLS) {
    switch (line['@class']) {
      // New Class
      case "cls_004":
        currentClass = new Class(name: line.text().trim());
        data.classes << currentClass;
        spellLevel = null;
        break;
      // Spell Levels
      case "cls_005":
        if (line.text() == "Cantrips") {
          spellLevel = 0;
        } else {
          def levelMatcher = (line.text() =~ /Level (\d+) Spells/);
          spellLevel = levelMatcher[0][1].toInteger();
        }
        
        currentClass.spells[spellLevel] = [];
        break;
      // Spell Name
      case "cls_002":
        currentClass.spells[spellLevel] << line.text().trim();
        break;
    }
  } else if (currentStep == ParseStep.SPELL_DETAILS) {
    switch (line['@class']) {
      // New Spell
      case "cls_011":
        currentSpell = new Spell(name: line.text().trim());
        data.spells << currentSpell;
        break;

      // Most of these are spell meta-data, some however are part of spell description data
      case "cls_012":
      case "cls_013":
        def lineMatcher;
        // 1 child content is the level and school
        if (line.children().size() == 1) {
          if ((lineMatcher = (line.text() =~ /(\d)..-level (.*)/)).matches()) {
            currentSpell.level = lineMatcher[0][1].toInteger();
            currentSpell.school = lineMatcher[0][2];
          } else if ((lineMatcher = (line.text() =~ /(.*) cantrip/)).matches() || (lineMatcher = (line.text() =~ /Cantrip (.*)/)).matches()) {
            currentSpell.level = 0;
            currentSpell.school = lineMatcher[0][1];
          } else {
            println "BROKEN_" + line.children().size() + " >> " + line.text();
          }
        // Most 2 child are meta-data
        } else if (line.children().size() == 2) {
          def heading = line.children()[0].text().trim();
          switch (heading) {
            case "Casting Time:":
              currentSpell.time = line.children()[1].text().trim();
              break;
            case "Range:":
              currentSpell.range = line.children()[1].text().trim();
              break;
            case "Duration:":
              currentSpell.duration = line.children()[1].text().trim();
              break;
            default:
              currentSpell.description += line.text().trim() + " ";
              break;
          }
        // These are description data
        } else {
          currentSpell.description += line.text().trim() + " ";
        }
        break;
      case "cls_010":
        currentSpell.description += line.text().trim() + " ";
        break;
    }
  }
}


// Convert data model to JSON
def builder = new groovy.json.JsonBuilder(data)
println builder.toPrettyString();

