import TodoModel from 'client/models/TodoModel';
import * as dom from '../src/util';
/*
    ModalView.js
    모달이 표시되어야 하는 뷰와 관련된 이벤트, 핸들러 등록
*/
class ModalView {
    model : TodoModel
    constructor(model : TodoModel){
        this.model = model;
        this.model.subscribe(this.update.bind(this))
    }

    update(){
        this.removeNote();
        this.removeCard();
        this.editCardTitle();
        this.editNoteTitle();
        this.closeEditModal();
        this.closeNewCardModal();
        this.closeRemoveCardModal();
        this.closeRemoveNoteModal();
        this.addNewCard();
    }

    // remove note
    removeNoteItem(){
        const acceptBtn = dom.query('.btn-accept-modal');
        acceptBtn.addEventListener('click', ()=>{
            const cardId : string = this.model.state.cardId;
            const id = this.model.state.id;
            const cardName = dom.getCardName({cardId});
            const noteName = dom.getNoteTitle({cardId, id});
            const listViews = dom.queryAll('.list-view');
            let target;       
            listViews.forEach(element=>{
                if (element.getAttribute('data') === cardId &&
                        element.getAttribute('data-idx') === id){
                            target = element;
                    }
            })
            this.model.removeTodo({ cardId, id });
            dom.addClass({
                nodeList: [
                    dom.query('.modal'), dom.query('.modal-remove'), target
                ],
                className: 'none'
            })
            const historyState = {
                cardName: cardName, beforeTitle: '',
                afterTitle: noteName, writeTime : Date.now(),
                action: 'REMOVE_NOTE'
            }
            this.model.setHistoryState(historyState);
            this.model.addHistory({input : historyState});
        });
    }
    setRemoveNoteHandler(e : Event){
        const cardId = (e.target as Element).getAttribute('data');
        const id = (e.target as Element).getAttribute('data-idx');
        this.model.setModalState({cardId, id});
        // remove-note modal open
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-remove')],
            className: 'none'
        })
    }
    async removeNote(){
        const {} = await this.model.getInitialData();
        const removeBtn = dom.queryAll('.list-remove'); // 노트 삭제 버튼
        removeBtn.forEach(element => {
            element.addEventListener('click', this.setRemoveNoteHandler.bind(this));
        });
    }

    // remove card
    removeCardItem(){
        const acceptBtn = dom.query('.btn-card-accept');
        acceptBtn.addEventListener('click', function(){
            const cardId = this.model.state.cardId;
            const cards = dom.queryAll('.card');
            const cardName = dom.getCardName({cardId});
            let target;       
            cards.forEach(element=>{
                if (element.getAttribute('data') === cardId){
                    target = element;
                }
            })
            this.model.removeCard({ cardId });
            dom.addClass({
                nodeList: [
                    dom.query('.modal'), dom.query('.modal-card-remove'), target
                ],
                className: 'none'
            })
            const historyState = {
                cardName: cardName, beforeTitle: '',
                afterTitle: '', writeTime : Date.now(),
                action: 'REMOVE_CARD'
            }
            this.model.setHistoryState(historyState);
            this.model.addHistory({input : historyState});
        }.bind(this));
    }
    setRemoveCardHandler(e){
        const cardId = e.target.getAttribute('data');
        const id = e.target.getAttribute('data-idx');
        this.model.setModalState({cardId, id});
        // remove-card modal open
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-card-remove')],
            className: 'none'
        })
    }
    async removeCard(){
        const {} = await this.model.getInitialData();
        const removeBtn = dom.queryAll('.htop-remove'); // 카드 삭제 버튼
        removeBtn.forEach(element => {
            element.addEventListener('click', this.setRemoveCardHandler.bind(this));
        });
    }

    // add card
    addNewCardHandler(){
        const modalInput = dom.query('.modal-new-input');
        const writeBtn = dom.query('.btn-write-modal');
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-new-card')],
            className: 'none'
        })
        writeBtn.addEventListener('click', function(){
            const name = modalInput.value;
            this.model.addCard({name: name, author: "roddy.chan"});
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-new-card')],
                className: 'none'
            })
            modalInput.value = '';
            const historyState = {
                cardName: name, beforeTitle: '',
                afterTitle: '', writeTime : Date.now(),
                action: 'ADD_CARD'
            }
            this.model.setHistoryState(historyState);
            this.model.addHistory({input : historyState});
        }.bind(this))
    }
    async addNewCard(){
        const { } = await this.model.getInitialData();
        const addArea = dom.query('.card-new');
        addArea.addEventListener('click', this.addNewCardHandler.bind(this));
    }

    // edit card
    editCardHandler(e){
        const cardId = e.target.getAttribute('data');
        const cardName = dom.getCardName({cardId});
        const modalInput = dom.query('.modal-edit-input');
        const saveBtn = dom.query('.btn-save-modal');
        // modal open
        dom.removeClass({
            nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
            className: 'none'
        })
        dom.html(dom.query('.modal-edit-header-title'), "카드 제목 수정하기");  
        saveBtn.addEventListener('click', function(){
            const newTitle = modalInput.value;
            const input = { input: { title: newTitle } };
            this.model.editTodo({cardId, input},'card');

            const historyState = {
                cardName: cardName, beforeTitle: '',
                afterTitle: newTitle, writeTime : Date.now(),
                action: 'EDIT_CARD'
            }
            this.model.setHistoryState(historyState);
            this.model.addHistory({input : historyState});
            modalInput.value = '';
            dom.addClass({
                nodeList: [dom.query('.modal'), dom.query('.modal-edit')],
                className: 'none'
            })
        }.bind(this))
    }
    async editCardTitle(){
        const { } = await this.model.getInitialData();
        const cardNames = dom.queryAll('.card-name');
        cardNames.forEach(element => {
            element.addEventListener('dblclick', this.editCardHandler.bind(this));
        })
    }

    // edit note
    editNoteHandler(e){
        const cardId = e.target.getAttribute('data');
        const id = e.target.getAttribute('data-idx');
        const cardName = dom.getCardName({cardId});
        const noteName = dom.getNoteTitle({cardId, id});
        const modalInput = dom.query('.modal-edit-input');
        const saveBtn = dom.query('.btn-save-note-modal');
        // modal open
        dom.addClass({
            nodeList: [dom.query('.btn-save-modal')],
            className: 'none'
        })
        dom.removeClass({
            nodeList: [dom.query('.modal'), saveBtn, dom.query('.modal-edit')],
            className: 'none'
        })
        dom.html(dom.query('.modal-edit-header-title'), "노트 제목 수정하기");   
        saveBtn.addEventListener('click', function(){
            const newTitle = modalInput.value;
            const input = { input: { title: newTitle } };
            this.model.editTodo({cardId, id, input},'note');

            const historyState = {
                cardName: cardName, beforeTitle: noteName,
                afterTitle: newTitle, writeTime : Date.now(),
                action: 'EDIT_NOTE'
            }
            this.model.setHistoryState(historyState);
            this.model.addHistory({input : historyState});
            modalInput.value = '';
            dom.addClass({
                nodeList: [dom.query('.modal'), saveBtn, dom.query('.modal-edit')],
                className: 'none'
            })
            dom.removeClass({
                nodeList: [dom.query('.btn-save-modal')],
                className: 'none'
            })
        }.bind(this))     
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
                nodeList: [dom.query('.modal'), dom.query('.modal-new-card')],
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

    init(){
        this.removeNote();
        this.editCardTitle();
        this.editNoteTitle();
        this.closeEditModal();
        this.closeNewCardModal();
        this.closeRemoveCardModal();
        this.closeRemoveNoteModal();
        this.addNewCard();
        this.removeNoteItem();
        this.removeCard();
        this.removeCardItem();
    }
}
export default ModalView;