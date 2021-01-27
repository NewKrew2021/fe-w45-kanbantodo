import ColumnView from "./ColumnView";
import ModalView from "./ModalView";

const { default: API } = require("../utils/api");

class TodoView {
    constructor() {
        this.columns = [];
    }

    async init() {
        this.colData = await API.getTodoData();
        this.colData.data.forEach((data)=>{
            const columnView = new ColumnView(data);
            columnView.init();
            this.columns.push(columnView);
        })
        const addColumnEle = document.createElement('div');
        addColumnEle.innerText = 'Click to add column.';
        addColumnEle.className = 'add-column';
        document.querySelector('.container').appendChild(addColumnEle);
        addColumnEle.addEventListener('click', this.onClickAddColumn.bind(this));
        const filterEle = document.querySelector('.filter-cards > input');
        filterEle.addEventListener('input', this.onAddFilter.bind(this));
    }

    async update() {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        this.colData = await API.getTodoData();
        this.colData.data.forEach((data)=>{
            const columnView = new ColumnView(data);
            columnView.init();
            this.columns.push(columnView);
        })
        const addColumnEle = document.createElement('div');
        addColumnEle.innerText = 'Click to add column.';
        addColumnEle.className = 'add-column';
        container.appendChild(addColumnEle);
        addColumnEle.addEventListener('click', this.onClickAddColumn.bind(this));
    }
    
    onClickAddColumn() {
        if (!this.columnAddModal) {
            this.columnAddModal = new ModalView({
                id: "column-add-modal",
                title:"Add new column",
                buttonText:["Add column"],
                showInputLabel: true,
                labelName: 'Column name',
                onClickButton: [async (value) => {
                    await API.createNewColumn(value);
                    this.update();}]
            })
        }
        this.columnAddModal.show();
        // API.createNewColumn('');
    }

    /**
     * input이 변할 때 
     */
    onAddFilter(e) {
        const { value } = e.target;
        const filteredNoteData = this.colData.data.map((data)=>{
            const filteredNotes = data['notes'].filter(({title})=>{
                return title.includes(value);
            });
            return filteredNotes;
        });
        filteredNoteData.forEach((data, idx)=>{
            this.columns[idx].updateNote(data);
        });

    }
}

export default TodoView;