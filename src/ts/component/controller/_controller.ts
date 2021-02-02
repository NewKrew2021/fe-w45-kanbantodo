import View from "../view/_view"

interface MethodBindingOption {
  methodName: string,
  bindTarget: Controller,
}

export default class Controller {
  private updateListeners: Array<Function>
  private deleteListeners: Array<Function>
  protected id: string
  protected view: View

  constructor() {
    this.updateListeners = []
    this.deleteListeners = []
  }

  getID() {
    return this.id
  }

  addUpdateListener(listener: Function) {
    this.updateListeners.push(listener)
  }

  addDeleteListener(listener: Function) {
    this.deleteListeners.push(listener)
  }

  protected notifyUpdate() {
    this.updateListeners.forEach(listener => listener(this))
  }

  protected notifyDelete() {
    this.deleteListeners.forEach(listener => listener(this))
  }

  setWrapper(wrapper: HTMLElement, index?: number) {
    this.view.render(wrapper, index)
  }

  bindMethods(bindingOptions: Array<MethodBindingOption | string>) {
    bindingOptions.forEach(bindingOption => {

      // set name of method to bind, and binding target
      let methodName, bindTarget
      if (typeof bindingOption === 'string') {
        methodName = bindingOption
        bindTarget = this
      } else {
        methodName = bindingOption.methodName
        bindTarget = bindingOption.bindTarget
      }

      // bind method
      (this.view as any)[methodName] = (bindTarget as any)[methodName].bind(bindTarget)
    })
  }
}