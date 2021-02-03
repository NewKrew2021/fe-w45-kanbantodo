import TaskController from './component/controller/task'
import NoteController from './component/controller/note'
import ColumnController from './component/controller/column'
import KanbanController from './component/controller/kanban'
import { findOne, myFetchGET } from './util/index'
import { ColumnFetchedData, KanbanFetchedData, NoteFetchedData } from './type/index'

window.addEventListener('DOMContentLoaded', (event) => {
  initKanban()
})

async function initKanban() {
  // fetch data
  const kanbanFetchedData: KanbanFetchedData = await myFetchGET('/kanban')

  // create new kanban
  const kanbanController = new KanbanController({ id: kanbanFetchedData._id })

  // add columns
  kanbanFetchedData.columns.forEach((columnFetchedData: ColumnFetchedData) => {

    // create new column
    const columnController = new ColumnController({
      id: columnFetchedData._id,
      title: columnFetchedData.title
    })

    // add notes
    columnFetchedData.notes.forEach((noteFetchedData: NoteFetchedData) => {

      // create new note
      const noteController = new NoteController({
        id: noteFetchedData._id,
        title: noteFetchedData.title
      })

      // TODO: check tasks

      // append note
      noteController.setWrapper(columnController.view.getChildrenWrapper('note'))
    })

    // append column
    columnController.setWrapper(kanbanController.view.getChildrenWrapper('column'))
  })

  // append kanban
  kanbanController.setWrapper(findOne('#kanban_box'))
}