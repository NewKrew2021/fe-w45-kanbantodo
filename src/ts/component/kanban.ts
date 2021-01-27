import KanbanData from '../type/kanban'
import Column from './column'
import Component from './_component'

export default class Kanban extends Component {
  private id: String
  private kanbanData: KanbanData
  private columns: Array<Column>

  constructor({ id, kanbanData }: { id: String, kanbanData: KanbanData }) {
    super()
    this.id = id
    this.kanbanData = kanbanData
    this.columns = []
  }

  addColumn(column: Column) {
    this.columns.push(column)
  }

  removeColumn(column: Column) {
    // pop from this.columns
    this.columns = this.columns.filter(c => c != column)
  }

  toHtmlString() {
    // get HTML string for every column
    const columnHtmlString: string = this.columns.reduce((htmlString, column) =>
      htmlString + column.toHtmlString(), '')

    return `
      <div id="${this.id}" class="kanban">
        ${columnHtmlString}
      </div>
    `
  }
}
