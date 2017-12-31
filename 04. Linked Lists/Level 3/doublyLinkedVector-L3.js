// Learning Objectives:

// 1. To understand how different data structures can solve the same purpose

// 2. To understand how using different data structures effects the complexit (Big-O)

// 3. To make sure that you understand how to use the Doubly Linked List in practice

// Reason Why:
// * In interviews, you might have to mix and match data structures so I want you comfortable with it

var Vector = function(initialCapacity, maxCapacity) {
  this.capacity = initialCapacity || 8; // Default array size initially to 8 elements
  this.minCapacity = this.capacity; // Don't reduce below this value
  this.max = maxCapacity || 1 << 5; // Default max vector size to 32
  this.length = 0;

  // this.storage = new DoublyLinkedList();
  this.storage = new Array(this.capacity);
};

Vector.prototype.insert = function(index, value) {
  // ...
};

Vector.prototype.add = function(value) {
  this.resize(false, this.length + 1);
  this.storage[this.length++] = value;
};

Vector.prototype.remove = function(index) {
  // ...
};

Vector.prototype.get = function(index) {
  // ...
};

Vector.prototype.set = function(index, value) {
  // ...
};

// No need to resize for doubly linked link
Vector.prototype.resize = function(isRemoving, desiredLength) {
  // ...
};

Vector.prototype.find = function(value) {
  // ...
};

Vector.prototype.contains = function(value) {
  // ...
};

Vector.prototype.findNthOddLast = function(endingNode, nth) {
  //   var nthOddPosition = 0;
  var wantedNode = null;
  var length = 0;

  var startingNode = this.storage.head;
  while (startingNode !== null) {
    length++;
    startingNode = startingNode.next;
  }

  while (endingNode !== null) {
    if (endingNode.data % 2 !== 0) {
      //   nthOddPosition++;
      if (nth-- === 0) {
        wantedNode = endingNode;
        return length;
      }
    }
    endingNode = endingNode.prev;
    length--;
  }

  return null;
};

Vector.prototype.toArray = function() {
  var result = [];

  for (var i = 0; i < this.length; i++) {
    result[i] = this.storage[i];
  }

  return result;
};

