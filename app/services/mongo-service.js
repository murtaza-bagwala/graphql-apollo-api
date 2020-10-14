const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/AppScanner';

let connection = null;

exports.connect = () => {
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};

exports.getConnection = () => connection;
