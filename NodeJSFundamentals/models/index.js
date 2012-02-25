module.exports = ( function () {
  var _todo = require( './todo' );

  function initialize ( app ) {
    _todo.initialize( app );
  }

  return {
    initialize: initialize,
    todo: _todo
  }
})();