class TodoController {
  constructor() {
    this.todoList = [];
  }

  subscribe(todo) {
    this.todoList = [...this.todoList, todo];
  }

  notify(cardList, status) {
    this.todoList.forEach(({ render }) => {
      render(cardList, status);
    });
  }
}

export { TodoController };
