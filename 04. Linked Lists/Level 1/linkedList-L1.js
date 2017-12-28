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

/*
  Previously, we learned that most programming languages provide an array.  An array is pretty
   raw.  To make it easier to work with, various abstractions can be created, such as a Vector.
   Static Arrays and Dynamic Arrays have pros and cons.  To provide an alternative, we can
   use a Linked List instead.  Classical Linked Lists are pretty raw.  At the most minimal of
   implementations, it is just a record (object) with the data and a pointer to next.  They
   were actually first described before the days of object-oriented programming.

  In this challenge, we are going to implement and operate on a classical Linked List.  Nothing
   fancy or object-oriented.  This will help to illuminate some of the workings of a Linked List
   and help set the foundation for the next few challenges.  One of the trickiest parts of working
   with a Linked List isn't finding a node, but having access to the previous one.  The standard
   Linked List does not provide a way for a given node to access any previous node.  Having
   access to the previous node (if any) is a critical part of manipulating Linked Lists.

  Your objective is to implement a classical non-object-oriented Linked List by completing the
   following:

    [x] Implement a LinkedListNode object
    [x] Define head and tail variables
    [x] .add() function to add a node to the currentNode and return the new node
    [ ] .findPrevious() function to return the previous node (null if none)
    [ ] .find() function to return an object representing the node containing the next occurrence
          of value as well as the previous node (if any).  Use only a single loop to find them.
          MERCY: if you need to use multiple loops at first, that's okay, but you'll need to then
          optimize it to a single loop.
    [ ] .remove() function to remove the currentNode node and return it

    [x] .toArray() function to return an array of all linked lists value in the same sequence
          as they appear in the linked list


  HINT: A Head refers to the first node, and a Tail refers to the last node.

  NOTE: Do not create an object-oriented abstraction
  NOTE: Do not focus on edge cases or error conditions
  NOTE: Satisfy all the tests.  Do not modify or comment of them out.
  NOTE: When passing a node into the functions, we usually would want to start with the first node
          in the known list -- this would be the head.  However, it can be any node.  That is
          because a Linked List is technically a node that points to another node.  Therefore we
          call it _fromWhichNode_.  Sometimes its useful to use the head, other times its useful
          to use any other node (from the same Linked List or a different one).

 */

var head = null;
var tail = null;

var LinkedListNode = function(data, next) {
  this.data = data;
  this.next = next || null;
};

