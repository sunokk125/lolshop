const mongoose=require('mongoose');

const Schema = mongoose.Schema; //스키마 생성

const Account = new Schema({
    id: String,
    password: String,
    name: String,
    point: Number,
    basket: String,
    bank:String,//계좌 은행
    accountNum: Number,//계좌번호
    createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Account", Account);