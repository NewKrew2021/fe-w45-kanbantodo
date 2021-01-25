require("dotenv").config();

const Koa = require("koa");
const serve = require("koa-static");

const PORT = 8000;
const port = process.env.PORT || PORT;

const app = new Koa();

app.use(serve(__dirname + "/public/dist"));

app.listen(port, () => {
  console.log(`Server is listening to port ${process.env.HOST}:${port}`);
});
