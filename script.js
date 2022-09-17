const modal = document.querySelector(".modal-container"),
  modalForm = document.getElementById("modal-form"),
  bookTitle = document.getElementById("book-title"),
  bookAuthor = document.getElementById("book-author"),
  bookPages = document.getElementById("book-page-count"),
  bookReadStatus = document.getElementById("book-read-status"),
  bookGrid = document.querySelector(".book-grid");

let myLibrary = [];

// Constructor Function
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

  // Find index of book within myLibrary array. Why?
  // this.domIndex doesn't match the index within the array after
  // the first card is removed.
  const bookIndex = myLibrary.findIndex((object) => {
    return object.title === this.title;
  });

  // Remove the book from the array
  myLibrary.splice(bookIndex, 1);
};

Book.prototype.editBook = function () {
  console.log("Edit issued for", this.title);
};

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
  // this.updateReadStatus();
};

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
    book.card.setAttribute("data-card-index", book.domIndex);

    // Populate newly created elements with each key value
    book.cardTitle.textContent = book.title;
    book.cardAuthor.textContent = book.author;
    book.cardPages.textContent = book.pages;

    // Convert boolean to human readable format & add icon
    if (book.readStatus === true) {
      book.cardReadStatusIcon.classList.add("fa-square-check");
      book.cardReadStatus.textContent = "Read";
      book.cardReadStatus.classList.add("read");
    } else {
      book.cardReadStatusIcon.classList.add("fa-square");
      book.cardReadStatus.textContent = "Unread";
      book.cardReadStatus.classList.add("unread");
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
      console.log(book.readStatus);
    });
  });
}

//
// Modal Form Submission: Add Book to Array & Display on the page
//

modalForm.addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

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
  hideBookModal();

  // clear form values
  clearFormValues();
});

//
// Clear all values inputted into the form
//

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
    showBookModal();
  } else {
    hideBookModal();
  }
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
  bookTitle.focus();
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
