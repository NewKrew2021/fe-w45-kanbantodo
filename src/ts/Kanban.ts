import Column from './Column'

export default class Kanban {
  #id: String
  #columns: Array<Column>

  constructor({ id }: { id: String }) {
    this.#id = id
  }

  addColumn(column: Column) {
  }

  toHtmlString() {
    return `
      <div id="${this.#id}" class="kanban">
        <p>empty</p>
      </div>
    `
  }

  render(wrapper: Element) {
    wrapper.innerHTML = this.toHtmlString()
  }
}