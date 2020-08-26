const mongoose=require('mongoose');

const Schema = mongoose.Schema; //스키마 생성

const Champion = new Schema({
    name: String,
    price: Number,
    kind:String,//c : 챔피언 s : 스킨 ws : 와드 스킨
    imgPath : String,
    description: String
});

module.exports = mongoose.model("Champion", Champion);