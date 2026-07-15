import "./style.css";
import { showList } from "./display.js";
import { todoList } from "./todo_list.js";

todoList.addNewTask("Task", "Task description", "09/15/2025");
todoList.title = "Todo List";

showList();
