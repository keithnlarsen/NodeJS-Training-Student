// Exercise 5 - Classical Inheritance
// **********************************

// Modem Constructor
//***************************
var Modem = Class.extend( {
  init: function ( status, macAddress, ipAddress ) {
    this.status = status || "ON";
    this.macAddress = macAddress || "00-13-72-17-13-4C";
    this.ipAddress = ipAddress || "192.168.10.1";
  },

  ping: function () {
    return (this.status == "ON");
  }
} );

// DigitalPhone Constructor
//***************************
var DigitalPhone = Modem.extend( {
  init: function ( telephoneNumber ) {
    this.telephoneNumber = telephoneNumber || "4035551212";
    this._super();
  },

  formattedTn: function () {
    return "(" + this.telephoneNumber.substring( 0, 3 ) + ")" + this.telephoneNumber.substring( 3, 6 ) + "-" + this.telephoneNumber.substring( 6, 10 );
  }
} );

// Docsis Constructor
//***************************

var Docsis = Modem.extend( {
  init: function ( rx, tx ) {
    this.rx = rx || 1024;
    this.tx = tx || 13942;
    this._super();
  },

  ratio: function (){
    return this.rx / this.tx;
  }
})