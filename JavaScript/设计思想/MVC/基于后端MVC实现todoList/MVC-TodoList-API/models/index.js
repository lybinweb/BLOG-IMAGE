class TodoModel {
  constructor (TodoTableModel) {
    this.tableModel = TodoTableModel;
  }

  async getTodoList () {
    return await this.tableModel.find();
  }

  async getTodo (id) {
    return await this.tableModel.findOne({
      _id: id
    });
  }

  async toggleTodo (id) {
    const todo = await this.tableModel.findOne({
      _id: id
    });

    return await this.tableModel.updateOne({
      _id: id
    }, {
      completed: !todo.completed
    });
  }

  async removeTodo (id) {
    return await this.tableModel.deleteOne({
      _id: id
    });
  }

  async addTodo (todo) {
    return await this.tableModel.create(todo);
  }
}

module.exports = TodoModel;
