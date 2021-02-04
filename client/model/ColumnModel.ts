import { ColumnData } from "../utils/types";
import API from "../utils/api";
import Observable from "../utils/Observable";
import ModalView from "../view/ModalView";
import logger from "../utils/logger";

interface ColumnModel extends Observable{
    data: ColumnData;
}

class ColumnModel extends Observable{
    constructor(data: ColumnData) {
        super();
        this.addNote = this.addNote.bind(this);
        this.showEditColumnModal = this.showEditColumnModal.bind(this);
        this.showDeleteNoteModal = this.showDeleteNoteModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.data = data;
    }

    async addNote() {
        const {id} = this.data;
        const columnEle = document.getElementById(id);
        const createView = columnEle!.querySelector('.note-add');
        const textareaView: HTMLTextAreaElement | null = columnEle!.querySelector('.note-add textarea')
        if (columnEle && createView && textareaView) {
            const {value} = textareaView;
            try {
                await API.createNewNote(id, value);
                textareaView.value = '';
                const res = await API.getColumnData(id);
                const {data} = await res.json();
                    this.data = data;
                    this.notify(this.data);
                    logger.addNote(value, data.title);
                    createView.classList.add('hidden');
            } catch(err) {
                console.log(err)
            }
        }
    }

    async editColumn(value: string) {
        const {id} = this.data;
        await API.updateColumn(id, value);
        const res = await API.getColumnData(id);
        const { data } = await res.json();
        logger.editColumn(this.data.title, value);
        this.data = data;
        this.notify(data);        
    }
    
    showEditColumnModal() {
        const {id} = this.data;
        const modal = new ModalView({
            id: 'edit-col-name'+ id.toString(),
            title: 'Edit column title',
            buttonText: ['Edit'],
            showInputLabel: true,
            labelName: 'Column name',
            defaultValue: this.data.title,
            onClickButton: [this.editColumn.bind(this)]
        })
    }

    async deleteNote(deleteId: string) {
        const {id} = this.data;
        try {
            await API.deleteNote(id, deleteId);
            const res = await API.getColumnData(id);
            const body = await res.json();
            const data = body.data;
            const deleteNoteData = this.data.notes.find((val) => {return val.id === deleteId});
            if(deleteNoteData) {
                logger.deleteNote(deleteNoteData.title, this.data.title)
                this.data = data;
                this.notify(data);
            }
        } catch (err) {
            console.error(err)
        }
    }
        
    showDeleteNoteModal({target}: Event) {
        const targetElement = target as HTMLElement
        const button = targetElement.closest('.delete-button')
        if(button) {
            const listElement = button.closest('li');
            if (listElement) {
                const deleteId = listElement.id;
                const modal = new ModalView({
                    id: 'deleteNote' + deleteId.toString(),
                    title: 'Really?',
                    buttonText: ['Delete'],
                    onClickButton: [() => this.deleteNote.bind(this)(deleteId)]
                });
            }
        }
    }
}

export default ColumnModel;