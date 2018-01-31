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
//   2. [x] add node functionality
//   4. [x] remove node functionality
//   3. [x] contains node functionality
//

function Node(data) {
  this.data = data;
  this.children = [];
}

function Tree() {
  this.root = null;
  this.count = 0;
}

Tree.prototype.add = function(data, parent) {
  const node = new Node(data);
  if (parent !== null) {
    parent.children.push(node);
    this.count++;
    return node;
  } else {
    this.root = node;
    return node;
  }
};

Tree.prototype.remove = function(data) {
  var rootNode = this.root;
  var drillAndRemove = function(node) {
    for (let i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if (data === child.data) {
        node.children.splice(i, 1);
        this.count--;
        return child;
      }
      drillAndRemove(child);
    }
  };
  drillAndRemove(rootNode);
  return null;
};

Tree.prototype.contains = function(data) {
  var found = false;
  var subroutine = function(node) {
    if (node.data === data) {
      found = true;
      return found;
    }
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      subroutine(child);
    }
  };
  subroutine(this);
  return found;
};

Tree.prototype.find = function(data) {
  var found = null;
  var drillAndFind = function(node) {
    if (node.data === data) {
      found = node;
      return found;
    }
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      drillAndFind(child);
    }
  };
  drillAndFind(this);
  return found;
};

Tree.prototype.count = function() {
  console.log("count", this.count);
  return this.count;
};

Tree.prototype.printEachNode = function() {
  if (!this.root) {
    return console.log("No root node found");
  }
  var drillAndPrint = function(node, height) {
    // height = height || 0;
    // height++;
    // How can I increment and decrement height?
    console.log(node);
    for (let i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      drillAndPrint(child, height);
    }
  };
  drillAndPrint(this.root);
  console.log("----------------------");
};

var tree = new Tree();
console.log("tree.root", tree.root);
var ceo = tree.add("ceo", tree.root);
var cto = tree.add("cto", ceo);
var dev1 = tree.add("dev1", cto);
var dev2 = tree.add("dev2", cto);
var dev3 = tree.add("dev3", cto);
var cfo = tree.add("cfo", ceo);
var acct = tree.add("accountant", cfo);
var cmo = tree.add("cmo", ceo);
tree.printEachNode(); // => ceo | cto cfo cmo | dev1 dev2 dev3 accountant
var cmo = tree.remove("cmo");
tree.printEachNode(); // => ceo | cto cfo | dev1 dev2 dev3 accountant
var cfo = tree.remove("cfo");
tree.printEachNode(); // => ceo | cto | dev1 dev2 dev3
