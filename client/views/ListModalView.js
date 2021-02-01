import * as _dom from '../src/util.js';

/* 모달 뷰 */
/* ListView에 있는 모달 관련 코드를 여기로 분리할 예정 */

class ListModalView {
    constructor(model) {
        this.modalView = _dom.query('.modal');
        this.removeModal = _dom.query('.modal-remove'); // 삭제 모달
        this.editModal = _dom.query('.modal-edit'); // 수정 모달
        this.modalSaveBtn = _dom.query('.btn-save-modal'); // 카드 제목 수정
        this.modalWriteBtn = _dom.query('.btn-write-modal'); // 새로운 카드 생성
        this.modalAcceptBtn = _dom.query('.btn-accept-modal'); // 예 버튼
        this.modalCloseBtn = _dom.query('.btn-close-modal'); // 아니오 버튼

        this.model = model;
        this.model.subscribe(this.update.bind(this));
    }

    update() {
        //console.log(this.model.state);
    }

    onEvents(){

    }

    // 모달이 나오는 동작들

    // remove note item
    removeNoteHandler(){

    }   
    removeNote(){

    }

    // edit note item
    async editNoteHandler(){
        const cardId = e.currentTarget.getAttribute('data');
        const id = e.currentTarget.getAttribute('data-idx');
        const modalHeader = _dom.query('.modal-header-title');
        const modalInput = _dom.query('.modal-input');
        let mode = '';
        modalInput.value = '';
        
        _dom.addClass({
            node: [this.modalWriteBtn],
            className : "none"
        });
        _dom.removeClass({
            node: [this.modal, this.editModal, this.modalSaveBtn],
            className: "none"
        });

        if (id == -1) {
            mode = 'card';
            _dom.html(modalHeader, '카드 제목 수정하기');
        }
        else {
            mode = 'list';
            _dom.html(modalHeader, '노트 제목 수정하기');
        }
        await this.model.setModalState({ cardId, id, mode });

        this.modalSaveBtn.addEventListener('click', function () {
            const newTitle = modalInput.value;
            const input = { input: { title: newTitle } };
            this.model.editTodo({ ...this.model.state, input }, this.model.state.mode);
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        }.bind(this))
    }
    async editNoteTitle(){
        const { } = await this.model.getInitialData();
        const card = _dom.queryAll('.card-header');
        const note = _dom.queryAll('.list-view');
        const closeBtn = _dom.query('.btn-edit-close-modal');
        note.forEach(element => {
            element.addEventListener('dblclick', this.editNoteHandler.bind(this));
        })
        card.forEach(element => {
            element.addEventListener('dblclick', this.editNoteHandler.bind(this));
        })
        closeBtn.addEventListener('click', () => {
            this.modalView.classList.add('none');
            this.editModalmodalView.classList.add('none');
        })
    }

    // edit card
    editCardHandler(){

    }
    editCardTitle(){

    }

    // add card
    addNewCardHandler(){

    }

    // remove card
    addNewCard(){

    }

    //
    init(){

    }

}
export default ListModalView;