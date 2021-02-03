import View from './_view'

export default class KanbanView extends View {
  constructor() {
    super()
  }

  toHtmlString() {
    const { id } = this.getData()

    return `
      <div id="${id}" class="kanban">
        <div class="children-wrapper" data-wrapper-type="column">
          <!-- columns here -->
        </div>
        <button class="column gray ml-3 flex-center" data-click-action="addColumn">Add column</button>
      </div>
    `
  }
}
