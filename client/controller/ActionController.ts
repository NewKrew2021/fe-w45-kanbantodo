import ActionModel from "../model/ActionModel";
import ActionView from "../view/ActionView";

class ActionController {
    model: ActionModel;
    view: ActionView;
    constructor(view: ActionView, model: ActionModel){
        this.model = model;
        this.view = view;
    }
    init() {
        this.model.subscribe(this.view.render);
    }
    addColumn(title: string) {
        const newHistory = `@nina added the column ${title}`;
        this.model.addActionHistory(newHistory);
    }
    deleteColumn(title: string) {
        const newHistory = `@nina deleted the column ${title}`;
        this.model.addActionHistory(newHistory);
    }
    editColumn(title: string, newTitle: string) {
        const newHistory = `@nina updated the column ${title} to ${newTitle}`;
        this.model.addActionHistory(newHistory);
    }
    addNote(title: string, columnName: string) {
        const newHistory = `@nina added ${title} to ${columnName}`;
        this.model.addActionHistory(newHistory);
    }
    deleteNote(title: string, columnName: string) {
        const newHistory = `@nina deleted ${title} to ${columnName}`;
        this.model.addActionHistory(newHistory);
    }
}

export default ActionController;