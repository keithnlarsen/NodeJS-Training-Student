// Exercise 1 - Singletons
// ***********************

var Modem = function () {
  var _status = "ON";
  var _macAddress = "23423";

  return {
    status: _status,
    macAddress: _macAddress,
    ipAddress: "192.168.0.1",

    ping: function () {
      return (this.status == "ON");
    }
  }
}();