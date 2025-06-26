export class TodoItem {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = 1;
  }
}

export class TodoList {
  constructor(title) {
    this.title = title;
    this.todoItems = [];
  }

  appendItem(item) {
    this.todoItems.push(item);
  }
}
