import "./style.css";
import DisplayController from "./display.js";
import { TodoList, TodoItem } from "./todo_list.js";

function handleAddItemClick(event) {
  const isButton = event.target.classList.contains("todo-item__add-button");
  const isTitle = event.target.classList.contains("todo-item__title--add");
  if (isButton || isTitle) {
    DisplayController.showNewItemDialog();
  }
}

function handleAddDialogClick(event) {
  const isCloseButton = event.target.classList.contains(
    "add-item-dialog__close-button"
  );
  if (isCloseButton) {
    DisplayController.closeNewItemDialog();
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  DisplayController.closeNewItemDialog();

  const formData = new FormData(event.target);
  const title = formData.get("new_item_title");
  const description = formData.get("new_item_description");
  const date = formData.get("new_item_date");

  const newItem = new TodoItem(title, description, date);
  initialList.appendItem(newItem);
  DisplayController.showList(initialList);
}

const initialList = new TodoList("Todo List");
initialList.appendItem(
  new TodoItem(
    "Initial Item 1",
    "This is the first initial todo item",
    "09/15/2025"
  )
);
initialList.appendItem(
  new TodoItem(
    "Initial Item 2",
    "This is the second initial todo item",
    "09/15/2025"
  )
);
initialList.appendItem(
  new TodoItem(
    "Initial Item 3",
    "This is the third initial todo item",
    "09/15/2025"
  )
);

DisplayController.showList(initialList);

const addItemElement = document.querySelector(".todo-item--add");
addItemElement.addEventListener("click", handleAddItemClick);

const addItemDialog = document.querySelector(".add-item-dialog");
addItemDialog.addEventListener("click", handleAddDialogClick);

const addItemForm = document.querySelector(".add-item-form");
addItemForm.addEventListener("submit", handleAddFormSubmit);
