import "./style.css";
import DisplayController from "./display.js";

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

const initialList = new TodoList("Initial List");
const initialTodo = new TodoItem(
  "Initial Item",
  "This is the initial todo item",
  "09/15/2025"
);
initialList.appendItem(initialTodo);

DisplayController.showInitialList(initialList);
