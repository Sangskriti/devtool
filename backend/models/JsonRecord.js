const mongoose = require('mongoose');

const jsonRecordSchema = new mongoose.Schema({
  input: String,
  formatted: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JsonRecord', jsonRecordSchema , 'jsonrecords');
