const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const axios = require('axios');
const cors = require('cors');

const config = require('./config');
const db = require('./models');
const messageRoutes = require('./routes/messages');

if (config.useEnv) require('dotenv').config();

if (config.useMorgan) {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());

app.use('/', messageRoutes);
const server = http.Server(app);
const io = socket(server);

// 404 catching and go to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// dev error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// TODO: need to fix/change the way data is emitted
io.on("connection", socket => {
  console.log("new client connected"), 
  setInterval(
    () => getApiAndEmit(socket),
    3000 // modify timing
  );
  socket.on("disconnect", () => console.log("a client disconnected"));
});

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      `http://localhost:${config.port}`
    );
    socket.emit("FromAPI", res.data);
  } catch (err) {
    console.error(`error: ${err}`);
  }
};

server.listen(config.port, function () {
  console.log(`listening on port ${config.port}`);
});
