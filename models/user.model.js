const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false }, // Tên đầy đủ của người dùng
  age: { type: Number, required: false }, // Tuổi
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
