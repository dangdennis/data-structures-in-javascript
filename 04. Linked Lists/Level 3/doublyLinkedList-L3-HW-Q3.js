//
// Write a function using a doubly linked list to return the index of the nth odd number
//  from the tail of the list (think back to the arrays exercise asking the same thing)
//

// Separate function from data structure

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

DoublyLinkedList.prototype.findNthOddLast = function(endingNode, nth) {
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
