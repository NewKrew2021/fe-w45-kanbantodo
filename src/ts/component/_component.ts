export default class Component {
  private updateListeners: Array<Function>
  private deleteListeners: Array<Function>

  constructor() {
    this.updateListeners = []
    this.deleteListeners = []
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

  toHtmlString() {
    return ''
  }

  render(wrapper: HTMLElement) {
    wrapper.innerHTML = this.toHtmlString()
  }
}