/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView.js';
import TodoModel from '../models/TodoModel.js';
import * as _dom from './util.js';
import InputView from '../views/InputView.js';
import ListModalView from '../views/listModalView.js';
import ListModalModel from '../models/ListModalModel.js';
import ColumnView from '../views/columnView.js';

// model, Subject
const todoModel = new TodoModel('http://localhost:5000/posts');
const listmodalModel = new ListModalModel();

//debugger;

// Observer
const listview = new ListView(todoModel);
listview.init();

const inputview = new InputView(todoModel);
inputview.init();

//listModalModel
const listmodalview = new ListModalView(listmodalModel);
listmodalview.init();

const columnview = new ColumnView(todoModel);
columnview.init();