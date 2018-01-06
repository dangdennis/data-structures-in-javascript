/*
  In the previous challenge, L2, we implemented a double stack.  Hopefully that got
   blood flowing (not boiling).  It is certainly a challenging little implementation
   for such a simple concept.  The bonus asked you to observe what happens after the
   two sides meet in the middle, and keep growing.  Hopefully you didn't change any
   code to change its behavior.  Using a static array can certainly show limitations.
   It would be ideal to use a dynamic array.

  Your objective is to re-implement a double stack using a dynamic array.  It might
   be tempting to use the vector you created earlier.  Ask yourself, is it possible
   to add items at both ends of the vector while maintaining the built-in resize
   feature?  The answer is in how the resize behaves.  Keep in mind, with a double
   stack, each end of the stack begins at the left and right edge of the storage.
   Does a default vector implementation copy in such a way to preserve that semantic?

  It is possible to use a vector and simulate push(), pop(), pushFront(), and
   popFront() operations using the get() and set() methods.  You can consider making
   a modified vector that has an alternate copy behavior, or better yet, use the
   same vector, but attach an alternate resize() function with the new copy behavior.
   Or, alternately, devise your own new dynamic array scheme.

    [ ] Complete the implementation of a DoubleStack class
    [ ] .storage property to hold the items on the stack using a dynamic array (or
          vector).
    [ ] .push() function to push a value from the back
    [ ] .pop() function to push a value from the back
    [ ] .pushFront() function to push a value from the front
    [ ] .popFront() function to push a value from the front
    [ ] .length property to return the total size used

    [ ] The storage cannot resize more than max or less than min.
    [ ] If either end meet in the middle, and continue to grow, a resize must trigger

  BONUS:

    [ ] After completing the above, re-implement using a DoublyLinkedList instead of
          a dynamic array (or specialized vector).  Use the file stack-L3b.js

      [ ] Observe, was it easier?  More difficult?  Be able to explain why
      [ ] What are the differences in resize behavior?  Which do you prefer.  Be able
            to explain why

  NOTE: Do not use any built-in features

*/

var DoubleStack = function(initialCapacity, maxCapacity) {
  this.storage = []; // Change to dynamic array or vector
  this.max = maxCapacity || 1 << 5; // max = 32
  this.min = initialCapacity || 8; // default to 8
  this.lengthFront = 0;
  this.pointerFront = 0;
  this.lengthBack = 0;
  this.pointerBack = initialCapacity - 1;
};

DoubleStack.prototype.push = function(value) {
  if (this.storage[this.pointerBack] && this.pointerBack < this.pointerFront) {
    this.resize("add");
  }
  this.storage[this.pointerBack] = value;
  this.lengthBack++;
  this.pointerBack--;
};

DoubleStack.prototype.pop = function() {
  var lengthCheck = 0;
  if (lengthCheck / 2 <= this.length) {
    this.resize("remove");
  }
  var temp = this.storage[this.pointerBack];
  this.storage[this.pointerBack] = undefined;
  this.lengthBack--;
  this.pointerBack++;
  return temp;
};

DoubleStack.prototype.pushFront = function(value) {
  if (this.storage[this.pointerFront] && this.pointerFront > this.pointerBack) {
    this.resize("add");
  }
  this.storage[this.pointerFront] = value;
  this.lengthFront++;
  this.pointerFront++;
};

DoubleStack.prototype.popFront = function() {
  if (this.length() / 2 <= this.length) {
    this.resize("remove");
  }
  var temp = this.storage[this.pointerFront];
  this.storage[this.pointerFront] = undefined;
  this.lengthFront--;
  this.pointerFront--;
  return temp;
};

DoubleStack.prototype.length = function() {
  return this.lengthFront + this.lengthBack;
};

DoubleStack.prototype.resize = function(direction) {
  if (!direction) {
    return;
  }

  // Logic for increase or decreasing new array size
  let tempStorage;
  if (direction === "add") {
    if (this.capacity * 2 > this.maxCapacity) {
      return;
    }
    this.capacity *= 2;
    tempStorage = new Array(this.capacity);
  } else if (direction === "remove") {
    if (this.capacity / 2 < this.minCapacity) {
      return;
    }
    this.capacity /= 2;
    tempStorage = new Array(this.capacity);
  }

  // Logic for copying over old array given pointer
  for (let i = 0; i < this.lengthFront; i++) {
    tempStorage[i] = this.storage[i];
  }

  for(let j = 0)


  this.storage = tempStorage;
};
