/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView';
import TodoModel from '../models/TodoModel';
import * as _dom from './util';
import InputView from '../views/InputView';
import ModalView from '../views/ModalView';

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