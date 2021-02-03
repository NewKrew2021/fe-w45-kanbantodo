import View from './_view'

export type ModalRenderData = {
  title: string,
  htmlString: string
}

export default class ModalView extends View {
  constructor() {
    super()
  }

  toHtmlString() {
    const id = this.getID()
    const { title, htmlString }: ModalRenderData = this.getRenderData()

    return `
      <div id="${id}" class="modal-box" data-click-action="closeModal">
        <div class="modal" data-click-action="">
          <div class="modal-head">
            <strong>${title}</strong>
            <button class="ml-auto" data-click-action="closeModal">×</button>
          </div>
          <div class="modal-body">
            ${htmlString}
          </div>
        </div>
      </div>
    `
  }
}
