import View from "../view/_view"

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

  setWrapper(wrapper: HTMLElement) {
    this.view.render(wrapper)
  }

  bindMethods(methods: Array<string>) {
    methods.forEach(method => {
      (this.view as any)[method] = (this as any)[method].bind(this)
    })
  }
}