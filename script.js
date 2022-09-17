const modal = document.querySelector(".modal-container");
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
  myLibrary.forEach((book, i) => {
    // If card has already been created, skip iteration
    if (book.addedToPage) return;

    // Prevent duplicates from being added on next iteration
    book.addedToPage = 1;

    // Set index # of iteration
    // Allowing us to target the card element within the DOM
    book.domIndex = i;

    // Create elements for each book key:value pair
    let card = document.createElement("div"),
      cardTitle = document.createElement("h2"),
      cardAuthor = document.createElement("p"),
      cardPages = document.createElement("p"),
      cardReadStatus = document.createElement("p"),
      cardDeleteIcon = document.createElement("i");

    // Add .card for CSS styling
    card.classList.add("card");
    card.setAttribute("data-card-index", book.domIndex);

    // Populate newly created elements with each key value
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPages.textContent = book.pages;

    // Convert boolean to human readable format
    book.readStatus === true
      ? (cardReadStatus.textContent = "Read")
      : (cardReadStatus.textContent = "Unread");

    // Add delete icon from Font Awesome library
    cardDeleteIcon.classList.add("fa-solid");
    cardDeleteIcon.classList.add("fa-trash");

    // Assemble final card
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);
    card.appendChild(cardDeleteIcon);

    // Add card to body
    bookGrid.appendChild(card);

    console.log(book);
  });
}

//
// Modal Form Submission: Add Book to Array & Display on the page
//

modalForm.addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

  const bookTitle = document.getElementById("book-title"),
    bookAuthor = document.getElementById("book-author"),
    bookPages = document.getElementById("book-page-count"),
    bookReadStatus = document.getElementById("book-read-status");

  // append values to myLibrary array
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookReadStatus.checked
  );

  // create cards & display it to the page
  displayAllBooks();

  // hide add book modal popup
  modal.classList.add("hidden");

  // clear form values
  clearFormValues();
});

function clearFormValues() {
  // loop through inputs & clear their values
  const inputArray = Array.from(modalForm.querySelectorAll("input"));

  inputArray.forEach((input) => {
    input.type === "checkbox" ? (input.checked = false) : (input.value = "");
  });
}

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
  true
);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", false);

displayAllBooks();
