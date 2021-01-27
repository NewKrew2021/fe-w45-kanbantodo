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
        this.showListModal();
    }

    showListModal(){
        const {cardId, id} = this.model.state;
        console.log(cardId, id);
    }

    async removeBtnClick(){
        const {} = await this.model.getInitialData();
        const removeListBtn = _dom.queryAll('.list-remove');
        console.log(removeListBtn);
        removeListBtn.forEach(element => {
            element.addEventListener('mouseenter', (e)=>{
                let cardId = e.target.getAttribute('data');
                let id = e.target.getAttribute('data-idx');
                console.log(cardId, id);
                this.model.openModal({cardId, id});
            })
        })
    }

    // Event handler
    init() {
        this.removeBtnClick();
    }
}

export default ListModalView;