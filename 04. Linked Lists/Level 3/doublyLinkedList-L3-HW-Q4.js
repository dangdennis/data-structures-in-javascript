
/*

  Goal:

  Implement a Vector class, where the `this.storage = new DoublyLinkedList()` instead of array like before



  Description:

  Previously, you implemented a Vector using an array for `this.storage` as a backing-store.  A backing
   store is just the type of fundamental storage used for a data structure.  For this exercise, you're
   going to change the Vector to use a DoublyLinkedList for `this.storage` instead of an array.  Think
   carefully about whats different between an array and a doubly linked list.  Because the abstractions
   are similar (.add, .remove, .find, etc.) not much must change but there are a few gotchas to beware
   of.

  The first gotcha is .resize() is no longer necessary.  Neither is minCapacity.  Each depend on array
   specific concerns.  But maxCapacity is needed because we might still want to limit how many items
   the Vector can hold.

  The second gotcha is that we know what the length of an array is, but the not for the Doubly Linked
   list.  You'll have to overcome this somehow.

  Are there other differences to beware of?



  Exercise:

   1. [ ] Copy the Doubly Linked List (DLL) implementation into this file first (without the unit tests)
   2. [ ] Copy the completed Vector-L3 implementation (without the unit tests) below the DLL
   3. [ ] Make the necessary changes to Vector so the unit tests pass using the DLL as a backing store

*/


// Place code for DoublyLinkedList-L3 in place of this line













// Past code for Vector-L3 in place of this line



