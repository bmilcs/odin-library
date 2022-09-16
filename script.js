const modal = document.querySelector(".modal");
const modalForm = document.getElementById("modal-form");
const modalBookTitle = document.getElementById("book-title");

let myLibrary = [];

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
    let card = document.createElement("div"),
      cardTitle = document.createElement("h2"),
      cardAuthor = document.createElement("p"),
      cardPages = document.createElement("p"),
      cardReadStatus = document.createElement("p");

    card.classList.add("card");

    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.pages;
    cardReadStatus.textContent = book.readStatus;

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);

    document.querySelector("body").appendChild(card);
  });
  debugger;
}

//
// Modal Form Submission: Add Book to Array & Display on the page
//

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  titleValue = document.getElementById("book-title").value;
  authorValue = document.getElementById("book-author").value;
  pagesValue = document.getElementById("book-page-count").value;
  readStatusValue = document.getElementById("book-read-status").value;

  addBookToLibrary(titleValue, authorValue, pagesValue, readStatusValue);

  displayAllBooks();
});

//
// Header Button: Add Book, Shows Modal
//

document.querySelector(".btn-add-book").addEventListener("click", () => {
  // remove hidden visibility, which prevents the css animation on page's first load
  modal.style.visibility = "visible";

  if (modal.classList.contains("visible")) {
    modal.classList.remove("visible");
  } else {
    modal.classList.add("visible");
    modalBookTitle.focus();
  }
});

//
// Keyboard: Esc to Hide "Add Book" Modal
//

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("visible");
});

//
// Sample data
//
addBookToLibrary(
  "The Oz Principle",
  "Roger Connors, Tom Smith, Craig Hickman",
  "232",
  1
);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", 0);

displayAllBooks();
