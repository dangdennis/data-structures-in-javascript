

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
DoublyLinkedList.prototype.insert = function(index, data) {

};

// if [ a, b, c, d ] insertAfter(b, x)... then [a, b, x, c, d]
//
DoublyLinkedList.prototype.insertAfter = function(node, data) {

};

// if [ a, b, c, d ] insertBefore(b, x)... then [a, x, b, c, d]
//
DoublyLinkedList.prototype.insertBefore = function(node, data) {

};


DoublyLinkedList.prototype.remove = function(index) {

};



DoublyLinkedList.prototype.find = function(value) {

};

DoublyLinkedList.prototype.contains = function(value) {

};



DoublyLinkedList.prototype.toArray = function() {

};


