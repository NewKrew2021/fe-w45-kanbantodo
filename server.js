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

server.get('/cards', (req, res) => {
  res.send(db.get('todos').value());
})

server.put('/cards', (req, res) => {
  db.get('todos')
    .find({id: Number(req.query.id)})
    .get('cards')
    .push({title: req.query.title, author: "kevin"})
    .write();
    res.send(db.get('todos').value());
})

server.delete('/cards', (req, res) => {
  db.get('todos')
    .find({id: Number(req.query.id)})
    .get('cards')
    .remove({ title : req.query.title })
    .write();

  res.send(db.get('todos').value());
})

server.put('/activity', (req, res) => {
  db.get('activity')
  .push({
          type: req.query.type,
          from: req.query.from,
          to: req.query.to,
          author: req.query.author,
          time: req.query.time
        });
  res.send(db.get('activity').value());
})


server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running')
});