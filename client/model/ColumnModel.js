import API from "../utils/api";
import Observable from "../utils/Observable";
import ModalView from "../view/ModalView";
import logger from "./ActionModel";

class ColumnModel extends Observable{
    constructor(data) {
        super();
        this.addNote = this.addNote.bind(this);
        this.showEditColumnModal = this.showEditColumnModal.bind(this);
        this.showDeleteNoteModal = this.showDeleteNoteModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.state = { data }
    }

    async addNote() {
        const {id} = this.state.data;
        const columnEle = document.getElementById(id);
        const createView = columnEle.querySelector('.note-add');
        const {value} = columnEle.querySelector('.note-add textarea');
        try {
            await API.createNewNote(id, {data: {title: value}});
            createView.querySelector('textarea').value = '';
            const {data} = await API.getColumnData(id);
            this.state.data = data;
            this.notify(data);
            logger.addNote(value, data.title);
            createView.classList.add('hidden');
        } catch(err) {
            console.log(err)
        }
    }

    async editColumn(value) {
        const {id} = this.state.data;
        await API.updateColumn(id, value);
        const {data} = await API.getColumnData(id);
        logger.editColumn(this.state.data.title, value);
        this.state.data = data;
        this.notify(data);        
    }
    
    showEditColumnModal() {
        const {id} = this.state.data;
        const modal = new ModalView({
            id: 'edit-col-name'+ id.toString(),
            title: 'Edit column title',
            buttonText: ['Edit'],
            showInputLabel: true,
            labelName: 'Column name',
            defaultValue: this.title,
            onClickButton: [this.editColumn.bind(this)]
        })
    }

    async deleteNote(deleteId) {
        const {id} = this.state.data;
        try {
            await API.deleteNote(id, deleteId);
            const {data} = await API.getColumnData(id);
            logger.deleteNote(
                this.state.data.notes.find(
                    (val) => {
                        return val.id === deleteId
                    }).title, this.state.data.title)
            this.state.data = data;
            this.notify(data);
        } catch (err) {
            console.log(err)
        }
    }
        
    showDeleteNoteModal(e) {
        const button = e.target.closest('.delete-button')
        if(button) {
            const deleteId = button.closest('li').id;
            const modal = new ModalView({
                id: 'deleteNote' + deleteId.toString(),
                title: 'Really?',
                buttonText: ['Delete'],
                onClickButton: [() => this.deleteNote.bind(this)(deleteId)]
            });
        }
    }
}

export default ColumnModel;