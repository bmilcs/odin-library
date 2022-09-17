const modal = document.querySelector(".modal-container"),
  modalForm = document.getElementById("modal-form"),
  bookTitle = document.getElementById("book-title"),
  bookAuthor = document.getElementById("book-author"),
  bookPages = document.getElementById("book-page-count"),
  bookReadStatus = document.getElementById("book-read-status"),
  bookGrid = document.querySelector(".book-grid");

const myLibrary = [];

// Constructor Function
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.removeBook = function () {
  console.log("Delete issued for", this.title);
};

Book.prototype.editBook = function () {
  console.log("Edit issued for", this.title);
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
    let card = document.createElement("div"),
      cardTitle = document.createElement("h2"),
      cardAuthor = document.createElement("p"),
      cardPages = document.createElement("p"),
      cardReadStatus = document.createElement("p"),
      cardIconContainer = document.createElement("div"),
      cardDeleteIcon = document.createElement("i"),
      cardEditIcon = document.createElement("i");

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

    // Add edit & delete icons from Font Awesome library
    cardDeleteIcon.classList.add("fa-solid");
    cardDeleteIcon.classList.add("fa-trash");
    cardEditIcon.classList.add("fa-pen-to-square");
    cardEditIcon.classList.add("fa-solid");

    // Assemble Icon Container Div (Edit & Del icons)
    cardIconContainer.classList.add("card-icon-container");
    cardIconContainer.appendChild(cardEditIcon);
    cardIconContainer.appendChild(cardDeleteIcon);

    // Assemble final card
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);
    card.appendChild(cardIconContainer);

    // Add card to body
    bookGrid.appendChild(card);

    // Add EventListeners to Delete & Edit icons
    cardDeleteIcon.addEventListener("click", () => {
      book.removeBook();
    });

    cardEditIcon.addEventListener("click", () => {
      book.editBook();
    });

    console.log(book);
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
