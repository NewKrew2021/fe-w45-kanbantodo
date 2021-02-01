import { $ } from "../common/utils";

class PopUpMenuView {
  element: HTMLElement;
  menuButton: HTMLElement;
  closeButton: HTMLElement;

  constructor() {
    this.element = $(".menu-pop-up");
    this.menuButton = $(".header__menu-button");
    this.closeButton = $(".menu-pop-up__close-button");
  }

  init() {
    this.menuButton.addEventListener("click", () => {
      this.element.style.transform = "translateX(0)";
    });

    this.closeButton.addEventListener("click", () => {
      this.element.style.transform = null;
    });
    return this;
  }
}
export { PopUpMenuView };
