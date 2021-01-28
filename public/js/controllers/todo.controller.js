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
    const popUpElement = $(".pop-up");

    $(".add-kanban-button").addEventListener("click", (event) => {
      popUpElement.style.display = "flex";
    });

    $(".add-button", popUpElement).addEventListener("click", (event) => {
      let status = $(".add-new-kanban__input", popUpElement).value;
      todoModel.todoCardList[status] = [];
      this.createNewView(todoCardList, TodoView, todoModel, status);

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

  createNewView(todoCardList, TodoView, todoModel, status) {
    this.todoViewList[status] = new TodoView(status).init();

    this.todoViewList[status].HandleDragAndDrop(todoModel.updateCardStatus);
    this.subscribe({
      render: this.todoViewList[status].render,
      status: this.todoViewList[status].status,
    });

    this.notify(todoCardList, status);
    this.addButtonEvent(todoModel, this.todoViewList[status], status);
  }

  init(todoCardList, TodoView, todoModel) {
    for (let status in todoCardList) {
      this.createNewView(todoCardList, TodoView, todoModel, status);
    }
    this.handlePopUpEvent(todoCardList, TodoView, todoModel);

    return this;
  }
}

export { TodoController };
