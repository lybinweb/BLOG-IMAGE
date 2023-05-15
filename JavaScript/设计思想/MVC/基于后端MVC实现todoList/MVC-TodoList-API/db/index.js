const dbConnect = require('./connect');
const {
  TodoSchema
} = require('./Schema');

const db = dbConnect();

// 创建表模型
const TodoTableModel = db.model('Todo', TodoSchema);

module.exports = {
  TodoTableModel
}
