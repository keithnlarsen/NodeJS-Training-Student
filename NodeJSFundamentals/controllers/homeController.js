module.exports = ( function () {
  var _app;

  function initialize ( app ) {
    _app = app;
  }

  function index ( req, res, next ) {
    res.render( 'todo', { title: "MongoDB Backed TODO App" } );
  }

  return {
    initialize: initialize,
    index: index
  }
})();