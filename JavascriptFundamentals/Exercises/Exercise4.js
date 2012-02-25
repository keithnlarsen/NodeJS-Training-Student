// Exercise 4 - Parasitic Inheritance
// **********************************

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

// DigitalPhone Constructor
//***************************
function DigitalPhone ( telephoneNumber ) {
  var that = object( Modem );
  that.telephoneNumber = telephoneNumber || "4034516077";

  that.formattedTn = function () {
    return "(" + this.telephoneNumber.substring( 0, 3 ) + ")" + this.telephoneNumber.substring( 3, 6 ) + "-" + this.telephoneNumber.substring( 6, 10 );
  };

  return that;
}

// Docsis Constructor
//***************************

function Docsis ( rx, tx ) {
  var that = object( Modem );
  that.rx = rx || 1024;
  that.tx = tx || 13942;

  that.ratio = function () {
    return this.rx / this.tx;
  }
  return that;
}