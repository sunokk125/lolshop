var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc', 'hiddenkey');


var Account = require('../models/Account');//계정 DB
var Posts = require('../models/Posts');
var Comment = require('../models/Comment');
var Orders = require('../models/Orders');
var Champion = require('../models/Champion');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/join', function (req, res, next) {
    res.render('join',{session:false});
});

router.post('/join', function (req, res, next) {
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.pw;
    var bank = req.body.bankName;
    var acNum = req.body.acNum;

    var c_password = cipher.update(password, 'utf8', 'base64');
    c_password += cipher.final('base64');

    Account.create({
        name: name,
        id: id,
        password: c_password,
        bank: bank,
        accountNum: acNum,
        point:0
    });
    console.log("-----회원가입 성공!-----");
    res.redirect('/users/login');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    console.log(req.body.id);
    Account.findOne({id: req.body.id}, function (err, exists) {

        if (err) console.log(err);
        console.log(exists);
        if (exists) {
            var check = exists.password;
            var pwd = req.body.password;

            var c_password = cipher.update(pwd, 'utf8', 'base64');
            c_password += cipher.final('base64');

            if (check == c_password) {
                req.session.user = {
                    objId: exists._id,
                    id: exists.id,
                    password: exists.password,
                    name: exists.name,
                    point: exists.point,
                    autorized: true
                };
                console.log('ok');
                res.redirect('/');
            } else {
                res.send('존재하지 않습니다.pw');
            }
        } else {
            res.send('존재하지 않습니다.id');
        }
    });
});

router.get('/centerPost', function (req, res, next) {
    Posts.find({},function (err, result) {
        if(req.session.user){ 
            res.render('centerPost', {posts: result,session:req.session.user});
          }else{
            res.render('centerPost', {posts: result,session:false});
          }
    });

});

router.get('/write', function (req, res, next) {
    if(req.session.user){ 
        res.render('write', {session:req.session.user});
      }else{
        res.render('write', {session:false});
      }
    
});

const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

router.post('/write', upload.array('imgFile'), (req, res) => {
    console.log(req.files);
    var files = req.files;
    if(!req.files.length){
        
        Posts.create({
            author: req.session.user.objId,
            title: req.body.title,
            contents: req.body.content,
            imgPath:"none"
        });
    }else{

        var imgPaths =[];

        for(var i =0; i<files.length; i++){
            imgPaths.push("/images/uploads/"+req.files[i].filename);
        }

        console.log(imgPaths);
        
        
        Posts.create({
            author: req.session.user.objId,
            title: req.body.title,
            contents: req.body.content,
            imgPath:imgPaths
        });
    }
    
    res.redirect('/users/centerPost');
  });

router.get('/post/:id', function (req, res) {
    var id = req.params.id;

    Posts.findOne({_id:id}).populate(['author','comments.author']).exec(function (err, result) {
        res.render('post', {posts:result, session:req.session.user});
    });
});

router.get('/post/update/:id', function (req, res) {
    var id = req.params.id;
    Posts.findOne({_id:id},function (err, result) {
        res.render('p_update', {posts:result});
    });
});
router.post('/updateOk', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var contents = req.body.contents;

    console.log("value : " + id +","+title +"," + contents);

    Posts.findOne({_id: id},function (err, result) {
        result.title = title;
        result.contents = contents;

        result.save(function(err){
            if (err) {
                throw err;
            } else {
                res.redirect('/users/post/'+id);
            }
        })
    });
});

router.get('/post/delete/:id', function (req, res) {
    var id = req.params.id;

    Posts.deleteOne({_id: id}, function (err, result) {
        res.send('삭제 되었습니다.<button><a href="/users/centerPost">목록</a> </button>');
    });
});

router.post('/comment' , function (req, res) {
    var comment = new Comment();
    comment.content = req.body.commentContents;
    comment.author = req.session.user.objId;
    var id = req.body.id;

    Posts.update({_id:id}, { $push: { comments : comment}}).populate(['author','comments.author']).exec(function(err, result){
        res.redirect('/users/post/'+id);
    });
});

router.post('/c_update' , function (req, res) {
    var pid = req.body.postId;
    var cid  = req.body.commentId;
    var content = req.body.content;
    console.log(pid);
    console.log(cid);
    console.log(content);

    Posts.update({'_id':pid,'comments._id':cid},{'$set':{'comments.$.content': content}},function(err,result){
        Posts.findOne({_id:pid},function(err,result){
            console.log(result.comments);
            return res.json({comments: result.comments ,success:true});
        });
    });

});

