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

  render() {
    this.popUpElement.innerHTML = POP_UP_TEMPLATE.popUp("New kanban board");
  }
}

export { PopUpView };
