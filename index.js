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
    dbName: process.env.DB_NAME,
  })
  .then((res) => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

const TodoSchema = new mongoose.Schema({
  content: String,
  writer: String,
  status: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

const test = new Todo({
  content: "PR 날리기",
  writer: "puba",
  status: "할 일",
});

test
  .save()
  .then(() => {
    console.log(test);
  })
  .catch((err) => {
    console.log("Error : " + err);
  });

app.use(serve(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server is listening to port ${process.env.HOST}:${port}`);
});
