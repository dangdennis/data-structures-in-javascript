/*
  Continued from stack-L3b.js

  In the previous challenge, you modified the Double Stack using using a Doubly
   Linked List.  It concluded with a REFACTOR challenge leading you to this file.
   To refactor something is to clean up, or simplify, an implementation using a
   better implementation.  The previous implementation uses multiple similar
   functions and lengths.  We want fewer.

  Your objective is to:

    [ ] Refactor the implementation of a DoubleStack class.  You can start from a copy
          of your implementation from stack-L3b.js
    [ ] .push property that returns the object { front: function()..., back: function() }
          to replace push() and pushFront().  It can be used like: stack.push.front(value),
          or stack.push.back(), etc.
    [ ] .pop property that returns the object { front: function()..., back: function() }
          to replace pop() and popFront().  It can be used like: stack.pop.front(), or
          stack.pop.back(), etc.
    [ ] .length property that returns the object { front: _, back: _, size: _} that returns
          the current length of the front stack, back stack, and total size.  It can be
          used like: x = stack.length.size;

  NOTE: Do not use any built-in features
  NOTE: Start with a copy of your implementation from stack-L3b.js

*/

const DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  // this.frontHead = null;
  // this.frontTail = null;
  // this.backHead = null;
  // this.backTail = null;
  this.frontLength = 0;
  this.backLength = 0;
};

const DoublyLinkedListNode = function(payload, next, prev) {
  this.payload = payload;
  this.next = next || null;
  this.prev = prev || null;
};

const DoubleStack = function() {
  this.storage = new DoublyLinkedList();
  this.lengthFront = 0;
  this.lengthBack = 0;
};

DoubleStack.prototype.push = {
  front: function(payload) {
    // First node
    if (this.storage.head === null || this.storage.tail === null) {
      this.storage.head = this.storage.tail = new DoublyLinkedListNode(payload);
    }
    // Adding subsequent nodes to the tail
    if (this.storage.tail !== null) {
      const newNode = new DoublyLinkedListNode(payload);
      newNode.prev = this.storage.tail;
      this.storage.tail.next = newNode;
      this.lengthFront++;
    }
  },
  back: function() {
    // First node
    if (this.storage.head === null || this.storage.tail === null) {
      this.storage.head = this.storage.tail = new DoublyLinkedListNode(payload);
    }
    
  }
};

DoubleStack.prototype.pop = {
  front: function() {},
  back: function() {}
};

DoubleStack.prototype.length = {
  front: function() {},
  back: function() {},
  size: function() {
    return this.frontLength + this.backLength;
  }
};
