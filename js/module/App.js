import { Book } from "./Book.js"
import { Library } from "./Library.js";

class App {

    booksElement = document.querySelector(".books-container");
    addBookbtn = document.querySelector(".new-book-btn");
    newBookForm = document.forms["newBookForm"];
    editBookForm = document.forms["editBookForm"];
    sortByForm = document.forms["sortByForm"];

    constructor(library){
        this.myLibrary = (library == undefined) ? new Library() : library;
        this.sortBy = "default+";
    }

    initializeDisplay() {
        /* Add eventListener to HTML element and display the needed element*/
        newBookForm.onsubmit = e => this.submitNewBookForm(e);
        editBookForm.onsubmit = e => this.submitEditBookForm(e);
        sortByForm.onsubmit = e => this.submitSortByForm(e);
        this.addBookbtn.onclick = () => this.toggleNewBookForm();

        document.querySelector(".editBookForm").style.display = "none";
        document.querySelector(".newBookForm").style.display = "none";

        this.loadLibrary();
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

            case "default+":
                this.myLibrary.sortByKeys(true);                
                break;

            case "default-":
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
            titleElement.classList.add("TDtitle");
            authorElement.innerText = book.author;
            authorElement.classList.add("TDauthor");
            nbrPagesElement.innerText = book.nbrPages;
            nbrPagesElement.classList.add("TDnbrPages");
            readStatusElement.innerText = book.strReadStatus();
            readStatusElement.classList.add("TDisRead");
            
            /* Add edit, toogle read status et remove btn at the book*/
            const editBtnElement = document.createElement("TD");
            trElement.appendChild(editBtnElement);
            const removeBtnElement = document.createElement("TD");
            trElement.appendChild(removeBtnElement);
            const toogleReadBtnElement = document.createElement("TD");
            trElement.appendChild(toogleReadBtnElement);

            const btnEdit = document.createElement("BUTTON");
            btnEdit.innerText = "Edit";
            btnEdit.setAttribute("data-type", book.key);
            const btnRemove = document.createElement("BUTTON");
            btnRemove.innerText = "Remove";
            btnRemove.setAttribute("data-type", book.key);
            const btnRead = document.createElement("BUTTON");
            btnRead.innerText = "Read";
            btnRemove.setAttribute("data-type", book.key);

            editBtnElement.appendChild(btnEdit);
            removeBtnElement.appendChild(btnRemove);
            toogleReadBtnElement.appendChild(btnRead);

            /* Add event listeners for the buttons */
            btnEdit.onclick = () => this.clickOnEdit(book.key);
            btnRemove.onclick = () => this.clickOnRemove(book.key);
            btnRead.onclick = () => this.clickOnChangeRead(book.key);
        }
    }

    upDateBookDisplay(bookKey) {
        /* Update display of the given book */
        const bookDisplayArray = document.querySelectorAll(".book");

        /* Find the node where the TR for the book is in the table */
        let bookElement = "";
        for (let i = 0; i < bookDisplayArray.length; i++) {
            const bookDisplay = bookDisplayArray[i];
            if (+(bookDisplay.getAttribute("data-type")) == bookKey) {
                bookElement = bookDisplay;
                break;
            }
        }
        
        /* Get the current info for the book */
        const book = this.myLibrary.getBook(bookKey);
        
        /* Update TD element for title, author, nbrPage et isRead */
        const titleTd = bookElement.querySelector(".TDtitle");
        titleTd.innerText = book.title;
        const authorTd = bookElement.querySelector(".TDauthor");
        authorTd.innerText = book.author;
        const nbrPagesTd = bookElement.querySelector(".TDnbrPages");
        nbrPagesTd.innerText = book.nbrPages;
        const isReadTd = bookElement.querySelector(".TDisRead");
        isReadTd.innerText = book.strReadStatus();  
    }

    clickOnEdit(bookKey) {
        /* Cb function. Display the edit form for a given book or remove the display of editform*/

        /* if edit form already displayed ==> hide it */
        if (document.querySelector(".editBookForm").style.display == "flex"){
            document.querySelector(".editBookForm").style.display = "none";
            return;
        }

        /* Display the form */
        document.querySelector(".editBookForm").style.display = "flex";

        /* Complete form field with book data */
        const book = this.myLibrary.getBook(bookKey);
        editBookForm["author"].value = book.author;
        editBookForm["title"].value = book.title;
        editBookForm["nbrPages"].value = book.nbrPages;
        editBookForm["key"].value = book.key;

    }

    clickOnChangeRead(bookKey) {
        /* Cb function. Toggle the read value for a given book */
        this.myLibrary.editReadStatus(bookKey);
        this.upDateBookDisplay(bookKey);
    }

    clickOnRemove(bookKey){
        /* Cb function. Delete the display for a given book */
        this.myLibrary.delBook(bookKey);

        const bookDisplayArray = document.querySelectorAll(".book");
        /* Find the node where the TR for the book is in the table and remove it*/
        for (let i = 0; i < bookDisplayArray.length; i++) {
            let bookDisplay = bookDisplayArray[i];
            if (+(bookDisplay.getAttribute("data-type")) == bookKey) {
                bookDisplay.remove();

                /*Clean edit form*/
                editBookForm["author"].value = "";
                editBookForm["title"].value = "";
                editBookForm["nbrPages"].value = "";
                editBookForm["key"].value = "";

                break;
            }
        }
    }  
    
    isValidTextInput(text) {
        /* Valide text input data value for a fomulaire. Return true if correct, false if not */

        if (text.length > 50) return false;
        if (text < 1) return false;

        return true;
    }

    isValidKey(key) {
        if (parseInt(key) == NaN) return false;
        if (parseInt(key) < 0) return false;

        return true;
    }

    isValidNbrInput(nbr){
        /* Valide nbr input data value for a fomulaire. Return true if correct, false if not */

        if (parseInt(nbr) == NaN) return false;
        if (parseInt(nbr) > 10000) return false;
        if (parseInt(nbr) < 2) return false;

        return true;
    }

    isValidReadStatus(readStatus) {
        /* Valide nbr input read status value for a fomulaire. Return true if correct, false if not */

        if (readStatus != "true" && readStatus != "false") return false;
        return true;
    }

    submitEditBookForm(e) {
        /* Process datas send with EditBookForm form */

        e.preventDefault();

        /* Extract datas */
        let newAuthor = editBookForm["author"].value;
        let newTitle = editBookForm["title"].value;
        let newNbrPages = editBookForm["nbrPages"].value;
        let bookKey = editBookForm["key"].value;

        /* Valid datas */
        if (!this.isValidNbrInput(newNbrPages) || !this.isValidTextInput(newTitle) 
            || !this.isValidTextInput(newAuthor) || !this.isValidKey(bookKey)) {
            alert("Invalid datas submited");
            return;
        }
        bookKey = parseInt(bookKey);
        newNbrPages = parseInt(newNbrPages);

        /* Edit datas in book object */
        const book = this.myLibrary.getBook(bookKey);
        book.author = newAuthor;
        book.title = newTitle;
        book.nbrPages = newNbrPages;

        /* Update book display */
        this.upDateBookDisplay(bookKey);

        /* Hide the edit form */
        document.querySelector(".editBookForm").style.display = "none";
    }

    submitNewBookForm(e) {
        /* Process datas send with EditBookForm form */

        e.preventDefault();

        /* Extract datas */
        let newAuthor = newBookForm["author"].value;
        let newTitle = newBookForm["title"].value;
        let newNbrPages = newBookForm["nbrPages"].value;
        let newIsRead = newBookForm["isRead"].value;

        /* Valid datas */
        if (!this.isValidNbrInput(newNbrPages) || !this.isValidTextInput(newTitle) 
            || !this.isValidTextInput(newAuthor) || !this.isValidReadStatus(newIsRead)) {
            alert("Invalid datas submited");
            return;
        }
        newNbrPages = parseInt(newNbrPages);

        /* Create a new Book object from datas*/
        const book = new Book(newTitle, newAuthor, newNbrPages, newIsRead);
        this.myLibrary.addBook(book);
        this.saveLibrary();

        this.cleanDisplayLibrary();
        this.displayLibrary();

        /* Clean form */
        newBookForm["author"].value = "";
        newBookForm["title"].value = "";
        newBookForm["nbrPages"].value = "";
        newBookForm["isRead"].value = "true";
    }

    submitSortByForm(e) {
        /* Process datas send with SortByForm form */

        e.preventDefault();

        /* Extract datas */
        this.sortBy = sortByForm["sortBy"].value;

        /* Sort library */
        this.sortLibrary();

        /* Update Display */
        this.cleanDisplayLibrary();
        this.displayLibrary();
    }

    toggleNewBookForm() {
        /* Show or hide the newBookForm */
        if (document.querySelector(".newBookForm").style.display == "none") {
            document.querySelector(".newBookForm").style.display = "flex";
        }
        else {
            document.querySelector(".newBookForm").style.display = "none";
        }
    }

    inititalizeLocalStorage(){
        /* Set up the localStorage component. Code from
         https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API */

        var storage;
        try {
            storage = window['localStorage'];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    saveLibrary() {
        console.log(this.inititalizeLocalStorage())
        if (this.inititalizeLocalStorage()){
            localStorage.setItem("library", JSON.stringify(this.myLibrary.library));
        }
        else {
            console.log("Save failed");
        }
    }

    loadLibrary() {
        if (this.inititalizeLocalStorage()){
            if (localStorage.getItem("library") == undefined) {
                this.myLibrary.library = [];
            }
            else {
                this.myLibrary.library = JSON.parse(localStorage.getItem("library"));

                /* Wrote again Book method deletet by stringify */
                for (const i in this.myLibrary.library) {
                    const book = this.myLibrary.library[i];
                    book.strReadStatus = function (){
                        return this.isRead == "true" ? "Read" : "Not read";
                    }
                }
            }
        }
        else {
            console.log("load failed");
        }
    }

    clearMemory() {
        localStorage.setItem("library", JSON.stringify([]));
    }
}




export { App };