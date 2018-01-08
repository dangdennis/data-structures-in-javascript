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

    [x] Complete the implementation of a DoubleStack class
    [x] .storage property to hold the items on the stack using a dynamic array (or
          vector).
    [x] .push() function to push a value from the back
    [x] .pop() function to push a value from the back
    [x] .pushFront() function to push a value from the front
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

let DoubleStack = function(initialCapacity, maxCapacity) {
  this.storage = new Array(initialCapacity || 16); // Change to dynamic array or vector
  this.min = this.storage.length || 8; // default to 8
  this.max = maxCapacity || 1 << 5; // max = 32
  this.lengthFront = 0;
  this.lengthBack = 0;
};

DoubleStack.prototype.push = function(value) {
  if (this.storage[this.lengthBack] && this.lengthBack >= this.lengthFront) {
    this.resize("add");
  }
  // Convert length to index aka position
  let position = this.storage.length - 1 - this.lengthBack;
  this.storage[position] = value;
  this.lengthBack++;
};

DoubleStack.prototype.pop = function() {
  let totalLength = this.lengthBack + this.lengthFront;
  if (totalLength <= this.storage.length / 2) {
    this.resize("remove");
  }
  // Allows user to pop items without ever using .push, 
  // i.e. popping when items have been only added via pushFront()
  this.lengthBack = this.lengthBack > 0 ? this.lengthBack : 1;
  let position = this.storage.length - this.lengthBack;
  let temp = this.storage[position];
  delete this.storage[position];
  this.lengthBack--;
  // Allows users to always push starting at 0 if none are added
  if (this.lengthBack < 0) {
    this.lengthBack = 0;
  }
  return temp;
};

DoubleStack.prototype.pushFront = function(value) {
  if (this.storage[this.lengthFront] && this.lengthFront >= this.lengthBack) {
    this.resize("add");
  }
  this.storage[this.lengthFront++] = value;
};

DoubleStack.prototype.popFront = function() {
  let totalLength = this.lengthBack + this.lengthFront;
  if (totalLength <= this.storage.length / 2) {
    this.resize("remove");
  }
   // Allows user to popFront items without ever using .pushFront, 
  // i.e. popFront'ing when items have only been added via push
  let position = this.lengthFront - 1 >= 0 ? this.lengthFront - 1 : 0;
  let temp = this.storage[position];
  delete this.storage[position];
  this.lengthFront--;
  // Allows users to always pushFront starting at 0 if none are added
  if (this.lengthFront < 0) {
    this.lengthFront = 0;
  }
  return temp;
};

DoubleStack.prototype.resize = function(direction) {
  if (!direction) {
    return;
  }

  // Logic for increase or decreasing new array size
  let tempStorage;
  if (direction === "add") {
    if (this.storage.length * 2 > this.max) {
      throw new Error("Exceeding max capacity parameter!");
    }
    let newCapacity = this.storage.length * 2;
    tempStorage = new Array(newCapacity);

    // Resizing logic
    for (let i = 0; i < this.lengthFront; i++) {
      tempStorage[i] = this.storage[i];
    }
    let backPointer = this.storage.length - 1;
    for (let j = tempStorage.length - 1; j > tempStorage.length - 1 - this.lengthBack; j--, backPointer--) {
      tempStorage[j] = this.storage[backPointer];
    }
  } else if (direction === "remove") {
    if (this.storage.length / 2 <= this.min - 1) {
      throw new Error("Cannot reduce below minimum capacity parameter!");
    }
    let newCapacity = this.storage.length / 2;
    tempStorage = new Array(newCapacity);

    for (let i = 0, j = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        tempStorage[j] = this.storage[i];
        j++;
      }
    }
  }

  this.storage = tempStorage;
};

let dd = new DoubleStack(8);

dd.push(1);
dd.push(2);
dd.push(3);
dd.push(4);
dd.push(5);
dd.push(6);
dd.push(7);
dd.push(8);
dd.pushFront(9);
dd.pushFront(10);
dd.pushFront(11);
dd.pushFront(12);
dd.pushFront(13);
dd.pushFront(14);
dd.pushFront(15);
dd.pushFront(16);
console.log(dd.storage);
dd.pop();
dd.pop();
dd.pop();
dd.pop();
dd.pop();
dd.pop();
dd.pop();
dd.pop();
dd.pop();
// dd.push(1000);
console.log(dd.storage);
// console.log(dd.storage.length);
// let r1 = dd.pop();
// console.log(r1);
// let r2 = dd.popFront();
// console.log(r2);

/*

  t = new array(length * 2)
  copy all front items to front of new array (everything from 0 to lengthFront)
  copy all back items to back of new array (everything from lengthBack to storage.length)


  OLD ARRAY:

             LB
             |           +-- storage.length
  [a, b, c, d, 4, 3, 2, 1]
   0         |
             LF


  NEW ARRAY

             LF                      LB
             |                       |           +-- storage.length (new storage)
  [a, b, c, d, _, _, _, _, _, _, _, _, 4, 3, 2, 1]
   0

*/
