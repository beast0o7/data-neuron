const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    store_number: {type: Number, required: true}
  },
  { timestamps: true },
);

const book = mongoose.model('book', bookSchema);

module.exports = book;
