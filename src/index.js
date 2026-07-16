import "./style.css";
import { showList } from "./display.js";
import { todoList } from "./todo_list.js";

todoList.addNewTask("Task", "", new Date("2026/11/4"), 2);
todoList.addNewTask("Task", "", new Date("2026/10/20"), 3);
todoList.addNewTask("Task", "", new Date("2026/9/15"), 1);
todoList.title = "Todo List";

showList();
