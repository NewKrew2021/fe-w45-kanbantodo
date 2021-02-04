import { $, translateTime } from "@public/js/common/utils";
import { ILog, IPopUpMenuTPL } from "@public/js/common/interface";

const POP_UP_MENU_TPL: IPopUpMenuTPL = {
  statusTask(content: string, card: string, todoList: string): string {
    return `
      <span class="user-activity">${content}</span>
      <span class="card">${card}</span>
      <span class="activity-content__todo-list">${todoList}</span>
    `;
  },
  moveTask(content: string, from: string, to: string): string {
    return `
      <span class="user-activity">${content}</span>
      moved from
      <span class="from">${from}</span>
      to
      <span class="to">${to}</span>
    `;
  },
  detailItem(profile: string, writer: string, time: string, taskTPL: string): string {
    return `
      <li class="menu-detail__item">
        <img
          class="user-image"
          src="${profile}"
          alt=""
        />
        <div class="activity-content">
          <span class="user-id">${writer}</span>
          <span>${time}</span>
          <div class="balloon">${taskTPL}</div>
        </div>
      </li>
          `;
  },
};

class PopUpMenuView {
  element: HTMLElement | null;
  menuButton: HTMLElement | null;
  closeButton: HTMLElement | null;
  menuDetail: HTMLElement | null;

  constructor() {
    this.element = $(".menu-pop-up");
    this.menuButton = $(".header__menu-button");
    this.closeButton = $(".menu-pop-up__close-button");
    this.menuDetail = $(".menu-detail");
  }

  handleButtonTransition(button: HTMLElement | null, transition: string) {
    if (!button) return;
    button.addEventListener("click", () => {
      if (!this.element) return;
      this.element.style.transform = transition;
    });
  }

  render(logList: ILog[]) {
    if (!this.menuDetail) return;
    this.menuDetail.innerHTML = logList
      .reverse()
      .reduce((acc: string, { profile, writer, content, from, to, time }) => {
        return (
          acc +
          POP_UP_MENU_TPL.detailItem(
            profile,
            writer,
            translateTime(time),
            POP_UP_MENU_TPL.moveTask(content, from, to)
          )
        );
      }, ``);
  }

  init(): PopUpMenuView {
    this.handleButtonTransition(this.menuButton, "translateX(0)");
    this.handleButtonTransition(this.closeButton, "");

    return this;
  }
}
export { PopUpMenuView };
