const { Router } = require('express');
const bodyParser = require('body-parser');
const TodoController = require('../controllers/Todo')
const { TodoTableModel } = require("../db");

const router = new Router();
const jsonParser = bodyParser.json();

const {
  listView,
  detailView,
  addTodo,
  removeTodo,
  toggleTodo
} = new TodoController(TodoTableModel);

router.get('/', listView)
router.get('/detail/:id', detailView)

// post请求需要写一个中间件：让你的body能够json解析
router.post('/add_todo', jsonParser, addTodo)
router.post('/toggle_todo', jsonParser, toggleTodo)
router.post('/remove_todo', jsonParser, removeTodo)


module.exports = router;
