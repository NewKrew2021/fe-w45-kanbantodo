/*
    InputView.js : [+]를 누를 때 나오는 input-view
    - 모델 객체를 주입받고 구독하는 [Observer] 이다.
*/
import TodoModel from 'client/models/TodoModel';
import { HistoryState } from 'client/src/interface'
import * as _dom from 'client/src/util';

/* TodoModel을 구독하는 Observer */
class InputView {
    model : TodoModel
    constructor(model : TodoModel) {
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    onEvents() {
        this.setClickBtn();
        this.inputNoteData();
    }
    
    update(){
        this.onEvents();
    }

    init() {
        this.onEvents();
    }

    // Event handler
    addInputHandler(e : Event){
        const inputArea = _dom.queryAll('.list-input');
        const cardId : string = (e.target as Element).getAttribute('data')!; // non-null assertion
        const cardName : string = _dom.getCardName({cardId});
        let inputData = '';

        inputArea.forEach(elem => {
            if (elem.getAttribute('data') === cardId) {
                inputData = (elem as HTMLTextAreaElement).value;
                this.model.addTodo({cardId, inputData});

                // add history state
                const historyState : HistoryState = {
                    cardName: cardName, beforeTitle: '',
                    afterTitle: inputData, writeTime : Date.now(),
                    action: 'ADD_NOTE'
                }
                this.model.setHistoryState(historyState);
                this.model.addHistory({input : historyState});
            }
        })
    }

    removeInputHandler(e : Event){
        const inputArea = _dom.queryAll('.list-input');
        const idx = (e.target as Element).getAttribute('data');
        inputArea.forEach(elem => {
            if (elem.getAttribute('data') === idx) {
                (elem as HTMLTextAreaElement).value = "";
            }
        })
    }

    toggleEvtHandler(e : Event){
        const inputDiv = _dom.queryAll('.input-list-view');
        const idx = (e.target as Element).getAttribute('data');
        inputDiv.forEach(elem => {
            if (elem.getAttribute('data') === idx) {
                elem.classList.toggle("none");
            }
        })
    }

    async inputNoteData() {
        const { } = await this.model.getInitialData();
        const inputBtn : Array<Element> = _dom.queryAll('.btn-add-list');
        const cancelBtn : Array<Element> = _dom.queryAll('.btn-cancel-list');
        inputBtn.forEach(elem => {
            elem.addEventListener('click', this.addInputHandler.bind(this));
        })
        cancelBtn.forEach(elem => {
            elem.addEventListener('click', this.removeInputHandler.bind(this));
        })
    }

    async setClickBtn() {
        const { } = await this.model.getInitialData();
        const cardBtn : Array<Element> = _dom.queryAll('.card-btn.htop-add');
        cardBtn.forEach(elem => {
            elem.addEventListener('click', this.toggleEvtHandler.bind(this))
        });
    }
}
export default InputView;