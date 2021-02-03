const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { DllPlugin } = require('webpack');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);

server.post('/todos', (req, res) => {
  db.get('todos')
    .find({ title: req.query.prevTitle })
    .assign({ title: req.query.curTitle })
    .write()
  res.send(db.get('todos').value());
})

server.post('/delete_todos', (req, res) => {
  console.log(req.query.todoTitle);
  db.get('todos')
    .remove({ title: req.query.todoTitle })
    .write();
  res.send(db.get('todos').value());
})

server.put('/todos', (req, res) => {
  db.get('todos')
    .push({title:"New Column", cards:[]})
    .write();
  res.send(db.get('todos').value());
})

server.get('/cards', (req, res) => {
  res.send(db.get('todos').value());
})

server.put('/cards', (req, res) => {
  db.get('todos')
    .find({ title: req.query.todoTitle })
    .get('cards')
    .push({ title: req.query.cardTitle, author: "kevin" })
    .write();
  res.send(db.get('todos').value());
})

server.delete('/cards', (req, res) => {
  db.get('todos')
    .find({ title: req.query.todoTitle })
    .get('cards')
    .remove({ title: req.query.cardTitle })
    .write();
  res.send(db.get('todos').value());
})

server.get('/activity', (req, res) => {
  res.send(db.get('activity').value());
})

server.put('/activity', (req, res) => {
  db.get('activity')
  .push({
          type: req.query.type,
          from: req.query.from,
          to: req.query.to,
          text: req.query.text,
          author: req.query.author,
          time: req.query.time
        })
  .write();
  res.send(db.get('activity').value());
})

server.delete('/activity', (req, res) => {
  db.get('activity')
  .remove()
  .write();
  res.send(db.get('activity').value());
})

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running')
});