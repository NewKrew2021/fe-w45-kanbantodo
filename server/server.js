const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);

// Get todos
server.get('/todos', (req, res) => {
  res.send({data: db.get('todos').value()})
})

// Create new column
server.post('/column', (req, res) => {
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
server.delete('/column/:id', (req, res) => {
  const {id} = req.params;
  db.get('todos').remove({ id }).write()
})

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running')
});
