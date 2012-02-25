/**
 * Creates a Stub method which you can bind to a mock object for testing purposes.
 *
 * @param {object} err
 * @param {object} returnValue
 *
 * Examples:
 *
 *   var stub = require('stub');
 *   var mockObject = {};
 *
 *   // You can declare your stub in one of 2 ways:
 *   // 1. This will setup your mock so it will execute asynchronously and pass
 *   //    'errValue' and 'callbackValue' to the callback in the system under test.
 *   mockObject.method = stub.async( errValue, callbackValue);
 *
 *   // 2. This will setup your mock so it will exectue synchronously and return 'returnValue' to the caller.
 *   mockObject.method = stub.sync( null, returnValue );
 *
 *   // Inspect your mock later
 *   mockObject.method.called.withArguments(args);
 *   mockObject.method.called.withAnyArguments();
 *   mockObject.method.called.withNoArguments();
 */
module.exports = ( function() {
  Number.prototype.nth = function() {
    if ( this > 3 && this < 21 ) return this + 'th';
    var suffix = this % 10;
    switch ( suffix ) {
      case 1:
        return this + 'st';
      case 2:
        return this + 'nd';
      case 3:
        return this + 'rd';
      default:
        return this + 'th';
    }
  };

  var AssertionError = require( 'assert' ).AssertionError;

  function Stub ( responseArgs, synchronous ) {
    var calledCount = 0;
    var args = [];
    var thisArg = [];
    var time = 0;

    var mock = function() {
      calledCount ++;
      args[calledCount] = arguments;
      thisArg[calledCount] = this;
      var time = calledCount;

      function withArguments () {
        for ( var i = 0; i < arguments.length; i ++ ) {
          if ( JSON.stringify( args[time][i] ) !== JSON.stringify( arguments[i] ) ) {
            throw new AssertionError( {
              message: '\n\tThe ' + (i + 1).nth() + ' parameter contained: \n\t\t' + JSON.stringify( args[time][i] ) + ' \n\tinstead of the expected value: \n\t\t' + JSON.stringify( arguments[i] ),
              stackStartFunction: mock.called.withArguments
            } );
          }
        }
        return true;
      }

      function withAnyArguments () {
        if ( args[time].length == 0 ) {
          throw new AssertionError( {
            message: 'The method was called with 0 arguments but at least 1 was expected.',
            stackStartFunction: mock.called.withAnyArguments
          } );
        }
        return true
      }

      function withNoArguments () {
        if ( args[time].length > 0 ) {
          throw new AssertionError( {
            message: 'The method was called with ' + args[time].length + ' arguments but non were expected.',
            stackStartFunction: mock.called.withNoArguments
          } );
        }
        return true;
      }

      mock.called = {
        withArguments: withArguments,

        withAnyArguments: withAnyArguments,

        withNoArguments: withNoArguments,

        count: function( n ) {
          if ( n !== calledCount ) {
            throw new AssertionError( {
              message: 'The method was called ' + calledCount + ' time(s) but expected to be called ' + n + ' time(s).',
              stackStartFunction: mock.called.count
            } );
          }
          return (n === calledCount);
        },

        time: function( n ) {
          time = n;
          return {
            withArguments: withArguments,
            withAnyArguments: withAnyArguments,
            withNoArguments: withNoArguments
          }
        }
      };

      if ( !synchronous ) {
        var callBack = arguments[arguments.length - 1];
        args[calledCount].length --;
        callBack.apply( thisArg[calledCount], responseArgs );
      } else {
        if ( responseArgs[0] ) {
          throw responseArgs[0];
        } else {
          return responseArgs[1];
        }
      }
    };

    mock.called = {
      withArguments: function() {
        throw new AssertionError( {
          message: 'The method was never called.',
          stackStartFunction: mock.called.withArguments
        } );
      },
      withAnyArguments: function() {
        throw new AssertionError( {
          message: 'The method was never called.',
          stackStartFunction: mock.called.withAnyArguments
        } );
      },
      withNoArguments: function() {
        throw new AssertionError( {
          message: 'The method was never called.',
          stackStartFunction: mock.called.withNoArguments
        } );
      },
      count: function() {
        return false
      }
    };

    return mock;
  }

  return {
    async: function() {
      return new Stub( arguments, false );
    },
    sync: function() {
      return new Stub( arguments, true );
    }
  }

}());