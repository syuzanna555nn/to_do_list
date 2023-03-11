const form = document.getElementById("form");
const toDoListHtml = document.getElementById("toDoListHtml");


let toDoList = [];


const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
const deleteToDoItem = (id) => {
  toDoList = toDoList.filter((toDoItem) => toDoItem.id !== id);
  renderList();
}

const renderList = () => {
  toDoListHtml.innerHTML = "";
  toDoList.forEach((item) => {
    const toDoItemHtml = document.createElement('li');
    toDoItemHtml.setAttribute("class", "to-do-item");
    toDoItemHtml.innerHTML = `
         <input type="checkbox" id="item_${item.id}" ${item.checked ? "checked" : ""}>
         <label for="item_${item.id}" class="label">${item.value}</label>
         <button id="delete_${item.id}" class="button-delete"></button>`;
    toDoListHtml.appendChild(toDoItemHtml);
    // toDoItemHtml.setAttribute( "class", item.checked ? "completed" : "");
  })
}

const addToDoItem = (value) => {
  if (value === "") {
    return;
  }
  toDoList = [...toDoList, {id: uid(), value, checked: false}];
  renderList();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData)
  addToDoItem(data.value);
  event.target.reset();
});

const switchToDoItemState = (id) => {
  toDoList = toDoList.map(toDoItem => toDoItem.id === id ? {...toDoItem, checked: !toDoItem.checked} : toDoItem);
  renderList();
}

toDoListHtml.addEventListener("click", (event) => {
    const idInput = event.target.getAttribute("id");
    const action = idInput.split("_")[0];
    const formattedId = idInput.split("_")[1];
    if (action === "delete") {
      deleteToDoItem(formattedId);
    } else {
      switchToDoItemState(formattedId);
    }
});






