let express = require("express"),
  http = require('http'),
  bodyParser = require("body-parser"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  config = require("./config"),
  port = process.env.PORT || config.port;

let entryRouter = require("./routes/entry"),
  projectsRouter = require("./routes/projects"),
  authRouter = require("./routes/authorization"),
  errorRouter = require("./routes/error"),
  NotificationsRouter = require("./routes/notifications");

let app = express(),
  notificationsIo;

http = http.Server(app);
notificationsIo = new NotificationsRouter({
  connect: http
});

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

http.listen(port, () => {
  console.log(`Listening on port ${port}\nhttp://localhost:${port}`);
});