const { Schema } = require('mongoose');

// 表结构
const TodoSchema = new Schema({
  title: String,
  content: String,
  completed: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  TodoSchema
};
