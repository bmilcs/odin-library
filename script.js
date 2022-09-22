// array: stores book objects (details, html elements & methods)

let myLibrary = [];

// object constructor

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = myLibrary.length;

  this.createCard();
}

// method: create ui elements for card

Book.prototype.createCard = function () {
  this.card = document.createElement("div");
  this.cardTitle = document.createElement("h2");
  this.cardAuthor = document.createElement("p");
  this.cardPages = document.createElement("p");
  this.cardIconContainer = document.createElement("div");
  this.cardReadStatusContainer = document.createElement("div");
  this.cardReadStatusIcon = document.createElement("i");
  this.cardReadStatus = document.createElement("p");
  this.cardDeleteIcon = document.createElement("i");
  this.cardEditIcon = document.createElement("i");

  // add .card for CSS styling
  this.card.classList.add("card");

  // populate elements with each key value
  this.cardTitle.textContent = this.title;
  this.cardAuthor.textContent = this.author;
  this.cardPages.textContent = this.pages;

  // convert boolean to human readable format & add icon
  this.readStatus ? this.setAsRead() : this.setAsUnread();

  // add font awesome icons: readStatus/edit/delete
  this.cardDeleteIcon.classList.add("fa-solid");
  this.cardDeleteIcon.classList.add("fa-trash");
  this.cardEditIcon.classList.add("fa-pen-to-square");
  this.cardEditIcon.classList.add("fa-solid");
  this.cardReadStatusIcon.classList.add("fa-regular");

  // assemble readStatus container: icon & label
  this.cardReadStatusContainer.appendChild(this.cardReadStatusIcon);
  this.cardReadStatusContainer.appendChild(this.cardReadStatus);
  this.cardReadStatusContainer.classList.add("readStatusContainer");

  // assemble icon container
  this.cardIconContainer.classList.add("card-icon-container");
  this.cardIconContainer.appendChild(this.cardReadStatusContainer);
  this.cardIconContainer.appendChild(this.cardEditIcon);
  this.cardIconContainer.appendChild(this.cardDeleteIcon);

  // assemble final card
  this.card.appendChild(this.cardTitle);
  this.card.appendChild(this.cardAuthor);
  this.card.appendChild(this.cardPages);
  this.card.appendChild(this.cardIconContainer);

  // display card on page
  document.querySelector(".book-grid").appendChild(this.card);

  // click events for icons on the card: edit/delete/readStatus
  this.cardDeleteIcon.addEventListener("click", () => {
    this.removeBook();
  });

  this.cardEditIcon.addEventListener("click", () => {
    this.editBook();
  });

  this.cardReadStatusContainer.addEventListener("click", () => {
    this.toggleReadStatus();
  });

  // double click on card: edit book
  this.card.addEventListener("dblclick", () => {
    this.editBook();
  });
};

// method: remove card element from page & book obj from array

Book.prototype.removeBook = function () {
  // animate card
  this.card.classList.add("fade-out");

  // remove card after animation
  setTimeout(() => {
    this.card.remove();
  }, 250);

  // locate book within myLibrary array
  const bookIndex = myLibrary.findIndex((book) => {
    return book.title === this.title;
  });

  // remove book from array
  myLibrary.splice(bookIndex, 1);

  // update id of all books
  myLibrary.forEach((book, i) => (book.id = i));
};

// method: swap icon & text to "read"

Book.prototype.setAsRead = function () {
  this.cardReadStatusIcon.classList.remove("fa-square");
  this.cardReadStatusIcon.classList.add("fa-square-check");
  this.cardReadStatus.classList.remove("unread");
  this.cardReadStatus.classList.add("read");
  this.cardReadStatus.textContent = "Read";
};

// method: swap icon & text to "unread"

Book.prototype.setAsUnread = function () {
  this.cardReadStatusIcon.classList.remove("fa-square-check");
  this.cardReadStatusIcon.classList.add("fa-square");
  this.cardReadStatus.classList.remove("read");
  this.cardReadStatus.classList.add("unread");
  this.cardReadStatus.textContent = "Unread";
};

