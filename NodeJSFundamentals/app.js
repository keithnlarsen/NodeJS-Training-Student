module.exports = (function () {

  var express = require( "express" );
  var app = express.createServer();

  app.name = 'NodeJS Bootcamp Todo';

  // MongoDB
  app.mongoose = require( 'mongoose' );
  app.mongoose.connect( 'mongodb://localhost/todo' );

  app.configure( function () {
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( app.router );
    app.use( express.static( __dirname + "/public" ) );
    app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
    app.set( 'views', __dirname + "/views" );
    app.set( 'view engine', 'jade' );
  } );

  app.models = require( './models' );
  app.models.initialize( app );

  app.controllers = require( './controllers' );
  app.controllers.initialize( app );

  var routes = require( './routes' );
  routes.initialize( app );

  if ( !module.parent ) {
    var port = process.env.npm_package_config_port || 3000;

    app.listen( port );
    console.log( app.name + ' App listening on port ' + port + ' in ' + app.settings.env + ' mode' )
  }

  return app;
})();