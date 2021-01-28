export default class View {
  protected element: HTMLElement // temporary root

  constructor() {
    this.element = document.createElement('div')
  }

  /*

    event handling

  */

  addEventListenerToWrapper(wrapper: HTMLElement) {
    // click event
    wrapper.addEventListener('click', event => {
      // find out the target
      let target: HTMLElement = <HTMLElement>event.target
      while (!target.dataset.action) {
        // if no action, do nothing
        if (target === this.element) return
        // else, go to parents
        target = target.parentElement
      }

      // call the action
      this.callAction(target.dataset.action)
    })
  }

  callAction(action: string) {}

  /*

    render

  */

  getChildrenWrapper(wrapperType: string) {
    return <HTMLElement>this.element.querySelector(`.children-wrapper[data-wrapper-type="${wrapperType}"]`)
  }

  toHtmlString() {
    return ''
  }

  render(wrapper: HTMLElement = this.element.parentElement) {
    // detach from parent
    this.element.parentElement?.removeChild(this.element)

    // detach children wrapper to preserve children
    // support multiple children wrapper
    const oldChildrenWrappers = this.element.querySelectorAll('.children-wrapper[data-wrapper-type]')
    oldChildrenWrappers.forEach(oldChildrenWrapper => {
      oldChildrenWrapper.parentElement.removeChild(oldChildrenWrapper)
    })
    console.log(oldChildrenWrappers)

    // make new element
    this.element.innerHTML = this.toHtmlString()
    this.element = <HTMLElement>this.element.firstElementChild

    // re-attach children wrapper
    oldChildrenWrappers.forEach(oldChildrenWrapper => {
      const { wrapperType } = (<HTMLElement>oldChildrenWrapper).dataset
      const newChildrenWrapper = this.element.querySelector(`.children-wrapper[data-wrapper-type="${wrapperType}"]`)
      newChildrenWrapper?.insertAdjacentElement('afterend', oldChildrenWrapper)
      newChildrenWrapper?.remove()
    })

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

  remove() {
    this.element.remove()
  }
}
