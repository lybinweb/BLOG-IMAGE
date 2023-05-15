const { Router } = require('express');
const bodyParser = require('body-parser');
const TodoController = require('../controllers/Todo')
const { TodoTableModel } = require("../db");

const router = new Router();
const jsonParser = bodyParser.json();

const {
  getTodoList,
  getTodo,
  addTodo,
  removeTodo,
  toggleTodo
} = new TodoController(TodoTableModel);

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

router.get('/get_todolist', getTodoList);
router.post('/get_todo', jsonParser, getTodo);
// post请求需要写一个中间件：让你的body能够json解析
router.post('/add_todo', jsonParser, addTodo)
router.post('/toggle_todo', jsonParser, toggleTodo)
router.post('/remove_todo', jsonParser, removeTodo)


module.exports = router;
