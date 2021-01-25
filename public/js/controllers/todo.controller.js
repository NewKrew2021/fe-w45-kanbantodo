class TodoController {
  constructor() {
    this.todoList = [];
  }
  subscribe(todo) {
    this.todoList = [...this.todoList, todo];
  }
}
