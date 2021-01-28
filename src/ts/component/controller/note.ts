import TaskController from './task'

export default class NoteController extends TaskController {
  toHtmlString() {
    // get HTML string for every subtask
    const subtaskHtmlString: string = this.subtasks.reduce((htmlString, subtask) =>
      htmlString + subtask.toHtmlString(), '')

      return `
      <div id="${this.id}" class="note" role="button">
        <div class="d-flex mb-2">
          <strong class="mr-auto my-auto">${this.taskData.title}</strong>
          <button>×</button>
        </div>
        <p class="text-small my-1 gray">Added by</p>
        <!-- ${subtaskHtmlString} -->
      </div>
    `
  }
}
