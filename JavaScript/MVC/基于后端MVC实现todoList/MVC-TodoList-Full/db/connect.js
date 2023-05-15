const mongoose = require('mongoose');

// 连接数据库
module.exports = function dbConnect () {
  mongoose.set('strictQuery', false);
  mongoose.connect(
    'mongodb://127.0.0.1:27017/test'
  );

  const db = mongoose.connection;

  db.on('error', err => {
    console.log('Database Connect error');
  });

  db.on('close', () => {
    console.log('Database closed');
  });

  db.on('open', () => {
    console.log('Database connected');
  });

  return db;
}
