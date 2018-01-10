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

DoubleStack.prototype.push = () => {
  const self = this;
  return {
    front: function(payload) {
      // First node
      if (self.storage.head === null || self.storage.tail === null) {
        self.storage.head = self.storage.tail = new DoublyLinkedListNode(payload);
        self.frontLength++;
        return;
      }
      // Adding subsequent nodes to the head / front of the list
      const newNode = new DoublyLinkedListNode(payload);
      newNode.next = self.storage.head;
      self.storage.head.pre = newNode;
      self.storage.head = newNode;
      self.frontLength++;
    },
    back: function(payload) {
      // First node
      if (self.storage.head === null || self.storage.tail === null) {
        self.storage.head = self.storage.tail = new DoublyLinkedListNode(payload);
        self.backLength++;
        return;
      }
      const newNode = new DoublyLinkedList(payload);
      newNode.prev = self.storage.tail;
      self.storage.tail.next = newNode;
      self.storage.tail = newNode;
      self.backLength++;
    }
  };
};

DoubleStack.prototype.pop = () => {
  const self = this;
  return {
    front: function() {
      if (self.storage.head !== null) {
        const temp = self.storage.head;
        self.storage.head.next.prev = null;
        self.storage.head = self.storage.head.next;
        self.frontLength--;
        return temp;
      }
    },
    back: function() {
      if (self.storage.tail !== null) {
        const temp = self.storage.tail;
        self.storage.tail.prev.next = null;
        self.storage.tail = self.storage.tail.prev;
        self.backLength--;
        return temp;
      }
    }
  };
};

DoubleStack.prototype.length = () => {
  const self = this;
  return {
    front: function() {
      return self.frontLength;
    },
    back: function() {
      return self.backLength;
    },
    size: function() {
      return self.frontLength + self.backLength;
    }
  }
  
};

var ds = new DoubleStack();
var push = ds.push();
push.front("first");
