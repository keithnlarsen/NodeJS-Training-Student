Stub.js
=======

Stub.js is a dead simple to use mocking / stubbing library to help you unit test your javascript nodejs modules.

## Contribute

Feel free to submit your comments / feedback / suggestions / feature request.  Just keep in mind, I want this to stay simple to use, and small and light.

## Features

 * stub asynchronous functions
 * stub synchronous funcitons
 * stub a nested chain of stubs
 * throw simulated errors from within the stub
 
## Installation

    npm install stub-js

### Dependancies

So far this is dependant on:

  * Nodejs >= 0.4.1
  * I personally use this with should.js and mocha. They ROCK!

## Example with both Synchronous and Asynchronous stubs

### Here is the module we want to isolate and test

    module.exports = (function() {
      var model;
    
      function init ( personModel ) {
        model = personModel;
      }
    
      function findById(id, callback){
        model.find( {_id: id } ).exec( function( err, person ) {
          callback(err, person);
        } );
      }
    
      return {
        init: init,
        findById: findById
      }
    }());

### Here is what our test case would look like using Mocha, Should.js, and Stub.js

    describe( 'myApp.tests.unit.controllers.person', function() {
    
      var stub = require('stub.js');
      var mockPersonModel;
      
      var expectedPerson = {
        firstName: 'test',
        lastName: 'test2'
      };
    
      beforeEach(done){
        // Here we define our mock
        mockPersonModel = { 
          // Here we are defining a stub method that will return synchronously a nested mock object.
          find: stub.sync( null, { 
            // Here we are defining an exec method that will execute asynchronously and pass a null, and a 'testPerson' object to its callback.
            exec: stub.async(null, expectedPerson) 
          } )
        };
        done();
      }
    
      describe( '.findById(id)', function() {
        it( 'should call the model find function and return the specified object', function( done ) {
          
          // Now we can test the controller giving it our mock object
          personController.init(mockPersonModel);

          personController.findById('1234', function ( err, actualPerson) {
            actualPerson.firstName.should.equal(expectedPerson.firstName);
            actualPerson.lastName.should.equal(expectedPerson.lastName);
            mockPersonModel.find.called.withArguments( {_id: '1234'} );
            // Heres how we test our nested mock object, that it was called as we expected.
            mockPersonModel.find().exec.called.withNoArguments();
            done(err);
          });
        });
      });
    });

## API

There is the following functionality

  * stub.sync(err, returnValue) - if an err is provide, it will simulate throwing an error from within the mock, otherwise it will just return the 'returnValue'.
  * stub.async( param1, param2, […]) - this will call the provided callback with the values you load here at initialization.
  * mockObject.stub.called - this contains the information recorded while in use.
  * mockObject.stub.called.count(2) - will test if the method was called the number of specified times.
  * mockObject.stub.called.withArguments( args…) - it will test if the arguments you passed in matches the actuals that it was called with.
  * mockObject.stub.called.withAnyArguments() - it will test if method was called with anything.
  * mockObject.stub.called.withNoArguments() - it will test if the method was called without any arguments.
  * mockObject.stub.called.time(1).withArguments( args…) - will test if the first time the method was called that the actual parameters passed to it match what you specified.
  * mockObject.stub.called.time(1).withAnyArguments() - will test if the first time the method was called that it was called with any arguments.
  * mockObject.stub.called.time(1).withNoArguments() - will test if the first time the method was called that it was called without any arguments.

## License

(The MIT License)

Copyright (c) 2011 Keith Larsen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.