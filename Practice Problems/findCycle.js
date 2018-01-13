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

function findCycle(list) {
  var node = list.head;
  let hasCycle;
  while (node !== null) {
    if (node.marked === true) {
      return true;
    }
    node.marked = true;
    node = node.next;
  }
  return false;
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

var node = ll.head;
while (node !== null) {
  if (node.data == "5") {
    ll.tail.next = node;
    break;
  }
  node = node.next;
}

// var hasCycle = findCycle(ll);
// console.log("hasCycle", hasCycle);

//
// Good online solution
function hasLoop(startNode) {
  var currentNode = startNode;
  var checkNode = null;
  var since = 0;
  var sinceScale = 2;
  do {
    if (checkNode == currentNode) return true;
    if (since >= sinceScale) {
      checkNode = currentNode;
      since = 0;
      sinceScale = 2 * sinceScale;
    }
    since++;
  } while ((currentNode = currentNode.next));
  return false;
}

var hasCycle2 = hasLoop(ll);
console.log("hasCycle2", hasCycle2);
