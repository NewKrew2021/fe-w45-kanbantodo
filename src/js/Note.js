export class Note {
  #id
  #title
  #subtasks

  constructor({ id, title }) {
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

  render(wrapper) {
    wrapper.innerHTML = this.toHtmlString()
  }
}