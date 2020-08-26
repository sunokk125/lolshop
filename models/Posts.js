const mongoose = require('mongoose');
var Account = require("./Account").Account;

const Schema = mongoose.Schema;

const Posts = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    division: String,
    title: String,
    contents: String,
    imgPath: Array,
    p_date: {type:Date,default:Date.now},
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },
        content: String,
        createdAt: {type: Date, default: Date.now}
    }]
});

module.exports = mongoose.model("Posts", Posts);