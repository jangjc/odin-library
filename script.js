const myLibrary = [];


function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary() {
    // take params, create a book then store it in the array
}

// You can add some manual books here to test your display function
const book1 = new Book("Hahaha", "JC Jang", 17, true);
console.log(book1.info());
console.table(book1);
