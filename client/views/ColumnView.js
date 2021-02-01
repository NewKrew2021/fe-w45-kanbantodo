
import { domTpl } from './template.js';
import * as _dom from '../src/util.js';
import * as req from '../src/request.js';

/*
    ColumnView.js
    컬럼 뷰(카드 1개 전체)에 대한 클래스
*/

/* 새로운 컬럼 카드 추가 뷰 */
class ColumnView {
    constructor(model) {
        this.modal = _dom.query('.modal');
        this.removeModal = _dom.query('.modal-remove');
        this.editModal = _dom.query('.modal-edit');
        this.modalSaveBtn = _dom.query('.btn-save-modal');
        this.modalWriteBtn = _dom.query('.btn-write-modal');
        this.modalAcceptBtn = _dom.query('.btn-accept-modal');
        this.modalCloseBtn = _dom.query('.btn-close-modal');

        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    update() {
        this.addNewCard();
        this.removeCard();
    }

    // add card handler
    async newCardHandler(e) {
        const modalHeader = _dom.query('.modal-header-title');
        const modalInput = _dom.query('.modal-input');
        modalInput.value = '';
        this.modal.classList.remove('none');
        this.editModal.classList.remove('none');
        this.modalSaveBtn.classList.add('none');
        this.modalWriteBtn.classList.remove('none');
        _dom.html(modalHeader, '새로운 카드 추가하기');

        this.modalWriteBtn.addEventListener('click', function () {
            const newTitle = modalInput.value;
            this.model.addCard({ name : newTitle, author: "roddy.chan" });
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        }.bind(this))
    }

    // add card
    async addNewCard() {
        const { } = await this.model.getInitialData();
        const addBtn = _dom.query('.card-new');
        addBtn.addEventListener('click', this.newCardHandler.bind(this));
    }

    // remove card handler
    async removeCardHandler(e){
        const cardId = e.target.getAttribute('data');
        const modal = _dom.query('.modal');
        const removeCardModal = _dom.query('.modal-card-remove');
        const cardRemoveBtn = _dom.query('.btn-card-accept');
        const removeCancelBtn = _dom.query('.btn-card-close');

        modal.classList.remove('none');
        removeCardModal.classList.remove('none');

        cardRemoveBtn.addEventListener('click', function () {
            this.model.removeCard({ cardId });
            modal.classList.add('none');
            removeCardModal.classList.add('none');
        }.bind(this))
        removeCancelBtn.addEventListener('click', () => {
            modal.classList.add('none');
            removeCardModal.classList.add('none');
        })
    }
    // remove card
    async removeCard(){
        const { } = await this.model.getInitialData();
        const removeBtn = _dom.queryAll('.htop-remove');
        removeBtn.forEach(element => {
            element.addEventListener('click', this.removeCardHandler.bind(this));
        });
    }

    init() {
        this.addNewCard();
        this.removeCard();
    }
}

export default ColumnView;