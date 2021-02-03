import API from "../utils/api";
import Observable from "../utils/Observable";
import { ColumnData } from "../utils/types";
import ModalView from "../view/ModalView";
import logger from "./ActionModel";

interface TodoModel extends Observable{
    // TODO : change to TodoData;
    data: ColumnData[];
}

class TodoModel extends Observable{
    constructor() {
        super();
        this.showAddColumnModal = this.showAddColumnModal.bind(this);
        this.showDeleteColumnModal = this.showDeleteColumnModal.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.init();
    }

    init(){
    }
    
    async getData() {
        const res = await API.getTodoData();
        const body = await res.json();
        const data = body.data;
        this.data = data
        this.notify(data);
    }

    async setInitialState() {        
    }
 
    async addColumn(value: string) {
        await API.createNewColumn(value);
        const res = await API.getTodoData();
        const body = await res.json();
        const data = body.data;
        this.data = data;
        this.notify(data);
        logger.addColumn(value);
    }    

    async deleteColumn(id: string) {
        await API.deleteColumn(id);
        const deleteColumnData = this.data.find((val) => {return val.id === id;});
        if (deleteColumnData) {
            logger.deleteColumn(deleteColumnData.title);
            const res = await API.getTodoData();
            const body = await res.json();
            const data = body.data;
            this.data = data;
            this.notify(data);
        }
    }

    showAddColumnModal() {
        const modal = new ModalView({
            id: "column-add-modal",
            title:"Add new column",
            buttonText:["Add column"],
            showInputLabel: true,
            labelName: 'Column name',
            onClickButton: [this.addColumn.bind(this)]
        })
    }

    showDeleteColumnModal({target}: Event) {
        const targetElement = target as HTMLElement;
        const closestColumnElement = targetElement!.closest('.column');

        if(closestColumnElement) {
            const id = closestColumnElement.id;
            const modal = new ModalView({
                id: 'deleteColumn' + id.toString(),
                title: 'Really?',
                buttonText: ['Delete'],
                onClickButton: [() => this.deleteColumn(id)]
            });
        }
    }

    /**
     * input이 변할 때 
     */
    onChangeFilter({target}: Event) {
        const targetInputElement = target as HTMLInputElement;
        const { value } = targetInputElement;
        const filteredData = this.data.map((data)=>{
            const filteredNotes = data['notes'].filter(({title})=>{
                return title.includes(value);
            });
            
            // TODO : object spread operator가 동작하지 않음. 에러 해결
            // const newData = { ...data, notes: filteredNotes};
            const {id, title} = data;
            return { id, title, notes: filteredNotes};
        });
        this.notify(filteredData);
    }
}

export default TodoModel;