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

  Accessing via indexes in a DDL are not O(1) like an array. Result of not knowing length.
  Why do we need to know both capacity and length now still?


  Exercise:

   1. [x] Copy the Doubly Linked List (DLL) implementation into this file first (without the unit tests)
   2. [x] Copy the completed Vector-L3 implementation (without the unit tests) below the DLL
   3. [x] Make the necessary changes to Vector so the unit tests pass using the DLL as a backing store

*/

// Place code for DoublyLinkedList-L3 in place of this line

// DoublyLinkedListNode: O(1)
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = this.head;
};

// DoublyLinkedListNode: O(1)
var DoublyLinkedListNode = function(data, next, previous) {
  this.data = data;
  this.next = next || null;
  this.prev = previous || null;
};

DoublyLinkedListNode.prototype.findNthOddLast = function(endingNode, nth) {
  var wantedNode = null;
  var length = 0;
  var startingNode = this.head;

  // find the length of the list
  while (startingNode !== null) {
    length++;
    startingNode = startingNode.next;
  }

  // loop backward to find the nth last odd node, subtract from length to get index
  while (endingNode !== null) {
    if (endingNode.data % 2 !== 0) {
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

// DoublyLinkedList.validateStartingLink: O(1)
DoublyLinkedList.prototype.validateStartingLink = function(newNode) {
  if (this.head === null && this.tail === null) {
    this.head = newNode;
    this.tail = newNode;
    return this.head;
  }
};

// DoublyLinkedList.insert: O(n) due to while loop beginning line 102
// Technically, insertion itself is O(1) but traversing/indexing a linked list is O(n)
DoublyLinkedList.prototype.insert = function(index, data) {
  var newNode = new DoublyLinkedListNode(data);
  var node = this.head;
  var counter = 0;

  this.validateStartingLink(newNode);

  while (node !== null) {
    if (index === 0) {
      newNode.next = this.head;
      if (this.tail === null) {
        this.tail = newNode;
      }
      this.head.prev = newNode;
      this.head = newNode;

      return newNode;
    }

    if (index === null) {
      newNode.next = this.tail;
      newNode.prev = this.tail.prev;
      this.tail.prev.next = newNode;
      return newNode;
    }

    if (counter === index) {
      newNode.next = node;
      newNode.prev = node.prev;
      node.prev.next = newNode;
      node.prev = newNode;
      return newNode;
    }

    counter++;
    node = node.next;
  }

  return this.head;
};

// DoublyLinkedList.insertAfter: O(1)
DoublyLinkedList.prototype.insertAfter = function(node, data) {
  var newNode = new DoublyLinkedListNode(data);

  this.validateStartingLink(newNode);

  if (node === this.tail) {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    return newNode;
  }

  newNode.prev = node;
  newNode.next = node.next;
  node.next.prev = newNode;
  node.next = newNode;
  return newNode;
};

// DoublyLinkedList.insertBefore: O(1)
DoublyLinkedList.prototype.insertBefore = function(node, data) {
  var newNode = new DoublyLinkedListNode(data);

  this.validateStartingLink(newNode);
  if (node === this.tail) {
    newNode.prev = this.tail.prev;
    newNode.next = this.tail;
    this.tail.prev.next = newNode;
    this.tail.prev = newNode;
    return newNode;
  }

  if (node === this.head) {
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    return newNode;
  }

  newNode.prev = node.prev;
  newNode.next = node;
  node.prev.next = newNode;
  node = newNode;
  return newNode;
};

// DoublyLinkedList.remove: O(n) because of for-loop/indexing on line 193
// Removal itself is O(1)
DoublyLinkedList.prototype.remove = function(index) {
  var currentNode = this.head;

  if (index === 0) {
    this.head.next.prev = null;
    this.head = this.head.next;
    return this.head;
  }

  while (currentNode !== null) {
    if (index === 0) {
      if (currentNode === this.tail) {
        currentNode.prev.next = null;
        this.tail = currentNode.prev;
        return currentNode;
      }
      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
      return currentNode;
    }
    index--;
    currentNode = currentNode.next;
  }
};

DoublyLinkedList.prototype.get = function(index) {
  var counter = 0;
  var currentNode = this.head;

  while (currentNode !== null) {
    if (counter === index) {
      return currentNode.data;
    }
    currentNode = currentNode.next;
    counter++;
  }
  return null;
};

DoublyLinkedList.prototype.set = function(index, data) {
  var newNode = new DoublyLinkedListNode(data);
  var currentNode = this.head;
  var counter = 0;

  this.validateStartingLink(newNode);

  while (currentNode !== null) {
    if (counter === index) {
      if (currentNode === this.head) {
        newNode.next = this.head.next;
        this.head.next.prev = newNode;
        this.head = newNode;
        return newNode;
      }
      if (currentNode === this.tail) {
        newNode.prev = this.tail.prev;
        this.tail.prev.next = newNode;
        this.tail = newNode;
        return newNode;
      }
      newNode.prev = currentNode.prev;
      newNode.next = currentNode.next;
      currentNode.prev.next = newNode;
      currentNode.next.prev = newNode;
      return newNode;
    }
    currentNode = currentNode.next;
    counter++;
  }

  return null;
};

DoublyLinkedList.prototype.find = function(data) {
  var node = this.head;

  while (node !== null) {
    if (node.data === data) {
      return node;
    }
    node = node.next;
  }

  return null;
};

DoublyLinkedList.prototype.contains = function(data) {
  var node = this.head;

  while (node !== null) {
    if (node.data === data) {
      return true;
    }
    node = node.next;
  }

  return false;
};

// Paste code for Vector-L3 in place of this line

var Vector = function(initialCapacity, maxCapacity) {
  this.capacity = initialCapacity || 8; // Default array size initially to 8 elements
  this.max = maxCapacity || 1 << 3; // Default max vector size to 32
  this.length = 0;

  // this.storage = new DoublyLinkedList();
  this.storage = new DoublyLinkedList();
};

Vector.prototype.insert = function(index, value) {
  if (index < 0 || index > this.length) {
    throw new Error("Out of bounds.");
  }

  if (this.storage.head === null) {
    throw new Error("No existing node.");
  }

  var newNode = new DoublyLinkedListNode(value);
  var currentNode = this.storage.head;
  var counter = 0;

  while (currentNode !== null) {
    if (counter === index) {
      if (currentNode === this.storage.head) {
        newNode.next = this.storage.head;
        this.storage.head.prev = newNode;
        this.storage.head = newNode;
        return currentNode;
      }
      newNode.prev = currentNode.prev;
      newNode.next = currentNode;
      currentNode.prev.next = newNode;
      currentNode.prev = newNode;
      this.length++;
      return newNode;
    }
    counter++;
    currentNode = currentNode.next;
  }
};

Vector.prototype.add = function(value) {
  if (this.length === this.max) {
    throw new Error("Max capacity reached.");
  }

  var newNode = new DoublyLinkedListNode(value);

  if (this.storage.head === null && this.storage.tail === null) {
    this.storage.head = newNode;
    this.storage.tail = newNode;
    this.length++;
    return newNode;
  }

  newNode.prev = this.storage.tail;
  this.storage.tail.next = newNode;
  this.storage.tail = newNode;
  this.length++;
  return newNode;
};

Vector.prototype.remove = function(index) {
  if (index < 0 || index > this.length) {
    throw new Error("Out of bounds.");
  }

  var currentNode = this.storage.head;
  var counter = 0;

  if (!index && index !== 0) {
    if (this.length === 1) {
      this.storage.tail = null;
      this.storage.head = null;
      this.length--;
      return this.storage.head;
    }
    this.storage.tail.prev.next = null;
    this.storage.tail = this.storage.tail.prev;
    this.length--;
    return currentNode;
  }

  if (index === 0) {
    this.storage.head.next.prev = null;
    this.storage.head = this.storage.head.next;
    this.length--;
    return this.storage.head;
  }

  while (currentNode !== null) {
    if (counter === index) {
      if (currentNode === this.storage.tail) {
        currentNode.prev.next = null;
        this.storage.tail = currentNode.prev;
        this.length--;
        return currentNode;
      }
      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
      this.length--;
      return currentNode;
    }
    counter++;
    currentNode = currentNode.next;
  }
};

Vector.prototype.get = function(index) {
  if (index < 0 || index > this.length) {
    throw new Error("Out of bounds.");
  }

  var counter = 0;
  var currentNode = this.storage.head;

  while (currentNode !== null) {
    if (counter === index) {
      return currentNode.data;
    }
    counter++;
    currentNode = currentNode.next;
  }
};

Vector.prototype.set = function(index, value) {
  if (index < 0 || index > this.length) {
    throw new Error("Out of bounds.");
  }

  var counter = 0;
  var currentNode = this.storage.head;

  while (currentNode !== null) {
    if (counter === index) {
      currentNode.data = value;
      return currentNode;
    }
    counter++;
    currentNode = currentNode.next;
  }
};

Vector.prototype.find = function(value) {
  var currentNode = this.storage.head;

  while (currentNode !== null) {
    if (currentNode.data === value) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }

  return null;
};

Vector.prototype.contains = function(value) {
  var currentNode = this.storage.head;

  while (currentNode !== null) {
    if (currentNode.data === value) {
      return true;
    }
    currentNode = currentNode.next;
  }

  return false;
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
  var node = this.storage.head;

  while (node !== null) {
    result.push(node.data);
    node = node.next;
  }

  return result;
};

(function() {
  // Ignore this function.  Necessary for the unit tests to pass.
  //
  if (!Array.prototype.equals) {
    // attach the .equals method to Array's prototype to call it on any array
    //
    Array.prototype.equals = function(array) {
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
        } else if (this[i] != array[i]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          //
          return false;
        }
      }
      return true;
    };

    // Hide method from for-in loops
    //
    Object.defineProperty(Array.prototype, "equals", { enumerable: false });
  }
  //
  // Ignore that function

  var test = testRunner(20);
  test(true, function() {
    var v = new Vector();

    test(true, function() {
      console.log("Initialize");
      console.log("  v.length should be 0: " + (v.length === 0));
      console.log("  v.max should be 8: " + (v.max === 8));
      console.log("  v.storage should not be null: " + (v.storage != null));
    });

    test(true, function() {
      console.log("Add 3");
      v.add(0);
      v.add(1);
      v.add(2);
      console.log("  v.length should be 3: " + (v.length === 3));
      console.log("  v.toArray() should be [0, 1, 2]: " + v.toArray().equals([0, 1, 2]));
    });

    test(true, function() {
      console.log("Add 2 more");
      v.add(3);
      v.add(4);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log("  v.toArray() should be [0, 1, 2, 3, 4]: " + v.toArray().equals([0, 1, 2, 3, 4]));
    });

    test(true, function() {
      console.log("Insert 1 at v[3]");
      v.insert(3, 2.5);
      console.log("  v.length should be 6: " + (v.length === 6));
      console.log("  v.toArray() should be [0, 1, 2, 2.5, 3, 4]: " + v.toArray().equals([0, 1, 2, 2.5, 3, 4]));
    });

    test(true, function() {
      console.log("Remove v[3]");
      v.remove(3);
      console.log("  v.length should be 5: " + (v.length === 5));
      console.log("  v.toArray() should be [0, 1, 2, 3, 4]: " + v.toArray().equals([0, 1, 2, 3, 4]));
    });

    test(true, function() {
      console.log("Set v[2] = 15");
      v.set(2, 15);
      console.log("  v.get(2) should be 15: " + (v.get(2) === 15));
    });

    test(true, function() {
      console.log("Add 3 more");
      v.add(5);
      v.add(6);
      v.add(7);
      console.log("  v.length should be 8: " + (v.length === 8));
      console.log("  v.max should be 8: " + (v.max === 8));
    });

    test(true, function() {
      console.log("Add 1 more to attempt over capacity");
      try {
        v.add(8);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.add(8) should cause exception: " + test_result);
        test_result = false;
      }
    });

    test(true, function() {
      console.log("Remove from the end");
      v.remove();
      // Error in test here, expected should still have value 15 at index 2
      console.log("  v.toArray() should be [0, 1, 15, 3, 4, 5, 6]: " + v.toArray().equals([0, 1, 15, 3, 4, 5, 6]));
    });

    test(true, function() {
      console.log("Remove v[2]");
      v.remove(2);
      console.log("  v.toArray() should be [0, 1, 3, 4, 5, 6]: " + v.toArray().equals([0, 1, 3, 4, 5, 6]));
    });

    test(true, function() {
      console.log("Remove the first");
      v.remove(0);
      console.log("  v.toArray() should be [1, 3, 4, 5, 6]: " + v.toArray().equals([1, 3, 4, 5, 6]));
      console.log("  v.length should be 6: " + (v.length === 5));
      console.log("  v.max should be 8: " + (v.max === 8));
    });

    test(true, function() {
      console.log("Insert one at the beginning");
      v.insert(0, 0);
      console.log("  Insert 0 at v[0] should be [0, 1, 3, 4, 5, 6]: " + v.toArray().equals([0, 1, 3, 4, 5, 6]));
    });

    test(true, function() {
      console.log("Remove from beginning");
      v.remove(0);
      console.log("  v.remove(0) should be [1, 3, 4, 5, 6]: " + v.toArray().equals([1, 3, 4, 5, 6]));
    });

    v = new Vector();

    test(true, function() {
      console.log("Test inserting <capacity> items leaves the storage size at <capacity>");
      console.log("  Re-Initialize");
      console.log("    v.length should be 0: " + (v.length === 0));
      console.log("    v.max should be 8: " + (v.max === 8));
    });

    test(true, function() {
      console.log("  Add 6");
      v.add(0);
      v.add(1);
      v.add(2);
      v.add(3);
      v.add(4);
      v.add(5);
      console.log("    v.length should be 6: " + (v.length === 6));
      console.log("    v.toArray() should be [0, 1, 2, 3, 4, 5]: " + v.toArray().equals([0, 1, 2, 3, 4, 5]));
    });

    test(true, function() {
      console.log("  Insert 1");
      v.insert(1, 6);
      console.log("    v.toArray() should be [0, 6, 1, 2, 3, 4, 5]: " + v.toArray().equals([0, 6, 1, 2, 3, 4, 5]));
    });

    test(true, function() {
      console.log("  Insert 1 More");
      v.insert(1, 7);
      console.log("    v.length should be 8: " + (v.length === 8));
      console.log(
        "    v.toArray() should be [0, 7, 6, 1, 2, 3, 4, 5]: " + v.toArray().equals([0, 7, 6, 1, 2, 3, 4, 5])
      );
    });

    test(true, function() {
      console.log("Find a value");
      console.log("  v.find(3) should return the node containing it: " + (v.find(3) != null));
      console.log("  v.contains(7) should be true: " + v.contains(7));
      console.log("  v.contains(100) should be false: " + (v.contains(100) == false));
    });

    test(true, function() {
      console.log("Index out of range validations when not empty");
      var test_result;
      try {
        v.insert(-5, -5);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.insert(-5, -5) should cause exception: " + test_result);
        test_result = false;
      }

      try {
        v.insert(20, 20);
      } catch (e) {
        test_result = true;
      } finally {
        console.log("  v.insert(20, 20) should cause exception: " + test_result);
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
        console.log("  v.remove(6) should not cause exception: " + !test_result);
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
          console.log(totalTests - count + " of " + totalTests + " tests were not executed.");
        }
      }
    };
  }
})();
