class TodoController {
  constructor() {
    this.todoList = [];
    this.todoViewList = {};
  }

  subscribe(todo) {
    this.todoList = [...this.todoList, todo];
  }

  notify(todoCardList, status) {
    this.todoList
      .filter((todo) => todo.status === status)
      .forEach(({ render }) => {
        render(todoCardList[status], status);
      });
  }

  addButtonEvent(model, view, status) {
    view.getNewTodoData(async (cardData) => {
      await model.addCard(cardData);
      this.notify(model.todoCardList, status);
    });

    view.deleteTodo(async (cardData) => {
      await model.deleteTodo(cardData);
      this.notify(model.todoCardList, status);
    });
  }

  init(todoCardList, TodoView, todoModel) {
    for (let status in todoCardList) {
      this.todoViewList[status] = new TodoView(status).init();

      this.subscribe({
        render: this.todoViewList[status].render,
        status: this.todoViewList[status].status,
      });

      this.notify(todoCardList, status);
      this.addButtonEvent(todoModel, this.todoViewList[status], status);
    }

    return this;
  }
}

export { TodoController };
