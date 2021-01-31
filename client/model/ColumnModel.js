import API from "../utils/api";
import Observable from "../utils/Observable";
import ModalView from "../view/ModalView";

class ColumnModel extends Observable{
    constructor(data) {
        super();
        this.addNote = this.addNote.bind(this);
        this.editColumn = this.editColumn.bind(this);
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
            createView.classList.add('hidden');
        } catch(err) {
            console.log(err)
        }
    }
    
    editColumn() {
        const {id} = this.state.data;
        const modal = new ModalView({
            id: 'edit-col-name'+ id.toString(),
            title: 'Edit column title',
            buttonText: ['Edit'],
            showInputLabel: true,
            labelName: 'Column name',
            defaultValue: this.title,
            onClickButton: [async (value) => {
                await API.updateColumn(id, value);
                const {data} = await API.getColumnData(id);
                this.state.data = data;
                this.notify(data);
            }]
        })
        modal.init();
    }
        
    deleteNote(e) {
        const button = e.target.closest('.delete-button')
        if(button) {
            const {id} = this.state.data;
            const deleteId = button.closest('li').id;
            const modal = new ModalView({
                id: 'deleteNote' + deleteId.toString(),
                title: 'Really?',
                buttonText: ['Delete'],
                onClickButton: [async () => {
                    try {
                        await API.deleteNote(id, deleteId);
                        const {data} = await API.getColumnData(id);
                        this.state.data = data;
                        this.notify(data);
                    } catch (err) {
                        console.log(err)
                    }            
                }]
            });
            modal.init();
        }
    }
}

export default ColumnModel;