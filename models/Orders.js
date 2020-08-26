const mongoose=require('mongoose');

const Schema = mongoose.Schema; //스키마 생성

const Orders = new Schema({
    prdName: String,
    prdPrice: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    kind:String,
    method:String,
    createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Orders", Orders);