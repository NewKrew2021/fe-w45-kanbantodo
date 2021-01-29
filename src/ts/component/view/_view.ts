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
      while (!target.dataset.clickAction) {
        // if no action, do nothing
        if (target === this.element) return
        // else, go to parents
        target = target.parentElement
      }

      // call the action
      this.callAction(target.dataset.clickAction)
    })

    // submit event
    wrapper.addEventListener('submit', event => {
      event.stopPropagation()
      event.preventDefault()

      // find out the target
      const target: HTMLElement = <HTMLElement>event.target

      // get form data and convert to an object
      const formDataObject = Object.fromEntries((new FormData(<HTMLFormElement>target)).entries())

      // call the action with form data
      this.callAction(target.dataset.submitAction, formDataObject)
    })
  }

  callAction(action: string, arg?: any) {
    const targetAction = (<any>this)[action]
    if (typeof targetAction === 'function') {
      targetAction(arg)
    }
  }

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
