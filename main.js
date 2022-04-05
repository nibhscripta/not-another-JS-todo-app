// toggle dark mode on and off
const body = document.body;
let todosDarkTheme = localStorage.getItem("todosDarkTheme");
if (todosDarkTheme == "True") {
  let bodyClass = body.classList;
  bodyClass.add("dark-theme");
  bodyClass.remove("light-theme");
  document.getElementById("sun").classList.remove("display-none");
  document.getElementById("moon").classList.add("display-none");
} else {
  let bodyClass = body.classList;
  bodyClass.add("light-theme");
  bodyClass.remove("dark-theme");
  document.getElementById("moon").classList.remove("display-none");
  document.getElementById("sun").classList.add("display-none");
}
document.getElementById("toggle-color-theme").onclick = () => {
  let bodyClass = body.classList;
  if (bodyClass.contains("light-theme")) {
    bodyClass.add("dark-theme");
    bodyClass.remove("light-theme");
    document.getElementById("sun").classList.remove("display-none");
    document.getElementById("moon").classList.add("display-none");
    localStorage.setItem("todosDarkTheme", "True");
  } else {
    bodyClass.add("light-theme");
    bodyClass.remove("dark-theme");
    document.getElementById("moon").classList.remove("display-none");
    document.getElementById("sun").classList.add("display-none");
    localStorage.setItem("todosDarkTheme", "False");
  }
};
// todo app logic
let existingTodos = JSON.parse(localStorage.getItem("todos"));
let todoData = existingTodos || [];
todoData.forEach((todo) => {
  let isLineThrough = todo["line-through"];
  let entry = todo["entry-text"];
  addTodo(entry, isLineThrough);
});
function addTodo(todoInput, isLineThrough) {
  let todoItem = "";
  todoItem = document.createElement("p");
  todoItem.setAttribute("class", "todo-text");
  todoItem.setAttribute("id", "todo-text");
  todoItem.setAttribute("onclick", "lineThrough(this)");
  if (isLineThrough === "True") {
    todoItem.classList.add("line-through");
  }
  let todoText = document.createTextNode(todoInput);
  todoItem.appendChild(todoText);
  document.getElementById("todos-list").insertAdjacentHTML(
    "beforeend",
    `
        <div id="todo-item" class="todo-item">
          ${todoItem.outerHTML}
          <div class="todo-buttons">
            <button id="todo-item-edit" onclick="editTodo(this)">
            <img src="./icons/edit.svg" alt="edit" class="icon" />
          </button>
          <button id="todo-item-remove" onclick="removeTodo(this)">
            <img src="./icons/trash.svg" alt="remove" class="icon" />
          </button>
          </div>
        </div>
      `
  );
}
document.getElementById("add-todo").onsubmit = (e) => {
  e.preventDefault();
  let input = e.target.input_todo.value;
  if (!input == "") {
    addTodo(input);
    document.getElementById("add-todo").reset();
    saveTodos();
  }
};
function removeTodo(todo) {
  todo.parentNode.parentNode.remove();
  saveTodos();
}
function lineThrough(p) {
  if (p.classList.contains("line-through")) {
    p.classList.remove("line-through");
  } else {
    p.classList.add("line-through");
  }
  saveTodos();
}
function saveTodos() {
  todoData = [];
  let todoEntry;
  document.querySelectorAll("#todo-text").forEach((p) => {
    todoEntry = {};
    if (p.classList.contains("line-through")) {
      todoEntry["line-through"] = "True";
    } else {
      todoEntry["line-through"] = "False";
    }
    todoEntry["entry-text"] = p.innerText;
    todoData.push(todoEntry);
  });
  localStorage.setItem("todos", JSON.stringify(todoData));
}
function editTodo(todo) {
  let todoItem = todo.parentNode.parentNode;
  let todoP = todoItem.children[0];
  let todoText = todoP.innerText;
  todoP.classList.add("display-none");
  todoItem.insertAdjacentHTML(
    "afterbegin",
    `
    <form id="edit-todo" class="edit-todo">
      <input type="text" id="edit_todo_input" value="${todoText}" />
      <button type="submit">Save</button>
    </form>
    `
  );
  let editTodo = document.getElementById("edit-todo");
  let editInput = document.getElementById("edit_todo_input");
  let end = editInput.value.length;
  editInput.setSelectionRange(end, end);
  editInput.focus();
  editInput.addEventListener("blur", () => {
    todoP.innerText = editInput.value;
    todoP.classList.remove("display-none");
    editTodo.remove();
    saveTodos();
  });
  editTodo.onsubmit = (e) => {
    e.preventDefault();
    let input = e.target.edit_todo_input.value;
    todoP.innerText = input;
    todoP.classList.remove("display-none");
    editTodo.remove();
    saveTodos();
  };
}
