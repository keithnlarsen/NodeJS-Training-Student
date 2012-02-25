describe( 'nodejs-bootcamp.tests.unit.controllers.home', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );

  var mockApp = {};

  // System under test
  var homeController;

  beforeEach( function ( done ) {
    homeController = require( '../../../controllers/homeController.js' );
    homeController.initialize( mockApp );

    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.index(req, res, next)', function () {
    it( 'should render the correct view, passing the correct title', function ( done ) {
      // Setup
      var mockReq = {};
      var mockRes = {
        render: stub.sync()
      };

      // Test
      homeController.index( mockReq, mockRes );

      // Verify
      mockRes.render.called.withArguments( 'todo', { title: "MongoDB Backed TODO App" } );

      done();
    } );
  } );

} );