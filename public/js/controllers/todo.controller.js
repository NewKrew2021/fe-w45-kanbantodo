import { $ } from "../common/utils";

class TodoController {
  constructor(logView) {
    this.todoList = [];
    this.todoViewList = {};
    this.logView = logView;
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

  notifyLog(logList) {
    this.logView.render(logList);
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

  handlePopUpEvent(todoCardList, TodoView, todoModel, popUpMenuModel) {
    const popUpElement = $(".pop-up");

    $(".add-button", popUpElement).addEventListener("click", (event) => {
      let status = $(".add-new-kanban__input", popUpElement).value;
      todoModel.todoCardList[status] = [];
      this.createNewView(todoCardList, TodoView, todoModel, status, popUpMenuModel);

      popUpElement.style.display = "none";
    });

    $(".cancel-button", popUpElement).addEventListener("click", (event) => {
      popUpElement.style.display = "none";
    });
  }

  createNewView(todoCardList, TodoView, todoModel, status, popUpMenuModel) {
    this.todoViewList[status] = new TodoView(status).init();

    this.todoViewList[status].HandleDragAndDrop(
      todoModel.updateCardStatus,
      this.notify.bind(this),
      popUpMenuModel,
      this.notifyLog.bind(this)
    );

    this.subscribe({
      render: this.todoViewList[status].render,
      status: this.todoViewList[status].status,
    });

    this.notify(todoCardList, status);
    this.addButtonEvent(todoModel, this.todoViewList[status], status);
  }

  init(todoCardList, TodoView, todoModel, popUpMenuModel) {
    for (let status in todoCardList) {
      this.createNewView(todoCardList, TodoView, todoModel, status, popUpMenuModel);
    }
    this.handlePopUpEvent(todoCardList, TodoView, todoModel, popUpMenuModel);

    return this;
  }
}

export { TodoController };
