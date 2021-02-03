import Controller, { MethodBindingOption } from './_controller'
import ModalView, { ModalRenderData } from '../view/modal'

export default class ModalController extends Controller {
  private renderData: ModalRenderData

  constructor({
      renderData,
      methodBindingOptions,
    }: {
      renderData: ModalRenderData,
      methodBindingOptions: Array<MethodBindingOption>,
    }) {
    super()
    this.renderData = renderData
    this.view = new ModalView()
    this.bindMethods([
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
