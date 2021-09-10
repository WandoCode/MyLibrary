class App {

    booksElement = document.querySelector(".books-container");
    newBookForm = document.forms["newBookForm"];
    editBookForm = document.forms["editBookForm"];
    sortByForm = document.forms["sortByForm"];

    constructor(library){
        this.myLibrary = library; 
        this.sortBy = "default+";
    }

    initializeDisplay() {
        /* Add eventListener to HTML element */
        newBookForm.onsubmit = () => submitNewBookForm();
        editBookForm.onsubmit = () => submitEditBookForm();
        sortByForm.onsubmit = () => submitSortByForm();
    }

    sortLibrary() {
        /* Following sortBy value, sort the library */
        switch (this.sortBy) {
            case "title+":
                this.myLibrary.sortByTitle(true);
                break;

            case "title-":
                this.myLibrary.sortByTitle(false);
                break;

            case "author+":
                this.myLibrary.sortByAuthor(true);                
                break;

            case "author-":
                this.myLibrary.sortByAuthor(false);                
                break;

            case "nbrPages+":
                this.myLibrary.sortByNbrPages(true);                
                break;

            case "nbrPages-":
                this.myLibrary.sortByNbrPages(false);
                break;

            case "isRead+":
                this.myLibrary.sortByReadStatus(true);                
                break;

            case "isRead-":
                this.myLibrary.sortByReadStatus(false);
                break;

            case "defaul+":
                this.myLibrary.sortByKeys(true);                
                break;

            case "defaul-":
                this.myLibrary.sortByKeys(false);                
                break;

            default:
                break;
        }
    }

    cleanDisplayLibrary() {
        /* Remove the display of books on the webpage */
        let booksDisplay = this.booksElement.querySelectorAll(".book");
        for (let i = 0; i < booksDisplay.length; i++) {
            booksDisplay[i].remove();
        }
    }

    displayLibrary() {
        /* Display one by one, every book in the library, following the sorting order choosen */

        /* Sort library */
        this.sortLibrary(this.sortBy);

        /* Build up a new line int the table for each book in the library*/
        for (const i in this.myLibrary.library) {
            const book = this.myLibrary.library[i];

            const trElement = document.createElement("TR");
            trElement.setAttribute("data-type", book.key);
            trElement.classList.add("book");
            this.booksElement.appendChild(trElement);

            /* Add book infos */
            const titleElement = document.createElement("TD");
            trElement.appendChild(titleElement);
            const authorElement = document.createElement("TD");
            trElement.appendChild(authorElement);
            const nbrPagesElement = document.createElement("TD");
            trElement.appendChild(nbrPagesElement);
            const readStatusElement = document.createElement("TD");
            trElement.appendChild(readStatusElement);

            titleElement.innerText = book.title;
            authorElement.innerText = book.author;
            nbrPagesElement.innerText = book.nbrPages;
            readStatusElement.innerText = book.strReadStatus();
            
            /* Add edit, toogle read status et remove btn at the book*/
            const editBtnElement = document.createElement("TD");
            trElement.appendChild(editBtnElement);
            const removeBtnElement = document.createElement("TD");
            trElement.appendChild(removeBtnElement);
            const toogleReadBtnElement = document.createElement("TD");
            trElement.appendChild(toogleReadBtnElement);

            const btnEdit = document.createElement("BUTTON");
            btnEdit.innerText = "Edit";
            const btnRemove = document.createElement("BUTTON");
            btnRemove.innerText = "Remove";
            const btnRead = document.createElement("BUTTON");
            btnRead.innerText = "Read";

            editBtnElement.appendChild(btnEdit);
            removeBtnElement.appendChild(btnRemove);
            toogleReadBtnElement.appendChild(btnRead);




        }
    }
}


export { App };