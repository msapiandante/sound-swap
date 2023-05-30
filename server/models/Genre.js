const mongoose = require('mongoose');

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }

});

const Category = mongoose.model('Genre', GenreSchema);

module.exports = Category;
