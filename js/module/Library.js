class Library{
    /* Permet de stocker des objets Book */

    constructor(library, key){
        this.library = (library == undefined) ? [] : library;
        this.key = (key == undefined) ? 0 : key;
    }

    addBook(bookObject){
        /* Add a Book instance to the Library instance, giving it a unique key */

        /* Check for double */
        if (isDouble(bookObject)){
            return;
        }
        
        /* Add the unique key to the book object */
        bookObject.key = this.key;
        this.key += 1;

        /* Add the book to the library */
        this.library.push(bookObject);
    }

    isDouble(bookObject){
        /* Return true if the library already contains a similar book 
        (title, author and nbr pages) */

        let findResult = 
    }
}

export { Library };