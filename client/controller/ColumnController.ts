import ColumnModel from "../model/ColumnModel";
import { ColumnData } from "../utils/types";
import ColumnView from "../view/ColumnView";

interface ColumnController {
    model: ColumnModel;
    view: ColumnView;
}

class ColumnController {
    constructor(view: ColumnView, model: ColumnModel) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.model.subscribe((data: ColumnData) => {
            this.renderView(data);
            this.onEvents(data);
        })
    }

    renderView(data: ColumnData){
        this.view.render(data);
    }

    onEvents({id}: ColumnData) {
        const columnEle = document.getElementById(id);
        if (columnEle) {
            const noteAddButton = columnEle.querySelector('.note-add .add-button')
            const columnTitleEle = columnEle.querySelector('.column__header__text > .title');

            noteAddButton && noteAddButton.addEventListener('click', this.model.addNote);
            columnTitleEle && columnTitleEle.addEventListener('dblclick', this.model.showEditColumnModal);
            columnEle.addEventListener('click', this.model.showDeleteNoteModal)
        }

    }
}

export default ColumnController;