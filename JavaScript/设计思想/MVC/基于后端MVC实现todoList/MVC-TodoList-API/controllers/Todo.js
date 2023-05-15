const TodoModel = require('../models');
const {
  SCRIPT_URL,
  STYLE_URL
} = require('../config');

class TodoController {
  constructor (TodoTableModel) {
    this.todoModel = new TodoModel(TodoTableModel);
  }

  getTodoList = async (req, res) => {
    const todoList = await this.todoModel.getTodoList();

    res.send({
      msg: 'ok',
      code: 0,
      data: todoList
    });
  }

  getTodo = async (req, res) => {
    const id = req.body.id;
    const todo = await this.todoModel.getTodo(id);

    res.send({
      msg: 'ok',
      code: 0,
      data: todo
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
