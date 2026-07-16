export const todoList = {
  tasks: [],
  title: "",

  addNewTask: function (title, description, date, priority) {
    const newTask = createTask(title, description, date, priority);
    let i = 0;
    // console.log(newTask.priority);
    while (i < this.tasks.length && newTask.priority < this.tasks[i].priority) {
      ++i;
    }
    while (
      i < this.tasks.length &&
      newTask.date > this.tasks[i].date &&
      newTask.priority == this.tasks[i].priority
    ) {
      ++i;
    }
    this.tasks.splice(i, 0, newTask);
  },

  removeTask: function (id) {
    let i = 0;
    while (this.tasks[i].id != id) {
      ++i;
    }
    this.tasks.splice(i, 1);
  },
};

function createTask(title, description, date, priority) {
  return {
    title: title,
    description: description,
    date: date,
    priority: priority,
    id: crypto.randomUUID(),
  };
}
