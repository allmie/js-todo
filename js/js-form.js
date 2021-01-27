const toDoForm = document.querySelector(".to-do__form");
const toDoList = document.querySelector(".to-do__list");
const toDoInput = document.querySelector(".to-do__input");
const toDoAdd = document.querySelector(".to-do__insert i");
const toDoReset = document.querySelector("i.reset");

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

// List 항목 제거
const deleteToDo = (e) => {
  const {
    target: { parentNode: delItem },
  } = e;
  const delId = Number(delItem.id);

  LS__VALUE = LS__VALUE.filter((element) => element.id !== delId);
  delItem.remove();

  localStorage.setItem(LS__KEY, JSON.stringify(LS__VALUE));
};

// List에 항목 추가
const addItem = (id, txt) => {
  const newItem = document.createElement("li");
  const delBtn = document.createElement("i");
  const span = document.createElement("span");

  newItem.classList.add("to-do__item");
  newItem.id = id;
  span.innerHTML = txt;

  delBtn.classList.add("fas");
  delBtn.classList.add("fa-eraser");
  delBtn.classList.add("del");
  delBtn.classList.add("fa-21x");

  delBtn.addEventListener("click", deleteToDo);

  newItem.appendChild(span);
  newItem.appendChild(delBtn);
  toDoList.appendChild(newItem);
};

// Save "to-do" in localStorage
const saveToDo = (txt) => {
  let newId = 0;

  if (LS__VALUE.length !== 0) {
    newId = LS__VALUE[LS__VALUE.length - 1].id + 1;
  }

  LS__VALUE.push({
    id: newId,
    dos: txt,
  });
  addItem(newId, txt);
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

const handleReset = (e) => {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }

  // LocalStorage를 초기화 하지만 LS__VALUE값이 남아있어,
  //  reset 버튼 클릭 후 list를 추가하고 새로고침을 할 떄 reset하지 못함
  LS__VALUE = [];
  localStorage.removeItem(LS__KEY);
};

const init = () => {
  loadToDo();

  // Insert "to-do"
  toDoForm.addEventListener("submit", handleSubmit);

  // Form hide-and-show
  toDoAdd.addEventListener("click", handleClick);

  // Reset "to-do" list
  toDoReset.addEventListener("click", handleReset);
};

init();
