import * as dom from '../src/util';

/*
    ModalView.js
    모달이 표시되어야 하는 뷰와 관련된 이벤트, 핸들러 등록
*/
class ModalView {
    constructor(model){
        this.model = model;
    }

    // remove Note Item
    async removeNote(){
        const { } = await this.model.getInitialData();
        const noteItems = dom.queryAll('.list-remove'); // 노트 삭제 버튼
        noteItems.forEach(element => {
            element.addEventListener('click', (e)=>console.log(e.target));
        });
    }

    addNewCardHandler(){
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-new-card')],
            className: 'none'
        })
    }

    async addNewCard(){
        const { } = await this.model.getInitialData();
        const addArea = dom.query('.card-new');
        addArea.addEventListener('click', this.addNewCardHandler.bind(this));
    }

    editCardHandler(e){
        const cardId = e.target.getAttribute('data');
        // modal open
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
            className: 'none'
        })
        dom.html(dom.query('.modal-edit-header-title'), "카드 제목 수정하기");  
    }
    async editCardTitle(){
        const { } = await this.model.getInitialData();
        const cardNames = dom.queryAll('.card-name');
        cardNames.forEach(element => {
            element.addEventListener('dblclick', this.editCardHandler.bind(this));
        })
    }

    editNoteHandler(e){
        const cardId = e.target.getAttribute('data');
        const id = e.target.getAttribute('data-idx');
        // modal open
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
            className: 'none'
        })
        dom.html(dom.query('.modal-edit-header-title'), "노트 제목 수정하기");        
    }
    async editNoteTitle(){
        const { } = await this.model.getInitialData();
        const noteTitles = dom.queryAll('.list-title');
        noteTitles.forEach(element => {
            element.addEventListener('dblclick', this.editNoteHandler.bind(this));
        })
    }

    // close btn event
    closeEditModal(){
        const closeBtn = dom.query('.btn-edit-close-modal');
        closeBtn.addEventListener('click', ()=>{
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
                className: 'none'
            })
        });
    }
    closeNewCardModal(){
        const closeBtn = dom.query('.btn-new-close-modal');
        closeBtn.addEventListener('click', ()=>{
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
                className: 'none'
            })
        });
    }
    closeRemoveCardModal(){
        const closeBtn = dom.query('.btn-card-close');
        closeBtn.addEventListener('click', ()=>{
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-card-remove')],
                className: 'none'
            })
        });
    }
    closeRemoveNoteModal(){
        const closeBtn = dom.query('.btn-close-modal');
        closeBtn.addEventListener('click', ()=>{
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-remove')],
                className: 'none'
            })
        });
    }

    updateEvent(){

    }

    init(){
        this.removeNote();
        this.editCardTitle();
        this.editNoteTitle();
        this.closeEditModal();
        this.addNewCard();
    }
}
export default ModalView;