/*
    ListModalView.js
*/
import * as _dom from '../src/util.js';

/* ListModalModel을 구독하는 Observer */
class ListModalView {
    constructor(model) {
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    update(state){
    }

    // Event handler
    init() {
    }
}

export default ListModalView;