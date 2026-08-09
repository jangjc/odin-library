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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, pages, read));

}

function displayBooks() {
    const libraryContainer = document.querySelector("#library-container");

    // Clear the container first
    libraryContainer.innerHTML = "";

    // Loop through the array and create a card for each book
    myLibrary.forEach((book) => {
        // 1. Create the main card div
        const card = document.createElement("div");
        card.classList.add("book-card");

        // Add the unique ID as a data attribute
        card.dataset.id = book.id;

        // 2. Create the elements for the books's details
        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `Pages: ${book.pages}`;

        const readElement = document.createElement("p");
        readElement.textContent = book.read ? "Status: Read" : "Status: Not read yet";

        // --- Toggle Read Button ---
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read Status";
        toggleReadBtn.classList.add("toggle-btn");

        toggleReadBtn.addEventListener("click", () => {
            const bookIndex = myLibrary.findIndex((b) => b.id === book.id);

            if (bookIndex !== -1) {
                myLibrary[bookIndex].toggleRead();
            }

            displayBooks();
        })



        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Add click listner to remove the book
        removeBtn.addEventListener("click", () => {
            // 1. Find the exact index of this book in the array using its ID
            const bookIndex = myLibrary.findIndex((b) => b.id === book.id);

            // 2. Remove 1 item at that index from the array
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
            }

            // 3. Re-render the UI
            displayBooks();
        });

        // 3. Append the details to the card
        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);
        card.appendChild(readElement);
        card.appendChild(toggleReadBtn);
        card.appendChild(removeBtn);

        // 4. Append the fuuly assembled card to the grid container
        libraryContainer.appendChild(card);
    });
}


/* You can add some manual books here to test your display function */

// const book1 = new Book("Hahaha", "JC Jang", 17, true);
// console.log(book1.info());
// console.table(book1);

addBookToLibrary("Hahaha", "JC Jang", 17, true);
addBookToLibrary("Ho ho ho", "JC Jang", 117, true);
addBookToLibrary("Hut Hut", "JC Jang", 1117, false);

// console.log(myLibrary);

displayBooks();

// Select our DOM elements
const newBookBtn = document.querySelector("#new-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const closeDialogBtn = document.querySelector("#close-dialog-btn");

// 1. Open the dialog when "New Book" is clicked
newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

// 2. Close the dialog when "Cancel" is clicked
closeDialogBtn.addEventListener("click", () => {
    bookDialog.close();
});

// 3. Handle the form submission
bookForm.addEventListener("submit", (event) => {
    //Prevent the default form submission which reloads the page
    event.preventDefault();

    // Grab the values from the inputs
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    // Checkboxes use .checked instead of .value
    const read = document.querySelector("#read").checked;

    // Add the new book to our array
    addBookToLibrary(title, author, pages, read);

    // Update the display to show the new card
    displayBooks();

    // Clear out the form inputs for the next time
    bookForm.reset();

    // Close the dialog
    bookDialog.close();
})



