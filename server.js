let express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  config = require("./config");
  port = process.env.PORT || config.port;

let entryRouter = require("./routes/entry"),
  projectsRouter = require("./routes/projects"),
  authRouter = require("./routes/authorization"),
  errorRouter = require("./routes/error");

let app = express();

app.set("dir", __dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", entryRouter);
app.use("/projects", projectsRouter);
app.use("/authorization", authRouter);

app.use(errorRouter.error);
app.use(errorRouter.devError);

app.listen(
  port,
  () => console.log(`Listening on port ${port}\nhttp://localhost:${port}`)
);