// Exercise 3 - Prototypal Inheritance
// ***********************************

// Modem Singleton
//***************************
var Modem = function () {
  var _status = "ON";
  var _macAddress = "00-13-72-17-13-4C";

  return {
    status: _status,
    macAddress: _macAddress,
    ipAddress: "192.168.10.1",
    ping: function () {
      return (this.status == "ON");
    }
  };
}();

// DigitalPhone Object
//***************************
var DigitalPhone = object( Modem );
DigitalPhone.telephoneNumber = "4035551212";
DigitalPhone.formattedTn = function () {
  return "(" + this.telephoneNumber.substring( 0, 3 ) + ")" + this.telephoneNumber.substring( 3, 6 ) + "-" + this.telephoneNumber.substring( 6, 10 );
};

// Docsis Object
//***************************

// Implement Docsis object from Modem
// rx = "1024"
// tx = "13942"

// Implement ration