import { Library } from "./module/Library.js";
import { Book } from "./module/Book.js"
import { App } from "./module/App.js"


/* TEST */
let bibli = new Library();
console.log(bibli);
let bookA = new Book("AtitreA", "auteurA", 123, "true");
let bookB = new Book("btitreB", "auteurB", 456, "false");
let bookAA = new Book("atitreA", "auteurA", 123, "false");

let bookC = new Book("BtitreC", "auteurC", 2136, "false");
let bookD = new Book("TitreD", "auteurD", 456, "true");


console.log(bookA);

bibli.addBook(bookA);
bibli.addBook(bookB);
bibli.addBook(bookAA);
bibli.addBook(bookC);
bibli.addBook(bookD);



console.log(bibli);

console.log(bibli.getBook(1));
console.log(bibli.getBook(324234));


if (bibli.delBook(2)){
    console.log("Book with key = 2 deleted");
}
else{
    console.log("Nothing deleted");
}

if (bibli.delBook(1234)){
    console.log("Book with key = 1234 deleted");
}
else{
    console.log("Nothing deleted");
}

bibli.editAuthor(0, "Max");
bibli.editTitle(0, "La petite sirène");
bibli.editNbrPages(0, 700);
bibli.editReadStatus(0);

console.log(bibli);

bibli.sortByNbrPages(false);
console.log("Sort by pages");
console.log(bibli);

let app = new App(bibli);
app.displayLibrary();


