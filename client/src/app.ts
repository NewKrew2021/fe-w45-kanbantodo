/*
    app.ts <entry point>
*/
import ListView from 'client/views/ListView';
import TodoModel from 'client/models/TodoModel';
import InputView from 'client/views/InputView';
import ModalView from 'client/views/ModalView';
import MenuView from 'client/views/MenuView';

// model, Subject
const todoModel = new TodoModel('http://localhost:5000/posts');

// Observer
const listview = new ListView(todoModel);
listview.init();

const inputview = new InputView(todoModel);
inputview.init();


const modalview = new ModalView(todoModel);
modalview.init();

const [MENU_SPEED, MENU_WIDTH] = ["500ms", "400px"];
const menuObj = {
    model: todoModel, speed: MENU_SPEED, width: MENU_WIDTH
}
const menuview = new MenuView(menuObj);
menuview.init();