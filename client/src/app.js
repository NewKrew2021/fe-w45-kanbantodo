/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView.js';
import TodoModel from '../models/TodoModel.js';
import * as _dom from './util.js';
import InputView from '../views/InputView.js';

// model, Subject
const todoModel = new TodoModel('http://localhost:5000/posts');

//debugger;

// Observer
const listview = new ListView(todoModel);
listview.init();

const inputview = new InputView(todoModel);
inputview.init();


///test
/*
fetch('http://localhost:5000/add', {
    "method": 'POST',
    "headers": {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        data : {
        "name": "하는중",
        "author": "chanhuiseok",
        "data": [
            {
                "title": "이번 주 기획리뷰",
                "tasks": [
                    {
                        "id": 0,
                        "title": "task1"
                    }
                ]
            }
        ]
    }
})
}).then((res) => {
    console.log(res.json())
})
*/