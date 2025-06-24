export default (function () {
  function showInitialList(initialList) {
    const initialTodoList = document.createElement("ul");
    const initialListTitle = document.createElement("h2");

    initialListTitle.textContent = initialList.title;
    initialTodoList.appendChild(initialListTitle);

    for (const item of initialList.todoItems) {
      const todoItem = document.createElement("li");
      const itemTitle = document.createElement("h3");
      const itemDescription = document.createElement("p");

      itemTitle.textContent = item.title;
      itemDescription.textContent = item.description;
      todoItem.appendChild(itemTitle);
      todoItem.appendChild(itemDescription);
      initialTodoList.appendChild(todoItem);
    }

    document.body.appendChild(initialTodoList);
  }

  return { showInitialList };
})();
