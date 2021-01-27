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
  const {title} = req.body.data;
  db.get('todos')
    .push({ id: Date.now().toString(), title, notes: []})
    .write();
  res.status(200).jsonp("Success");
})

// Delete column
app.delete('/column/:id', (req, res) => {
  const {id} = req.params;
  try{
    db.get('todos').remove({ id }).write();
    res.status(200)
  } catch(err) {
    console.log(err);
    res.status(400)
  }
  res.send();

})

// Create new note
app.post('/note/:colId', (req, res) => {
  const {colId} = req.params;
  const {title} = req.body.data;
  if (db.get('todos').find({id: colId})) {
    db.get('todos')
      .find({id: colId}).get('notes')
      .push({id: Date.now().toString(), title}).write();
      res.status(200);
      res.send();
  }
})

// Delete note
app.delete('/note/:colId/:noteId', (req, res) => {
  let {colId, noteId} = req.params;
  try{
    console.log(db.get('todos')
    .find({id: colId})
    .get('notes').find({id: noteId}).value())
    db.get('todos')
      .find({id: colId})
      .get('notes')
      .remove({ id: noteId }).write();
      res.status(200)
    } catch(err) {
      console.log(err)
      res.status(400);
    }
    res.send();
})

app.listen(port, function(){
 console.log(`Server is running on ${port}`);
});
