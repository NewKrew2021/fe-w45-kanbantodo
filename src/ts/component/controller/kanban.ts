import KanbanData from '../../type/kanban'
import Controller from './_controller'
import ColumnController from './column'
import KanbanView from '../view/kanban'
import ColumnData from '../../type/column'

export default class KanbanController extends Controller {
  private kanbanData: KanbanData
  private view: KanbanView

  constructor({ id, kanbanData }: { id: String, kanbanData: KanbanData }) {
    super()
    this.kanbanData = kanbanData
    this.view = new KanbanView({ id, kanbanData })
    this.view.addColumn = this.addColumnWithData.bind(this)
  }

  addColumn() {
    // TODO: open modal
  }

  addColumnWithData(columnData: ColumnData = { title: 'new column' }) {
    const columnController = new ColumnController({ id: '', columnData })

    // re-render
    columnController.setWrapper(this.view.getChildrenWrapper('column'))

    return columnController
  }

  setWrapper(wrapper: HTMLElement) {
    this.view.render(wrapper)
  }
}
