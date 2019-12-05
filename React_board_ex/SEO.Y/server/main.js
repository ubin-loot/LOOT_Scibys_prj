var express = require('express');
var path =  require('path')
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack')

var morgan = require('morgan');// HTTP REQUEST LOGGER
var bodyParser = require('body-parser');// PARSE HTML BODY
var mongoose = require('mongoose');
var session = require('express-session');

var api = require('./routes');


const app = express();


const db = mongoose.connection;
db.on('error',  console.error);
db.once('open', ()=> {console.log('Connected to mongodb server');})

mongoose.connect('mongodb://172.30.1.17:27017/login_page');

app.use(session({
  secret: 'CodeLab1$1$234',
  resave: false,
  saveUninitialized: true
}))


app.use(morgan('dev'));
app.use(bodyParser.json());

// routes '/api' 로 들어오는 요청울 routes 폴더의 라우트들로 위임
app.use('/api',api)

const port = 3000;
const devPort = 4000;


app.use('/', express.static(path.join(__dirname,'./../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../dist/index.html'));
});

app.get('/hello', (req, res) => {
  return res.send('Hello Memo App');
})


app.listen(port, ()=> {
  console.log('Express is listening on port', port)
})

if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  
  devServer.listen(
    devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    }
  );
}
