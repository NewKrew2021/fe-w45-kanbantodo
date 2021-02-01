import API from "../utils/api";
import Observable from "../utils/Observable";
import ModalView from "../view/ModalView";
import logger from "./ActionModel";

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
        const { data } = await API.getTodoData();
        this.state = {data}
        this.notify(data);
    }

    async setInitialState() {        
    }
 
    async addColumn(value) {
        await API.createNewColumn(value);
        const { data } = await API.getTodoData();
        this.state = {data};
        this.notify(data);
        logger.addColumn(value);
    }    

    async deleteColumn(id) {
        await API.deleteColumn(id);
        logger.deleteColumn(
            this.state.data.find(
                (val) => {
                    return val.id === id;
                }).title);
        const { data } = await API.getTodoData();
        this.state = { data }
        this.notify(data);
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

    showDeleteColumnModal({target}) {
        const id = target.closest('.column').id;
        const modal = new ModalView({
            id: 'deleteColumn' + id.toString(),
            title: 'Really?',
            buttonText: ['Delete'],
            renderContent: () => {return '';},
            onClickButton: [() => this.deleteColumn(id)]
        });
    }

    /**
     * input이 변할 때 
     */
    onChangeFilter(e) {
        const { value } = e.target;
        const filteredData = this.state.data.map((data)=>{
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