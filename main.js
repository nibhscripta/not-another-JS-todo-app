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
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil icon" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
          <button id="todo-item-remove" onclick="removeTodo(this)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
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
