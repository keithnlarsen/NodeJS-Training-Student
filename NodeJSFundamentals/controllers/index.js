module.exports = ( function () {
  var _todoController = require( './todoController' );
  var _homeController = require('./homeController');
  var _app;

  function initialize ( app ) {
    _app = app;
    _homeController.initialize( _app );
    _todoController.initialize( _app );
  }

  return {
    todo: _todoController,
    home: _homeController,
    initialize: initialize
  }
})();