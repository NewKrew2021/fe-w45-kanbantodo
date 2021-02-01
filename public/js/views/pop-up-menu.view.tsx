import { $ } from "../common/utils";

class PopUpMenuView {
  element: HTMLElement;
  menuButton: HTMLElement;

  constructor() {
    this.element = $(".menu-pop-up");
    this.menuButton = $(".header__menu-button");
  }

  init() {
    this.menuButton.addEventListener("click", () => {
      this.element.style.transform = "translateX(0)";
    });
    return this;
  }
}
export { PopUpMenuView };
