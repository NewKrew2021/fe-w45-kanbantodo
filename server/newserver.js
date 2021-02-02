const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
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
    res.send(db.get('posts').value())
})

// [+] 전체 큰 카드를 추가할 때(= 새로운 column 추가)
// input : { id:_, name:_, author:_} 형태의 data 받고 추가
app.post('/addcard', (req, res) => {
    const { id, name, author } = req.body.input;
    if (db.get('posts').find({ id: id }).value()) {
        res.send('Card registration failed')
    } else {
        db.get('posts')
            .push({ id: id, name: name, author: author, data: [] })
            .write()
        res.send('Card registered successfully!')
    }
})

// [+] 특정 카드 -> 리스트뷰 아이템을 추가할 때
// main cardId -> 리스트 아이템 listId 에 추가
// input : {cardId:_, listId:_, title:_} 형태의 data 받고 추가
app.post('/addlist', (req, res) => {
    const { cardId, listId, title } = req.body.input;
    if (db.get('posts').find({ id: cardId }).value()) {
        db.get('posts')
            .find({ id: cardId })
            .get('data')
            .push({ id: listId, title: title, tasks: [] })
            .write()
        res.send('list registered successfully');
    }
    else {
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

// [-] 특정 카드를 삭제할 때
app.delete('/list/remove/:cardId', (req, res) => {
    const { cardId } = req.params;
    db.get('posts')
        .remove({ id: parseInt(cardId) })
        .write()
    res.send('list removed successfully!');
})

// [-] 특정 카드 -> 리스트뷰 아이템을 삭제할 때
app.delete('/list/remove/:cardId/:id', (req, res) => {
    const { cardId, id } = req.params;
    db.get('posts')
        .find({ id: parseInt(cardId) })
        .get('data')
        .remove({ id: parseInt(id) })
        .write()
    res.send('list removed successfully!');
})

// [*] 특정 카드 타이틀을 수정할 때
app.put('/list/edit/:cardId', (req, res) => {
    const { cardId } = req.params;
    const { title } = req.body.input;
    db.get('posts')
        .find({ id: parseInt(cardId) })
        .assign({ name: title })
        .write()
    res.send('list removed successfully!');
})

// [*] 특정 카드 -> 리스트뷰 아이템을 수정할 때
app.put('/list/edit/:cardId/:id', (req, res) => {
    const { cardId, id } = req.params;
    const { title } = req.body.input;
    db.get('posts')
        .find({ id: parseInt(cardId) })
        .get('data')
        .find({ id: parseInt(id) })
        .assign({ title: title })
        .write()
    res.send('list removed successfully!');
})

// [+] 히스토리에 사용자 액션을 등록할 때
app.post('/addHistory', (req, res) => {
    const { action, cardName,
        beforeTitle, afterTitle, writeTime } = req.body.input;
    db.get('history')
        .push({
            action: action, cardName: cardName,
            beforeTitle: beforeTitle, afterTitle: afterTitle,
            writeTime: writeTime
        })
        .write()
    res.send('Card registered successfully!')
})

app.get('/getHistory', (req, res) => {
    res.send(db.get('history').value())
})

app.listen(port, () => {
    console.log(`DB Server is running on ${port}`);
});