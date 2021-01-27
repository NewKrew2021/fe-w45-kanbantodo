export default class Task {
  #id: String
  #title: String
  #subtasks: Array<Task>

  constructor({ id, title }: { id: String, title: String }) {
    this.#id = id
    this.#title = title
  }

  toHtmlString() {
    return `
      <div id="${this.#id}" class="task">
        ${this.#title}
      </div>
    `
  }

  render(wrapper: Element) {
    wrapper.innerHTML = this.toHtmlString()
  }
}