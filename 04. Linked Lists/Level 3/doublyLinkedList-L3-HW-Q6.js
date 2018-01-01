
/*

  Write all the Big-O results on a grid, comparing against each other:


                          Q1      Q2          Q5

                                              L
                                             L
                                            D

                          R       Y       R
                         O       L       O
                        T       B       T
                       C       U       C
                      E       O       E
                     V       D       V

    Constructor  :   ???     ???     ???
    Insert       :   ???     ???     ???
    InsertBefore :   ???     ???     ???
    InsertAfter  :   ???     ???     ???
    Add          :   ???     ???     ???
    Remove       :   ???     ???     ???
    Get          :   ???     ???     ???
    Set          :   ???     ???     ???
    Resize       :   ???     ???     ???
    Find         :   ???     ???     ???
    Contains     :   ???     ???     ???
    toArray      :   ???     ???     ???


  NOTE:

  When comparing operation to see which implementation is better for certain cases, some operations might
   have different names but do the same thing.  In the case above, Vector.insert() is the same, more or
   less, as DoublyLinkedList.insertBefore() and Vector.add() is roughly the same as
   DoublyLinkedList.insertAfter().

  You can get a feel for efficiency by considering what you'll be doig most of.  If you'll be creating
   the data structure and then doing a lot of appends (at the end) then you look to see what algorithms
   are better at that.  If you'll be doing a lot of random access (get/set) then you look at the efficiency
   of those operations.  If you'll be doing a lost of random inserts/removes then you look there to see
   which of the implementations best suit your needs.

  This is the crux of comparative analysis and why Big-O exists.

*/