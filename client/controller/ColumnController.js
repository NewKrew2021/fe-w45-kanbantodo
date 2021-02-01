class ColumnController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.model.subscribe((data) => {
            this.view.render(data);
            const columnEle = document.getElementById(data.id);
            const noteAddButton = columnEle.querySelector('.note-add .add-button')
            const columnTitleEle = columnEle.querySelector('.column__header__text > .title');

            noteAddButton.addEventListener('click', this.model.addNote);
            columnTitleEle.addEventListener('dblclick', this.model.showEditColumnModal);
            columnEle.addEventListener('click', this.model.showDeleteNoteModal)
        })
    }
}

export default ColumnController;