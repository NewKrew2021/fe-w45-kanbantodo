import API from "../utils/api";
import ModalView from "../view/ModalView";

class TodoModel {
    constructor() {
        this.notify = this.notify.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.init();
    }

    init (){
        this.observers = new Set();
    }
    
    async getData() {
        const { data } = await API.getTodoData();
        this.state = {data}
        this.notify(data);
    }

    async setInitialState() {        
    }


    notify(data){
        this.observers.forEach((subscriber) => {
            subscriber(data);
        })
    }
    subscribe(observer) {
        this.observers.add(observer);
    }

    addColumn() {
        const modal = new ModalView({
            id: "column-add-modal",
            title:"Add new column",
            buttonText:["Add column"],
            showInputLabel: true,
            labelName: 'Column name',
            onClickButton: [async (value) => {
                await API.createNewColumn(value);
                const { data } = await API.getTodoData();
                this.notify(data);
            }]
        })
        modal.init();
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
            const newData = { id, title, notes: filteredNotes};
            return newData;
        });
        this.notify(filteredData);
    }
}

export default TodoModel;