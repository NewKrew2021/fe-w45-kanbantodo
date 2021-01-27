const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));  
app.use(express.json())

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


app.get('/posts', (req, res) =>{
    res.send('GET request');
})

// Add posts(add listview item)
app.post('/add', (req, res)=>{
    const data = req.body.data;
    console.log(data);
    db.get('posts')
      .push(data)
      .write();
    res.send('Post request to the homepage');
})

app.listen(port, () => {
    console.log(`DB Server is running on ${port}`);
});