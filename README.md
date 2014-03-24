spellbook
=========


TODO
    static data service
        load static JSON files
        merge classes data from both files into single array
        classes
            SpecType
                name String
                spells String[][]
                getSpells(level)
            Class
                name String
                spells String[]
                getSpecName() String
                getSpecTypes() SpecType[]
                getSpecType(specType) SpecType
            Spell
                name
                level
                time
                duration
                range
                school
                description
        exposes
            getClasses() Class[]
            getClass(name) Class
            getSpells() Spell[]
            getSpell(name) Spell
    char data service
        fires event when char data changes
        exposes
            setLevel(level)
            getLevel() Number
            setClass(name)
            getClass() Class
            setSpecType(specType)
            getSpecType() SpecType
            getSpellNames(level) String[]
            addSpell(level, spellName)
            removeSpell(level, spellName)
    state service
        on URL change re-loads the char data from the URL state
        listens to char data change event and persists the current char state to the URL
        Will be a longish url using names but no good way to do IDs for now
