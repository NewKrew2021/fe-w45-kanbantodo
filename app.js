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


app.get('/kanban', async(req, res) =>{
    const data=await db.findAll(req.query.sectionID);
    res.json({todos:data});
});

app.post('/kanban',async (req, res) =>{
    const {sectionID,title,author}=req.body;
    await db.insertTodo({sectionID,title,author});
    const data=await db.findAll(sectionID);
    res.json({todos:data});
});

app.put('/kanban',async (req, res) =>{
    const {sectionID,id,title}=req.body;
    await db.updateTodo({sectionID,id,title});
    const data=await db.findAll(sectionID);
    res.json({todos:data});
});

app.delete('/kanban',async (req, res) =>{
    const {sectionID,id}=req.body;    
    await db.deleteTodo(id);
    const data=await db.findAll(sectionID);
    res.json({todos:data});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})