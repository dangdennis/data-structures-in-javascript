
/*

  Your objective is to implement a stack without using any built-in features.

    [ ] Complete the implementation of a Stack class
    [x] .storage property to hold the items on the stack using an array
    [ ] .length property to return the current length
    [ ] .push() function to push a value onto the stack
    [ ] .pop() function to pop a value off the stack
    [ ] .peek() function to return the top value without removing it

  NOTE: Do not use any built-in array functions
  NOTE: Do not focus on edge cases or error conditions

*/


var Stack = function() {
  this.storage = [];
};


Stack.prototype.push = function(value) {
  // ...
};


Stack.prototype.pop = function() {
  // ...
};


Stack.prototype.peek = function() {
  // ...
};








(function() {

  // Ignore this function.  Needed to make the tests function properly.
  //
  if(!Array.prototype.equals) {

    // attach the .equals method to Array's prototype to call it on any array
    //
    Array.prototype.equals = function (array) {

      // if the other array is a falsy value, return
      //
      if (!array) {
        return false;
      }

      // compare lengths - can save a lot of time
      //
      if (this.length != array.length) {
        return false;
      }

      for (var i = 0, l = this.length; i < l; i++) {

        // Check if we have nested arrays
        //
        if (this[i] instanceof Array && array[i] instanceof Array) {

          // recurse into the nested arrays
          //
          if (!this[i].equals(array[i])) {
            return false;
          }
        }
        else if (this[i] != array[i]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          //
          return false;
        }
      }
      return true;
    };

    // Hide method from for-in loops
    //
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
  }
  //
  // Ignore that function


  function toArray() {
    return s.storage;
  }


  var test = testRunner(2);
  test(true, function () {
    var s = new Stack();

    test(true, function () {
      console.log("Create new instance of Stack.");
      console.log("  s is not null: " + (s != null));
      console.log("  s.storage is not undefined: " + (s.storage !== undefined));
      console.log("  s.storage.length == 0: " + (s.storage.length === 0));
    });

    test(true, function() {
      console.log("Push 1");
      s.push(1);
      console.log("  s.push(1) yields the first item: " + (s.storage[0] == 1));
    });

    test(true, function() {
      console.log("Push 3 more");
      s.push(2);
      s.push(3);
      s.push(4);
      console.log("  s.storage = [1, 2, 3, 4]: " + (s.storage.equals([1, 2, 3, 4])));
    });

    test(true, function() {
      console.log("Pop 1");
      var x;
      x = s.pop();
      console.log("  s.pop() returned 4: " + (x === 4));
    });

    test(true, function() {
      console.log("Pop 2 more");
      var x, y;
      x = s.pop();
      console.log("  s.pop() returned 3: " + (x === 3));
      y = s.pop();
      console.log("  s.pop() returned 2: " + (y === 2));
    });

    test(true, function() {
      console.log("Peek");
      var x;
      x = s.peek();
      console.log("  s.peek() returns 1: " + (x === 1));
    });

    test(true, function() {
      console.log("Backing storage is correct");
      console.log("  s.storage == [1]: " + (s.storage.equals([1, undefined, undefined, undefined])));
    });

    test(true, function() {
      console.log("Pop last");
      var x, y;
      x = s.peek();
      console.log("  s.peek() returns 1: " + (x === 1));
      y = s.pop();
      console.log("  s.pop() returns 1: " + (y === 1));
      console.log("  s.storage is [undefined, ..." + s.storage.equals([undefined, undefined, undefined, undefined]));
    });
  });


  test(true, null);


  function testRunner(totalTests) {
    totalTests -= 1; // remove one for the main test runner
    var count = -1;

    return function (go, test) {
      if (!go) {
        return;
      }

      if (test != null) {
        count += 1;
        test();
      }
      else {
        console.log("");
        console.log("");

        if (count === totalTests) {
          console.log("All tests were executed.");
        }
        else {
          console.log((totalTests - count) + " of " + totalTests + " tests were not executed.");
        }
      }
    }
  }
})();