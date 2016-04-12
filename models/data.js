var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  item: String
})

var data = mongoose.model('data', schema)
module.exports = data
