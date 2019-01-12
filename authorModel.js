const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const authorSchema = new mongoose.Schema({
	firstName : String,
	lastName: String,
	username: String
})

exports.authorSchema = authorSchema;
exports.Author = mongoose.model("author", authorSchema);

