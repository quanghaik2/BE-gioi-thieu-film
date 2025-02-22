const express = require('express');
const router = express.Router();
const favoriteMoviesController = require('../controllers/favoriteMovies.controller');

// Thêm phim yêu thích
router.post('/', favoriteMoviesController.addFavoriteMovie);

// Lấy danh sách phim yêu thích
router.get('/:userId', favoriteMoviesController.getFavoriteMovies);

// kiểm tra phim yêu thích
router.get('/isFavorite/:userId/:title', favoriteMoviesController.isMovieInFavorites);

// Xóa phim yêu thích
router.delete('/:userId/:movieId', favoriteMoviesController.removeFavoriteMovie);

module.exports = router;
