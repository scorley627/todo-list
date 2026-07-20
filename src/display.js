import trashIcon from "./trash_icon.svg";

export function populateProjectList(projects) {
  for (const project of projects) {
    addTodoList(project);
  }
}

export function addTodoList(project) {
  const projectList = document.querySelector(".project-list");
  const todoList = createTodoList(project);
  const projectHeader = document.createElement("h2");
  projectHeader.textContent = project.title;
  projectHeader.classList.add("project-header");
  projectList.appendChild(projectHeader);
  projectList.appendChild(todoList);
}

export function addTaskItem(projectId, task, taskIndex) {
  const taskLists = document.querySelector(".project-list").children;
  let i = 0;
  while (i < taskLists.length && taskLists[i].dataset.projectId != projectId) {
    ++i;
  }
  if (i < taskLists.length) {
    const newTaskItem = createTaskItem(task);
    const nextTaskItem = taskLists[i].children[taskIndex];
    taskLists[i].insertBefore(newTaskItem, nextTaskItem);
  }
}

function createTodoList(project) {
  const todoList = document.createElement("ul");
  todoList.dataset.projectId = project.id;
  todoList.classList.add("project");

  for (const task of project.tasks) {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
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
  todoList.appendChild(addTaskElement);

  return todoList;
}

function createTaskItem(task) {
  const taskItem = document.createElement("li");
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
  taskItem.dataset.taskId = task.id;

  taskItem.classList.add("task");
  if (task.priority == 2) {
    taskItem.classList.add("task--medium-priority");
  } else if (task.priority == 3) {
    taskItem.classList.add("task--high-priority");
  }
  text.classList.add("task__text");
  description.classList.add("task__description");
  date.classList.add("task__date");
  trashImage.classList.add("task__trash-icon");

  text.appendChild(title);
  text.appendChild(description);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(text);
  taskItem.appendChild(date);
  taskItem.appendChild(trashImage);

  return taskItem;
}
