/*
  The traditional Stack data structure allows you to push and pop items from only one
   end of the storage -- the back.  This is sufficient for many problems that the stack
   can solve.  Sometimes we might need two stacks.  To avoid wasting space we can share
   two stacks with a single storage on the same data structure instance.  This data
   structure is called a double stack.  It is a rarer data structure and one that has
   relatively little written about it, most people would rather use two stacks.  But
   we're not most people.

  The values on each side of the storage grow towards the center and shrink away from it.

  Your objective is to implement a double stack without using any built-in features.  A
   double stack is a data structure that allows you to push and pop values from both
   the front and the back of the stack.

    [ ] Complete the implementation of a DoubleStack class
    [x] .storage property to hold the items on the stack using a standard array
    [ ] .push() function to push a value from the back
    [ ] .pop() function to pop a value from the back
    [ ] .pushFront() function to push a value from the front
    [ ] .popFront() function to pop a value from the front
    [ ] .length property to return the total size used

  NOTE: Do not use any built-in features
  NOTE: Do not focus on edge cases or error conditions

  BONUS:

    [ ] Without changing any code for this, observe what happens when either of the front
          or the back meets in the middle, and continues to grow.  You'll need to write
          some code to trigger the conditions

*/

var DoubleStack = function(initialCapacity) {
  this.storage = new Array(initialCapacity || 16);
  this.frontLength = 0;
  this.frontPointer = 0;
  this.backlength = 0;
  this.backPointer = initialCapacity - 1;
};

DoubleStack.prototype.pushFront = function(value) {
  if (this.storage[this.backPointer] && this.backPointer < this.frontPointer) {
    throw new Error("No more memory!");
  }
  this.storage[this.backPointer] = value;
  this.backLength++;
  this.backPointer--;
};

DoubleStack.prototype.popFront = function() {
  var temp = this.storage[this.backPointer];
  this.storage[this.backPointer] = undefined;
  this.backLength--;
  this.backPointer++;
  return temp;
};

DoubleStack.prototype.push = function(value) {
  if (this.storage[this.frontPointer] && this.frontPointer > this.backPointer) {
    throw new Error("No more memory!");
  }
  this.storage[this.frontPointer] = value;
  this.frontLength++;
  this.frontPointer++;
};

DoubleStack.prototype.pop = function() {
  var temp = this.storage[this.frontPointer];
  this.storage[this.frontPointer] = undefined;
  this.frontLength--;
  this.frontPointer--;
  return temp;
};

var dd = new DoubleStack(8);
dd.push(1);
dd.push(2);
dd.pushFront(3);
dd.pushFront(4);
dd.push(5);
dd.push(6);
dd.pushFront(7);
dd.pushFront(8);
var r1 = dd.pop();
console.log(r1);
var r2 = dd.popFront();
console.log(r2);

console.log(dd.storage);
