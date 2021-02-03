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
    res.json({tasks:data});
});

app.post('/kanban',async (req, res) =>{
    const {sectionID,title,author}=req.body;
    await db.insertTodo({sectionID,title,author});
    const data=await db.findAll(sectionID);
    
    const time=Date.now();
    await db.insertActivity({sectionID,title,author,action:"add",time});

    res.json({tasks:data,time});
});

app.put('/kanban',async (req, res) =>{
    const {sectionID,id,title,author,newTitle}=req.body;
    await db.updateTodo({sectionID,id,newTitle});
    const data=await db.findAll(sectionID);

    const time=Date.now();
    await db.insertActivity({sectionID,title,author,action:"update",newTitle,time});

    res.json({tasks:data,time});
});

app.delete('/kanban',async (req, res) =>{
    const {sectionID,id,title,author}=req.body;    
    await db.deleteTodo(id);
    const data=await db.findAll(sectionID);
    
    const time=Date.now();
    await db.insertActivity({sectionID,title,author,action:"delete",time});
    
    res.json({tasks:data,time});
});

app.get('/activities', async(req, res) =>{
    const data=await db.findAllActivities(req.query.sectionID);
    res.json({tasks:data});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})