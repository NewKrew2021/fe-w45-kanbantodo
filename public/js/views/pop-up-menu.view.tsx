import { $ } from "../common/utils";

const PROFILE_IMAGE: string =
  "https://avatars.githubusercontent.com/u/37804777?s=460&u=088956f4c1a3613536ddb54dac7492b469a12ca9&v=4";

const POP_UP_MENU_TPL: object = {
  statusTask(task: string, card: string, todoList: string) {
    return `
      <span class="user-activity">${task}</span>
      <span class="card">${card}</span>
      <span class="activity-content__todo-list">${todoList}</span>
    `;
  },
  moveTask(task: string, from: string, to: string, card: string): string {
    return `
      <span class="user-activity">${task}</span>
      <span class="from">${from}</span>
      <span class="card">${card}</span>
      <span class="to">${to}</span>
    `;
  },
  detailItem(profile: string, user: string): string {
    return `
      <li class="menu-detail__item">
        <img
          class="user-image"
          src="${profile}"
          alt=""
        />
        <div class="activity-content">
          <div class="user-id">${user}</div>
          <div class="balloon">
            <span class="user-activity">added</span>
            <span class="card">감사</span>
          </div>
        </div>
      </li>
          `;
  },
};

class PopUpMenuView {
  element: HTMLElement;
  menuButton: HTMLElement;
  closeButton: HTMLElement;

  constructor() {
    this.element = $(".menu-pop-up");
    this.menuButton = $(".header__menu-button");
    this.closeButton = $(".menu-pop-up__close-button");
  }

  handleButtonTransition(button: HTMLElement, transition: string) {
    button.addEventListener("click", () => {
      this.element.style.transform = transition;
    });
  }

  init(): PopUpMenuView {
    this.handleButtonTransition(this.menuButton, "translateX(0)");
    this.handleButtonTransition(this.closeButton, "");

    return this;
  }
}
export { PopUpMenuView };
