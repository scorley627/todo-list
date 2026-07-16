import { todoList } from "./todo_list";
import trashIcon from "./trash_icon.svg";

export function showList() {
  const listElement = document.createElement("ul");
  const listHeader = document.createElement("h2");

  listHeader.textContent = todoList.title;
  listHeader.classList.add("todo-list__header");
  listElement.appendChild(listHeader);
  listElement.classList.add("todo-list");

  for (const task of todoList.tasks) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const text = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const date = document.createElement("p");
    const trashImage = document.createElement("img");

    checkbox.type = "checkbox";
    title.textContent = task.title;
    description.textContent = task.description;
    date.textContent = task.date.toDateString();
    trashImage.src = trashIcon;
    trashImage.dataset.itemId = task.id;

    listItem.classList.add("task");
    if (task.priority == 2) {
      listItem.classList.add("task--medium-priority");
    } else if (task.priority == 3) {
      listItem.classList.add("task--high-priority");
    }

    text.classList.add("task__text");
    description.classList.add("task__description");
    date.classList.add("task__date");
    trashImage.classList.add("task__trash-icon");
    trashImage.addEventListener("click", handleDeleteTaskClick);

    text.appendChild(title);
    text.appendChild(description);

    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(date);
    listItem.appendChild(trashImage);
    listElement.appendChild(listItem);
  }

  const addTaskElement = document.createElement("li");
  const addTaskButton = document.createElement("button");
  const addTaskHeader = document.createElement("h3");

  addTaskButton.textContent = "+";
  addTaskHeader.textContent = "Add task";

  addTaskElement.classList.add("task");
  addTaskButton.classList.add("task__add-button");
  addTaskHeader.classList.add("task__text");
  addTaskHeader.classList.add("task__text--add");

  addTaskElement.appendChild(addTaskButton);
  addTaskElement.appendChild(addTaskHeader);
  addTaskElement.addEventListener("click", handleAddTaskClick);

  listElement.appendChild(addTaskElement);
  const content = document.querySelector(".content");
  content.replaceChildren(listElement);
}

function handleAddTaskClick(event) {
  const isButton = event.target.classList.contains("task__add-button");
  const isTitle = event.target.classList.contains("task__text--add");
  if (isButton || isTitle) {
    addTaskDialog.showModal();
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  addTaskDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_task_title");
  const description = formData.get("new_task_description");
  const date = new Date(formData.get("new_task_date").replaceAll("-", "/"));
  const priority = formData.get("new_task_priority");
  event.target.reset();

  todoList.addNewTask(title, description, date, priority);
  showList();
}

function handleCloseDialogClick(event) {
  addTaskDialog.close();
}

function handleDeleteTaskClick(event) {
  todoList.removeTask(event.target.dataset.itemId);
  showList();
}

const addTaskDialog = document.querySelector(".add-task-dialog");

const dialogCloseButton = document.querySelector(
  ".add-task-dialog__close-button",
);
dialogCloseButton.addEventListener("click", handleCloseDialogClick);

const addTaskForm = document.querySelector(".add-task-form");
addTaskForm.addEventListener("submit", handleAddFormSubmit);

const addTaskFormDate = document.getElementById("new_task_date");
addTaskFormDate.defaultValue = new Date().toLocaleDateString("fr-CA");
