require("dotenv").config();

const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const PORT = 8000;
const port = process.env.PORT || PORT;

const app = new Koa();
const router = new Router();

const api = require("./api");

app.use(serve(__dirname + "/public/dist"));

router.use("/api", api.routes());
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is listening to port ${process.env.HOST}:${port}`);
});