// method: toggle read status (read/unread)

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
  this.readStatus ? this.setAsRead() : this.setAsUnread();
};

// global variables

const formTitleBar = document.querySelector(".modal-header"),
  formSubmitBtn = document.querySelector(".modal button"),
  titleInput = document.getElementById("book-title"),
  authorInput = document.getElementById("book-author"),
  pagesInput = document.getElementById("book-page-count"),
  readStatusInput = document.getElementById("book-read-status");

// method: launches form to edit book details
Book.prototype.editBook = function () {
  // update title bar & button label
  formTitleBar.textContent = `Edit Book #${this.id + 1}`;
  formSubmitBtn.textContent = "Update Book";

  // populate form with book details
  titleInput.value = this.title;
  authorInput.value = this.author;
  pagesInput.value = this.pages;

  this.readStatus === true
    ? (readStatusInput.checked = true)
    : (readStatusInput.checked = false);

  showForm();
};

// method: update book details from edit form pop-up

Book.prototype.updateBook = function () {
  // update book object from the form values
  this.title = titleInput.value;
  this.author = authorInput.value;
  this.pages = pagesInput.value;

  // update elements on page
  this.cardTitle.textContent = titleInput.value;
  this.cardAuthor.textContent = authorInput.value;
  this.cardPages.textContent = pagesInput.value;

  // update readStatus: book object, font awesome icon & label
  if (readStatusInput.checked) {
    this.readStatus = true;
    this.setAsRead();
  } else {
    this.readStatus = false;
    this.setAsUnread();
  }
};

// function: triggered on form submit

function addBook(title, author, pages, readStatus) {
  myLibrary.push(new Book(title, author, pages, readStatus));
}

// functions: form related

const modalContainer = document.querySelector(".modal-container");

function hideForm() {
  // animate: fade-out effect
  modalContainer.classList.add("hidden");
  setTimeout(() => {
    modalContainer.style.display = "none";
  }, 200);

  clearForm();
}

function showForm() {
  modalContainer.style.display = "block";
  // animate: fade-in effect was not working without this timeout
  setTimeout(() => {
    modalContainer.classList.remove("hidden");
  }, 1);
  titleInput.focus();
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readStatusInput.checked = false;
}

// form submission: called on add/edit book

document.getElementById("modal-form").addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

  if (formTitleBar.textContent == "Add Book to Library") {
    // append values to myLibrary array
    addBook(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatusInput.checked
    );
  } else {
    // edit an existing book
    // get book's id within the myLibrary object via titlebar of form
    const id = formTitleBar.textContent.split("#")[1] - 1;
    myLibrary[id].updateBook();
  }

  hideForm();
});

// 'add book' button (page header)

document.querySelector(".btn-add-book").addEventListener("click", () => {
  formTitleBar.textContent = "Add Book to Library";
  formSubmitBtn.textContent = "Add Book";
  showForm();
});

// close form: clicking x icon

document
  .querySelector(".close-icon")
  .addEventListener("click", () => hideForm());

// close form: esc on keyboard

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideForm();
});

// close form: click on dark overlay / outside of the form

modalContainer.addEventListener("click", () => hideForm());

// prevent closing form: when the form itself is clicked

document
  .querySelector("div.modal")
  .addEventListener("click", (e) => e.stopPropagation());

// sample data

addBook(
  "The Oz Principle",
  "Roger Connors, Tom Smith, Craig Hickman",
  232,
  true
);

addBook(
  "The 7 Habits of Highly Effective People",
  "Stephen R. Covey",
  381,
  true
);

addBook("Atomic Habits", "James Clear", 320, false);

addBook("12 Rules for Life", "Jordan B. Peterson", 448, true);

addBook("How to Win Friends & Influence People", "Dale Carnegie", 288, true);

addBook("The Total Money Makeover", "Dave Ramsey", 237, true);

addBook("Financial Peace", "Dave Ramsey", 288, true);
