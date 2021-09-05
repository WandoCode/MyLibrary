/* *** DEFAULT VALUES *** */
let myLibrary = [];
const form = document.forms["newBookForm"];
const sortByForm = document.forms["sortByForm"];
let sortBy = "title";
let libraryContainer = document.querySelector(".library-container");

function Book(title, author, nbrPages, read){
    this.title = title;
    this.author = author;
    this.nbrPages = nbrPages;
    this.read = read;

    this.info = function(){
        let formatRead;
        if (this.read == "true"){
            formatRead = "Read";
        }
        else {
            formatRead = "Not read";
        }

        return `${formatRead}`;
    };

    this.toggleRead = function(){
        if (this.read == "true"){
            this.read = "false";
        }
        else{
            this.read = "true";
        }
    };
}

/* *** EVENT LISTENERS *** */
document.querySelector("#newBookBtn").addEventListener("click", toggleNewBookForm);
document.querySelector("#newBookForm").onsubmit = submitForm;
document.addEventListener("DOMContentLoaded", e => {
    displayLibrary(myLibrary); 
});
document.querySelector("#sortByForm").onsubmit = applySortBy;




/* *** STORAGE *** */

/* function storageAvailable() source: 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
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

/* Check if local storage is available*/
if (storageAvailable('localStorage')) {
    myLibrary = loadLocalData(); 
} 
else {
    alert("Local storage not available");
}

function loadLocalData() {
    /* Return stored library if it exists, or [] */
    let library;
    if (!localStorage.getItem("library")){
        library = [];
    }
    else {
        library = JSON.parse(localStorage.getItem("library"));
    }

    /* Add .info et . toggleRead method (they are not stored in JSON!) */
    for (let i = 0; i < library.length; i ++) {
        library[i].info = function(){
            let formatRead;
            if (this.read == "true"){
                formatRead = "Read";
            }
            else {
                formatRead = "Not read";
            }
    
            return `${formatRead}`;
        };

        library[i].toggleRead = function(){
            if (this.read == "true"){
                this.read = "false";
            }
            else{
                this.read = "true";
            }
        };
    }
    return library;
}

function saveLibrary(){
    /* Save the all library locally */
    localStorage.setItem("library", JSON.stringify(myLibrary));
}


/* *** HELPERS FUNCTIONS *** */

function toggleNewBookForm(e) {
    /* toggle view or not of the new book display */
    let formNewBook = document.querySelector("#newBookForm");

    if (formNewBook.style.display != "flex"){
        formNewBook.style.display = "flex"
    }
    else{
        formNewBook.style.display = "none";
    }
}

function submitForm(e){
    /* Process values from newBookForm form */

    e.preventDefault();

    /* Get datas */
    const author = form["author"].value;
    const title = form["title"].value;
    const nbrPage = form["nbrPage"].value;
    const isRead = form["isRead"].value;
    let book = new Book(title, author, nbrPage, isRead);

    /* Validate datas */
    if (!isValideForm(author, title, nbrPage, isRead)){
        alert("Invalid datas submited.");
    }
    else {
        /* Check if book has been added to  library */
        if (!addBookToLibrary(book)) {
            alert("This book is already in you library!");
        }
        else {
            displayLibrary(myLibrary);  
            clearForm();
        }
    }
}

function isValideForm (author, title, nbrPage, isRead){
    /* Validate author */
    if (typeof author != "string") return false;
    if (author.length >= 31 || author.length < 5) return false;
    /* Validate title */
    if (typeof title != "string") return false;
    if (title.length >= 61 || title.length < 2) return false;
    /* Validate nbrPage */
    if (parseInt(nbrPage) == NaN) return false;
    if (nbrPage <= 0) return false;
    /* Validate isRead */
    if (isRead != "true" && isRead != "false") return false;

    return true;
}

function clearForm(){
    /* Reset displayed form values */
    form["author"].value = "";   
    form["title"].value = "";
    form["nbrPage"].value = 1;
    form["isRead"].value = "false";
}

function removeBook(e) {
    /* Remove book form library and update storage */
    const index = e.target.attributes["data-type"].value;
    myLibrary.splice(index, 1);
    displayLibrary(myLibrary);
    saveLibrary();
}

