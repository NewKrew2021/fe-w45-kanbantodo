
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`Mock Server is running, port(${port})`)
})

/*

fetch('http://localhost:3000/posts/0', {
  method: 'PUT', // or 'PUT'
  body: JSON.stringify({
    "id": 0,
  "name": "해야할일",
  "author": "chanhuiseok",
  "data": [
    {
      "title": "페이지네이션",
      "tasks": [
        {
          "id": 0,
          "title": "task1"
        },
        {
          "id": 1,
          "title": "task2"
        }
      ]
    },
    {
      "title": "공부하기",
      "tasks": [
        {
          "id": 0,
          "title": "task1"
        },
        {
          "id": 1,
          "title": "task2"
        }
      ]
    },
    {
      "title": "공부하기333",
      "tasks": [
        {
          "id": 0,
          "title": "task1"
        },
        {
          "id": 1,
          "title": "task2"
        }
      ]
    }
  ]
  }), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

*/