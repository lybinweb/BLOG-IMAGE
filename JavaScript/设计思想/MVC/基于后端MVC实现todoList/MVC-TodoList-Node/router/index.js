const { Router } = require('express');

const TodoController = require('../controllers/Todo')

const router = new Router();

const {
  listView,
  detailView,
} = new TodoController();

router.get('/', listView)
router.get('/detail/:id', detailView)

// post请求需要写一个中间件：让你的body能够json解析
// router.post('/add_todo', jsonParser, addTodo)
// router.post('/toggle_todo', jsonParser, toggleTodo)
// router.post('/remove_todo', jsonParser, removeTodo)

module.exports = router;
