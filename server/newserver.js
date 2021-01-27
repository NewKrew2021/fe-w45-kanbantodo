const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const adapter = new FileSync('db.json');
const db = low(adapter);

// listview item 1개 추가
app.post('/add', (req, res) => {
    const data = req.body.data;
    db.get('posts')
        .push(data)
        .write();
    res.status(200).send('Post request to the homepage');
})

// Get All Data
app.get('/posts', (req, res) => {
    res.send( db.get('posts').value() )
})

// [+] 전체 큰 카드를 추가할 때(= 새로운 column 추가)
// input : { id:_, name:_, author:_} 형태의 data 받고 추가
app.post('/addcard', (req, res)=>{
    const {id, name, author} = req.body.input;
    if(db.get('posts').find(id)){
        res.send('Card registration failed')
    } else {
        db.get('posts')
          .push({ id: id, name : name, author: author, data : []})
          .write()
        res.send('Card registered successfully!')
    }
})

// [+] 특정 카드 -> 리스트뷰 아이템을 추가할 때
// main cardId -> 리스트 아이템 listId 에 추가
// input : {cardId:_, listId:_, title:_} 형태의 data 받고 추가
app.post('/addlist', (req, res) => {
    const { cardId, listId, title } = req.body.input;
    if(db.get('posts').find({ id: cardId })){
        db.get('posts')
          .find({ id: cardId })
          .get('data')
          .push({ id: listId, title : title, tasks: []})
          .write()
        res.send('list registered successfully');
    }
    else{
        res.send('list registration failed');
    }
})

// [+] 특정 카드 -> 리스트뷰 아이템 -> 내부에 task를 추가할 때
// main cardId -> 리스트 아이템 listId -> task itemId 에 추가
// input : { cardId:_, listId:_, taskId:_, title:_ } 형태의 data 받고 추가
app.post('/addtask', (req, res) => {
    const { cardId, listId, taskId, title } = req.body.input;
    db.get('posts')
        .find({ id: cardId })
        .get('data')
        .find({ id: listId })
        .get('tasks')
        .push({ id: taskId, title: title })
        .write()
    res.send('Task registered successfully!')
})

// [-] 특정 카드 -> 리스트뷰 아이템을 삭제할 때
app.delete('/list/remove/:cardId/:id', (req, res) => {
    const { cardId, id } = req.params;
    const i_cardId = parseInt(cardId);
    const i_id = parseInt(id);
    db.get('posts')
      .find({ id: i_cardId })
      .get('data')
      .remove({ id: i_id })
      .write()
    res.send('list removed successfully!');
})

app.listen(port, () => {
    console.log(`DB Server is running on ${port}`);
});