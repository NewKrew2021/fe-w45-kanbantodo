/*
    InputView.js : [+] 에 마우스를 가져다 댈 때 나오는 input-view
    - 모델 객체를 주입받고 구독하는 [Observer] 이다.
*/
import * as _dom from '../src/util.js';

/* TodoModel을 구독하는 Observer */
class InputView {
    constructor(model) {
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    // update, todos 토대로 그리기
    update(state) {
    }

    async addInput() {
        const { } = await this.model.getInitialData();
        const inputBtn = _dom.queryAll('.btn-add-list');
        const inputArea = _dom.queryAll('.list-input');
        inputBtn.forEach(element => {
            element.addEventListener('click', (e) => {
                console.log("test");
                const idx = e.target.getAttribute('data');
                let inputData = '';
                inputArea.forEach(element => {
                    if (element.getAttribute('data') === idx) {
                        inputData = element.value;
                        console.log(inputData);
                        this.model.addTodo(idx, inputData);
                    }
                })
            })
        })
    }

    // event(hover)
    async setAddBtn() {
        const data = await this.model.getInitialData();
        const addBtn = _dom.queryAll('.card-plus');
        addBtn.forEach(element => {
            element.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data');
                const inputDiv = _dom.queryAll('.input-list-view');
                inputDiv.forEach(element => {
                    if (element.getAttribute('data') === idx) {
                        element.classList.toggle("none");
                    }
                })
            })
        });
    }

    init() {
        this.setAddBtn();
        this.addInput();
    }

}

export default InputView;