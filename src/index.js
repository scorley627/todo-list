import "./style.css";
import DisplayController from "./display.js";

const makeTodoItem = (title, description, dueDate) => {
  let state = {
    title,
    description,
    dueDate,
    priority: 1,
  };

  return state;
};

const initialTodo = makeTodoItem(
  "Initial Item",
  "This is the initial todo item",
  "09/15/2025"
);

DisplayController.showInitialTodo(initialTodo);
