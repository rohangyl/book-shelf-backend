const mongoose = require('mongoose');
const Counter = require('./Counter');

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publicationYear: Number,
  coverImage: String,
  readStatus: { type: String, enum: ['read', 'unread'], default: 'unread' },
  language: String,   // e.g. "English", "Hindi"
  theme: String       // not typical here, but could be like "classic", "modern" for book cover style maybe
}, { timestamps: true });

bookSchema.index({ title: 1, author: 1 }, { unique: true });

// Auto-increment bookId before saving
bookSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'bookId' },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.bookId = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
