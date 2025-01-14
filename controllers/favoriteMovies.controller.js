const FavoriteMovies = require('../models/favoriteMovies.model');

// Thêm phim vào danh sách yêu thích
const addFavoriteMovie = async (req, res) => {
  try {
    const { userId } = req.body;
    const { title, genre, releaseDate, rating, poster } = req.body;

    // Tìm danh sách phim yêu thích của người dùng
    let favoriteMovies = await FavoriteMovies.findOne({ user: userId });

    // Nếu chưa tồn tại, tạo mới
    if (!favoriteMovies) {
      favoriteMovies = new FavoriteMovies({ user: userId, movies: [] });
    }

    // Thêm phim vào danh sách
    favoriteMovies.movies.push({ title, genre, releaseDate, rating , poster });
    await favoriteMovies.save();

    res.status(201).json({ message: 'Movie added to favorites', favoriteMovies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách phim yêu thích của người dùng
const getFavoriteMovies = async (req, res) => {
  try {
    const { userId } = req.params;

    const favoriteMovies = await FavoriteMovies.findOne({ user: userId }).populate('user');
    if (!favoriteMovies) {
      return res.status(404).json({ message: 'No favorite movies found for this user' });
    }

    res.status(200).json(favoriteMovies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa phim khỏi danh sách yêu thích
const removeFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    console.log(userId, movieId);

    const favoriteMovies = await FavoriteMovies.findOne({ user: userId });
    if (!favoriteMovies) {
      return res.status(404).json({ message: 'No favorite movies found for this user' });
    }

    // Loại bỏ phim khỏi danh sách
    favoriteMovies.movies = favoriteMovies.movies.filter((movie) => movie._id.toString() !== movieId);
    await favoriteMovies.save();

    res.status(200).json({ message: 'Movie removed from favorites', favoriteMovies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kiểm tra xem phim có trong danh sách yêu thích không
const isMovieInFavorites = async (req, res) => {
  try {
    const { userId, title } = req.params; // Lấy userId và title từ params

    // Tìm danh sách phim yêu thích của người dùng
    const favoriteMovies = await FavoriteMovies.findOne({ user: userId });

    if (!favoriteMovies) {
      return res.status(404).json({ message: 'No favorite movies found for this user' });
    }

    // Tìm phim trong danh sách yêu thích
    const movie = favoriteMovies.movies.find((movie) => movie.title === title);

    if (movie) {
      return res.status(200).json({
        message: 'Movie is in favorites',
        exists: true,
        movieId: movie._id, // Trả về movieId
      });
    }

    res.status(200).json({ message: 'Movie is not in favorites', exists: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  addFavoriteMovie,
  getFavoriteMovies,
  removeFavoriteMovie,
  isMovieInFavorites,
};
