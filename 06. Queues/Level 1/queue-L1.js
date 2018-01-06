/*

 Your objective is to implement a queue without using any built-in features.

 [x] Complete the implementation of a Queue class
 [x] .storage property to hold the items on the queue
 [x] .enqueue() function to queue up a value
 [x] .dequeue() function to dequeue a value
 [x] .length property to return the current length

 NOTE: Do not use any built-in features
 NOTE: Do not focus on edge cases or error conditions

 */

var Queue = function() {
  this.storage = [];
  this.length = 0;
  this.pointer = 0;
};

Queue.prototype.getLength = function() {
  return this.length - this.pointer;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.length] = value;
  this.length++;
};

Queue.prototype.dequeue = function() {
  var temp = this.storage[this.pointer]
  this.storage[this.pointer] = null;
  this.pointer++;
  //this.length--;
  return temp;
};

Queue.prototype.toArray = function() {
  var result = [];

  for (var i=this.pointer; i<this.length; i++) {
    result.push(this.storage[i]);
  }

  return result;
};


var q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
console.log(q.storage);
console.log(q.pointer);
var r1 = q.dequeue();
console.log('r1',r1);
console.log(q.storage);

console.log(q.length);
q.dequeue();
console.log(q.length);
console.log(q.storage);
q.enqueue("X");
console.log(q.storage);
var x = q.dequeue();
console.log(x);
console.log(q.storage);
console.log(q.getLength());
console.log(q.toArray());