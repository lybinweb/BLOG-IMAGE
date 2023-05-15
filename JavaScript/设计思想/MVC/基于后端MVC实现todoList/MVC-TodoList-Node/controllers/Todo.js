const {
  httpGet,
  httpPost
} = require('../libs/http');
const {
  SCRIPT_URL,
  STYLE_URL
} = require('../config');

class TodoController {

  listView = async (req, res) => {
    const json = await httpGet('http://localhost:8081/get_todolist');
    const todoList = json.data;

    res.render('index', {
      todoList,
      scripts: SCRIPT_URL.INDEX,
      styles: STYLE_URL.INDEX
    });
  }

  detailView = async (req, res) => {
    const id = req.params.id;
    const json = await httpPost('http://localhost:8081/get_todo', {
      id
    });
    const todo = json.data;

    res.render('detail', {
      todo,
      scripts: SCRIPT_URL.DETAIL,
      styles: STYLE_URL.DETAIL
    });
  }
}

module.exports = TodoController;
