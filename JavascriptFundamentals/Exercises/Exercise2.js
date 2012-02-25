// Exercise 2 - Pseudo-Classical Inheritance
// *****************************************

// Modem Constructor
//***************************
function Modem ( status, macAddress, ipAddress ) {
  this.status = status || "ON";
  this.macAddress = macAddress || "00-13-72-17-13-4C";
  this.ipAddress = ipAddress || "192.168.10.1";
}

Modem.prototype.ping = function () {
  return (this.status == "ON");
};

// DigitalPhone Constructor
//***************************
function DigitalPhone ( telephoneNumber ) {
  this.telephoneNumber = telephoneNumber || "4035551212";
}

DigitalPhone.prototype = new Modem();

DigitalPhone.prototype.formattedTn = function () {
  return "(" + this.telephoneNumber.substring( 0, 3 ) + ")" + this.telephoneNumber.substring( 3, 6 ) + "-" + this.telephoneNumber.substring( 6, 10 );
};

// Docsis Constructor
//***************************
function Docsis ( rx, tx ) {
  this.rx = rx || "1024";
  this.tx = tx || "13942";
}

// Inherit from Modem

// Implement ratio method that return the result of rx / tx;
