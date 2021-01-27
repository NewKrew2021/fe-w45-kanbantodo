import Task from './task'

export default class Note extends Task {
  toHtmlString() {
    // get HTML string for every subtask
    const subtaskHtmlString: string = this.subtasks.reduce((htmlString, subtask) =>
      htmlString + subtask.toHtmlString(), '')

      return `
      <div id="${this.id}" class="note">
        <strong>${this.taskData.title}</strong>
        ${subtaskHtmlString}
      </div>
    `
  }
}
