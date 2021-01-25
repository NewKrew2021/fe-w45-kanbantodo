class Kanban {
  #id
  #columns

  constructor({ id }) {
    this.#id = id
  }

  toHtmlString() {
    return `
      <div id="${this.#id}" class="kanban">
        <p>empty</p>
      </div>
    `
  }

  render(wrapper) {
    wrapper.innerHTML = this.toHtmlString()
  }
}