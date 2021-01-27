import Task from "./Task"

export default class Note {
  #id: String
  #title: String
  #subtasks: Array<Task>

  constructor({ id, title }: { id: String, title: String }) {
    this.#id = id
    this.#title = title
  }

  toHtmlString() {
    return `
      <div id="${this.#id}" class="note">
        <strong>${this.#title}</strong>
      </div>
    `
  }

  render(wrapper: Element) {
    wrapper.innerHTML = this.toHtmlString()
  }
}