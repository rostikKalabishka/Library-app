const allBooks = document.querySelector("#all-books");
const latestBooks = document.querySelector("#latest-books");

const plusButton = document.querySelector("#addBookPlus");

const bookInfo = document.querySelector(".container");

const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".close_modal_window");

const modelCard = document.querySelector(".modal-card");

const libraryArr = [];

const createText = (id, className, text1 = "test") => {
  let text = document.createElement("h3");
  text.innerText = text1;
  text.setAttribute("id", id);
  text.setAttribute("class", className);
  return text;
};

const createInput = (id, className, type) => {
  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("id", id);
  input.setAttribute("class", className);
  return input;
};

const createButton = (id, className, text = "test") => {
  let button = document.createElement("button");
  button.innerText = text;
  button.setAttribute("id", id);
  button.setAttribute("class", className);
  return button;
};

const createDiv = (id, className) => {
  let button = document.createElement("div");

  button.setAttribute("id", id);
  button.setAttribute("class", className);
  return button;
};

modelCard.appendChild(
  createText("book-title-text-id", "book-title", "Book title")
);
const nameBook = modelCard.appendChild(
  createInput("name-book-id", "name-book")
);
modelCard.appendChild(
  createText("author-name-text-id", "author-name-text", "Author name")
);
const nameAuthor = modelCard.appendChild(
  createInput("name-author-id", "name-author")
);

modelCard.appendChild(
  createText(
    "year-publication-text-id",
    "year-publication",
    "Year of publication"
  )
);
const yearBook = modelCard.appendChild(
  createInput("year-id", "year", "number")
);

modelCard.appendChild(
  createText("pages-book-text-id", "pages-book", "Number of pages")
);
const pagesNumber = modelCard.appendChild(
  createInput("pages-number-id", "pages-number", "number")
);

const createBookButton = modelCard.appendChild(
  createButton("createId", "create-button", "Create")
);

const onClickModal = () => {
  plusButton.onclick = () => {
    modal.style.display = "block";
  };

  btnClose.onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

const createBooks = () => {
  let name = document.getElementById("name-book-id");
  let author = document.getElementById("name-author-id");
  let year = document.getElementById("year-id");
  let pages = document.getElementById("pages-number-id");
  const newBook = {
    title: name.value.trim(),
    author: author.value.trim(),
    year: year.value.trim(),
    pages: pages.value.trim(),
  };
  // newBook.title = nameBook.value.trim();
  // newBook.author = nameAuthor.value.trim();
  // newBook.year = yearBook.value.trim();
  // newBook.pages = pagesNumber.value.trim();

  libraryArr.push(newBook);
  render();

  modal.style.display = "none";

  // return { title, author, year, pages };

  console.log(libraryArr);
};

const renderAddBook = () => {
  bookInfo.innerHTML = `<div class="card">
  <div class="add-book">
    <h1 id="addBook">Add book</h1>
    <div class="addBookPlusButton">
      <button id="addBookPlus" >+</button>
      <div class="modal" id="mymodal">
        <div class="modal-content">
          <div class="modal-card">
            <span class="close_modal_window">&times;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  const plusButton = document.getElementById("addBookPlus");
  plusButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    const btnClose = document.querySelector(".close_modal_window");
    const modelCard = document.querySelector(".modal-card");

    modal.style.display = "block";
    btnClose.onclick = () => {
      modal.style.display = "none";
    };
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    modelCard.appendChild(
      createText("book-title-text-id", "book-title", "Book title")
    );
    modelCard.appendChild(createInput("name-book-id", "name-book"));
    modelCard.appendChild(
      createText("author-name-text-id", "author-name-text", "Author name")
    );
    modelCard.appendChild(createInput("name-author-id", "name-author"));
    modelCard.appendChild(
      createText(
        "year-publication-text-id",
        "year-publication",
        "Year of publication"
      )
    );
    modelCard.appendChild(createInput("year-id", "year", "number"));
    modelCard.appendChild(
      createText("pages-book-text-id", "pages-book", "Number of pages")
    );
    modelCard.appendChild(
      createInput("pages-number-id", "pages-number", "number")
    );

    const createBookButton = createButton(
      "createId",
      "create-button",
      "Create"
    );
    modelCard.appendChild(createBookButton);
    createBookButton.addEventListener("click", () => {
      createBooks();
    });
  });
};

// const deleteCard = document.getElementById("delete-btn-id");
// deleteCard.onclick = (element) =>{
//   element.parentElement.parentElement.remove();
// }

const renderCard = (obj) => {
  const info = bookInfo.appendChild(createDiv("info-div-id", "info-div"));
  info.appendChild(createText("book-title", "title", obj.title));

  info.appendChild(createText("name-book", "book", obj.author));

  info.appendChild(createText("pages-id", "pages", obj.pages));

  info.appendChild(createText("year-id", "year-book", obj.year));

  info.appendChild(createButton("read-btn-id", "read-btn", "Read"));
  info.appendChild(createButton("drop-btn-id", "drop-btn", "Drop"));
  info.appendChild(createButton("delete-btn-id", "delete-btn", "Delete"));
};

const deleteCard = document.querySelector(".delete-btn");

// deleteCard.addEventListener("click", () => {
//   parentElement.parentElement.remove()
// });

const render = () => {
  bookInfo.innerHTML = " ";

  renderAddBook();
  libraryArr.forEach((book) => renderCard(book));
};
render();
