const TodoModel = require('../models');
const {
  SCRIPT_URL,
  STYLE_URL
} = require('../config');

class TodoController {
  constructor (TodoTableModel) {
    this.todoModel = new TodoModel(TodoTableModel);
  }

  listView = async (req, res) => {
    const todoList = await this.todoModel.getTodoList();
    res.render('index', {
      todoList,
      scripts: SCRIPT_URL.INDEX,
      styles: STYLE_URL.INDEX
    });
  }

  detailView = async (req, res) => {
    const id = req.params.id;
    const todo = await this.todoModel.getTodo(id);
    res.render('detail', {
      todo,
      scripts: SCRIPT_URL.DETAIL,
      styles: STYLE_URL.DETAIL
    });
  }

  addTodo = async (req, res) => {
    const result = await this.todoModel.addTodo(req.body);

    res.send({
      msg: 'ok',
      code: 0,
      data: result
    });
  }

  toggleTodo = async (req, res) => {
    const { id } = req.body;
    const result = await this.todoModel.toggleTodo(id);

    res.send({
      msg: 'ok',
      code: 0,
      data: result
    });
  }

  removeTodo = async (req, res) => {
    const { id } = req.body;
    const result = await this.todoModel.removeTodo(id);

    res.send({
      msg: 'ok',
      code: 0,
      data: result
    });
  }
}

module.exports = TodoController;
