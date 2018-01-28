


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
  // Your code here
};


Tree.prototype.remove = function(data) {
  // Your code here
};


Tree.prototype.contains = function(data) {
  // Your code here
};


Tree.prototype.printEachNode = function() {
  if(!this.root) {
    return console.log('No root node found');
  }

  // Your code here
};




var tree = new Tree();
tree.add('ceo');
tree.add('cto', 'ceo');
tree.add('dev1', 'cto');
tree.add('dev2', 'cto');
tree.add('dev3', 'cto');
tree.add('cfo', 'ceo');
tree.add('accountant', 'cfo');
tree.add('cmo', 'ceo');
tree.printEachNode(); // => ceo | cto cfo cmo | dev1 dev2 dev3 accountant
tree.remove('cmo');
tree.printEachNode(); // => ceo | cto cfo | dev1 dev2 dev3 accountant
tree.remove('cfo');
tree.printEachNode(); // => ceo | cto | dev1 dev2 dev3