function addBookToLibrary(book){
    /* Add object Book to the library. Does not allow duplication. Update storage*/

    /* Look for book duplication */
    for (let i = 0; i < myLibrary.length ; i++){
        if (myLibrary[i].author === book.author && myLibrary[i].title === book.title &&
        myLibrary[i].nbrPage === book.nbrPage){
            return false;
        }
    }

    /* Add the book */
    myLibrary.push(book);
    saveLibrary();

    return true;
}


function displayLibrary(library){
    /* Display, one by one, each books in the library */

    /* Execute the sorting for library */
    sortLibrary(sortBy);

    /* Display each books */
    libraryContainer.innerHTML = "";
    libraryContainer.appendChild(createTableHeading());
    for (let i = 0; i < library.length; i++){
        let bookDiv = createBookDiv(i, library);
        libraryContainer.appendChild(bookDiv);
    }
}

function createTableHeading() {
    let bookHeading = document.createElement("TR");
    bookHeading.className = "book-heading";

    let thTitle = document.createElement("TH");
    let thAuthor = document.createElement("TH");
    let thNbrPage = document.createElement("TH");
    let thRead = document.createElement("TH");
    let thRmvBook = document.createElement("TH");
    let thChangeReadStatus = document.createElement("TH");


    thTitle.innerHTML = "Title";
    thAuthor.innerHTML = "Author";
    thNbrPage.innerHTML = "Pages";
    thRead.innerHTML = "Read status";
    thRmvBook.innerHTML = "Remove book";
    thChangeReadStatus.innerHTML = "Change read";

    bookHeading.appendChild(thTitle);
    bookHeading.appendChild(thAuthor);
    bookHeading.appendChild(thNbrPage);
    bookHeading.appendChild(thRead);
    bookHeading.appendChild(thRmvBook);
    bookHeading.appendChild(thChangeReadStatus);

    return bookHeading;
}

function createBookDiv(index, library){
    let bookDiv = document.createElement("TR");
    bookDiv.className = "book-display";

    let tdTitle = document.createElement("TD");
    let tdAuthor = document.createElement("TD");
    let tdNbrPage = document.createElement("TD");
    let tdRead = document.createElement("TD");
    let tdRmvBook = document.createElement("TD");
    let tdChangeReadStatus = document.createElement("TD");

    tdTitle.innerHTML = library[index].title;
    tdAuthor.innerHTML = library[index].author;
    tdNbrPage.innerHTML = library[index].nbrPages;
    tdRead.innerHTML = library[index].info();

    bookDiv.appendChild(tdTitle);
    bookDiv.appendChild(tdAuthor);
    bookDiv.appendChild(tdNbrPage);
    bookDiv.appendChild(tdRead);

    
    let btnRemove = document.createElement("BUTTON");
    btnRemove.innerHTML = "X";
    btnRemove.setAttribute("data-type", index);
    btnRemove.addEventListener("click", removeBook);
    btnRemove.className = "btn-remove btn";
    tdRmvBook.appendChild(btnRemove);
    bookDiv.appendChild(tdRmvBook);

    let btnRead = document.createElement("BUTTON");
    btnRead.innerHTML = "Change";
    btnRead.addEventListener("click", e => toggleReadStatus(e, index));
    btnRead.className = "btn-read btn";
    tdChangeReadStatus.appendChild(btnRead);
    bookDiv.appendChild(tdChangeReadStatus);

    return bookDiv;
}

function toggleReadStatus(e, index){
    myLibrary[index].toggleRead();
    displayLibrary(myLibrary);
    saveLibrary();
}

function applySortBy(e) {
    e.preventDefault();
    sortBy = sortByForm["sort-by"].value;
    displayLibrary(myLibrary);
}

function sortLibrary(sortChoice) {
    switch (sortChoice) {
        case "title":
            sortByTitle();
            break;
    
        case "author":
            sortByAuthor();
            break;

        case "pages":
            sortByNbrPage();
            break;

        case "read":
            sortByRead();
            break;

        default:
            sortByTitle();
            break;
    }
    saveLibrary();
}

function sortByTitle() {
    myLibrary.sort((a, b) => {
        return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1;
    });
}

function sortByAuthor() {
    myLibrary.sort((a, b) => {
        return (a.author.toUpperCase() > b.author.toUpperCase()) ? 1 : -1;
    });
}

function sortByNbrPage(){
    myLibrary.sort((a, b) => {
        return (+a.nbrPages < +b.nbrPages) ? 1 : -1;
    });
}

function sortByRead(){
    myLibrary.sort((a, b) => {
        return (a.read < b.read) ? 1 : -1;
    });
}