(function() {
  var test = testRunner(23);
  test(true, function() {
    var v = new Vector();

    test(true, function() {
      console.log("Initialize");
      console.log("  v.length should be 0: " + (v.length === 0));
      console.log("  v.capacity should be 8: " + (v.capacity === 8));
      console.log(
        "  v.storage should be [undefined, ... x8]: " +
          (v.storage.length === v.capacity)
      );
    });

    test(true, function() {
      console.log("Add 3");
      v.add(0);
      v.add(1);
      v.add(2);
      console.log("  v.length should be 3: " + (v.length === 3));
      console.log(
        "  v.toArray() should be [0, 1, 2]: " + v.toArray().equals([0, 1, 2])
      );
    });

    test(true, function() {
      console.log("Add 2 more");
      v.add(3);
      v.add(4);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log(
        "  v.toArray() should be [0, 1, 2, 3, 4]: " +
          v.toArray().equals([0, 1, 2, 3, 4])
      );
    });

    test(true, function() {
      console.log("Insert 1 at v[3]");
      v.insert(3, 2.5);
      console.log("  v.length should be 6: " + (v.length === 6));
      console.log(
        "  v.toArray() should be [0, 1, 2, 2.5, 3, 4]: " +
          v.toArray().equals([0, 1, 2, 2.5, 3, 4])
      );
    });

    test(false, function() {
      console.log("Remove v[3]");
      v.remove(3);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log(
        "  v.toArray() should be [0, 1, 2, 3, 4]: " +
          v.toArray().equals([0, 1, 2, 3, 4])
      );
    });

    test(false, function() {
      console.log("Set v[2] = 15");
      v.set(2, 15);
      console.log("  v.get(2) should be 15: " + (v.get(2) === 15));
    });

    test(false, function() {
      console.log("Add 3 more");
      v.add(5);
      v.add(6);
      v.add(7);
      console.log("  v.length should be 8: " + (v.length === 8));
      console.log("  v.capacity should be 8: " + (v.capacity === 8));
    });

    test(false, function() {
      console.log("Add 1 more to fill capacity");
      v.add(8);
      console.log("  v.length should be 9: " + (v.length === 9));
      console.log("  v.capacity should be 16: " + (v.capacity === 16));
    });

    test(false, function() {
      console.log("Remove from the end");
      v.remove();
      console.log(
        "  v.toArray() should be [0, 1, 15, 3, 4, 5, 6, 7]: " +
          v.toArray().equals([0, 1, 15, 3, 4, 5, 6, 7])
      );
    });

    test(false, function() {
      console.log("Remove v[2]");
      v.remove(2);
      console.log(
        "  v.toArray() should be [0, 1, 3, 4, 5, 6, 7]: " +
          v.toArray().equals([0, 1, 3, 4, 5, 6, 7])
      );
    });

    test(false, function() {
      console.log("Remove the first");
      v.remove(0);
      console.log(
        "  v.toArray() should be [1, 3, 4, 5, 6, 7]: " +
          v.toArray().equals([1, 3, 4, 5, 6, 7])
      );
      console.log("  v.length should be 6: " + (v.length === 6));
      console.log("  v.capacity should be 8: " + (v.capacity === 8));
    });

    test(false, function() {
      console.log("Insert one at the beginning");
      v.insert(0, 0);
      console.log(
        "  Insert 0 at v[0] should be [0, 1, 3, 4, 5, 6, 7]: " +
          v.toArray().equals([0, 1, 3, 4, 5, 6, 7])
      );
    });

    test(false, function() {
      console.log("Remove from beginning");
      v.remove(0);
      console.log(
        "  v.remove(0) should be [1, 3, 4, 5, 6, 7]: " +
          v.toArray().equals([1, 3, 4, 5, 6, 7])
      );
    });

    v = new Vector();

    test(false, function() {
      console.log(
        "Test inserting <capacity> items leaves the storage size at <capacity>"
      );
      console.log("  Re-Initialize");
      console.log("    v.length should be 0: " + (v.length === 0));
      console.log("    v.capacity should be 8: " + (v.capacity === 8));
      console.log(
        "    v.storage should be [undefined, ... x8]: " +
          (v.storage.length === v.capacity)
      );
    });

    test(false, function() {
      console.log("  Add 6");
      v.add(0);
      v.add(1);
      v.add(2);
      v.add(3);
      v.add(4);
      v.add(5);
      console.log("    v.length should be 6: " + (v.length === 6));
      console.log(
        "    v.toArray() should be [0, 1, 2, 3, 4, 5]: " +
          v.toArray().equals([0, 1, 2, 3, 4, 5])
      );
    });

    test(false, function() {
      console.log("  Insert 1");
      v.insert(1, 6);
      console.log(
        "    v.toArray() should be [0, 6, 1, 2, 3, 4, 5]: " +
          v.toArray().equals([0, 6, 1, 2, 3, 4, 5])
      );
    });

    test(false, function() {
      console.log("  Insert 1 More");
      v.insert(1, 7);
      console.log("    v.length should be 8: " + (v.length === 8));
      console.log(
        "    v.storage.length should be 8: " + (v.storage.length === 8)
      );
      console.log(
        "    v.toArray() should be [0, 7, 6, 1, 2, 3, 4, 5]: " +
          v.toArray().equals([0, 7, 6, 1, 2, 3, 4, 5])
      );
    });

    test(false, function() {
      console.log("  Insert 1 Beyond Initial Capactity of 8");
      v.insert(6, 8);
      console.log("    v.length should be 9: " + (v.length === 9));
      console.log(
        "    v.storage.length should be 16: " + (v.storage.length === 16)
      );
      console.log(
        "    v.toArray() should be [0, 7, 6, 1, 2, 3, 8, 4, 5]: " +
          v.toArray().equals([0, 7, 6, 1, 2, 3, 8, 4, 5])
      );
    });

    test(false, function() {
      console.log("Test removing to half capacity reduces storage to half");
      v.remove();
      console.log(
        "  v.remove() should be [0, 7, 6, 1, 2, 3, 8, 4]: " +
          v.toArray().equals([0, 7, 6, 1, 2, 3, 8, 4])
      );
      console.log("  v.length should be 8: " + (v.length === 8));
      console.log("  v.capacity should be 8: " + (v.capacity === 8));
      console.log(
        "  v.storage.length should be 8: " + (v.storage.length === 8)
      );
      console.log(v.storage);
    });

    test(false, function() {
      console.log("Find a value");
      console.log("  v.find(3) should be index 5: " + (v.find(3) === 5));
      console.log("  v.contains(7) should be true: " + v.contains(7));
    });

    test(false, function() {
      console.log("Index out of range validations when not empty");
      var test_result;
      try {
        v.insert(-5, -5);
      } catch (e) {
        test_result = true;
      } finally {
        console.log(
          "  v.insert(-5, -5) should cause exception: " + test_result
        );
        test_result = false;
      }

      try {
        v.insert(20, 20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log(
          "  v.insert(20, 20) should cause exception: " + test_result
        );
        test_result = false;
      }

      try {
        v.insert(9, 20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.insert(9, 20) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.remove(-5);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.remove(-5) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.remove(20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.remove(20) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.remove(6, 20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log(
          "  v.remove(6) should not cause exception: " + !test_result
        );
        test_result = false;
      }

      try {
        v.set(20, 20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  set[20] = 20 should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.get(-1);
      } catch (e) {
        test_result = true;
      } finally {
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
      console.log("  v.toArray() should be []: " + v.toArray().equals([]));
      try {
        v.insert(0, 0);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.insert(0, 0) should cause exception: " + test_result);
        test_result = false;
      }
    });

    test(false, function() {
      console.log("Expanding beyond capacity");
      console.log("  capacity should be 8: " + (v.capacity === 8));

      for (var i = 0; i < 32; i++) {
        v.add(i);
      }

      console.log(
        "  After adding 32, capacity should be 32: " + (v.capacity === 32)
      );
      console.log("  length should be 32: " + (v.length === 32));
      console.log(
        "  storage length should be 32: " + (v.storage.length === 32)
      );
      console.log("  max should be 32: " + (v.max === 32));

      try {
        v.add(32);
      } catch (e) {
        test_result = true;
      } finally {
        console.log(
          "  Adding one beyond max should cause capacity exception: " +
            test_result
        );
        test_result = false;
      }
    });
  });

  test(true, null);

  function testRunner(totalTests) {
    totalTests -= 1; // remove one for the main test runner
    var count = -1;

    return function(go, test) {
      if (!go) {
        return;
      }

      if (test != null) {
        count += 1;
        test();
      } else {
        console.log("");
        console.log("");

        if (count === totalTests) {
          console.log("All tests were executed.");
        } else {
          console.log(
            totalTests -
              count +
              " of " +
              totalTests +
              " tests were not executed."
          );
        }
      }
    };
  }
})();