function reverseLinkedList(start) {
  var prev = null;
  var curr = start;
  var last = start;

  while (curr != null) {
    var next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  head = prev;
  tail = last;
}

function removeDuplicates(startingNode, value) {
  var prev = null;
  var current = startingNode;
  var head = startingNode;
  var found = false;

  while (current != null) {
    // Head
    //
    if (prev === null && current.data === value) {
      if (found) {
        head = current.next;
        current = current.next;
      } else {
        found = true;

        prev = current;
        current = current.next;
      }
    } else {
      // Middle
      //
      if (current.data == value) {
        if (found) {
          prev.next = current.next;
          current = prev.next;
        } else {
          found = true;

          prev = current;
          current = current.next;
        }
      } else {
        prev = current;
        current = current.next;
      }
    }
  }

  return head;
}

function add(node, data) {
  var newNode = new LinkedListNode(data);
  if (!head) {
    head = newNode;
    tail = newNode;
  } else {
    tail.next = newNode;
    tail = newNode;
  }
  return newNode;
}

function remove(fromWhichNode, node) {
  // find previous
  var prev = findPrevious(fromWhichNode, node);
  var current = fromWhichNode;

  // removing the last node
  if ((prev === null) & (node.next === null)) {
    head = tail = null;
    return;
  }

  // removing from the head
  if (prev === null) {
    console.log("prev === null");
    head = head.next;
    return;
  }

  // removing from the tail
  if (node === tail) {
    console.log("node === tail");
    prev.next = null;
    tail = prev;
    return;
  }

  // removing anywhere else in the middle
  console.log("end of the function");
  prev.next = node.next;
}

function find(fromWhichNode, data) {
  var result = { node: null, prev: null };
  var previous = null;
  var currentNode = head;

  while (currentNode) {
    if (currentNode.data === data) {
      result.prev = previous;
      result.node = currentNode;
      return result;
    }
    previous = currentNode;
    currentNode = currentNode.next;
  }

  return result;
}

function findPrevious(fromWhichNode, node) {
  var currentNode = head;
  while (currentNode.next !== null) {
    if (currentNode.next === node) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  return null;
}

function toArray(fromWhichNode) {
  var currentNode = fromWhichNode;
  var result = [];

  while (currentNode) {
    result.push(currentNode.data);
    currentNode = currentNode.next;
  }
  return result;
}

(function() {
  var test = testRunner(7);
  test(true, function() {
    var test_result = false;

    test(true, function() {
      console.log("Removing duplicates");
      ll2 = new LinkedListNode(0);

      head = ll2;
      tail = ll2;

      var n1 = add(head, 1);
      // tail = n1
      var n2 = add(head, 1);
      // tail = n2;
      var n3 = add(head, 3);
      // tail = n3;
      var n4 = add(head, 4);
      // tail = n4;
      var n5 = add(head, 1);
      // tail = n5;
      console.log("pre duplicates removed TOARRAY", toArray(head));

      console.log(
        "Expect removed-duplicates linked list: removeDuplicates(head,1) === [1,3,4]",
        removeDuplicates(head, 1).equals([1, 3, 4])
      );
    });

    test(false, function() {
      console.log("Reversing linked list");
      ll2 = new LinkedListNode(0);

      head = ll2;
      tail = ll2;

      var n1 = add(head, 1);
      // tail = n1
      var n2 = add(head, 2);
      // tail = n2;
      var n3 = add(head, 3);
      // tail = n3;
      var n4 = add(head, 4);
      // tail = n4;
      console.log("pre reverse linkedlist TOARRAY", toArray(head));

      console.log(
        "Expect reversed linked list: reverse(head) === [4,3,2,1,0]",
        reverseLinkedList(head).equals([4, 3, 2, 1, 0])
      );
    });

    test(false, function() {
      console.log("Preliminaries");
      try {
        test_result = head === (null || undefined);
      } catch (e) {
        test_result = false;
      } finally {
        console.log("  Head is declared: " + test_result);
      }
    });

    test(false, function() {
      try {
        test_result = tail === (null || undefined);
      } catch (e) {
        test_result = false;
      } finally {
        console.log("  Tail is declared: " + test_result);
      }
    });

    var ll = null;

    test(false, function() {
      console.log("First Node");
      ll = new LinkedListNode(0, null);
      head = ll;
      tail = ll;

      console.log("  Head is set: " + (head === ll));
      console.log("  Tail is same as head: " + (tail === head));
    });

    var n1,
      n2,
      n3,
      n4 = null;

    test(false, function() {
      console.log("Add some nodes to the end");
      n1 = add(tail, 1);
      tail = n1;
      n2 = add(tail, 2);
      tail = n2;
      n3 = add(tail, 3);
      tail = n3;
      n4 = add(tail, 4);
      tail = n4;
      console.log(
        "  Linked List contains [0, 1, 2, 3, 4]: " +
          toArray(head).equals([0, 1, 2, 3, 4])
      );
    });

    var nx = new LinkedListNode(0, null);

    test(false, function() {
      console.log("Searching");
      console.log(
        "  findPrevious(head, ll) should return null: " +
          (findPrevious(head, ll) === null)
      );
      console.log(
        "  findPrevious(head, n2) should return n1: " +
          (findPrevious(head, n2) === n1 && n1 !== undefined)
      );
      console.log(
        "  findPrevious(head, n4) should return n3: " +
          (findPrevious(head, n4) === n3 && n3 !== undefined)
      );
      console.log(
        "  findPrevious(head, nx) should return null: " +
          (findPrevious(head, nx) === null)
      );
      console.log(
        "  find(head, 0) should return prev = null and node = 0: " +
          (find(head, 0).prev === null && find(head, 0).node.data === 0)
      );

      console.log(
        "  find(head, 3) should return prev = 2 and node = 3: " +
          (find(head, 3).prev.data === 2 && find(head, 3).node.data === 3)
      );
      console.log(
        "  find(head, 9) should return prev = null and node = null: " +
          (find(head, 9).prev === null && find(head, 9).node === null)
      );
    });

    test(false, function() {
      console.log("Removing");
      remove(head, ll);
      console.log(
        "  remove(head, 0) should return [1, 2, 3, 4]: " +
          toArray(head).equals([1, 2, 3, 4])
      );
      remove(head, n2);
      console.log("LINKED LIST---:", toArray(head));
      console.log(
        "  remove(head, 2) should return [1, 3, 4]: " +
          toArray(head).equals([1, 3, 4])
      );
      remove(head, n4);
      console.log(
        "  remove(head, 4) should return [1, 3]: " +
          toArray(head).equals([1, 3])
      );
      console.log("  head should be 1: " + (head.data === 1));
      console.log("  tail should be 3: " + (tail.data === 3));

      head = ll;
      head.next = n1;
      console.log(
        "  Added new nodes, should be [0, 1, 3]: " +
          toArray(head).equals([0, 1, 3])
      );
      remove(head, head);
      console.log(
        "  remove(head, head) should return [1, 3]: " +
          toArray(head).equals([1, 3])
      );
      remove(head, tail);
      console.log(
        "  remove(head, tail) should return [1]: " + toArray(head).equals([1])
      );
      console.log("  head should be 1: " + (head.data === 1));
      console.log("  tail should be 1: " + (tail.data === 1));
      remove(head, n1);
      console.log(
        "  remove(head, n1) should return []: " + toArray(head).equals([])
      );
      console.log("  head should be null: " + (head === null));
      console.log("  tail should be null: " + (tail === null));
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
