var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up the user model it is basic for now
module.exports = mongoose.model('User', new Schema({
  email: String,
  salt: String,
  hash: String,
  holdings: [{
    company: String,
    symbol: String,
    purchesPrice: Number,
    dateIn : Date,
    Qty: Number
  }],
  soldHoldings:[{
    company: String,
    symbol: String,
    purchesPrice: Number,
    sellPrice: Number,
    dateIn : Date,
    dateOut: Date,
    Qty: Number
  }]
}));
