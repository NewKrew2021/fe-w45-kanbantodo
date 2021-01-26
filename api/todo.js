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

const getTodo = () => {
  return Todo.find({}, function (err, todo) {
    if (err) throw err;
    return todo;
  });
};

const postTodo = ({ content, writer, status }) => {
  const newTodo = new Todo({
    content: content,
    writer: writer,
    status: status,
  });

  newTodo
    .save()
    .then(() => {
      return newTodo;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { getTodo, postTodo };
