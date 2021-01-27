import Task from './component/task'
import Note from './component/note'
import Column from './component/column'
import Kanban from './component/kanban'
import { findOne } from './util/index'

const kanban = new Kanban({ id: 'kanban', kanbanData: {} })

window.addEventListener('DOMContentLoaded', (event) => {
  // fetch data
  const kanbanData = [
    { title: 'A', notes: [ { title: 'A', subtasks: [ { title: 'A', subtasks: [] as Array<any> } ] } ] },
    { title: 'B', notes: [ { title: 'B', subtasks: [ { title: 'B', subtasks: [] as Array<any> } ] } ] },
    { title: 'C', notes: [ { title: 'C', subtasks: [ { title: 'C', subtasks: [] as Array<any> } ] } ] },
  ]

  function initAndAddTasks(parent: Note | Task, tasks: Array<any>) {
    // handle exception: no task
    if (!tasks) return

    tasks.forEach(({ title, subtasks }) => {
      const task = new Task({ id: '', taskData: { title }})
      initAndAddTasks(task, subtasks)
      parent.addTask(task)
    })
  }

  kanbanData.forEach(({ title, notes }) => {
    const column = new Column({ id: '', columnData: { title } })
    notes.forEach(({ title, subtasks }) => {
      const note = new Note({ id: '', taskData: { title } })
      initAndAddTasks(note, subtasks)
      column.addNote(note)
    })
    kanban.addColumn(column)
  })

  kanban.render(findOne('#kanban_box'))
})