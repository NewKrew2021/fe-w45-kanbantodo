export default class View {
  protected element: HTMLElement // temporary root

  constructor() {
    this.element = document.createElement('div')
  }

  // get data from controller to render itself
  getID():string {
    return ''
  }
  getData():any {}

  /*

    event handling

  */

  addEventListenerToWrapper(wrapper: HTMLElement) {
    // click event
    wrapper.addEventListener('click', event => {
      event.stopPropagation()

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

      // get form data
      const formData = new FormData(<HTMLFormElement>target)

      // convert form data to an object
      const formDataObject = Object.fromEntries(formData.entries())

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

  render(wrapper: HTMLElement = this.element.parentElement, index?: number) {
    const parent = this.element.parentElement

    // if parent exist
    if (parent) {
      // set index
      if (index === undefined) {
        index = Array.from(parent.children).indexOf(this.element)
      }

      // detach from parent
      parent?.removeChild(this.element)
    }

    // make new temporary element
    const newElement = document.createElement('div')
    newElement.innerHTML = this.toHtmlString()

    // find all wrappers from the {newElement}
    const wrappers = newElement.querySelectorAll('.children-wrapper[data-wrapper-type]')
    const wrapperTypes = Array.from(wrappers).map(wrapper => (<HTMLElement>wrapper).dataset.wrapperType)

    // detach children wrapper to preserve children
    // NOTE: support multiple children wrapper but not nested
    const oldWrappers: Array<Element> = []
    wrapperTypes.forEach(wrapperType => {
      const oldWrapper = this.element.querySelector(`.children-wrapper[data-wrapper-type="${wrapperType}"]`)
      if (oldWrapper) {
        oldWrapper.parentElement.removeChild(oldWrapper)
        oldWrappers.push(oldWrapper)
      }
    })

    // make new element
    this.element.innerHTML = this.toHtmlString()
    this.element = <HTMLElement>this.element.firstElementChild
    this.element.parentElement.removeChild(this.element)

    // re-attach children wrapper
    oldWrappers.forEach(oldWrapper => {
      const { wrapperType } = (<HTMLElement>oldWrapper).dataset
      const newWrapper = this.element.querySelector(`.children-wrapper[data-wrapper-type="${wrapperType}"]`)
      newWrapper?.insertAdjacentElement('afterend', oldWrapper)
      newWrapper?.remove()
    })

    // delete temporary element
    newElement.remove()

    // attach this to wrapper
    if (wrapper) {
      this.beforeRender()
      wrapper.insertBefore(this.element, wrapper.children[index]);
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
