module.exports = Object.freeze({
    REGISTERED: 0,		// user has downloaded the app, registered and verified PIN
    UNREGISTERED: 1,	// user hasn't downloaded the app but we 
    					// know about it because of the invitee list of a meeting
    PENDING_VERIFICATION: 2	// user has downloaded the app, registerd but
    						// is waiting for user to verify his PIN
});