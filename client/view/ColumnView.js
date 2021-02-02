import NoteView from "./NoteView";

class ColumnView {
    constructor() {
    }
    
    init() {
    }
    
    addColumnViewEventListener(id) {
        const columnEle = document.getElementById(id);
        const showAddButton = columnEle.querySelector('.column__header .add-button');
        const AddCancelButton = columnEle.querySelector('.note-add .cancel-button')
        this.createView = columnEle.querySelector('.note-add');
        showAddButton.addEventListener('click', this.onClickAddButton.bind(this));
        AddCancelButton.addEventListener('click', this.onClickNoteCancelButton.bind(this));
    }

    onClickAddButton () {
        if (this.createView.classList.contains('hidden')) {
            this.createView.classList.remove('hidden');
        }
    }

    onClickNoteCancelButton() {
        this.createView.querySelector('textarea').value = '';
        this.createView.classList.add('hidden')
    }
    
    createColumnElement({notes, title, id}) {
        const columnEle = document.createElement('div');
        columnEle.className = "column";
        columnEle.id = id;
        columnEle.appendChild(this.renderColumnHeader(notes.length, title))
        columnEle.appendChild(this.renderCreateView())
        columnEle.appendChild(this.renderNotes(notes));
        const container = document.querySelector('.container');
        const addColumnEle = container.querySelector('.add-column');
        container.insertBefore(columnEle, addColumnEle);
        this.addColumnViewEventListener(id);
    }

    updateColumnElement({notes, title, id}, columnEle) {
        columnEle.innerHTML = '';
        columnEle.appendChild(this.renderColumnHeader(notes.length, title))
        columnEle.appendChild(this.renderCreateView())
        columnEle.appendChild(this.renderNotes(notes));
        this.addColumnViewEventListener(id);
    }

    // TODO : initial render와 구분하기
    render(colData) {
        const {id} = colData;
        const columnEle = document.getElementById(id);
        if (columnEle) {
            this.updateColumnElement(colData, columnEle);
        } else{
            this.createColumnElement(colData);
        }
    }

    renderColumnHeader(noteNum, title) {
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