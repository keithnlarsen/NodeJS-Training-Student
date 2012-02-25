module.exports = (function () {

  var _name = 'Todo';
  var _model;
  var _schema;

  function initialize ( app ) {
    var Schema = app.mongoose.Schema;

    _schema = new Schema( {
      text: String,
      done: Boolean,
      order: Number
    } );

    _model = app.mongoose.model( 'Todo', _schema );
  }

  return {
    getName: function () {
      return _name;
    },
    getModel: function () {
      return _model;
    },
    getSchema: function () {
      return _schema;
    },

    initialize: initialize
  };
})();