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

    [x] Complete the implementation of a DoubleStack class
    [x] .storage property to hold the items on the stack using a standard array
    [x] .push() function to push a value from the back
    [x] .pop() function to pop a value from the back
    [x] .pushFront() function to push a value from the front
    [x] .popFront() function to pop a value from the front
    [x] .length property to return the total size used

  NOTE: Do not use any built-in features
  NOTE: Do not focus on edge cases or error conditions

  BONUS:

    [ ] Without changing any code for this, observe what happens when either of the front
          or the back meets in the middle, and continues to grow.  You'll need to write
          some code to trigger the conditions

*/

var DoubleStack = function(initialCapacity) {
  this.storage = new Array(initialCapacity || 16);
  this.lengthFront = 0;
  this.pointerFront = 0;
  this.lengthBack = 0;
  this.pointerBack = initialCapacity - 1;
};

DoubleStack.prototype.push = function(value) {
  if (this.storage[this.pointerBack] && this.pointerBack < this.pointerFront) {
    throw new Error("No more memory!");
  }
  this.storage[this.pointerBack] = value;
  this.lengthBack++;
  this.pointerBack--;
};

DoubleStack.prototype.pop = function() {
  var temp = this.storage[this.pointerBack];
  this.storage[this.pointerBack] = undefined;
  this.lengthBack--;
  this.pointerBack++;
  return temp;
};

DoubleStack.prototype.pushFront = function(value) {
  if (this.storage[this.pointerFront] && this.pointerFront > this.pointerBack) {
    throw new Error("No more memory!");
  }
  this.storage[this.pointerFront] = value;
  this.lengthFront++;
  this.pointerFront++;
};

DoubleStack.prototype.popFront = function() {
  var temp = this.storage[this.pointerFront];
  this.storage[this.pointerFront] = undefined;
  this.lengthFront--;
  this.pointerFront--;
  return temp;
};

DoubleStack.prototype.length = function() {
  return this.lengthFront + this.lengthBack;
};


DoubleStack.prototype.toArray = function() {
  var result = [];

  for (let i=0; i<this.lengthFront; i++) {
    result.push(this.storage[i]);
  }

  for (let i=this.lengthBack; i<this.storage.length;i++) {
    result.push(this.storage[i]);
  }

  return result;
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


/*

initially: lengthBack = storage.length;  <-- 14 in this case
           lengthFront = 0;              <-- 0 in this case



F                                        B
|                                        |
[a, _, _, _, _, _, _, _, _, _, _, _, _, 1]
    |                                   |
    LF                                  LB


pushBack(1);
   storage[--lengthBack] = value;

   getLengthBack()
      return storage.length - lengthBack;

pushBack(2)
popBack();
   fetch storage[++lengthBack]
   then delete it
   return it


pushFront(a)
  storage[lengthFront++] = value;

  getLengthFront()
    return lengthFront

*/