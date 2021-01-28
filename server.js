// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.put('/cards', (req, res) => {
  db.get('todos')
    .find({id: Number(req.query.id)})
    .get('cards')
    .push({title: req.query.title, author: "kevin"})
    .write();
    res.send(db.get('todos').value());
})

server.delete('/cards', (req, res) => {
  // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
  db.get('todos')
    .find({id: Number(req.query.id)})
    .get('cards')
    .remove({ title : req.query.title })
    .write();

  // todos를 응답
  res.send(db.get('todos').value());
})

// Use default router
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running')
});