import Controller from './_controller'
import ColumnController from './column'
import KanbanView from '../view/kanban'
import { ColumnFetchedData, KanbanData } from '../../type/index'
import { myFetchPOST } from '../../util/index'

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

  async addColumn() {
    // request to server
    const columnFetchedData = await this.requestAddColumn()

    // add column
    this.addColumnWithFetchedData(columnFetchedData)
  }

  async requestAddColumn() {
    // request to server
    return await myFetchPOST('/kanban/column', {
      kanbanID: this.getData().id
    })
  }

  addColumnWithFetchedData(columnFetchedData: ColumnFetchedData) {
    // create new column
    const columnController = new ColumnController({
      id: columnFetchedData._id,
      title: columnFetchedData.title
    })

    // add notes
    columnFetchedData.notes.forEach(columnController.addNoteWithFetchedData.bind(columnController))

    // append column to kanban
    columnController.setWrapper(this.view.getChildrenWrapper('column'))
  }
}
