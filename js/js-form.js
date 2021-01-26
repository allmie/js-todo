const toDoForm = document.querySelector(".to-do__form");
const toDoAdd = document.querySelector(".to-do__insert i");

// Form class "add" and "delete"
const handleClick = (e) => {
  toDoForm.classList.toggle("show");
};

const init = () => {
  // Form hide-and-show
  toDoAdd.addEventListener("click", handleClick);
};

init();
