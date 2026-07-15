export const todoList = {
  tasks: [],
  title: "",

  addNewTask: function (title, description, date) {
    const newTask = createTask(title, description, date);
    this.tasks.push(newTask);
  },

  removeTask: function (id) {
    let i = 0;
    while (this.tasks[i].id != id) {
      ++i;
    }
    this.tasks.splice(i, 1);
  },
};

function createTask(title, description, dueDate) {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: 1,
    id: crypto.randomUUID(),
  };
}
