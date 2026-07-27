import "./style.css";
import { populateProjectList, addTaskItem, addTodoList } from "./display.js";
import Project from "./todo_list.js";

const projectDialog = document.querySelector(".project-dialog");
const taskDialog = document.querySelector(".task-dialog");

document.body.addEventListener("click", handleClick);
document.body.addEventListener("submit", handleSubmit);

const taskFormDate = document.getElementById("new_task_date");
taskFormDate.defaultValue = new Date().toLocaleDateString("fr-CA");

const initialProject0 = new Project("Project 1");
const initialProject1 = new Project("Project 2");
const projects = [initialProject0, initialProject1];

initialProject0.addNewTask("Task", "", new Date("2026/11/4"), 2);
initialProject0.addNewTask("Task", "", new Date("2026/10/20"), 3);
initialProject0.addNewTask("Task", "", new Date("2026/9/15"), 1);

initialProject1.addNewTask("Task", "", new Date("2026/10/30"), 1);
initialProject1.addNewTask("Task", "", new Date("2026/9/2"), 3);
initialProject1.addNewTask("Task", "", new Date("2027/1/9"), 2);

populateProjectList(projects);

function handleClick(event) {
  const isProjectRemove = event.target.classList.contains(
    "project-remove-button",
  );
  const isProjectAdd = event.target.classList.contains("project-add-button");
  const isProjectDialogClose = event.target.classList.contains(
    "project-dialog__close-button",
  );
  const isTaskRemove = event.target.classList.contains("task__trash-icon");
  const isTaskAdd =
    event.target.classList.contains("task__add-button") ||
    event.target.classList.contains("task__text--add");
  const isTaskDialogClose = event.target.classList.contains(
    "task-dialog__close-button",
  );
  if (isProjectRemove) {
    handleProjectRemoveClick(event);
  } else if (isProjectAdd) {
    handleProjectAddClick(event);
  } else if (isProjectDialogClose) {
    handleProjectDialogCloseClick();
  } else if (isTaskRemove) {
    handleTaskRemoveClick(event);
  } else if (isTaskAdd) {
    handleTaskAddClick(event);
  } else if (isTaskDialogClose) {
    handleTaskDialogCloseClick();
  }
}

function handleSubmit(event) {
  const isProjectForm = event.target.classList.contains("project-form");
  const isTaskForm = event.target.classList.contains("task-form");
  if (isProjectForm) {
    handleProjectFormSubmit(event);
  } else if (isTaskForm) {
    handleTaskFormSubmit(event);
  }
}

function handleProjectRemoveClick(event) {
  const todoList = event.target.parentNode;
  const projectId = todoList.dataset.projectId;
  const index = projects.findIndex((project) => project.id === projectId);
  if (index !== -1) {
    projects.splice(index, 1);
  }
  todoList.remove();
}

function handleProjectFormSubmit(event) {
  event.preventDefault();
  projectDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_project_title");
  event.target.reset();

  const newProject = new Project(title);
  projects.push(newProject);
  addTodoList(newProject);
}

function handleProjectAddClick() {
  projectDialog.showModal();
}

function handleProjectDialogCloseClick() {
  projectDialog.close();
  projectDialog.firstElementChild.reset();
}

function handleTaskRemoveClick(event) {
  const taskItem = event.target.parentNode;
  const todoList = taskItem.parentNode.parentNode;
  const taskId = taskItem.dataset.taskId;
  const projectId = todoList.dataset.projectId;
  const project = projects.find((project) => project.id === projectId);
  project.removeTask(taskId);
  taskItem.remove();
}

function handleTaskAddClick(event) {
  const todoList = event.target.parentNode.parentNode.parentNode;
  taskDialog.dataset.projectId = todoList.dataset.projectId;
  taskDialog.showModal();
}

function handleTaskFormSubmit(event) {
  event.preventDefault();
  taskDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_task_title");
  const description = formData.get("new_task_description");
  const date = new Date(formData.get("new_task_date").replaceAll("-", "/"));
  const priority = Number(formData.get("new_task_priority"));
  event.target.reset();

  const projectId = taskDialog.dataset.projectId;
  const project = projects.find((project) => project.id === projectId);
  const taskIndex = project.addNewTask(title, description, date, priority);
  const task = project.tasks[taskIndex];
  addTaskItem(project.id, task, taskIndex);
}

function handleTaskDialogCloseClick() {
  taskDialog.close();
  taskDialog.firstElementChild.reset();
}
