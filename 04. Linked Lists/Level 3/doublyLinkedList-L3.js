
// Ignore this function
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


//  [*] Implement DoublyLinkedListNode class
//  [*] Implement DoublyLinkedList class
//  [ ] .insert() function to insert data at position (0 = Head, null = Tail, other = middle somewhere)
//     [ ] .insertAfter() function to insert data after the node passed in
//     [ ] .insertBefore() function to insert data before the node passed in
//  [ ] .remove() function to remove data at position (0 = Head, empty = Tail, other = middle somewhere)
//  [ ] .get() function to return data at position indicated
//  [ ] .set() function to change existing data at position indicated
//  [ ] .find() function to return first node containing the value indicated
//  [ ] .contains() function to return the number of occurrences of a value in the list.  0 for none.
//
// Extra Credit (for the brave and true)
//
//  [ ] Write a function using a doubly linked list to return the index of the nth odd number from the
//      tail of the list.
//  [ ] Implement a new Vector class using a Doubly LinkedList as a backing store
//

var DoublyLinkedListNode = function(data, next, previous) {
  this.data = data;
  this.next = next || null;
  this.prev = previous || null;
};

var DoublyLinkedList = function() {
  this.head = null;
  this.tail = this.head;
};



DoublyLinkedList.prototype.insert = function(index, data) {
  // ...
};


DoublyLinkedList.prototype.insertAfter = function(node, data) {
  // ...
};


DoublyLinkedList.prototype.insertBefore = function(node, data) {
  // ...
};


DoublyLinkedList.prototype.remove = function(index) {
  // ...
};


DoublyLinkedList.prototype.get = function (index) {
  // ...
};


DoublyLinkedList.prototype.set = function(index, data) {
  // ...
};


DoublyLinkedList.prototype.find = function(data) {
  // ...
};


DoublyLinkedList.prototype.contains = function(data) {
  // ...
};









(function() {
  function toArray(fromWhichNode) {
    var node = fromWhichNode;
    var result = [];

    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }

    return result;
  }



  var test = testRunner(7);
  test(true, function () {
    var list = new DoublyLinkedList();

    var n0, n00, n1, n2, n4, n5, n6, n7, n8, n9;

    test(true, function() {
      console.log("Inserts First & Before");
      n0 = list.insert(0, 0);
      console.log("  insert(0, 0) should yield [0]: " + (toArray(list.head).equals([0])));
      console.log("  head should be n0: " + (n0 === list.head));
      console.log("  tail should be n0: " + (n0 === list.tail));
      n00 = list.insert(0, -1);
      console.log("  insert(0, -1) should yield [-1, 0]: " + (toArray(list.head).equals([-1, 0])));
      console.log("  head should be -1: " + (list.head.data === -1));
      console.log("  tail should be 0: " + (list.tail.data === 0));
      n1 = list.insert(1, 1);
      console.log("  insert(1, 1) should yield [-1, 1, 0]: " + (toArray(list.head).equals([-1, 1, 0])));
      n2 = list.insert(2, 2);
      console.log("  insert(2, 2) should yield [-1, 1, 2, 0]: " + toArray(list.head).equals([-1, 1, 2, 0]));
      console.log("  tail should be 0: " + (list.tail.data === 0));
      n4 = list.insert(null, 4);
      console.log("  insert(null, 4) should yield [-1, 1, 2, 4, 0]:" + (toArray(list.head).equals([-1, 1, 2, 4, 0])));
      console.log("  tail should be 4: " + (list.tail.data === 0));
    });

    test(true, function() {
      console.log("Inserts After");
      n5 = list.insertAfter(n2, 10);
      console.log("  insertAfter([2], 10) should yield [-1, 1, 2, 10, 4, 0]: " + (toArray(list.head).equals([-1, 1, 2, 10, 4, 0])));
      n6 = list.insertAfter(list.head, 6);
      console.log("  insertAfter([head], 6) should yield [-1, 6, 1, 2, 10, 4, 0]: " + (toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0])));
      n7 = list.insertAfter(list.tail, 7);
      console.log("  insertAfter([tail], 7) should yield [-1, 6, 1, 2, 10, 4, 0, 7]:" + (toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0, 7])));
    });

    test(true, function() {
      console.log("Inserts Before");
      n7 = list.insertBefore(list.head, 11);
      console.log("  insertBefore([head], 11) should yield [11, -1, 6, 1, 2, 10, 4, 0, 7]: " + (toArray(list.head).equals([11, -1, 6, 1, 2, 10, 4, 0, 7])));
      n8 = list.insertBefore(list.tail, 12);
      console.log("  insertBefore([tail], 12) should yield [11, -1, 6, 1, 2, 10, 4, 0, 12, 7]: " + (toArray(list.head).equals([11, -1, 6, 1, 2, 10, 4, 0, 12, 7])));
      n9 = list.insertBefore(n5, 55);
      console.log("  insertBefore([5], 55) should yield [11, -1, 6, 1, 2, 55, 10, 4, 0, 12, 7]: " + (toArray(list.head).equals([11, -1, 6, 1, 2, 55, 10, 4, 0, 12, 7])));
      console.log("  head should be 11: " + (list.head.data === 11));
      console.log("  tail should be 7: " + (list.tail.data === 7));
    });

    test(true, function() {
      console.log("Finds & Contains");
      console.log("  list.find(12) returns 12: " + (list.find(12).data === 12));
      console.log("  list.find(0) returns 11: " + (list.find(11).data === 11));
      console.log("  list.find(7) returns 7:" + (list.find(7).data === 7));
      console.log("  list.find(100) returns null: " + (list.find(100) === null));
      console.log("  list.contains(11) is true: " + (list.contains(11) === true));
      console.log("  list.contains(55) is true: " + (list.contains(55) === true));
      console.log("  list.contains(7) is true: " + (list.contains(7) === true));
      console.log("  list.contains(221) is false: " + (list.contains(221) === false));
    });

    test(true, function() {
      console.log("Removes");
      var r1 = list.remove(0);
      console.log("  remove(0) should yield [-1, 6, 1, 2, 55, 10, 4, 0, 12, 7]: " + (toArray(list.head).equals([-1, 6, 1, 2, 55, 10, 4, 0, 12, 7])));
      var r2 = list.remove(9);
      console.log("  remove(9) should yield [-1, 6, 1, 2, 55, 10, 4, 0, 12]: " + (toArray(list.head).equals([-1, 6, 1, 2, 55, 10, 4, 0, 12])));
      var r3 = list.remove(4);
      console.log("  remove(4) should yield [-1, 6, 1, 2, 10, 4, 0, 12]: " + (toArray(list.head).equals([-1, 6, 1, 2, 10, 4, 0, 12])));
    });

    test (true, function() {
      console.log("Gets & Sets");
      for (var i = 0; i < 8; i++) {
        list.set(i, i);
      }
      console.log("  set(0 ... 7) should yield [0, 1, 2, 3, 4, 5, 6, 7]: " + (toArray(list.head).equals([0, 1, 2, 3, 4, 5, 6, 7])));
      var a = [];
      for (var i = 7; i >= 0; i--) {
        a.push(list.get(i));
      }
      console.log("  get(7 ... 0) should yield [7, 6, 5, 4, 3, 2, 1, 0]: " + (a.equals([7, 6, 5, 4, 3, 2, 1, 0])));
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