router.post('/c_delete' , function (req, res) {
    var pid = req.body.postId;
    var cid  = req.body.commentId;
    console.log(pid);
    console.log(cid);

    Posts.findOneAndUpdate({_id: pid},{$pull:{comments:{_id:cid}}} ,function (err, result) {
        Posts.findOne({_id:pid},function(err,result){
            console.log(result.comments);
            return res.json({comments: result.comments ,success:true});
        });
    });
});

router.post('/search' , function (req, res) {
    var title = req.body.title;

    Posts.find({title:{$regex:title}},function(err,result){
        return res.json({posts: result,success:true});
    });
});

router.get('/point', function(req, res, next) {
    if(req.session.user){ 
      res.render('point', {session:req.session.user});
    }else{
      res.render('point',{session:false});
    }
  });

router.post('/charge', function (req,res){
    console.log("1");
    var point=req.body.point;
    console.log("1");
    var rp;
    console.log("1");
    var price;
    console.log("1");
    if(point ==1){
        rp=565;
        price=4900;
    }else if(point==2){
        rp=1200;
        price=9900;
    }else if(point==3){
        rp=2450;
        price=19900;
    }else if(point==4){
        rp=4350;
        price=35000;
    }else if(point==5){
        rp=6275;
        price=49000;
    }else if(point==6){
        rp=13000;
        price=99000;
    }
    console.log("1");
    res.render('kakaopay',{prdName:rp,prdPrice:price,prdKind:"rp"});
});

router.post('/kakaopay', function (req,res){
    var prdName = req.body.prdName;
    var prdPrice = req.body.prdPrice;
    var resultPoint = parseInt(req.session.user.point + parseInt(prdName));
    
    Orders.create({
        prdName: prdName,
        prdPrice: prdPrice,
        author: req.session.user.objId,
        kind:"rp",
        method: 'kakaopay'
    });
    Account.updateOne({'_id':req.session.user.objId},{'$set':{'point':resultPoint}},function(err, result){
        Account.findOne({'_id':req.session.user.objId},function(err,result2){
            console.log(result2);
            req.session.user.point = result2.point;
            res.redirect('/users/payment_list');
        });  
    });
});

router.post('/payment', function (req,res){
    var name=req.body.name;
    var price = req.body.price;
    var resultPoint = parseInt(req.session.user.point-parseInt(price));
    
    Orders.create({
        prdName: name,
        prdPrice: price,
        author: req.session.user.objId,
        kind:"champion",
        method: 'kakaopay'
    });
    Account.updateOne({'_id':req.session.user._id},{'$set':{'point':resultPoint}},function(err, result){
        console.log(result);
        Account.findOne({'_id':req.session.user._id},function(err,result){
            console.log(result);
            res.redirect('/users/payment_list');
        });  
    });
});

router.get('/payment_list', function (req,res){
    Orders.find({author:req.session.user.objId}).populate('author').exec(function(err,result){
        Orders.find({$and:[{author:req.session.user.objId},{kind:"rp"}]}).populate('author').exec(function(err,result2){
            Orders.find({$and:[{author:req.session.user.objId},{kind:"champion"}]}).populate('author').exec(function(err,result3){
                res.render('payment_list',{orders:result,rp_orders:result2,cp_orders:result3,session:req.session.user});
            });
        });
    });
});

router.get('/addCp', function(req, res, next) {
    if(req.session.user){ 
      res.render('addCp', {session:req.session.user});
    }else{
      res.render('addCp',{session:false});
    }
});
router.post('/addCp', upload.array('imgFile'), (req, res) => {
    console.log(req.files);
    var files = req.files;
    if(!req.files.length){
        
        Champion.create({
            name: req.body.name,
            price:req.body.price,
            kind:req.body.kind,
            description: req.body.description,
            imgPath:"none"
        });
    }else{

        var imgPaths =[];

        for(var i =0; i<files.length; i++){
            imgPaths.push("/images/uploads/"+req.files[i].filename);
        }

        console.log(imgPaths);
        
        
        Champion.create({
            name: req.body.name,
            price:req.body.price,
            kind:req.body.kind,
            description: req.body.description,
            imgPath:imgPaths
        });
    }
    
    res.redirect('/champion');
  });

  router.get('/payment_cancel/:id', function (req, res) {
    var id = req.params.id;

    Orders.findOne({_id:id}).populate('author').exec(function (err, result) {
        res.render('payment_cancel', {cancel:result, session:req.session.user});
    });
});




module.exports = router;
