// ************************************
// A method that Netscape forgot to give us to support Prototypal style inheritance
var object = (function () {
  function F () {
  }

  return function ( o ) {
    F.prototype = o;
    return new F();
  };
})();