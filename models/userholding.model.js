var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up the user model it is basic for now
module.exports = mongoose.model('StockObject', new Schema({
  company: String,
  symbol: String,
  price: Number,
  qty: Number,
  exchange: String,
  date: Number
}));