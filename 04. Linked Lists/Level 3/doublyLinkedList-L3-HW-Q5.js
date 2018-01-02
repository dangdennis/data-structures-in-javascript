

/*

  Analyze again the Big-O of all the functions of the new Vector class using doubly linked list, what is the big-O,why?

  Vector using DoublyLinkedList:

    Constructor : O(1)
    Traversal:     : O(n)
    Insert      : O(1), O(n) if traversing via while loop line 299
    Add         : O(1), adds to tail only
    Remove      : O(1), O(n) if traversing via while loop line line 367
    Get         : O(n), while loop line 393
    Set         : O(n), while loop line 410
    Resize      : N/A
    Find        : O(n), while loop line 423
    Contains    : O(n), while loop line 436
    toArray     : O(n), while loop line 476

*/