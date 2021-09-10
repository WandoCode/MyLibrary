class Library{
    /* Permet de stocker des objets Book */

    constructor(library, key){
        this.library = (library == undefined) ? [] : library;
        this.key = (key == undefined) ? 0 : key;
    }

    isDouble(bookObject){
        /* Return true if the library already contains a similar book 
        (title, author and nbr pages) */

        let foundResult = this.library.find((book) => {
            if (book.title == bookObject.title && book.author == bookObject.author && 
                book.nbrPages == bookObject.nbrPages) {
                    return true;
            }
            return false;
        });

        return (foundResult == undefined) ? false : true;
    }

    addBook(bookObject){
        /* Add a Book instance to the Library instance, giving it a unique key */

        /* Check for double */
        if (this.isDouble(bookObject)){
            return;
        }
        
        /* Add the unique key to the book object */
        bookObject.key = this.key;
        this.key += 1;

        /* Add the book to the library */
        this.library.push(bookObject);
    }

    getBook(bookKey){
        /* Return the Book object in the library with the given bookKey. if not found return undefined */
        return this.library.find((book) => {
            return book.key == bookKey;
        })
    }

    delBook(bookKey){
        /* Remove the book object with the given key from the library if the book is present */
        const bookToDel = this.getBook(bookKey);

        /* Check if the book is in the array */
        if (bookToDel == undefined) return false;

        const index = this.library.indexOf(bookToDel);
        this.library.splice(index, 1);
        return true;
    }

    editAuthor(bookKey, newAuthor){
        /* Attribute the newAuthor string to the book.author object with the given bookKey in the library */
        this.getBook(bookKey).author = newAuthor;
    }

    editTitle(bookKey, newTitle){
        /* Attribute the newTitle string to the book.title object with the given bookKey in the library */
        this.getBook(bookKey).title = newTitle;
    }

    editNbrPages(bookKey, newNbrPages){
        /* Attribute the newNbrPages integer to the book.nbrPages object with the given bookKey in the library */
        this.getBook(bookKey).nbrPages = newNbrPages;
    }

    editReadStatus(bookKey){
        /* Toggle the read status of the book object with the given bookKey in the library */
        const bookToEdit = this.getBook(bookKey);
        bookToEdit.isRead = (bookToEdit.isRead == "true") ? "false" : "true";
    }

    sortByTitle(isAscending){
        /* Sort alphabeticaly this.library by title. Reverse order if isAscending = false */
        if (isAscending) {
            this.library = this.library.sort((a, b) => {
                return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1: -1;
            });
        }
        else {
            this.library = this.library.sort((a, b) => {
                return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1: -1;
            });
        }
    
    }

    sortByNbrPages(isAscending){
        /* Sort alphabeticaly this.library by nbr pages. Reverse order if isAscending = false */
        if (isAscending) {
            this.library = this.library.sort((a, b) => {
                return (+a.nbrPages > +b.nbrPages) ? 1: -1;
            });
        }
        else {
            this.library = this.library.sort((a, b) => {
                return (+a.nbrPages < +b.nbrPages) ? 1: -1;
            });
        }
    }

    sortByAuthor(isAscending){
        /* Sort alphabeticaly this.library by author. Reverse order if isAscending = false */
        if (isAscending) {
            this.library = this.library.sort((a, b) => {
                return (a.author.toUpperCase() > b.author.toUpperCase()) ? 1: -1;
            });
        }
        else {
            this.library = this.library.sort((a, b) => {
                return (a.author.toUpperCase() < b.author.toUpperCase()) ? 1: -1;
            });
        }
    }
    
    sortByReadStatus(isAscending){
        /* Sort alphabeticaly this.library by read statusisRead. Reverse order if isAscending = false */
        if (isAscending) {
            this.library = this.library.sort((a, b) => {
                return (a.isRead.toUpperCase() > b.isRead.toUpperCase()) ? 1: -1;
            });
        }
        else {
            this.library = this.library.sort((a, b) => {
                return (a.isRead.toUpperCase() < b.isRead.toUpperCase()) ? 1: -1;
            });
        }
    }

    sortByKeys(isAscending){
        /* Sort alphabeticaly this.library by read book key. Reverse order if isAscending = false */
        if (isAscending) {
            this.library = this.library.sort((a, b) => {
                return (+a.key > +b.key) ? 1: -1;
            });
        }
        else {
            this.library = this.library.sort((a, b) => {
                return (+a.key < +b.key) ? 1: -1;
            });
        }
    }
}

export { Library };