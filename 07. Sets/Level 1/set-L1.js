/*

 Set is a mathematical construct that holds unique values.

 whereas an array can hold [ 1, 2, 3, 1, 2, 3, 3, 4, x, ... ]

 a set would be

 { 1, 2, 3, 4, x, ... }

 won't usually say get me index [_]... but instead you ask
  does the set S have 3... var s = new Set = { ... } ....
  later you'd say if s.has(3);

 in case of Set, key is the value


 There is an idea of multiSet which allows duplicates

 */

/*
  A Set is a data structure that holds any non-repeating values.  The order of values
   isn't usually important though some implementations my require ordering.  The
   interesting thing about Sets is that usually they are used to merely indicate the
   presence of a value rather than to act as a storage container to later retrieve
   the value.  While most data structures hold a { key, value } pair, the key is the
   value in Sets.  Or more precisely, only the key matters.  But a value is needed
   in Javascript primitive arrays/objects.  Simply using a non-zero number or true
   would suffice.  In this example, you may choose whatever you like, such as
   { key = key }, { key = 1 }, { key = true }, etc. but using { key = true } will
   make it easier to make if (true)... else ... statements.

  Sets can be static or dynamic.  As with all static data structures, a static Set is
   fixed-size.  Data in a Set can be anything: numbers, text, objects, etc.  For this
   objective, focus only on numbers or text.

  Your objective is to complete the implementation of static Set that can add, remove,
   and check for the existence of a value.

    [*] Pre-allocate storage as required.  It cannot be altered after creation
    [x] Maintain length.  Do not allow the number of insert to exceed capacity
    [x] .add() function to insert an item into the Set if it doesn't already exist
    [x] .remove() function to remove an item from the Set if it exists
    [x] .isMember() function to return whether the value exists in the Set

  NOTE: Do not use built-in functions to ease the pain
  NOTE: Do not allow duplicates in any one set.

*/

var Set = function(capacity) {
  this.storage = {};
  this.length = 0;
  this.max = capacity || 10;
};

Set.prototype.add = function(value) {
  if(this.length + 1 > this.max) {
    throw new Error('Hey, you\'ve already reached the max!');
  }
  this.storage[value] = value;
  this.length++;
};

Set.prototype.remove = function(value) {
  if(!this.storage[value]) {
    throw new Error('Hey, there isn\'t anything to remove!');
  }
  delete this.storage[value];
  this.length--;
};

Set.prototype.isMember = function(value) {
  var isMember = this.storage[value] ? true : false;
  return isMember;
};

var s = new Set(10);
s.add('1');
s.add('2');
s.add('3');
console.log(s.storage);
s.remove('1');
console.log(s.storage);
console.log(s.length);
console.log('isMember',s.isMember('2'))

