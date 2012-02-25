var modemTests = new JsUnitTest.Unit.Runner({
	setup: function() {
		modem = Modem;
	},
    
	teardown: function() {
	},
    
	testModemIsObject: function() { with(this) {
		assertInstanceOf(Object, modem);
	}},

	testShouldCallPingAndGetBackTrue: function() { with(this) {
		assert(Modem.ping());
	}},

	testModemHasPublicMacAddress: function() { with(this) {
		assertNotNullOrUndefined(modem.ipAddress);
	}},

	testModemHasPublicIpAddress: function() { with(this) {
		assertNotNullOrUndefined(modem.macAddress);
	}},

	testModemHasPublicStatus: function() { with(this) {
		assertNotNullOrUndefined(modem.status);
	}}
});