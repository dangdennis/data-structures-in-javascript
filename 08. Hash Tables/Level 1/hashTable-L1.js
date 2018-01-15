/*
  Hash Tables are extremely useful in computer science (and technical interviews).  They
   allow us to gain the advantages of array-like random access but with non-integers
   instead -- or when the storage array is smaller than the number of possible index keys
   we will potentially need.  A Hash Table is a specialized data structure that uses a
   key as input and computes an index from it, to be used as an array index for improved
   random access (than linear).

   Most programming languages provide some kind of Hash Table  by default, and
   Javascript is no exception.  Objects in Javascript are Hash Tables so there usually
   won't be any reason to recreate one in Javascript unless you need a non-default
   behavior.  In this challenge we are going to explore the different ways to make a
   good Hash Table without simply wrapping over a Javascript object.

  There are a few necessary components to a Hash Table:

    1. An array that usually offers more limited storage capacity than there will be keys
         filling it
    2. A _hash function_ that will transform the key into an index for the array
    3. A _collision_ resolver to deal with multiple different keys that both result
         in the same index

  Internal format of a HashTable looks like this:

  //
  //  this.table = []
  //  this.length;
  //
  //  |<----------------- Table --------------------->|    Array
  //   |<---- Bucket ----->|  ...              ...         Array of Arrays
  //    |<->| Entry ... (entries)
  //  [[[k,v], [k,v], [k,v]], [[k,v], [k,v]],  [[k,v]]]    Array of [key, value]
  //

  Your objective is to create a Hash Table with the following features:

    1. [x] HashTable class
    2. [x] .hasher() hash function to convert key into index
    3. [ ] .set() function to add or set entries
    4. [ ] .get() function to get entries
    5. [ ] Collision resolution using the _chaining_ technique
    6. [ ] .remove() function to remove entries

  BONUS:

    7. [ ] .toString() function to print everything to the console


  NOTE: We will only be using strings as a key for this exercise.  Do not attempt
         or consider any other type of key
  NOTE: Do not simply pass-through to a Javascript object, though you may use one as
         storage
  NOTE: Do not worry about edge cases and error checking

*/

var HashTable = function(capacity) {
  this.capacity = capacity || 8;
  this.table = new Array(this.capacity);
  this.length = 0;
};

// Algorithm of an set (which is also an insert)
//
//   Compute the hash from the key into bucketIndex
//   Read bucket based on bucketIndex
//   Was it previously filled?
//     No?  Create new bucket
//     Yes?  Use it
//   Was there an hash collision?
//     No? Add the first [k, v] pair
//     Yes? Iterate through entries
//        Does key already exists?
//          No?  append new [k, v] pair
//          yes?  overwrite the existing value
//
HashTable.prototype.set = function(key, value) {
  // Compute the hash from the key into bucketIndex
  const bucketIndex = this.hasher(key);
  // Check for present bucket
  if (this.table[bucketIndex] === undefined) {
    // If bucket not in use, create bucket with entry at hashed (bucket) index
    var bucket = [];
    bucket.push({ [key]: value });
    this.table[bucketIndex] = bucket;
    this.length++;
  } else {
    // If bucket present, make reference variable to that bucket
    const bucket = this.table[bucketIndex];
    // If previous key exists, overwrite
    if (bucket.hasOwnProperty(key)) {
      bucket[key] = value;
    } else {
      // Push to the end of the bucket if new entry
      bucket.push({ [key]: value });
      this.length++;
    }
  }
  return this;
};

// Algorithm of a get (which is also called a retrieve)
//
// Compute hash from the key into the bucketIndex
// Does numeric index have a bucket already?
//   No? do nothing / return some indication / whatever
// does key match anything in entries?
//   No? do nothing / return some / whatever
//   Yes? return value
//
HashTable.prototype.get = function(key) {
  var bucketIndex = this.hasher(key);
  // If the bucket exists
  if (this.table[bucketIndex] !== undefined) {
    const bucket = this.table[bucketIndex];
    if (bucket !== undefined) {
      // loop through bucket to find the correct entry
      // for(let i = 0; i < bucket.length; i++) {
      //   if(bucket[i].hasOwnProperty(key)) {
      //     return bucket[i][key];
      //   }
      // }
      var entry = bucket.filter(entry => {
        if(entry.hasOwnProperty(key)) {
          return true;
        }
      })
      return entry.length > 0 ? entry[0][key] : null;
    } else {
      throw new Error("No such entry");
    }
  } else {
    throw new Error("No such entry");
  }
};

// Algorithm of a remove (which is also called delete)
//
// Compute hash from key into bucketIndex
// does numeric index have a bucket already?
//   No? Do nothing / return some / whatever
// does key exist in entries?
//   No?  Do nothing / return / etc.
//   Yes?  Remove entry, return value
//
HashTable.prototype.remove = function(key) {
  var bucketIndex = this.hasher(key);

  // ...
};

HashTable.prototype.toString = function() {
  // ...
};

HashTable.prototype.hasher = function(key) {
  return key.toString().length % this.capacity;
};

(function() {
  var hash = new HashTable();

  hash.set("Alex Hawkins", "510-599-1930");
  //hash.toString();
  //[ , , , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]

  hash.set("Boo Radley", "520-589-1970");
  //hash.toString();
  //[ , [ [ 'Boo Radley', '520-589-1970' ] ], , [ [ 'Alex Hawkins', '510-599-1930' ] ] ]

  hash
    .set("Vance Carter", "120-589-1970")
    .set("Rick Mires", "520-589-1970")
    .set("Tom Bradey", "520-589-1970")
    .set("Biff Tanin", "520-589-1970");
  //hash.retrieveAll();
  /*
   [ ,
   [ [ 'Boo Radley', '520-589-1970' ],
   [ 'Tom Bradey', '520-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ],
   [ 'Rick Mires', '520-589-1970' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '520-589-1970' ] ] ]
   */

  //overide example (Phone Number Change)
  //
  hash
    .set("Rick Mires", "650-589-1970")
    .set("Tom Bradey", "818-589-1970")
    .set("Biff Tanin", "987-589-1970");
  //hash.toString();

  /*
   [ ,
   [ [ 'Boo Radley', '520-589-1970' ],
   [ 'Tom Bradey', '818-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ],
   [ 'Rick Mires', '650-589-1970' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]

   */

  hash.remove("Rick Mires");
  hash.remove("Tom Bradey");
  //hash.toString();

  /*
   [ ,
   [ [ 'Boo Radley', '520-589-1970' ] ],
   ,
   [ [ 'Alex Hawkins', '510-599-1930' ] ],
   ,
   ,
   [ [ 'Biff Tanin', '987-589-1970' ] ] ]


   */

  hash
    .set("Dick Mires", "650-589-1970")
    .set("Lam James", "818-589-1970")
    .set("Ricky Ticky Tavi", "987-589-1970");
  //hash.toString();

  console.log(hash.get("Lam James")); //818-589-1970
  console.log(hash.get("Dick Mires")); //650-589-1970
  console.log(hash.get("Ricky Ticky Tavi")); //987-589-1970
  console.log(hash.get("Alex Hawkins")); //510-599-1930
  console.log(hash.get("Lebron James")); //null
})();
