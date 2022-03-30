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
          <button id="todo-item-remove" onclick="removeTodo(this)">
            <img src="./icons/trash.png" alt="remove" class="icon" />
          </button>
        </div>
      `
  );
}
document.getElementById("add-todo").onsubmit = (e) => {
  e.preventDefault();
  let input = e.target.input_todo.value;
  addTodo(input);
  document.getElementById("add-todo").reset();
  saveTodos();
};
function removeTodo(todo) {
  todo.parentNode.remove();
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
