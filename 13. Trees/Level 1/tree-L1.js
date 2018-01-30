/*
Tree = like a file system,
Root = only one node at the lowest level
Binary tree = left < data, right > data
Height == "how many levels of children", root = height of 1 
By knowing height, you can know your time complexity
Unbalanced tree = result of adding sorted data -- O(height), best case O(log n)
Deleting in a binary search tree means re-attaching the heigher level children from the removed node
to new places -- done easily with recursion

Tree ~= linked list, with multiple children/next, and also a single directional graph
No 'length', but count

DAG = directed acyclic graph
*/

// Implement
//
//   1. [x] Tree class
//   2. [ ] add node functionality
//   4. [ ] remove node functionality
//   3. [ ] contains node functionality
//

function Node(data) {
  this.data = data;
  this.children = [];
}

function Tree() {
  this.root = null;
}

Tree.prototype.add = function(data, parent) {
  const node = new Node(data);
  
  if(parent !== null) {
    parent.children.push(node);
    return node;
  } else {
    this.root = node;
  }
};

Tree.prototype.remove = function(data) {
  
};

Tree.prototype.contains = function(data) {
  // Your code here
};

Tree.prototype.find = function(data){
  var found = false;
  var subroutine = function(node){
    if ( node.data === data ){
      found = true;
      return node;
    }
    for ( var i = 0; i < node.children.length; i++ ){
      var child = node.children[i];
      subroutine(child);
    }
  }
  subroutine(this);
  return found;
};
  

  if ( !this.children ){ return; }
  for ( var i = 0; i < this.children.length; i++ ){
    var child = this.children[i];
    child.traverse.call(child);
  }
};

Tree.prototype.printEachNode = function() {
  if (!this.root) {
    return console.log("No root node found");
  }

  // Your code here
};

var tree = new Tree();
// tree.add("ceo");
// tree.add("cto", "ceo");
// tree.add("dev1", "cto");
// tree.add("dev2", "cto");
// tree.add("dev3", "cto");
// tree.add("cfo", "ceo");
// tree.add("accountant", "cfo");
// tree.add("cmo", "ceo");
// tree.printEachNode(); // => ceo | cto cfo cmo | dev1 dev2 dev3 accountant
// tree.remove("cmo");
// tree.printEachNode(); // => ceo | cto cfo | dev1 dev2 dev3 accountant
// tree.remove("cfo");
// tree.printEachNode(); // => ceo | cto | dev1 dev2 dev3
