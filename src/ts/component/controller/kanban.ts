import Controller from './_controller'
import ColumnController from './column'
import KanbanView from '../view/kanban'
import { KanbanData } from '../../type/index'

export default class KanbanController extends Controller {
  private kanbanData: KanbanData

  constructor(kanbanData: KanbanData) {
    super()
    this.kanbanData = kanbanData
    this.view = new KanbanView()
    this.bindMethods([
      'getData',
      'addColumn',
    ])
    this.view.render()
  }

  getData() {
    return this.kanbanData
  }

  addColumn() {
    const columnController = new ColumnController({ id: '', title: 'new column' })

    // re-render
    columnController.setWrapper(this.view.getChildrenWrapper('column'))

    return columnController
  }
}
