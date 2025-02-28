// Library array to store books
var myLibrary = [];

// DOM Elements
const bookTable = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("showButton");
const closeButton = document.getElementById("closeWindow")
const submitButton = document.getElementById("submit")
const bookForm = document.getElementById("bookForm");
const selectBookForm = document.getElementById("status");

// Book Constructor Function
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function() {
  this.readStatus = !this.readStatus;
  console.log(`${this.title}'s Reading Status has been updated to ${this.readStatus}`)
};

// Function to add a book to the library array
function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(`${book.title} has been added to the library`);
}

// Function to delete a book from the library
function deleteBook(index, id) {
  // Remove book from array
  myLibrary = myLibrary.filter(book => book.title != id);

  // Remove from table
  var row=index.parentNode.parentNode;
      row.parentNode.removeChild(row);

  console.log(`${id} was remove from array.`)
  console.log('Updated Array:', myLibrary)
}

// Function to render the library in the table
function renderLibrary() {
  clearTable(); // Clear table before rendering
  myLibrary.forEach((book, index) => {
    
    const newRow = document.createElement('tr'); // Create a table row
    newRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td class="status"><button class="toggle-btn" data-index="${index}">${book.readStatus ? "Finished" : "Reading"}</button>
      <td><button id='${book.title}' onclick="deleteBook(this, id)">Delete</button></td>
    `;
    bookTable.appendChild(newRow); // Append row to the table
  });

  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const bookIndex = this.dataset.index;
      myLibrary[bookIndex].toggleReadStatus();
      renderLibrary(); // Re-render the books
    });
  });
}

// Function to clear the table before rendering
function clearTable() {
  bookTable.innerHTML = "";
}

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const book = new Book(
    bookForm.title.value, 
    bookForm.author.value, 
    bookForm.pages.value, 
    bookForm.status.options[selectBookForm.selectedIndex].text
  );

  addBookToLibrary(book);
  clearTable()
  renderLibrary();
  dialog.close();

});

// Event Listener: Show dialog when button is clicked
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Event Listener: Close dialog when button is clicked
closeButton.addEventListener("click", () => {
  dialog.close();
});




// Example Books
const exampleBooks = [
  new Book("The Hobbit", "J.R.R. Tolkien", 310, false),
  new Book("1984", "George Orwell", 328, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("Moby Dick", "Herman Melville", 635, false)
];

// Add example books to the library and render
exampleBooks.forEach(addBookToLibrary);
renderLibrary();