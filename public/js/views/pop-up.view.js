import { $ } from "@public/js/common/utils";

const POP_UP_TEMPLATE = {
  popUp(title) {
    return `
        <div class="pop-up__background"></div>
        <div class="pop-up__content">
            <div class="pop-up__title">${title}</div>
            <input type="text" class="add-new-kanban__input" placeholder="new board name" />
            <div class="add-new-kanban__button-list">
                <button class="add-button">Add</button>
                <button class="cancel-button">Cancel</button>
            </div>
        </div>
        `;
  },
};

class PopUpView {
  constructor() {
    this.popUpElement = $(".pop-up");
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

  render() {
    this.popUpElement.innerHTML = POP_UP_TEMPLATE.popUp("New kanban board");
  }
}

export { PopUpView };
