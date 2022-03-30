//code should go here but it hasn't shown up
//aba kadabra alakzam, code appear
let existingTodos = JSON.parse(localStorage.getItem("todos"));
let todoData = existingTodos || [];
todoData.forEach((todo) => {
  addTodo(todo);
});
function addTodo(todoInput) {
  let todoItem = "";
  todoData.push(todoInput);
  todoItem = document.createElement("p");
  todoItem.setAttribute("class", "todo-text");
  todoItem.setAttribute("id", "todo-text");
  todoItem.setAttribute("onclick", "lineThrough(this)");
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
}
function saveTodos() {
  todoData = [];
  document.querySelectorAll("#todo-text").forEach((p) => {
    todoData.push(p.innerText);
  });
  localStorage.setItem("todos", JSON.stringify(todoData));
}
