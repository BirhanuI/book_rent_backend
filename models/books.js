const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["fiction", "poem",'novel'],
    required:true,
  },
  status: {
    type: String,
    enum: ["rented", "free",],
    default:"free",
  },
  
});

module.exports = mongoose.model("Book", booksSchema);