Search
	text search
		looks in all fields
	qualifiers
		class
		school
		caster level
		time
		range
		components
		duration
		concentation

Edit
	Add Spell
	Edit Spell


Data Model
	Spell
		String name
		Map<String, ?> attributes //would be nice to define concrete types for attribute values, better searching
		Set<String> classes
		String description //UI should render markdown here

	Class
		Set<String> spells



Reference Links
	MD rendering support for angular: https://www.npmjs.org/package/angular-md
