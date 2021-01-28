
import API from "../utils/api";
import ModalView from "./ModalView";
import NoteView from "./NoteView";

class ColumnView {
    constructor({id, title, notes}) {
        this.id = id;
        this.title = title;
        this.noteData = notes;
        this.noteNum = notes.length;
        this.columnEle = undefined;
        this.createNoteView = undefined;
        this.updateNote = this.updateNote.bind(this);
    }
    
    async init() {
        this.render(this.noteData);
        const addButton = this.columnEle.querySelector('.column__header .add-button');
        addButton.addEventListener('click', this.onClickAddButton.bind(this));
        const noteAddButton = this.columnEle.querySelector('.note-add .add-button')
        const noteCancelButton = this.columnEle.querySelector('.note-add .cancel-button')
        noteAddButton.addEventListener('click', this.onClickNoteAddButton.bind(this));
        noteCancelButton.addEventListener('click', this.onClickNoteCancelButton.bind(this));
        const columnDeleteButton = this.columnEle.querySelector('.column__header__buttons > .remove-button')
        columnDeleteButton.addEventListener('click', this.onClickColumnDeleteButton.bind(this));
        const columnTitleEle = this.columnEle.querySelector('.column__header__text > .title');
        columnTitleEle.addEventListener('dblclick', this.onDblclickColumnTitle.bind(this));
    }

    onDblclickColumnTitle(e) {
        const modal = new ModalView({
            id: 'edit-col-name'+ this.id.toString(),
            title: 'Edit column title',
            buttonText: ['Edit'],
            showInputLabel: true,
            labelName: 'Column name',
            defaultValue: this.title,
            onClickButton: [async (value) => {
                await API.updateColumn(this.id, value);
                this.updateColumnTitle(value);
            }]
        })

    }

    onClickNoteDeleteButton(e) {
        const button = e.target.closest('.delete-button')
        if(button) {
            const deleteId = button.closest('li').id;
            const modal = new ModalView({
                id: 'deleteNote' + deleteId.toString(),
                title: 'Really?',
                buttonText: ['Delete'],
                onClickButton: [() => {this.deleteNote(deleteId)}]
            });
            modal.show();
        }
    }
    
    async deleteNote(deleteId) {
        try {
            await API.deleteNote(this.id, deleteId);
            this.getUpdatedData();
        } catch (err) {
            console.log(err)
        }
    }

    onClickColumnDeleteButton(e) {
        const modal = new ModalView({
            id: 'deleteColumn'+this.id.toString(),
            title: 'Really?',
            buttonText: ['Delete'],
            renderContent: () => {return '';},
            onClickButton: [() => {this.deleteColumn()}]
        });
        modal.show();
        // update dom
    }
    
    async deleteColumn() {
        await API.deleteColumn(this.id);
        this.columnEle.remove();
    }

    onClickAddButton () {
        if (this.createNoteView.classList.contains('hidden')) {
            this.createNoteView.classList.remove('hidden');
        }
    }

    async onClickNoteAddButton() {
        const {value} = this.columnEle.querySelector('.note-add textarea');
        try{
            await API.createNewNote(this.id, {data: {title: value}});
        } catch(err) {
            console.log(err)
        }
        this.getUpdatedData();
        this.createNoteView.querySelector('textarea').value = '';
        this.createNoteView.classList.add('hidden')
    }

    async getUpdatedData () {   
        const updatedNoteData = await API.getColumnData(this.id);
        // TODO: change to subscribe - notify
        this.updateNote(updatedNoteData.data.notes);
    }

    onClickNoteCancelButton() {
        this.createNoteView.querySelector('textarea').value = '';
        this.createNoteView.classList.add('hidden')
    }

    updateNote(noteData) {
        const noteNum = noteData.length;
        this.columnEle.querySelector('.column__header__text > .number').innerText = noteNum;
        const currNotes = this.columnEle.querySelector('.column__note-container');
        this.columnEle.removeChild(currNotes);
        this.columnEle.appendChild(this.renderNotes(noteData));
    }

    updateColumnTitle(title) {
        this.columnEle.querySelector('.column__header__text > .title').innerText = title;
    }
    
    render(noteData) {
        const noteNum = noteData.length;
        this.columnEle = document.createElement('div');
        this.columnEle.className = "column";
        this.columnEle.id = this.id;
        this.columnEle.appendChild(this.renderColumnHeader({noteNum, title: this.title}))
        this.columnEle.appendChild(this.renderCreateView())
        this.columnEle.appendChild(this.renderNotes(noteData));
        const container = document.querySelector('.container');
        container.appendChild(this.columnEle);
    }

    renderColumnHeader({noteNum, title}) {
        const ele = document.createElement('div');
        const innerHtml = `<div class="column__header__text">
            <div class="number">${noteNum}</div>
            <div class="title">${title}</div>
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
        ele.addEventListener('click', this.onClickNoteDeleteButton.bind(this))

        return ele;
    }
}
export default ColumnView;