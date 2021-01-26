
import API from "../utils/api";
import NoteView from "./NoteView";

class ColumnView {
    constructor({id, title, notes}) {
        this.id = id;
        this.title = title;
        this.noteData = notes;
        this.noteNum = notes.length;
        this.columnEle = undefined;
        this.createNoteView = undefined;
    }
    
    async init() {
        this.render(this.noteData);
        const createNoteButton = this.columnEle.querySelector('.column__header .add-button');
        createNoteButton.addEventListener('click', this.onClickCreateNoteButton.bind(this));
        const createNoteAddButton = this.columnEle.querySelector('.note-add .add-button')
        const createNoteCancelButton = this.columnEle.querySelector('.note-add .cancel-button')
        createNoteAddButton.addEventListener('click', this.onClickCreateNoteAddButton.bind(this));
        createNoteCancelButton.addEventListener('click', this.onClickCreateNoteCancelButton.bind(this));
    }

    onClickCreateNoteButton () {
        if (this.createNoteView.classList.contains('hidden')) {
            this.createNoteView.classList.remove('hidden');
        }
    }

    onClickCreateNoteAddButton() {
        this.getUpdatedData();
        this.createNoteView.classList.add('hidden')
    }
    
    async getUpdatedData () {   
        const {value} = this.columnEle.querySelector('.note-add textarea');
        await API.createNewNote(this.id, {data: {title: value}});
        const updatedNoteData = await API.getColumnData(this.id);
        console.log(updatedNoteData)
        // TODO: change to subscribe - notify
        this.updateNote(updatedNoteData);
    }

    onClickCreateNoteCancelButton() {
        this.createNoteView.classList.add('hidden')
    }

    updateNote(noteData) {
        debugger;
        const currNotes = this.columnEle.querySelector('.column__note-container');
        this.columnEle.removeChild(currNotes);
        this.columnEle.appendChild(this.renderNotes(noteData));
    }
        
    render(noteData) {
        this.columnEle = document.createElement('div');
        this.columnEle.className = "column";
        this.columnEle.id = this.id;
        this.columnEle.appendChild(this.renderColumnHeader())
        this.columnEle.appendChild(this.renderCreateView())
        this.columnEle.appendChild(this.renderNotes(noteData));
        const container = document.querySelector('.container');
        container.appendChild(this.columnEle);
    }

    renderColumnHeader() {
        const ele = document.createElement('div');
        const innerHtml = `<div class="column__header__text">
            <div class="number">${this.noteNum}</div>
            <div class="title">${this.title}</div>
        </div>
        <div class="column__header__buttons">
            <div class="add-button">✛</div>
            <div class="remove-button">✕</div>
        </div>`;
        ele.className = 'column__header';
        ele.innerHTML = innerHtml;
        return ele;
    }

    renderCreateView() {
        const ele = document.createElement('div');
        ele.className = "column__note-add note-add";
        ele.classList.add('hidden');
        const innerHtml = `<div class="note-add__textarea">
                <textarea placeholder="새로운 노트를 입력하세요." type="text"></textarea>
            </div>
            <div class="note-add__buttons">
                <button class="add-button">Add</button>
                <button class="cancel-button">Cancel</button>
            </div>`
        ele.innerHTML = innerHtml;
        this.createNoteView = ele;
        return ele;
    }

    renderNotes(colData) {
        const ele = document.createElement('ul');
        ele.className = "column__note-container"
        const noteHtml = colData.reduce((acc, cur) => {
            return acc + new NoteView(cur).render();
        }, '')
        ele.innerHTML = noteHtml;
        return ele;
    }
}
export default ColumnView;