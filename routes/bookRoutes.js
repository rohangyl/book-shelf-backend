const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add a new book
router.post('/', async (req, res) => {
    try {
      const { title } = req.body;
  
      // Check if a book with the same title already exists
      const existingBook = await Book.findOne({ title });
  
      if (existingBook) {
        return res.status(400).json({ error: 'Book with this title already exists' });
      }
  
      // If not, create a new book
      const book = new Book(req.body);
      const savedBook = await book.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Search books by title, author, or genre
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query; // search query
    if (!q) return res.json([]);

    // case-insensitive search on title, author or genre
    const regex = new RegExp(q, 'i');
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { genre: regex }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  
  // Update book by bookId
  router.put('/:bookId', async (req, res) => {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { bookId: req.params.bookId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete book by bookId
  router.delete('/:bookId', async (req, res) => {
    try {
      const deletedBook = await Book.findOneAndDelete({ bookId: req.params.bookId });
      if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
      res.json({ message: 'Book deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




module.exports = router;
