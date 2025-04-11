const getInp = document.getElementById("todoInp");
const getUl = document.getElementById("todoList");

function addTodo() {
  if (getInp.value === "") {
    alert("Please enter a todo item.");
    return;
  }
  getUl.innerHTML += `<li> ${getInp.value} <span> <button onclick="edit(this)" class="btn edt">Edit</button> <button onclick="remv(this)" class="btn rmv">Delete</button> </span> </li>`;
  getInp.value = "";
}

function delAll() {
  if (getUl.getElementsByTagName("li").length === 0) {
    alert("No todo items to remove.");
    return;
  }
  getUl.innerHTML = "";
  alert("All todo items removed.");
}

function edit(e) {
  let editTodo = prompt(
    "Edit your todo item:",
    e.parentNode.parentNode.firstChild.nodeValue
  );
  e.parentNode.parentNode.firstChild.nodeValue = editTodo;
  if (e.parentNode.parentNode.firstChild.nodeValue === "") {
    alert("Please enter a todo item to edit.");
    return editTodo;
  }
}

function remv(e) {
  e.parentNode.parentNode.remove();
  alert("Todo item deleted.");
}
