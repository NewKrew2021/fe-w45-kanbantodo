import KanbanData from '../../type/kanban'
import Controller from './_controller'
import ColumnController from './column'
import KanbanView from '../view/kanban'
import ColumnData from '../../type/column'

export default class KanbanController extends Controller {
  private kanbanData: KanbanData

  constructor({ id, kanbanData }: { id: string, kanbanData: KanbanData }) {
    super()
    this.id = id
    this.kanbanData = kanbanData
    this.view = new KanbanView()
    this.bindMethods([
      'getID',
      'getData',
      'addColumn',
    ])
    this.view.render()
  }

  getData() {
    return this.kanbanData
  }

  addColumn(columnData: ColumnData = { title: 'new column' }) {
    const columnController = new ColumnController({ id: '', columnData })

    // re-render
    columnController.setWrapper(this.view.getChildrenWrapper('column'))

    return columnController
  }
}
