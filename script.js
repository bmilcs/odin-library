// array: stores book objects (details, html elements & methods)

let myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.id = myLibrary.length;
    this.createCard();
  }

  // method: create ui elements for card

  createCard() {
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
    this.cardReadStatusIcon.classList.add("fa-regular");
    this.cardEditIcon.classList.add("fa-pen-to-square");
    this.cardEditIcon.classList.add("fa-solid");
    this.cardDeleteIcon.classList.add("fa-solid");
    this.cardDeleteIcon.classList.add("fa-trash");

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
  }

  // method: remove card element from page & book obj from array

  removeBook() {
    // animate card
    this.card.classList.add("fade-out");

    // remove card after animation
    setTimeout(() => {
      this.card.remove();
    }, 250);

    // locate book within myLibrary array
    const bookIndex = myLibrary.findIndex((book) => book.title === this.title);

    // remove book from array
    myLibrary.splice(bookIndex, 1);

    // update id of all books
    myLibrary.forEach((book, i) => (book.id = i));
  }

  // method: swap icon & text to "read"

  setAsRead() {
    this.readStatus = true;
    this.cardReadStatus.textContent = "Read";
    this.cardReadStatus.classList.remove("unread");
    this.cardReadStatus.classList.add("read");
    this.cardReadStatusIcon.classList.remove("fa-square");
    this.cardReadStatusIcon.classList.add("fa-square-check");
  }

  // method: swap icon & text to "unread"

  setAsUnread() {
    this.readStatus = false;
    this.cardReadStatus.textContent = "Unread";
    this.cardReadStatus.classList.remove("read");
    this.cardReadStatus.classList.add("unread");
    this.cardReadStatusIcon.classList.remove("fa-square-check");
    this.cardReadStatusIcon.classList.add("fa-square");
  }

  // method: toggle read status (read/unread)

  toggleReadStatus() {
    this.readStatus = !this.readStatus;
    this.readStatus ? this.setAsRead() : this.setAsUnread();
  }

  // method: launches form to edit book details

  editBook() {
    // update title bar & button label of form
    // this.id is used by edit book form to locate the obj's index within myLibrary array on form submission
    formTitleBar.textContent = `Edit Book #${this.id + 1}`;
    formSubmitBtn.textContent = "Update Book";

    // populate form inputs with book details
    titleInput.value = this.title;
    authorInput.value = this.author;
    pagesInput.value = this.pages;

    this.readStatus === true
      ? (readStatusInput.checked = true)
      : (readStatusInput.checked = false);

    showForm();
  }

  // method: update book details from edit form pop-up

  updateBook() {
    // update book object from the form values
    this.title = titleInput.value;
    this.author = authorInput.value;
    this.pages = pagesInput.value;

    // update elements on page
    this.cardTitle.textContent = titleInput.value;
    this.cardAuthor.textContent = authorInput.value;
    this.cardPages.textContent = pagesInput.value;

    // update readStatus: book object, font awesome icon & label
    readStatusInput.checked ? this.setAsRead() : this.setAsUnread();
  }
}

// global variables

formTitleBar = document.querySelector(".modal-header");
formSubmitBtn = document.querySelector(".modal button");
titleInput = document.getElementById("book-title");
authorInput = document.getElementById("book-author");
pagesInput = document.getElementById("book-page-count");
readStatusInput = document.getElementById("book-read-status");

// function: triggered on add book form submit

function addBook(title, author, pages, readStatus) {
  myLibrary.push(new Book(title, author, pages, readStatus));
}

// functions: form related

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readStatusInput.checked = false;
}

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

// basic form input validation using constraint api

titleInput.addEventListener("invalid", (e) => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Book title is a required.");
    titleInput.reportValidity();
  } else titleInput.setCustomValidity("");
});

authorInput.addEventListener("invalid", (e) => {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Who wrote this book? Author required.");
    authorInput.reportValidity();
  } else authorInput.setCustomValidity("");
});

pagesInput.addEventListener("invalid", (e) => {
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity(
      "Annoying question, but how many pages are there in this book?"
    );
    pagesInput.reportValidity();
  } else pagesInput.setCustomValidity("");
});

// form submission: called on add/edit book

document.getElementById("modal-form").addEventListener("submit", (e) => {
  // prevent form submission
  e.preventDefault();

  if (formTitleBar.textContent == "Add Book to Library") {
    // create a new book object and append it to myLibrary array
    // .createCard() is called in the constructor function, displaying it to the page
    addBook(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatusInput.checked
    );
  } else {
    // edit an existing book: when the form is launched in "edit book" mode,
    // the id of the book is added to the title bar --- id = index of book obj in myLibrary array + 1
    // why +1? "Book #0" looks ugly for the end user
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

document.querySelector(".close-icon").addEventListener("click", hideForm);

// close form: esc on keyboard

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideForm();
});

// close form: click on dark overlay / outside of the form

modalContainer.addEventListener("click", hideForm);

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
