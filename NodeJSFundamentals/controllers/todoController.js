module.exports = ( function () {
  var _todo;
  var _app;

  function initialize ( app ) {
    _app = app;
    _todo = app.models.todo.getModel();
  }

  function index ( req, res, next ) {
    throw(new Error('Not Implemented'));
  }

  function list ( req, res, next ) {
    throw(new Error('Not Implemented'));
  }

  function insert ( req, res, next ) {
    _todo.create( req.body, function ( err, todo ) {
      res.send( todo.toObject(), 201 );
    } );
  }

  function update ( req, res, next ) {
    var json = {
      text: req.body.text,
      done: req.body.done,
      order: req.body.order
    };

    _todo.update( { _id: req.params.id }, json, function ( err, todo ) {
      res.send();
    } );
  }

  function remove ( req, res, next ) {
    _todo.findById( req.params.id, function ( err, todo ) {
      todo.remove( function ( err ) {
        res.send()
      } );
    } );
  }

  return {
    initialize: initialize,
    index: index,
    list: list,
    insert: insert,
    update: update,
    remove: remove
  }
})();