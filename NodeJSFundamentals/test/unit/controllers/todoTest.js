describe( 'nodejs-bootcamp.tests.unit.controllers.todo', function () {

  var should = require( 'should' );
  var stub = require( 'stub.js' );

  var todoJson = { text: 'First Todo', done: false, order: 1 };
  var mockApp = {};
  var mockTodoModel = {};
  var mockTodo = {};

  // System under test
  var todoController;

  beforeEach( function ( done ) {
    todoController = require( '../../../controllers/todoController.js' );

    mockApp = {
      models: {
        todo: {
          getModel: stub.sync( null, mockTodoModel )
        }
      }
    };

    mockTodo = mockApp.models.todo;
    todoController.initialize( mockApp );

    done();
  } );

  afterEach( function ( done ) {
    done();
  } );

  describe( '.index(req, res, next)', function () {
    it( 'should call findById with the id query parameter and send response', function ( done ) {

      // Setup
      var mockReq = {
        body: todoJson,
        params: {
          id: 1
        }
      };

      var mockRes = {
        send: stub.sync()
      };

      var todoResult = {
        toObject: stub.sync( null, todoJson )
      };

      mockTodoModel.findById = stub.async( null, todoResult );

      // Test
      todoController.index( mockReq, mockRes );

      // Verify
      mockTodoModel.findById.called.withArguments( 1 );
      todoResult.toObject.called.withNoArguments();
      mockRes.send.called.withArguments( todoJson );

      done();
    } );
  } );

  describe( '.index(req, res, next)', function () {
    it( 'should call next if and error is return', function ( done ) {

      // Setup
      var mockReq = {
        body: todoJson,
        params: {
          id: 1
        }
      };
      var mockRes = {
        send: stub.sync()
      };

      var next = stub.sync( null );

      var err = new Error( "test" );
      mockTodoModel.findById = stub.async( err );

      // Test
      todoController.index( mockReq, mockRes, next );

      // Verify
      mockTodoModel.findById.called.withArguments( 1 );
      next.called.withArguments( err );

      done();
    } );
  } );

  describe( '.list(req, res, next)', function () {
    it( 'should call exec on the find query and send the response', function ( done ) {

      // Setup
      var mockReq = {};

      var mockRes = {
        send: stub.sync()
      };

      var todoResult = {
        toObject: stub.sync( null, todoJson )
      };

      var todoResultList = [todoResult, todoResult];
      mockTodoModel.find = stub.sync( null, { exec: stub.async( null, todoResultList ) } );

      // Test
      todoController.list( mockReq, mockRes );

      // Verify
      mockTodoModel.find.called.withArguments( {} );
      mockTodoModel.find().exec.called.withNoArguments();
      todoResult.toObject.called.count( 2 );
      mockRes.send.called.withArguments( [todoJson, todoJson] );

      done();
    } );
  } );

  describe( '.insert(req, res, next)', function () {
    it( 'should call create on the Mongoose model object return the result and status code 201', function ( done ) {

      // Setup
      var mockReq = {
        body: todoJson
      };

      var mockRes = {
        send: stub.sync()
      };

      var todoResult = {
        toObject: stub.sync( null, todoJson )
      };

      mockTodoModel.create = stub.async( null, todoResult );

      // Test
      todoController.insert( mockReq, mockRes );

      // Verify
      mockTodoModel.create.called.withArguments( todoJson );
      todoResult.toObject.called.count( 1 );
      mockRes.send.called.withArguments( todoJson, 201 );

      done();
    } );
  } );

  describe( '.update(req, res, next)', function () {
    it( 'should call update on the Mongoose model object return the result and status code 200', function ( done ) {

      // Setup
      var mockReq = {
        body: todoJson,
        params: {
          id: 1
        }
      };

      var mockRes = {
        send: stub.sync()
      };

      var todoResult = {
        toObject: stub.sync( null, todoJson )
      };

      mockTodoModel.update = stub.async( null, todoResult );

      // Test
      todoController.update( mockReq, mockRes );

      // Verify
      mockTodoModel.update.called.withArguments( { _id: 1 }, todoJson );
      todoResult.toObject.called.count( 1 );
      mockRes.send.called.withNoArguments();

      done();
    } );
  } );

  describe( '.remove(req, res, next)', function () {
    it( 'should call findById on the Mongoose model object and call remove on the object returned', function ( done ) {

      // Setup
      var mockReq = {
        params: {
          id: 1
        }
      };

      var mockRes = {
        send: stub.sync()
      };

      var todoResult = {
        remove: stub.async()
      };

      mockTodoModel.findById = stub.async( null, todoResult );

      // Test
      todoController.remove( mockReq, mockRes );

      // Verify
      mockTodoModel.findById.called.withArguments( 1 );
      todoResult.remove.called.withNoArguments();
      mockRes.send.called.withArguments();

      done();
    } );
  } );

} );