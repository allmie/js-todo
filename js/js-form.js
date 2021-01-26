const toDoForm = document.querySelector(".to-do__form");
const toDoList = document.querySelector(".to-do__list");
const toDoInput = document.querySelector(".to-do__input");
const toDoAdd = document.querySelector(".to-do__insert i");

const LS__KEY = "to-do";
let LS__VALUE = [];

// Load saved "to-do" in localStorage
const loadToDo = () => {
  const loadToDos = localStorage.getItem(LS__KEY);

  if (loadToDos) {
    const parsedToDos = JSON.parse(loadToDos);
    LS__VALUE = parsedToDos;

    parsedToDos.forEach((element) => {
      addItem(element.id, element.dos);
    });
  }
};

// List에 항목 추가
const addItem = (id, txt) => {
  const newItem = document.createElement("li");
  const del = document.createElement("i");

  newItem.classList.add("to-do__item");
  newItem.id = id;
  newItem.innerHTML = txt;

  del.classList.add("fas");
  del.classList.add("fa-eraser");

  toDoList.appendChild(newItem);
  toDoList.appendChild(del);
};

// Save "to-do" in localStorage
const saveToDo = (txt) => {
  const toDoObj = {
    id: LS__VALUE.length,
    dos: txt,
  };

  addItem(toDoObj.id, toDoObj.dos);

  LS__VALUE.push(toDoObj);

  localStorage.setItem(LS__KEY, JSON.stringify(LS__VALUE));
};

// Input value 초기화 및 전달
const handleSubmit = (e) => {
  e.preventDefault();

  saveToDo(toDoInput.value);
  toDoInput.value = "";
};

// Form class "add" and "delete"
const handleClick = (e) => {
  toDoForm.classList.toggle("show");
};

const init = () => {
  loadToDo();

  // Insert "to-do"
  toDoForm.addEventListener("submit", handleSubmit);

  // Form hide-and-show
  toDoAdd.addEventListener("click", handleClick);
};

init();
