var mongoose = require('mongoose');

//const Schema = mongoose.Schema;

const Board = mongoose.Schema({
  writer: String,
  contents: String,
  starred: [String],
  date: {
    created: { type: Date, default: Date.now},
    edited: { type: Date, default: Date.now}
  },
  is_edited: { type: Boolean, default: false}
});

module.exports = mongoose.model('board', Board);
