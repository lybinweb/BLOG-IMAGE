export default class TodoModel {
  constructor () {
    this.todoText = '';
    this.todoData = [];
  }

  setTodoText (text) {
    this.todoText = text;
  }

  addTodo (text, callback) {
    const todo = {
      id: new Date().getTime(),
      content: text,
      completed: false
    }

    this.todoData.push(todo);
    doCallback(callback, todo);
    this.setTodoText('');
  }

  toggleTodo (id, callback) {
    this.todoData = this.todoData.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    doCallback(callback, id);
  }

  removeTodo (id, callback) {
    this.todoData = this.todoData.filter(todo => todo.id !== id);
    doCallback(callback, id);
  }

  static create () {
    if (!TodoModel.instance) {
      TodoModel.instance = new TodoModel();
    }

    return TodoModel.instance;
  }
}

function doCallback (callback, arg) {
  typeof callback === 'function' && callback(arg);
}
