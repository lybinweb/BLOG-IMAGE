const express = require('express');
const {
  join
} = require('path');
const router = require('./router');

const app = express();

app.use(router);
// 设置模板引擎ejs
app.set('view engine', 'ejs');
// 设置静态文件
app.use(express.static(join(__dirname, 'public')));

app.listener(8080, (req, res) => console.log('server is running on 8080'));
