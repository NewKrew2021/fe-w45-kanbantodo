class TodoController {
  constructor() {
    this.todoList = [];
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
}

export { TodoController };
