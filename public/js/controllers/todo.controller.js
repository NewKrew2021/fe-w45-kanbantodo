import { $ } from "../common/utils";

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

  handlePopUpEvent(todoCardList, TodoView, todoModel) {
    let popUpElement = $(".pop-up");

    $(".add-kanban-button").addEventListener("click", (event) => {
      popUpElement.style.display = "flex";
    });

    $(".add-button", popUpElement).addEventListener("click", (event) => {
      console.log("hello");
      let status = $(".add-new-kanban__input", popUpElement).value;

      this.todoViewList[status] = new TodoView(status).init();

      this.subscribe({
        render: this.todoViewList[status].render,
        status: this.todoViewList[status].status,
      });

      todoModel.todoCardList[status] = [];

      this.notify(todoCardList, status);
      this.addButtonEvent(todoModel, this.todoViewList[status], status);
      popUpElement.style.display = "none";
    });

    $(".cancel-button", popUpElement).addEventListener("click", (event) => {
      popUpElement.style.display = "none";
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
    this.handlePopUpEvent(todoCardList, TodoView, todoModel);

    return this;
  }
}

export { TodoController };
