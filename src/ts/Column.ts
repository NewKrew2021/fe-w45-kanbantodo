import Note from "./Note"

export default class Column {
  #id: String
  #title: String
  #notes: Array<Note>

  constructor({ id, title }: { id: String, title: String }) {
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

  render(wrapper: Element) {
    wrapper.innerHTML = this.toHtmlString()
  }
}