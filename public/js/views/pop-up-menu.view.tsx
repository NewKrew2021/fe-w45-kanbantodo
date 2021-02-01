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

  handleButtonTransition(button: HTMLElement, transition: string) {
    button.addEventListener("click", () => {
      this.element.style.transform = transition;
    });
  }

  init(): PopUpMenuView {
    this.handleButtonTransition(this.menuButton, "translateX(0)");
    this.handleButtonTransition(this.closeButton, null);

    return this;
  }
}
export { PopUpMenuView };
