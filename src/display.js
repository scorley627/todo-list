import ListController from "./todo_list";
import trashIcon from "./trash_icon.svg";

const addItemDialog = document.querySelector(".add-item-dialog");
const addItemForm = document.querySelector(".add-item-form");

addItemDialog.addEventListener("click", handleAddDialogClick);
addItemForm.addEventListener("submit", handleAddFormSubmit);

showList(ListController.list);

function showList(list) {
  const listElement = document.createElement("ul");
  const listHeader = document.createElement("h2");

  listHeader.textContent = list.title;
  listElement.appendChild(listHeader);
  listElement.classList.add("todo-list");

  for (const item of list.todoItems) {
    const itemElement = document.createElement("li");
    const itemCheckbox = document.createElement("input");
    const itemText = document.createElement("div");
    const itemHeader = document.createElement("h3");
    const itemParagraph = document.createElement("p");
    const itemTrashImage = document.createElement("img");

    itemCheckbox.type = "checkbox";
    itemHeader.textContent = item.title;
    itemParagraph.textContent = item.description;
    itemTrashImage.src = trashIcon;

    itemElement.classList.add("todo-item");
    itemText.classList.add("todo-item__text");
    itemParagraph.classList.add("todo-item__description");
    itemTrashImage.classList.add("todo-item__trash-icon");

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

function handleAddDialogClick(event) {
  if (event.target.classList.contains("add-item-dialog__close-button")) {
    addItemDialog.close();
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  addItemDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_item_title");
  const description = formData.get("new_item_description");
  const date = formData.get("new_item_date");

  ListController.addNewItem(title, description, date);
  showList(ListController.list);
}
