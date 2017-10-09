const http = require('http');
const express = require('express');
const app = express();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

const bridge = require('./routes/bridge');

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// if this doesn't work right, try moving it in relation to the webpack middleware

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/bridge', bridge);


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'src/index.html'));
});

const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(port, () => {
  console.log('Listening on port: ', port);
});


// when connected
io.on('connection', (socket) => {
  console.log('a user connected');

  // on chat event
  socket.on('chat message', message => {
    console.log('message: ', message);
  });

  socket.on('key press', key => {
    console.log('key: ', key);
  })
  // on disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

