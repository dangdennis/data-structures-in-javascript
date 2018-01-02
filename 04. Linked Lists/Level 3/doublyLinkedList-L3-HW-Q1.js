
/*

  1. Analyze your Vector-L3 implementation,  what is the Big-O of each function.  Why?

  Vector-L3:

    Constructor : O(1) 
    Insert      : O(n), for-loop on line 97
    Add         : amortized O(1), expected case linear due to .resize
    Remove      : O(n), for-loop line 145
    Get         : O(1), single operation
    Set         : O(1)
    Resize      : O(n)
    Find        : O(n)
    Contains    : O(n)
    toArray     : O(n)


*/