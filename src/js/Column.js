export class Column {
  #id
  #title
  #notes

  constructor({ id, title }) {
    this.#id = id
    this.#title = title
  }

  toHtmlString() {
    return `
      <div id="${this.#id}" class="column">
        <strong>${this.#title}</strong>
        <p>empty</p>
      </div>
    `
  }

  render(wrapper) {
    wrapper.innerHTML = this.toHtmlString()
  }
}