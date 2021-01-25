require("dotenv").config();

const Koa = require("koa");
const serve = require("koa-static");
const mongoose = require("mongoose");

const PORT = 8000;
const port = process.env.PORT || PORT;

const app = new Koa();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "kanban-todo",
  })
  .then((res) => console.log(`mongoDB connected`, res))
  .catch((err) => console.error(err));

app.use(serve(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server is listening to port ${process.env.HOST}:${port}`);
});
