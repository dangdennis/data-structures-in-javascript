/*

  Single:

     [ D, n ] ---> [ D, n ] ---> ...

  node {
    data,
    next
  }

  .add(prev, data)
  .remove(data)
  .find(data)

*/

/*

  Double:

     [ p, D, n] <----> [ p, D, n ] <----> [ p, D, n ] ---> ...

     node {
       data,
       previous,
       next
    }

    .add(prev, data)
    .remove(data)
    .find(data)

*/

/*

 1. [ ] Write a function to insert node at head
 2. [ ] Write a function to remove node at head
 3. [ ] Write a function to insert node after head
 4. [ ] Write a function to remove node after head

 5. [ ] Do all the above again to do so with tail


*/

var doublyLinkedListNode = function(data, next, previous) {
  this.data = data;
  this.next = next || null;
  this.prev = previous || null;
};

var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
};

// if [ a, b, c, d ] insert(1, x)... then [ a, x, b, c, d ]
//

var linkedList = new DoublyLinkedList();

DoublyLinkedList.prototype.insertAtHead = function(data) {
  var node = new doublyLinkedListNode(data);
  if (this.head === null) {
    this.head = node;
    return this.head;
  }
  this.head.prev = node;
  node.next = this.head;
  this.head = node;
  return this.head;
};

DoublyLinkedList.prototype.removeAtHead = function() {
  // set head to head.next
  this.head.next.prev = null;
  this.head = this.head.next;
  return this.head;
};

DoublyLinkedList.prototype.insertAfterHead = function(data) {
  var newNode = new doublyLinkedListNode(data);

  newNode.next = this.head.next;
  newNode.prev = this.head;

  this.head.next.prev = newNode;
  this.head.next = newNode;
  return this.head;
};

DoublyLinkedList.prototype.removeAfterHead = function() {
  this.head.next.prev = this.head;
  this.head.next = this.head.next.next;
  return this.head;
};

DoublyLinkedList.prototype.insertAtTail = function(data) {
  var newNode = new doublyLinkedListNode(data);
  if (this.tail === null) {
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return this.head;
    } else {
      newNode.next = this.tail;
      this.tail = newNode;
      return this.head;
    }
  }
  this.head.prev = newNode;
  newNode.next = this.head;
  this.head = newNode;
  return this.head;
};

DoublyLinkedList.prototype.removeAfterTail = function() {
  // set head to head.next
  this.head.next.prev = null;
  this.head = this.head.next;
  return this.head;
};

DoublyLinkedList.prototype.insertAfterTail = function(data) {
  var newNode = new doublyLinkedListNode(data);

  newNode.next = this.head.next;
  newNode.prev = this.head;

  this.head.next.prev = newNode;
  this.head.next = newNode;
  return this.head;
};

DoublyLinkedList.prototype.insert = function(index, data) {
  // while (node != null && index > 0) {
  //   node = node.next;
  //   index =- 1;
  // }
};

// if [ a, b, c, d ] insertAfter(b, x)... then [a, b, x, c, d]
//
DoublyLinkedList.prototype.insertAfter = function(node, data) {};

// if [ a, b, c, d ] insertBefore(b, x)... then [a, x, b, c, d]
//
DoublyLinkedList.prototype.insertBefore = function(node, data) {};

DoublyLinkedList.prototype.remove = function(index) {};

DoublyLinkedList.prototype.find = function(value) {};

DoublyLinkedList.prototype.contains = function(value) {};

DoublyLinkedList.prototype.toArray = function() {
  var arr = [];
  var currentNode = this.head;
  while (currentNode !== null) {
    arr.push(currentNode.data);
    currentNode = currentNode.next;
  }
  return arr;
};

console.log(linkedList.toArray(linkedList.insertAtTail(20)));
linkedList.insertAtHead(1);
linkedList.insertAtHead(2);
linkedList.insertAtHead(3);
linkedList.insertAtHead(4);
console.log(linkedList.toArray(linkedList.insertAfterHead(5)));
console.log(linkedList.toArray(linkedList.removeAfterHead()));
console.log(linkedList.toArray(linkedList.removeAtHead()));
console.log(linkedList.toArray(linkedList.insertAtTail(10)));
console.log(linkedList.toArray(linkedList.insertAtTail(11)));
