const mongoose = require("mongoose");

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

const getTodo = () => {
  // return Todo.find().exec();
  return Todo.find({}, function (err, todo) {
    if (err) throw err;
    return todo;
  });
};

const postTodo = () => {
  test
    .save()
    .then(() => {
      console.log(test);
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
};

module.exports = { getTodo, postTodo };
