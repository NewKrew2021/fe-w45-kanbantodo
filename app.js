const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const port = 3000;

const path = require('path');
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public/dist'));

app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});

//추후 mongo DB로 대체 예정
const data = [{title:"기존 할 일"}];


app.get('/todos', (req, res) =>{
    res.json({todos:data});
});

app.post('/todos', (req, res) =>{
    //추후 몽고디비 insert로 변경 예정
    const body=req.body;
    const title=body.title;
    data.push({title:title});
    res.json({todos:data});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})