const express = require('express');
const router = express.Router();
const favoriteMoviesController = require('../controllers/favoriteMovies.controller');

// Thêm phim yêu thích
router.post('/:userId', favoriteMoviesController.addFavoriteMovie);

// Lấy danh sách phim yêu thích
router.get('/:userId', favoriteMoviesController.getFavoriteMovies);

// Xóa phim yêu thích
router.delete('/:userId/:movieId', favoriteMoviesController.removeFavoriteMovie);

module.exports = router;
