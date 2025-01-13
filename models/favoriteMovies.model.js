const mongoose = require('mongoose');

const favoriteMoviesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [
    {
      title: { type: String, required: true },
      genre: { type: String, required: true },
      releaseDate: { type: Date, required: true },
      rating: { type: Number, min: 0, max: 10 },
      poster: { type: String, required: true },
    },
  ],
}, {
  timestamps: true, // Thêm createdAt và updatedAt
});

module.exports = mongoose.model('FavoriteMovies', favoriteMoviesSchema);
