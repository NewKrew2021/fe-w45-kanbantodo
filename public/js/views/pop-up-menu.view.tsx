import { $, translateTime } from "@public/js/common/utils";

const PROFILE_IMAGE: string =
  "https://avatars.githubusercontent.com/u/37804777?s=460&u=088956f4c1a3613536ddb54dac7492b469a12ca9&v=4";

interface Log {
  profile: string;
  user: string;
  task: string;
  from: string;
  to: string;
  card: string;
  time: string;
}

interface PopUpMenuTPL {
  statusTask(task: string, card: string, todoList: string): string;
  moveTask(task: string, from: string, to: string, card: string): string;
  detailItem(profile: string, user: string, time: string, taskTPL: string): string;
}

const POP_UP_MENU_TPL: PopUpMenuTPL = {
  statusTask(task: string, card: string, todoList: string): string {
    return `
      <span class="user-activity">${task}</span>
      <span class="card">${card}</span>
      <span class="activity-content__todo-list">${todoList}</span>
    `;
  },
  moveTask(task: string, from: string, to: string, card: string): string {
    return `
      <span class="user-activity">${task}</span>
      moved
      <span class="card">${card}</span>
      from
      <span class="from">${from}</span>
      to
      <span class="to">${to}</span>
    `;
  },
  detailItem(profile: string, user: string, time: string, taskTPL: string): string {
    return `
      <li class="menu-detail__item">
        <img
          class="user-image"
          src="${profile}"
          alt=""
        />
        <div class="activity-content">
          <span class="user-id">${user}</span>
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

  render(logList: Log[]) {
    if (!this.menuDetail) return;
    this.menuDetail.innerHTML = logList.reduce(
      (acc: string, { profile, user, task, from, to, card, time }) => {
        return (
          acc +
          POP_UP_MENU_TPL.detailItem(
            PROFILE_IMAGE,
            user,
            translateTime(time),
            POP_UP_MENU_TPL.moveTask(task, from, to, card)
          )
        );
      },
      ``
    );
  }

  init(): PopUpMenuView {
    this.handleButtonTransition(this.menuButton, "translateX(0)");
    this.handleButtonTransition(this.closeButton, "");

    return this;
  }
}
export { PopUpMenuView };
