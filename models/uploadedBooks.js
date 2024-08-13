const mongoose = require("mongoose");

const uploadedBooksSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("UploadedBook", uploadedBooksSchema);
