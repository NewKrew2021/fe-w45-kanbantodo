export default class View {
  protected element: HTMLElement // temporary root

  constructor() {
    this.element = document.createElement('div')
  }

  /*

    event handling

  */

  addEventListenerToWrapper(wrapper: HTMLElement) {
    wrapper.addEventListener('click', this.clickListener.bind(this))
  }

  clickListener(event: MouseEvent) {}

  /*

    render

  */

  toHtmlString() {
    return ''
  }

  render(wrapper: HTMLElement = this.element.parentElement) {
    // detach from parent
    this.element.parentElement?.removeChild(this.element)
    console.log(this.element)

    // TODO: FEATURE: support multiple children wrapper
    // detach children wrapper to preserve children
    const oldChildrenWrapper = this.element.querySelector('.children-wrapper')
    oldChildrenWrapper?.parentElement.removeChild(oldChildrenWrapper)

    // make new element
    this.element.innerHTML = this.toHtmlString()
    this.element = <HTMLElement>this.element.firstElementChild

    // re-attach children
    if (oldChildrenWrapper) {
      const newChildrenWrapper = this.element.querySelector('.children-wrapper')
      newChildrenWrapper.insertAdjacentElement('afterend', oldChildrenWrapper)
      newChildrenWrapper.remove()
    }

    // attach this to wrapper
    if (wrapper) {
      this.beforeRender()
      wrapper.appendChild(this.element)
      this.addEventListenerToWrapper(this.element)
      this.afterRender()
    }
  }

  beforeRender() {}
  afterRender() {}
}
