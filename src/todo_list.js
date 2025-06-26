class TodoItem {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = 1;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todoItems = [];
  }

  appendItem(item) {
    this.todoItems.push(item);
  }
}

export default (function () {
  const list = new TodoList("Todo List");
  list.appendItem(
    new TodoItem(
      "Initial Item 1",
      "This is the first initial todo item",
      "09/15/2025"
    )
  );
  list.appendItem(
    new TodoItem(
      "Initial Item 2",
      "This is the second initial todo item",
      "09/15/2025"
    )
  );
  list.appendItem(
    new TodoItem(
      "Initial Item 3",
      "This is the third initial todo item",
      "09/15/2025"
    )
  );

  function addNewItem(title, description, date) {
    const newItem = new TodoItem(title, description, date);
    list.appendItem(newItem);
  }

  return { list, addNewItem };
})();
