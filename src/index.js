import "./style.css";
import { populateProjectList, addTaskItem, addTodoList } from "./display.js";
import Project from "./todo_list.js";

const projectList = document.querySelector(".project-list");
projectList.addEventListener("click", handleListClick);

const addProjectButton = document.querySelector(".add-project-button");
const addProjectForm = document.querySelector(".add-project-form");
const addProjectDialog = document.querySelector(".add-project-dialog");
const addProjectCloseButton = document.querySelector(
  ".add-project-dialog__close-button",
);

addProjectButton.addEventListener("click", handleAddProjectClick);
addProjectForm.addEventListener("submit", handleAddProjectFormSubmit);
addProjectCloseButton.addEventListener("click", handelCloseAddProjectClick);

const addTaskForm = document.querySelector(".add-task-form");
const addTaskFormDate = document.getElementById("new_task_date");
const addTaskDialog = document.querySelector(".add-task-dialog");
const addTaskCloseButton = document.querySelector(
  ".add-task-dialog__close-button",
);

addTaskForm.addEventListener("submit", handleAddTaskFormSubmit);
addTaskCloseButton.addEventListener("click", handleCloseAddTaskClick);
addTaskFormDate.defaultValue = new Date().toLocaleDateString("fr-CA");

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

function handleListClick(event) {
  const isAddButton = event.target.classList.contains("task__add-button");
  const isAddText = event.target.classList.contains("task__text--add");
  const isTrashButton = event.target.classList.contains("task__trash-icon");
  if (isAddButton || isAddText) {
    const taskList = event.target.parentNode.parentNode;
    addTaskDialog.dataset.projectId = taskList.dataset.projectId;
    addTaskDialog.showModal();
  } else if (isTrashButton) {
    const taskItem = event.target.parentNode;
    const taskList = taskItem.parentNode;
    const taskId = taskItem.dataset.taskId;
    const projectId = taskList.dataset.projectId;
    const project = projects.find((project) => project.id == projectId);
    project.removeTask(taskId);
    taskItem.remove();
  }
}

function handleAddProjectFormSubmit(event) {
  event.preventDefault();
  addProjectDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_project_title");
  event.target.reset();

  const newProject = new Project(title);
  projects.push(newProject);
  addTodoList(newProject);
}

function handleAddProjectClick(event) {
  addProjectDialog.showModal();
}

function handelCloseAddProjectClick(event) {
  addProjectDialog.close();
}

function handleAddTaskFormSubmit(event) {
  event.preventDefault();
  addTaskDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_task_title");
  const description = formData.get("new_task_description");
  const date = new Date(formData.get("new_task_date").replaceAll("-", "/"));
  const priority = formData.get("new_task_priority");
  event.target.reset();

  const projectId = addTaskDialog.dataset.projectId;
  const project = projects.find((project) => project.id == projectId);
  const taskIndex = project.addNewTask(title, description, date, priority);
  const task = project.tasks[taskIndex];
  addTaskItem(project.id, task, taskIndex);
}

function handleCloseAddTaskClick(event) {
  addTaskDialog.close();
}
