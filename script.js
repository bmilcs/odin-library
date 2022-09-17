const modal = document.querySelector(".modal-container"),
  form = document.getElementById("modal-form"),
  formTitleBar = document.querySelector(".modal-header"),
  formSubmitBtn = document.querySelector(".modal button"),
  titleInput = document.getElementById("book-title"),
  authorInput = document.getElementById("book-author"),
  pagesInput = document.getElementById("book-page-count"),
  readStatusInput = document.getElementById("book-read-status"),
  bookGrid = document.querySelector(".book-grid");

// myLibrary: Stores book details, html elements & methods
let myLibrary = [];

// Book Object Constructor Function
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.removeBook = function () {
  // Delete card element from page
  this.card.classList.add("fade-out");
  setTimeout(() => {
    this.card.remove();
  }, 200);

  // Find index of book within myLibrary array for removal
  const bookIndex = myLibrary.findIndex((object) => {
    return object.title === this.title;
  });

  // Remove the book from the array
  myLibrary.splice(bookIndex, 1);
};

Book.prototype.editBook = function () {
  // update titlebar & button labels on the form
  formTitleBar.textContent = `Edit Book #${this.index + 1}`;
  formSubmitBtn.textContent = "Update Book";

  // populate form with field values
  titleInput.value = this.title;
  authorInput.value = this.author;
  pagesInput.value = this.pages;
  this.readStatus === true
    ? (readStatusInput.checked = true)
    : (readStatusInput.checked = false);

  // show form modal
  showBookModal();
};

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
  if (this.readStatus) this.setAsRead();
  else this.setAsUnread();
};

Book.prototype.setAsRead = function () {
  this.cardReadStatusIcon.classList.remove("fa-square");
  this.cardReadStatusIcon.classList.add("fa-square-check");
  this.cardReadStatus.classList.remove("unread");
  this.cardReadStatus.classList.add("read");
  this.cardReadStatus.textContent = "Read";
};

Book.prototype.setAsUnread = function () {
  this.cardReadStatusIcon.classList.remove("fa-square-check");
  this.cardReadStatusIcon.classList.add("fa-square");
  this.cardReadStatus.classList.remove("read");
  this.cardReadStatus.classList.add("unread");
  this.cardReadStatus.textContent = "Unread";
};

function addBookToLibrary(title, author, pages, readStatus) {
  myLibrary.push(new Book(title, author, pages, readStatus));
}

function displayAllBooks() {
  // Loop through array & display each book on the page
  myLibrary.forEach((book, i) => {
    // If card has already been created, skip iteration
    if (book.existsOnPage) return;

    // Prevent duplicates from being added on next iteration
    book.existsOnPage = 1;

    // Set book iteration as index so edit book button can find the object
    book.index = i;

    // Create elements for each book key:value pair
    book.card = document.createElement("div");
    book.cardTitle = document.createElement("h2");
    book.cardAuthor = document.createElement("p");
    book.cardPages = document.createElement("p");
    book.cardReadStatus = document.createElement("div");
    book.cardIconContainer = document.createElement("div");
    book.cardReadStatusIcon = document.createElement("i");
    book.cardDeleteIcon = document.createElement("i");
    book.cardEditIcon = document.createElement("i");

    // Add .card for CSS styling
    book.card.classList.add("card");

    // Populate newly created elements with each key value
    book.cardTitle.textContent = book.title;
    book.cardAuthor.textContent = book.author;
    book.cardPages.textContent = book.pages;

    // Convert boolean to human readable format & add icon
    if (book.readStatus === true) {
      book.setAsRead();
    } else {
      book.setAsUnread();
    }

    // Add readstatus, edit, delete icons from Font Awesome library
    book.cardDeleteIcon.classList.add("fa-solid");
    book.cardDeleteIcon.classList.add("fa-trash");
    book.cardEditIcon.classList.add("fa-pen-to-square");
    book.cardEditIcon.classList.add("fa-solid");
    book.cardReadStatusIcon.classList.add("fa-solid");

    // Assemble Icon Container Div (Edit & Del icons)
    book.cardIconContainer.classList.add("card-icon-container");
    book.cardIconContainer.appendChild(book.cardReadStatusIcon);
    book.cardIconContainer.appendChild(book.cardReadStatus);
    book.cardIconContainer.appendChild(book.cardEditIcon);
    book.cardIconContainer.appendChild(book.cardDeleteIcon);

    // Assemble final card
    book.card.appendChild(book.cardTitle);
    book.card.appendChild(book.cardAuthor);
    book.card.appendChild(book.cardPages);
    book.card.appendChild(book.cardIconContainer);

    // Add card to body
    bookGrid.appendChild(book.card);

    // Add EventListeners to Read Status, Delete, Edit icons
    book.cardDeleteIcon.addEventListener("click", () => {
      book.removeBook();
    });

    book.cardEditIcon.addEventListener("click", () => {
      book.editBook();
    });

    book.cardReadStatusIcon.addEventListener("click", () => {
      book.toggleReadStatus();
    });
  });
}

//
// Modal Form Submission: Add or Edit Book & Display on the page
//

form.addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

  if (formTitleBar.textContent == "Add Book to Library") {
    // add a new book

    // append values to myLibrary array
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatusInput.checked
    );

    // create cards & display it to the page
    displayAllBooks();
  } else {
    // Edit an existing book

    // get index value from titlebar of form:
    const bookID = formTitleBar.textContent.split("#")[1] - 1;
    const thisBook = myLibrary[bookID];

    // update object & card values
    thisBook.cardTitle.textContent = thisBook.title = titleInput.value;
    thisBook.cardAuthor.textContent = thisBook.author = authorInput.value;
    thisBook.cardPages.textContent = thisBook.pages = pagesInput.value;

    if (readStatusInput.checked) {
      thisBook.readStatus = true;
      thisBook.setAsRead();
    } else {
      thisBook.readStatus = false;
      thisBook.setAsUnread();
    }
  }

  // hide add book modal popup
  hideBookModal();

  // clear form values
  clearFormValues();
});

//
// Clear all values inputted into the form
//

function clearFormValues() {
  // loop through inputs & clear their values
  const inputArray = Array.from(form.querySelectorAll("input"));

  inputArray.forEach((input) => {
    input.type === "checkbox" ? (input.checked = false) : (input.value = "");
  });
}

//
// Header Button: Add Book > Shows Modal
//

document.querySelector(".btn-add-book").addEventListener("click", () => {
  // This form doubles as the Edit Book form
  formTitleBar.textContent = "Add Book to Library";
  formSubmitBtn.textContent = "Add Book";
  showBookModal();
});

//
// Keyboard: Esc to Hide "Add Book" Modal
//

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideBookModal();
});

//
// Hide & Show Book Modal Functions
//

function hideBookModal() {
  modal.classList.add("hidden");
  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

function showBookModal() {
  modal.style.display = "block";
  // Fade-in effect was not working unless a minimal timeout is set
  setTimeout(() => {
    modal.classList.remove("hidden");
  }, 1);
  titleInput.focus();
}

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
