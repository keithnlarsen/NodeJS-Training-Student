var modemTests = new JsUnitTest.Unit.Runner({
	
	setup: function() {
		modem = object(Modem);
	},
    
	teardown: function() {
		delete(modem);
	},
    
	testModemIsObject: function() { with(this) {
		assertInstanceOf(Object, modem);
	}},

	testShouldCallPingAndGetBackTrue: function() { with(this) {
		assert(modem.ping());
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
},{
	testLog: "testModem"
}); 

var digitalPhoneTests = new JsUnitTest.Unit.Runner({
	
	setup: function() {
		dp = object(DigitalPhone);
		dp.telephoneNumber = "4035551212";
	},
    
	teardown: function() {
		delete(dp);
	},
    
	testDigitalPhoneIsObject: function() { with(this) {
		assertInstanceOf(Object, dp);
	}},

	testShouldCallPingAndGetBackTrue: function() { with(this) {
		assert(dp.ping());
	}},

	testDigitalPhoneHasPublicMacAddress: function() { with(this) {
		assertNotNullOrUndefined(dp.ipAddress);
	}},

	testDigitalPhoneHasPublicIpAddress: function() { with(this) {
		assertNotNullOrUndefined(dp.macAddress);
	}},

	testDigitalPhoneHasPublicStatus: function() { with(this) {
		assertNotNullOrUndefined(dp.status);
	}},

	testDigitalPhoneHasPublicTelephoneNumber: function() { with(this) {
		assert(dp.telephoneNumber == "4035551212", "Expected '4035551212' but received: " + dp.telephoneNumber);
	}},

	testShouldCallFormattedTNAndReturnPhoneNumber: function() { with(this) {
		assert(dp.formattedTn() == "(403)555-1212", "Expected '(403)555-1212' but received: " + dp.formattedTn());
	}}
},{
	testLog: "testDigitalPhone"
}); 

var docsisTests = new JsUnitTest.Unit.Runner({
	
	setup: function() {
		doc = object(Docsis)
		doc.rx = 1038;
		doc.tx = 2393;
	},
    
	teardown: function() {
		delete(doc);
	},
    
	testDigitalPhoneIsObject: function() { with(this) {
		assertInstanceOf(Object, doc);
	}},

	testShouldCallPingAndGetBackTrue: function() { with(this) {
		assert(doc.ping());
	}},

	testDigitalPhoneHasPublicMacAddress: function() { with(this) {
		assertNotNullOrUndefined(doc.ipAddress);
	}},

	testDigitalPhoneHasPublicIpAddress: function() { with(this) {
		assertNotNullOrUndefined(doc.macAddress);
	}},

	testDigitalPhoneHasPublicStatus: function() { with(this) {
		assertNotNullOrUndefined(doc.status);
	}},

	testDigitalPhoneHasPublicRx: function() { with(this) {
		assert(parseInt(doc.rx, 10) === parseInt(1038, 10), "Expected 1038 but received: " + doc.rx);
	}},

	testDigitalPhoneHasPublicTx: function() { with(this) {
		assert(parseInt(doc.tx, 10) === parseInt(2393, 10), "Expected 2393 but received: " + doc.tx);
	}},

	testShouldCallRatio: function() { with(this) {
		assert((doc.ratio() === 0.43376514834935226), "Expected 0.43376514834935226 but recieved: " + doc.ratio());
	}}
},{
	testLog: "testDocsis"
});