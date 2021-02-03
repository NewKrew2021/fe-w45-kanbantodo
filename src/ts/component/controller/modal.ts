import Controller, { MethodBindingOption } from './_controller'
import ModalView, { ModalRenderData } from '../view/modal'

export default class ModalController extends Controller {
  private renderData: ModalRenderData

  constructor({
      id,
      renderData,
      methodBindingOptions,
    }: {
      id: string,
      renderData: ModalRenderData,
      methodBindingOptions: Array<MethodBindingOption>,
    }) {
    super()
    this.id = id
    this.renderData = renderData
    this.view = new ModalView()
    this.bindMethods([
      'getID',
      'getRenderData',
      'closeModal',
      ...methodBindingOptions,
    ])
    this.setWrapper(document.body)
    this.view.render()
  }

  getRenderData() {
    return this.renderData
  }

  closeModal() {
    // remove view
    this.view.remove()

    this.notifyDelete()
  }
}
