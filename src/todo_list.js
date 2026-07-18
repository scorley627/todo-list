export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }

  addNewTask(title, description, date, priority) {
    const newTask = createTask(title, description, date, priority);
    let i = 0;
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

    return i;
  }

  removeTask(id) {
    const i = this.tasks.findIndex((task) => task.id == id);
    if (i != -1) {
      this.tasks.splice(i, 1);
    }
  }
}

function createTask(title, description, date, priority) {
  return {
    title: title,
    description: description,
    date: date,
    priority: priority,
    id: crypto.randomUUID(),
  };
}
