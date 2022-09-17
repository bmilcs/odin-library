const modal = document.querySelector(".modal");
const modalForm = document.getElementById("modal-form");
const modalBookTitle = document.getElementById("book-title");
const bookGrid = document.querySelector(".book-grid");

const myLibrary = [];

// Constructor Function
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
  myLibrary.push(new Book(title, author, pages, readStatus));
}

function displayAllBooks() {
  // Loop through array & display each book on the page
  myLibrary.forEach((book) => {
    // Create elements for each book key:value pair
    let card = document.createElement("div"),
      cardTitle = document.createElement("h2"),
      cardAuthor = document.createElement("p"),
      cardPages = document.createElement("p"),
      cardReadStatus = document.createElement("p");

    // Add .card for CSS styling
    card.classList.add("card");

    // Populate newly created elements with each key value
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.pages;

    // Convert boolean to human readable format
    book.readStatus === 1
      ? (cardReadStatus.textContent = "Read")
      : (cardReadStatus.textContent = "Unread");

    // Assemble final card
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);

    // Add card to body
    bookGrid.appendChild(card);
  });
}

//
// Modal Form Submission: Add Book to Array & Display on the page
//

modalForm.addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

  // assign input values to variables
  titleValue = document.getElementById("book-title").value;
  authorValue = document.getElementById("book-author").value;
  pagesValue = document.getElementById("book-page-count").value;
  readStatusValue = document.getElementById("book-read-status").value;

  // append values to myLibrary array
  addBookToLibrary(titleValue, authorValue, pagesValue, readStatusValue);

  // create cards & display it to the page
  // TODO: fix - duplicates entire library on each add
  displayAllBooks();
});

//
// Header Button: Add Book > Shows Modal
//

document.querySelector(".btn-add-book").addEventListener("click", () => {
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
    modalBookTitle.focus();
  } else {
    modal.classList.add("hidden");
  }
});

//
// Keyboard: Esc to Hide "Add Book" Modal
//

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.add("hidden");
});

//
// Sample data: Testing purposes
//

addBookToLibrary(
  "The Oz Principle",
  "Roger Connors, Tom Smith, Craig Hickman",
  "232",
  1
);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", 0);

displayAllBooks();
