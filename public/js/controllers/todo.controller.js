class TodoController {
  constructor() {
    this.todoList = [];
  }

  subscribe(todo) {
    this.todoList = [...this.todoList, todo];
  }

  notify(status, changedCardList) {
    let changedTodo = this.todoList.filter((todo) => status === todo.status);

    if (changedTodo) {
      changedTodo.forEach((todo) => (todo.cardList = changedCardList));
      return;
    }

    this.todoList = [...this.todoList, { status: status, cardList: changedCardList }];
  }
}
