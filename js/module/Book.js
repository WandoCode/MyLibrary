class Book{

    constructor(title, author, nbrPages, isRead){
        this.title = title;
        this.author = author;
        this.nbrPages = nbrPages;
        this.isRead = isRead;
        this.key = undefined;
    }

    strReadStatus(){
        /* Renvoi un string correspondant à isRead*/
        return this.isRead == "true" ? "Read" : "Not read";
    }
}

export { Book }