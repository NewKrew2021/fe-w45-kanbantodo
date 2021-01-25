export class Task {
  #id
  #title
  #subtasks

  constructor({ id, title }) {
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

  render(wrapper) {
    wrapper.innerHTML = this.toHtmlString()
  }
}