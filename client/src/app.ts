/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView';
import TodoModel from '../models/TodoModel';
import * as _dom from './util';
import InputView from '../views/InputView';
import ModalView from '../views/ModalView';
import MenuView from '../views/menuView';

// model, Subject
const todoModel = new TodoModel('http://localhost:5000/posts');

//debugger;

// Observer
const listview = new ListView(todoModel);
listview.init();

const inputview = new InputView(todoModel);
inputview.init();

const modalview = new ModalView(todoModel);
modalview.init();

const MENU_SPEED = "500ms";
const MENU_WIDTH = "370px";
const menuview = new MenuView({ model: todoModel, speed: MENU_SPEED, width: MENU_WIDTH });
menuview.init();