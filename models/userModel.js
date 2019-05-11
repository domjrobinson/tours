const mongoose = require('mongoose');
const slugify = require('slugify');

const userSchema = new mongoose.Schema();

const User = mongoose.model('Tour', userSchema);

module.exports = User;
