const allBooks = document.querySelector("#all-books");
const latestBooks = document.querySelector("#latest-books");

const plusButton = document.querySelector("#addBookPlus");

const bookInfo = document.querySelector(".container");

const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".close_modal_window");

const modelCard = document.querySelector(".modal-card");

let libraryArr = [];

const bookLocal = () => {
  localStorage.setItem("book", JSON.stringify(libraryArr));
};

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

const createButton = (id, className, text = "test", status, dataset) => {
  let button = document.createElement("button");
  button.innerText = text;
  button.setAttribute("id", id);
  button.setAttribute("class", className);
  button.dataset.status = status;
  button.dataset.index = dataset;
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
//local storage
const getBookLocal = () => {
  libraryArr = JSON.parse(localStorage.getItem("book") || "[]");
};

const createBooks = () => {
  let name = document.getElementById("name-book-id");
  let author = document.getElementById("name-author-id");
  let year = document.getElementById("year-id");
  let pages = document.getElementById("pages-number-id");

  if (
    name.value.trim().length === 0 ||
    author.value.trim().length === 0 ||
    year.value.trim().length === 0 ||
    pages.value.trim().length === 0
  ) {
    alert("Please fill out all the fields.");
    return;
  }

  let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  let uniqid = randLetter + Date.now();
  let status = false;
  const newBook = {
    title: name.value.trim(),
    author: author.value.trim(),
    year: year.value.trim(),
    pages: pages.value.trim(),
    index: uniqid,
    status: status,
  };

  libraryArr.push(newBook);
  render();

  modal.style.display = "none";
};
//1
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

const renderCard = (obj) => {
  const info = bookInfo.appendChild(createDiv("info-div-id", "info-div"));

  info.appendChild(createText("book-title", "title", obj.title));

  info.appendChild(createText("name-book", "book", obj.author));

  info.appendChild(createText("pages-id", "pages", obj.pages));

  info.appendChild(createText("year-id", "year-book", obj.year));

  const deleteBtn = createButton(
    "delete-btn-id",
    "delete-btn",
    "Delete",
    obj.status,
    obj.index
  );

  const readBtn = createButton(
    "read-btn-id",
    "read-btn",
    "Read",
    obj.status,
    obj.index
  );

  if (obj.status) {
    readBtn.classList.add("greenBtn");
  }

  readBtn.addEventListener("click", () => {
    libraryArr = libraryArr.map((item) =>
      item.index === obj.index ? { ...item, status: !item.status } : item
    );

    render();
  });

  deleteBtn.addEventListener("click", () => {
    libraryArr = libraryArr.filter((item) => item.index !== obj.index);
    render();
  });

  info.appendChild(readBtn);

  info.appendChild(deleteBtn);
};

getBookLocal();
const render = () => {
  bookInfo.innerHTML = " ";

  renderAddBook();
  libraryArr.forEach((book) => renderCard(book));

  bookLocal();
};

render();
