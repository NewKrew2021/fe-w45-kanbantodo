import Controller from './_controller'
import ModalView, { ModalRenderData } from '../view/modal'

export default class ModalController extends Controller {
  private renderData: ModalRenderData

  constructor({ id, renderData, parentController }: { id: string, renderData: ModalRenderData, parentController: Controller }) {
    super()
    this.id = id
    this.renderData = renderData
    this.view = new ModalView()
    this.bindMethods([
      'getID',
      'getRenderData',
      'closeModal',
      { methodName: 'editColumn', bindTarget: parentController }
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