(function() {

  // Ignore this function.  Necessary for the unit tests to pass.
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


  var test = testRunner(20);
  test(true, function () {
    var v = new Vector();

    test(true, function () {
      console.log("Initialize");
      console.log("  v.length should be 0: " + (v.length === 0));
      console.log("  v.max should be 8: " + (v.max === 8));
      console.log("  v.storage should not be null: " + (v.storage != null));
    });

    test(true, function () {
      console.log("Add 3");
      v.add(0);
      v.add(1);
      v.add(2);
      console.log("  v.length should be 3: " + (v.length === 3));
      console.log("  v.toArray() should be [0, 1, 2]: " + (v.toArray().equals([0, 1, 2])));
    });

    test(true, function () {
      console.log("Add 2 more");
      v.add(3);
      v.add(4);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log("  v.toArray() should be [0, 1, 2, 3, 4]: " + (v.toArray().equals([0, 1, 2, 3, 4])));
    });

    test(true, function () {
      console.log("Insert 1 at v[3]");
      v.insert(3, 2.5);
      console.log("  v.length should be 6: " + (v.length === 6));
      console.log("  v.toArray() should be [0, 1, 2, 2.5, 3, 4]: " + (v.toArray().equals([0, 1, 2, 2.5, 3, 4])));
    });

    test(true, function () {
      console.log("Remove v[3]");
      v.remove(3);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log("  v.toArray() should be [0, 1, 2, 3, 4]: " + (v.toArray().equals([0, 1, 2, 3, 4])));
    });

    test(true, function () {
      console.log("Set v[2] = 15");
      v.set(2, 15);
      console.log("  v.get(2) should be 15: " + (v.get(2) === 15));
    });

    test(true, function () {
      console.log("Add 3 more");
      v.add(5);
      v.add(6);
      v.add(7);
      console.log("  v.length should be 8: " + (v.length === 8));
      console.log("  v.max should be 8: " + (v.max === 8));
    });

    test(true, function () {
      console.log("Add 1 more to attempt over capacity");
      try {
        v.add(8);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.add(8) should cause exception: " + test_result);
        test_result = false;
      }
    });

    test(true, function () {
      console.log("Remove from the end");
      v.remove();
      console.log("  v.toArray() should be [0, 1, 2, 3, 4, 5, 6]: " + (v.toArray().equals([0, 1, 2, 3, 4, 5, 6])));
    });

    test(true, function () {
      console.log("Remove v[2]");
      v.remove(2);
      console.log("  v.toArray() should be [0, 1, 3, 4, 5, 6]: " + (v.toArray().equals([0, 1, 3, 4, 5, 6])));
    });

    test(true, function () {
      console.log("Remove the first");
      v.remove(0);
      console.log("  v.toArray() should be [1, 3, 4, 5, 6]: " + (v.toArray().equals([1, 3, 4, 5, 6])));
      console.log("  v.length should be 6: " + (v.length === 5));
      console.log("  v.max should be 8: " + (v.max === 8));
    });

    test(true, function () {
      console.log("Insert one at the beginning");
      v.insert(0, 0);
      console.log("  Insert 0 at v[0] should be [0, 1, 3, 4, 5, 6]: " + (v.toArray().equals([0, 1, 3, 4, 5, 6])));
    });

    test(true, function () {
      console.log("Remove from beginning");
      v.remove(0);
      console.log("  v.remove(0) should be [1, 3, 4, 5, 6]: " + v.toArray().equals([1, 3, 4, 5, 6]));
    });

    v = new Vector();

    test(true, function () {
      console.log("Test inserting <capacity> items leaves the storage size at <capacity>");
      console.log("  Re-Initialize");
      console.log("    v.length should be 0: " + (v.length === 0));
      console.log("    v.max should be 8: " + (v.max === 8));
    });

    test(true, function () {
      console.log("  Add 6");
      v.add(0);
      v.add(1);
      v.add(2);
      v.add(3);
      v.add(4);
      v.add(5);
      console.log("    v.length should be 6: " + (v.length === 6));
      console.log("    v.toArray() should be [0, 1, 2, 3, 4, 5]: " + (v.toArray().equals([0, 1, 2, 3, 4, 5])));
    });

    test(true, function () {
      console.log("  Insert 1");
      v.insert(1, 6);
      console.log("    v.toArray() should be [0, 6, 1, 2, 3, 4, 5]: " + (v.toArray().equals([0, 6, 1, 2, 3, 4, 5])));
    });

    test(true, function () {
      console.log("  Insert 1 More");
      v.insert(1, 7);
      console.log("    v.length should be 8: " + (v.length === 8));
      console.log("    v.toArray() should be [0, 7, 6, 1, 2, 3, 4, 5]: " + (v.toArray().equals([0, 7, 6, 1, 2, 3, 4, 5])));
    });

    test(true, function() {
      console.log("Find a value");
      console.log("  v.find(3) should be index 5: " + (v.find(3) === 5));
      console.log("  v.contains(7) should be true: " + (v.contains(7)));
    });


    test(true, function() {
      console.log("Index out of range validations when not empty");
      var test_result;
      try {
        v.insert(-5, -5);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.insert(-5, -5) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.insert(20, 20);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.insert(20, 20) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.insert(9, 20);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.insert(9, 20) should cause exception: " + test_result);
        test_result = false;
      }


      try {
        v.remove(-5);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.remove(-5) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.remove(20);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.remove(20) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.remove(6, 20);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.remove(6) should not cause exception: " + !test_result);
        test_result = false;
      }


      try {
        v.set(20, 20);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  set[20] = 20 should cause exception: " + test_result);
        test_result = false;
      }


      try {
        v.get(-1);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  get[-1] should cause exception: " + test_result);
        test_result = false;
      }

      v.remove();
      v.remove();
      v.remove();
      v.remove();
      v.remove();
      v.remove();
      v.remove();
      console.log("  Remove all.  Length should be 0: " + (v.length === 0));
      console.log("  v.toArray() should be []: " + (v.toArray().equals([])));
      try {
        v.insert(0, 0);
      } catch (e) {
        test_result = true;
      }
      finally {
        console.log("  v.insert(0, 0) should cause exception: " + test_result);
        test_result = false;
      }
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