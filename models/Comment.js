const mongoose = require('mongoose');
var Account = require("./Account").Account;

const Schema = mongoose.Schema;

const Comment = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    content: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", Comment);