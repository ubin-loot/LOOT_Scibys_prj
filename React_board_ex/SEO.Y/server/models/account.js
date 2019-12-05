//import mongoose from 'mongoose';

var mongoose = require('mongoose');

//const Schema = mongoose.Schema;

//const Account = mongoose.Schema({
const Account = mongoose.Schema({
  username: String,
  password: String,
  salt: String,
  created: { type: Date, default: Date.now } 
});

//export default mongoose.model('account', Account);
module.exports = mongoose.model('account',Account);