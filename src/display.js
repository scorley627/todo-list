import { todoList } from "./todo_list";
import trashIcon from "./trash_icon.svg";

export function showList() {
  const listElement = document.createElement("ul");
  const listHeader = document.createElement("h2");

  listHeader.textContent = todoList.title;
  listElement.appendChild(listHeader);
  listElement.classList.add("todo-list");

  for (const task of todoList.tasks) {
    const itemElement = document.createElement("li");
    const itemCheckbox = document.createElement("input");
    const itemText = document.createElement("div");
    const itemHeader = document.createElement("h3");
    const itemParagraph = document.createElement("p");
    const itemTrashImage = document.createElement("img");

    itemCheckbox.type = "checkbox";
    itemHeader.textContent = task.title;
    itemParagraph.textContent = task.description;
    itemTrashImage.src = trashIcon;
    itemTrashImage.dataset.itemId = task.id;

    itemElement.classList.add("todo-item");
    itemText.classList.add("todo-item__text");
    itemParagraph.classList.add("todo-item__description");
    itemTrashImage.classList.add("todo-item__trash-icon");
    itemTrashImage.addEventListener("click", handleDeleteItemClick);

    itemText.appendChild(itemHeader);
    itemText.appendChild(itemParagraph);

    itemElement.appendChild(itemCheckbox);
    itemElement.appendChild(itemText);
    itemElement.appendChild(itemTrashImage);
    listElement.appendChild(itemElement);
  }

  const addItemElement = document.createElement("li");
  const addItemButton = document.createElement("button");
  const addItemHeader = document.createElement("h3");

  addItemButton.textContent = "+";
  addItemHeader.textContent = "Add task";

  addItemElement.classList.add("todo-item");
  addItemButton.classList.add("todo-item__add-button");
  addItemHeader.classList.add("todo-item__text");
  addItemHeader.classList.add("todo-item__text--add");

  addItemElement.appendChild(addItemButton);
  addItemElement.appendChild(addItemHeader);
  addItemElement.addEventListener("click", handleAddItemClick);

  listElement.appendChild(addItemElement);
  const content = document.querySelector(".content");
  content.replaceChildren(listElement);
}

function handleAddItemClick(event) {
  const isButton = event.target.classList.contains("todo-item__add-button");
  const isTitle = event.target.classList.contains("todo-item__text--add");
  if (isButton || isTitle) {
    addItemDialog.showModal();
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  addItemDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_item_title");
  const description = formData.get("new_item_description");
  const date = formData.get("new_item_date");
  event.target.reset();

  todoList.addNewTask(title, description, date);
  showList();
}

function handleCloseDialogClick(event) {
  addItemDialog.close();
}

function handleDeleteItemClick(event) {
  todoList.removeTask(event.target.dataset.itemId);
  showList();
}

const addItemDialog = document.querySelector(".add-item-dialog");

const dialogCloseButton = document.querySelector(
  ".add-item-dialog__close-button",
);
dialogCloseButton.addEventListener("click", handleCloseDialogClick);

const addItemForm = document.querySelector(".add-item-form");
addItemForm.addEventListener("submit", handleAddFormSubmit);
