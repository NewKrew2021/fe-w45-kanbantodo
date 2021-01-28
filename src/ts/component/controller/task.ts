import TaskData from '../../type/task'
import Controller from './_controller'

export default class TaskController extends Controller {
  protected id: String
  protected taskData: TaskData
  protected subtasks: Array<TaskController>

  constructor({ id, taskData }: { id: String, taskData: TaskData }) {
    super()
    this.id = id
    this.taskData = taskData
    this.subtasks = []
  }

  getTaskData() {
    return this.taskData
  }

  updateSelf(title: String) {
    // TODO: request to server

    // TODO: update value
    this.taskData.title = title

    this.notifyUpdate()
  }

  deleteSelf() {
    // TODO: request to server
    // TODO: delete value

    this.notifyDelete()
  }

  addTask(task: TaskController) {
    this.subtasks.push(task)
    task.addDeleteListener(this.removeTask)
    task.addUpdateListener(this.notifyUpdate)
  }

  removeTask(task: TaskController) {
    // pop from this.columns
    this.subtasks = this.subtasks.filter(t => t != task)

    this.notifyUpdate()
  }

  toHtmlString() {
    const subtaskHtmlString: string = this.subtasks.reduce((htmlString, subtask) =>
      htmlString + subtask.toHtmlString(), '')

    return `
      <div id="${this.id}" class="task">
        ${this.taskData.title}
        ${subtaskHtmlString}
      </div>
    `
  }
}
