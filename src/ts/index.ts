import TaskController from './component/controller/task'
import NoteController from './component/controller/note'
import ColumnController from './component/controller/column'
import KanbanController from './component/controller/kanban'
import { findOne } from './util/index'

const kanban = new KanbanController({ id: 'kanban', kanbanData: {} })

window.addEventListener('DOMContentLoaded', (event) => {
  // fetch data
  const kanbanData = [
    { title: 'A', notes: [ { title: 'A', subtasks: [ { title: 'A', subtasks: [] as Array<any> } ] } ] },
    { title: 'B', notes: [ { title: 'B', subtasks: [ { title: 'B', subtasks: [] as Array<any> } ] } ] },
    { title: 'C', notes: [ { title: 'C', subtasks: [ { title: 'C', subtasks: [] as Array<any> } ] } ] },
    { title: 'D', notes: [ { title: 'D', subtasks: [ { title: 'D', subtasks: [] as Array<any> } ] } ] },
  ]

  function initAndAddTasks(parent: NoteController | TaskController, tasks: Array<any>) {
    // handle exception: no task
    if (!tasks) return

    tasks.forEach(({ title, subtasks }) => {
      const task = new TaskController({ id: '', taskData: { title }})
      initAndAddTasks(task, subtasks)
      parent.addTask(task)
    })
  }

  kanbanData.forEach(({ title, notes }) => {
    const columnController = kanban.addColumnWithData({ title })
    // const column = new ColumnController({ id: '', columnData: { title } })
    // notes.forEach(({ title, subtasks }) => {
    //   const note = new NoteController({ id: '', taskData: { title } })
    //   initAndAddTasks(note, subtasks)
    //   column.addNote(note)
    // })
    // kanban.addColumn(column)
  })

  kanban.setWrapper(findOne('#kanban_box'))
})
