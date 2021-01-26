const express = require('express');
let bodyParser = require('body-parser');
const db = require('./db/mongoDB');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public/dist'));

app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});


app.get('/todos', async(req, res) =>{
    const data=await db.findAll();
    res.json({todos:data});
});

app.post('/todos',async (req, res) =>{
    const body=req.body;
    const title=body.title;
    const author=body.author;
    await db.insertTodo({title:title,author:author});
    const data=await db.findAll();
    res.json({todos:data});
});

app.put('/todos',async (req, res) =>{
    const body=req.body;
    const title=body.title;
    const id=body.id;
    await db.updateTodo({id:id,title:title});
    const data=await db.findAll();
    res.json({todos:data});
});

app.delete('/todos',async (req, res) =>{
    const body=req.body;
    const id=body.id;
    await db.deleteTodo(id);
    const data=await db.findAll();
    res.json({todos:data});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})