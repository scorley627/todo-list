import "./style.css";
import { populateProjectList, addTaskItem, addTodoList } from "./display.js";
import Project from "./todo_list.js";

const projectList = document.querySelector(".project-list");
const projectAddButton = document.querySelector(".project-add-button");
const projectForm = document.querySelector(".project-form");
const projectDialog = document.querySelector(".project-dialog");
const projectDialogCloseButton = document.querySelector(
  ".project-dialog__close-button",
);
const taskForm = document.querySelector(".task-form");
const taskFormDate = document.getElementById("new_task_date");
const taskDialog = document.querySelector(".task-dialog");
const taskDialogCloseButton = document.querySelector(
  ".task-dialog__close-button",
);

projectList.addEventListener("click", handleProjectListClick);
projectAddButton.addEventListener("click", handleProjectAddButtonClick);
projectForm.addEventListener("submit", handleProjectFormSubmit);
projectDialogCloseButton.addEventListener(
  "click",
  handleCloseProjectDialogClick,
);
taskForm.addEventListener("submit", handleTaskFormSubmit);
taskDialogCloseButton.addEventListener("click", handleCloseTaskDialogClick);
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

function handleProjectListClick(event) {
  const isAddButton = event.target.classList.contains("task__add-button");
  const isAddText = event.target.classList.contains("task__text--add");
  const isTrashButton = event.target.classList.contains("task__trash-icon");
  const isRemoveProject = event.target.classList.contains(
    "project-remove-button",
  );
  if (isAddButton || isAddText) {
    const todoList = event.target.parentNode.parentNode.parentNode;
    taskDialog.dataset.projectId = todoList.dataset.projectId;
    taskDialog.showModal();
  } else if (isTrashButton) {
    const taskItem = event.target.parentNode;
    const todoList = taskItem.parentNode.parentNode;
    const taskId = taskItem.dataset.taskId;
    const projectId = todoList.dataset.projectId;
    const project = projects.find((project) => project.id == projectId);
    project.removeTask(taskId);
    taskItem.remove();
  } else if (isRemoveProject) {
    const todoList = event.target.parentNode;
    const projectId = todoList.dataset.projectId;
    const index = projects.find((project) => project.id == projectId);
    if (index != -1) {
      projects.splice(index, 1);
    }
    todoList.remove();
  }
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

function handleProjectAddButtonClick(event) {
  projectDialog.showModal();
}

function handleCloseProjectDialogClick(event) {
  projectDialog.close();
}

function handleTaskFormSubmit(event) {
  event.preventDefault();
  taskDialog.close();

  const formData = new FormData(event.target);
  const title = formData.get("new_task_title");
  const description = formData.get("new_task_description");
  const date = new Date(formData.get("new_task_date").replaceAll("-", "/"));
  const priority = formData.get("new_task_priority");
  event.target.reset();

  const projectId = taskDialog.dataset.projectId;
  const project = projects.find((project) => project.id == projectId);
  const taskIndex = project.addNewTask(title, description, date, priority);
  const task = project.tasks[taskIndex];
  addTaskItem(project.id, task, taskIndex);
}

function handleCloseTaskDialogClick(event) {
  taskDialog.close();
}
