class TodoController {
  constructor() {
    this.todoList = [];
  }

  subscribe(todo) {
    this.todoList = [...this.todoList, todo];
  }

  notify(cardList, status) {
    this.todoList.forEach(({ element, createTodo }) => {
      element.innerHTML = createTodo(cardList, status);
    });
  }
}

export { TodoController };
