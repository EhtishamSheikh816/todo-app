const getSearch = document.querySelector("#search");
const getAddTodoInp = document.querySelector("#addTodoInp");
const getTodoUl = document.querySelector("#todoUl");
const lists = getTodoUl.getElementsByTagName("li");

let userArr = JSON.parse(localStorage.getItem("setTodo") || "[]");

const ShowTodo = () => {
  // getTodoUl.innerHTML += `<li>
  //         <div class="text">${getAddTodoInp.value}</div>
  //       <span id="edtDelBtn">
  //         <i class="fa-solid fa-pen-to-square" onclick="editTodo(this)"></i>
  //         <i class="fa-solid fa-trash-can" onclick="delTodo(this)"></i>
  //       </span>
  //     </li>`;

  getTodoUl.innerHTML = "";
  let getTodoItem = JSON.parse(localStorage.getItem("setTodo"));

  getTodoItem.forEach((todoItems) => {
    getTodoUl.innerHTML += `<li>
        <div class="text">${todoItems}</div>
      <span id="edtDelBtn">
        <i class="fa-solid fa-pen-to-square" onclick="editTodo(this)"></i>
        <i class="fa-solid fa-trash-can" onclick="delTodo(this)"></i>
      </span>
    </li>`;
  });

  if (getTodoItem.length === 0) {
    getTodoUl.innerHTML = `<li class="no-todo">No tasks available</li>`;
  }
};

const addTodo = () => {
  let todo = getAddTodoInp.value;

  if (todo == "") {
    Swal.fire({
      title: "Empty Input!",
      text: "Please enter a task.",
      icon: "error",
    });
    return todo;
  }

  if (userArr.includes(todo)) {
    Swal.fire({
      title: "Duplicate Task!",
      text: "This task already exists.",
      icon: "warning",
    });
    return todo;
  }

  userArr.push(todo);
  localStorage.setItem("setTodo", JSON.stringify(userArr));
  getAddTodoInp.value = "";

  ShowTodo();
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
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
      e.parentNode.parentNode.remove();
      let task = e.parentNode.parentNode.textContent.trim();
      userArr.splice(userArr.indexOf(task), 1);
      localStorage.setItem("setTodo", JSON.stringify(userArr));
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
        Swal.fire("Cleared!", "All tasks have been cleared.", "success");
        getTodoUl.innerHTML = "";
        userArr = [];
        localStorage.setItem("setTodo", JSON.stringify(userArr));
      }
    });
  }
};

const editTodo = (e) => {
  getAddTodoInp.value = e.parentNode.parentNode.textContent.trim();
  e.parentNode.parentNode.remove();
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

ShowTodo();
