const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  number: Number,
  name: String,
  image: String
});

module.exports = mongoose.model('Planet', planetSchema);
