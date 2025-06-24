export default (function () {
  function showInitialTodo(initialTodo) {
    const initialTodoList = document.createElement("ul");
    const initialTodoItem = document.createElement("li");
    const initialItemTitle = document.createElement("h2");
    const initialItemDescription = document.createElement("p");

    initialItemDescription.textContent = initialTodo.description;
    initialItemTitle.textContent = initialTodo.title;
    initialTodoItem.appendChild(initialItemTitle);
    initialTodoItem.appendChild(initialItemDescription);
    initialTodoList.appendChild(initialTodoItem);
    document.body.appendChild(initialTodoList);
  }

  return { showInitialTodo };
})();
