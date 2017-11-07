const http = require('http');
const express = require('express');

// webpack
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// need explicit recognition
const bodyParser = require('body-parser');
const path = require('path');

// what port?
const port = 3000;

// route definitions
const bridge = require('./routes/bridge');
const setup = require('./routes/setup');

// why not declare app when isz neccesses.. nacsi.... necessary
const app = express();

// dev hot reload middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routing
app.use('/bridge', bridge);
app.use('/setup', setup);
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'src/index.html'));
});

// server & websocket
const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(port, () => {
  console.log('Listening on port: ', port);
});


// socket.io events
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('key press', key => {
    console.log('key: ', key);
  })
  // on disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

