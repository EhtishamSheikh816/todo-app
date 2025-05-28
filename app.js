const getSearch = document.querySelector("#search");
const getAddTodoInp = document.querySelector("#addTodoInp");
const getTodoUl = document.querySelector("#todoUl");
const lists = getTodoUl.getElementsByTagName("li");

const addTodo = () => {
  if (getAddTodoInp.value == "") {
    Swal.fire({
      title: "Empty Input!",
      text: "Please enter a task.",
      icon: "error",
    });
    return getAddTodoInp.value;
  } else {
    // getTodoUl.innerHTML += `<li>
    //       ${getAddTodoInp.value}
    //       <span id="edtDelBtn">
    //         <i class="fa-solid fa-pen-to-square" onclick="editTodo(this)"></i>
    //         <i class="fa-solid fa-trash-can" onclick="delTodo(this)"></i>
    //       </span>
    //     </li>`;
    getTodoUl.innerHTML += `<li>
          <div class="text">${getAddTodoInp.value}</div> 
        <span id="edtDelBtn">
          <i class="fa-solid fa-pen-to-square" onclick="editTodo(this)"></i>
          <i class="fa-solid fa-trash-can" onclick="delTodo(this)"></i>
        </span>
      </li>`;
    getAddTodoInp.value = "";
  }
  Swal.fire({
    title: "Added!",
    text: "Your task has been added.",
    icon: "success",
  });
};

const editTodo = (e) => {
  getAddTodoInp.value = e.parentNode.parentNode.textContent.trim();
  e.parentNode.parentNode.remove();
};

const delTodo = (e) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      e.parentNode.parentNode.remove();
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });
};

const clearAll = () => {
  if (getTodoUl.innerHTML === "") {
    Swal.fire({
      title: "No tasks!",
      text: "There are no tasks to clear.",
      icon: "info",
    });
    return;
  } else {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        getTodoUl.innerHTML = "";
        Swal.fire("Cleared!", "All tasks have been cleared.", "success");
      }
    });
  }
};

getSearch.addEventListener("keyup", () => {
  const filterItems = getSearch.value.toLowerCase();
  for (let i = 0; i < lists.length; i++) {
    const text = lists[i].textContent.toLowerCase().trim();
    if (text.includes(filterItems)) {
      lists[i].style.display = "";
    } else {
      lists[i].style.display = "none";
    }
  }
});
