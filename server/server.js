const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Get todos
app.get('/todos', (req, res) => {
  res.send({data: db.get('todos').value()})
})

// Get column
app.get('/column/:id', (req, res) => {
  const {id} = req.params;
  res.send({data:db.get('todos').find({id}).value()})
})

// Create new column
app.post('/column', (req, res) =>{
  const {id, title} = req.body.data;
  if (db.get('todos').find({id})) {
    res.status(404).jsonp("Duplicated ID");
  } else {
    db.get('todos')
      .push({ id, title, notes: []})
      .write();
    res.status(200).jsonp("Success");
  }
})

// Delete column
app.delete('/column/:id', (req, res) => {
  const {id} = req.params;
  db.get('todos').remove({ id }).write()
})

// Create new note
app.post('/note/:colId', (req, res) => {
  const {colId} = req.params;
  const {title} = req.body.data;
  if (db.get('todos').find({id: colId})) {
    db.get('todos')
      .find({id: colId}).get('notes')
      .push({id: Date.now(), title}).write();
  }
})

app.listen(port, function(){
 console.log(`Server is running on ${port}port`);
});


// server.use(router);

// server.listen(5000, () => {
//   console.log('JSON Server is running')
// });
