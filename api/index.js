const Router = require("koa-router");

const api = new Router();
const { getTodo, postTodo, deleteTodo } = require("./todo.js");

api.get("/todo", async (ctx, next) => {
  let todo;

  try {
    todo = await getTodo();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = todo;
});

api.post("/todo", async (ctx, next) => {
  let newTodo;
  try {
    newTodo = await postTodo(ctx.request.body);
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = newTodo;
});

api.delete("/todo", async (ctx, next) => {
  let deletedTodo;

  try {
    deletedTodo = await deleteTodo(ctx.request.body);
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = deletedTodo;
});

module.exports = api;
