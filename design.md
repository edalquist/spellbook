firebaseService
	  	var ref = new Firebase('https://amber-torch-9218.firebaseio.com');
	  	var authClient = $firebaseSimpleLogin(ref);
		var sync = $firebase(ref);
		// look into the service extension stuff, this should be a singleton
		// expose root Firebase object
		// expose auth client as well maybe or should this be its own service

firebaseAuthService
