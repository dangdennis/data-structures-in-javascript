// Ignore this function
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

//  [*] Implement DoublyLinkedListNode class
//  [*] Implement DoublyLinkedList class
//  [x] .insert() function to insert data at position (0 = Head, null = Tail, other = middle somewhere)
//     [x] .insertAfter() function to insert data after the node passed in
//     [x] .insertBefore() function to insert data before the node passed in
//  [x] .remove() function to remove data at position (0 = Head, empty = Tail, other = middle somewhere)
//  [x] .get() function to return data at position indicated
//  [x] .set() function to change existing data at position indicated
//  [x] .find() function to return first node containing the value indicated
//  [x] .contains() function to return the number of occurrences of a value in the list.  0 for none.
//
// Extra Credit (for the brave and true)
//
//  [ ] Write a function using a doubly linked list to return the index of the nth odd number from the
//      tail of the list.
//  [X] Implement a new Vector class using a Doubly LinkedList as a backing store
//

// Vector: O(1)
var Vector = function() {
  this.capacity = initialCapacity || 8; // Default array size initially to 8 elements
  this.minCapacity = this.capacity; // Don't reduce below this value
  this.max = maxCapacity || 1 << 5; // Default max vector size to 32
  this.length = 0;
  this.storage = new DoublyLinkedList();
};

// DoublyLinkedListNode: O(1)
var DoublyLinkedListNode = function(data, next, previous) {
  this.data = data;
  this.next = next || null;
  this.prev = previous || null;
};

// DoublyLinkedListNode: O(1)
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = this.head;
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
      if(currentNode === this.head) {
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

(function() {
  function toArray(fromWhichNode) {
    var node = fromWhichNode;
    var result = [];

    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }

    console.log("RESULTS:", result);
    return result;
  }

  var test = testRunner(7);
  test(true, function() {
    var list = new DoublyLinkedList();

    var n0, n00, n1, n2, n4, n5, n6, n7, n8, n9;

    test(true, function() {
      console.log("Inserts First & Before");
      n0 = list.insert(0, 0);
      console.log(
        "  insert(0, 0) should yield [0]: " + toArray(list.head).equals([0])
      );
      console.log("  head should be n0: " + (n0 === list.head));
      console.log("  tail should be n0: " + (n0 === list.tail));
      n00 = list.insert(0, -1);

      console.log(
        "  insert(0, -1) should yield [-1, 0]: " +
          toArray(list.head).equals([-1, 0])
      );
      console.log("  head should be -1: " + (list.head.data === -1));
      console.log("  tail should be 0: " + (list.tail.data === 0));
      n1 = list.insert(1, 1);
      console.log(
        "  insert(1, 1) should yield [-1, 1, 0]: " +
          toArray(list.head).equals([-1, 1, 0])
      );
      n2 = list.insert(2, 2);
      console.log(
        "  insert(2, 2) should yield [-1, 1, 2, 0]: " +
          toArray(list.head).equals([-1, 1, 2, 0])
      );
      console.log("  tail should be 0: " + (list.tail.data === 0));
      n4 = list.insert(null, 4);
      console.log(
        "  insert(null, 4) should yield [-1, 1, 2, 4, 0]:" +
          toArray(list.head).equals([-1, 1, 2, 4, 0])
      );
      console.log("  tail should be 4: " + (list.tail.data === 0));
    });

    test(true, function() {
      console.log("Inserts After");
      n5 = list.insertAfter(n2, 10);
      toArray(list.head);
      console.log(
        "  insertAfter([2], 10) should yield [-1, 1, 2, 10, 4, 0]: " +
          toArray(list.head).equals([-1, 1, 2, 10, 4, 0])
      );
      n6 = list.insertAfter(list.head, 6);
      console.log(
        "  insertAfter([head], 6) should yield [-1, 6, 1, 2, 10, 4, 0]: " +
          toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0])
      );
      n7 = list.insertAfter(list.tail, 7);
      console.log(
        "  insertAfter([tail], 7) should yield [-1, 6, 1, 2, 10, 4, 0, 7]:" +
          toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0, 7])
      );
    });

    test(true, function() {
      console.log("Inserts Before");
      n7 = list.insertBefore(list.head, 11);
      console.log(
        "  insertBefore([head], 11) should yield [11, -1, 6, 1, 2, 10, 4, 0, 7]: " +
          toArray(list.head).equals([11, -1, 6, 1, 2, 10, 4, 0, 7])
      );
      n8 = list.insertBefore(list.tail, 12);
      console.log(
        "  insertBefore([tail], 12) should yield [11, -1, 6, 1, 2, 10, 4, 0, 12, 7]: " +
          toArray(list.head).equals([11, -1, 6, 1, 2, 10, 4, 0, 12, 7])
      );
      n9 = list.insertBefore(n5, 55);
      console.log(
        "  insertBefore([5], 55) should yield [11, -1, 6, 1, 2, 55, 10, 4, 0, 12, 7]: " +
          toArray(list.head).equals([11, -1, 6, 1, 2, 55, 10, 4, 0, 12, 7])
      );
      console.log("  head should be 11: " + (list.head.data === 11));
      console.log("  tail should be 7: " + (list.tail.data === 7));
    });

    test(true, function() {
      console.log("Finds & Contains");
      console.log("  list.find(12) returns 12: " + (list.find(12).data === 12));
      console.log("  list.find(0) returns 11: " + (list.find(11).data === 11));
      console.log("  list.find(7) returns 7:" + (list.find(7).data === 7));
      console.log(
        "  list.find(100) returns null: " + (list.find(100) === null)
      );
      console.log(
        "  list.contains(11) is true: " + (list.contains(11) === true)
      );
      console.log(
        "  list.contains(55) is true: " + (list.contains(55) === true)
      );
      console.log("  list.contains(7) is true: " + (list.contains(7) === true));
      console.log(
        "  list.contains(221) is false: " + (list.contains(221) === false)
      );
    });

    test(true, function() {
      console.log("Removes");
      var r1 = list.remove(0);
      console.log(
        "  remove(0) should yield [-1, 6, 1, 2, 55, 10, 4, 0, 12, 7]: " +
          toArray(list.head).equals([-1, 6, 1, 2, 55, 10, 4, 0, 12, 7])
      );
      var r2 = list.remove(9);
      console.log(
        "  remove(9) should yield [-1, 6, 1, 2, 55, 10, 4, 0, 12]: " +
          toArray(list.head).equals([-1, 6, 1, 2, 55, 10, 4, 0, 12])
      );
      var r3 = list.remove(4);
      console.log(
        "  remove(4) should yield [-1, 6, 1, 2, 10, 4, 0, 12]: " +
          toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0, 12])
      );
    });

    test(true, function() {
      console.log("Gets & Sets");
      for (var i = 0; i < 8; i++) {
        list.set(i, i);
      }
      console.log(
        "  set(0 ... 7) should yield [0, 1, 2, 3, 4, 5, 6, 7]: " +
          toArray(list.head).equals([0, 1, 2, 3, 4, 5, 6, 7])
      );
      var a = [];
      for (var i = 7; i >= 0; i--) {
        a.push(list.get(i));
      }
      console.log('a',a);
      console.log(
        "  get(7 ... 0) should yield [7, 6, 5, 4, 3, 2, 1, 0]: " +
          a.equals([7, 6, 5, 4, 3, 2, 1, 0])
      );
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
