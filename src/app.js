/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView.js';
import TodoModel from '../models/TodoModel.js';
import * as _dom from './util.js';

// model, Subject
const todoModel = new TodoModel('http://localhost:3000/posts');

//debugger;
const listview = new ListView(todoModel);
listview.render();

// Observer