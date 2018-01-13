var LinkedListNode = function(data, next) {
  this.data = data;
  this.next = next || null;
};

var LinkedList = function() {
  this.head = null;
  this.tail = null;
};

function add(node, data) {
  var newNode = new LinkedListNode(data);
  if (!node.head) {
    node.head = newNode;
    node.tail = newNode;
  } else {
    node.tail.next = newNode;
    node.tail = newNode;
  }
  return newNode;
}

function findMiddleNode(list) {
  let fastPointer = list.head;
  let slowPointer = list.head;

  while (fastPointer.next !== null && fastPointer.next.next !== null) {
    fastPointer = fastPointer.next.next;
    slowPointer = slowPointer.next;
  }

  return slowPointer;
}

var ll = new LinkedList();
add(ll, "1");
add(ll, "2");
add(ll, "3");
add(ll, "4");
add(ll, "5");
add(ll, "6");
add(ll, "7");
add(ll, "8");
add(ll, "9");
add(ll, "10");

console.log(ll.head)
var middleNode = findMiddleNode(ll);
console.log(middleNode);