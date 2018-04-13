
/**
 * Module dependencies.
 */
var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var identityKey = 'skey';

app.use(session({
    name: 'loginUser',
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: true,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 120 * 1000  // 有效期，单位是毫秒
    }
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var users = [{username: 'larry', pass: '123456'}];

var findUser = function(name, password){
    return users.find(function(item){
        return item.username == name && item.pass == password;
    });
};

var matchUser = function(name){
    return users.find(function(item){
        return item.username == name;
    });
}

app.post('/login', function(req, res, next){    
    var sess = req.session;
    var user = findUser(req.body.username, req.body.pass);
    console.log(user);
    if(user){
        req.session.regenerate(function(err) {
            if(err){
                return res.json({ret_code: 2, ret_msg: 'login failed'});                
            }
            req.session.loginUser = user.username;
            res.redirect('/');                           
        });
    }else{
        res.redirect('/relogin');
    }   
});

app.get('/logout', function(req, res, next){
    req.session.destroy(function(err) {
        if(err){
            res.json({ret_code: 2, ret_msg: 'logout failed'});
            return;
        }
        
        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    });
});

// var mongodb = require("./MongoDB");
app.post('/register', function(req, res, next){
    var name = req.body.username;
    var pass = req.body.pass;
    var user = matchUser(name);
    if(user){
        res.redirect('/reregister');
    }else{
        users.push({username: name, password: pass})
        res.redirect('/login');
    } 
});

//判断是否登录
app.get('/', function(req, res, next){
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;
    if(isLogined){
    	res.render('index2');
    }else{
    	res.render('index1');
    }
});

app.get('/adSearch', function(req, res, next){
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;
    console.log(isLogined);
    if(isLogined){
        res.render('adSearch2');
    }else{
        res.render('adSearch1');
    }
});
// var fs = require('fs');
// var options = {key: fs.readFileSync('server.key','utf8'),cert: fs.readFileSync('server.crt','utf8'),rejectUnathorized: false};


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', index.index1);
app.get('/user', user.list);
app.get('/login', index.login);
app.get('/relogin', index.relogin);
app.get('/register', index.register);
app.get('/reregister', index.reregister);


app.get('/query', function(request, response) {
	var location = request.query.location;
	var duration = request.query.duration;
	var month = request.query.month;
	var budget = request.query.budget;
	var specNeeds = request.query.specNeeds;
	var temperature = request.query.temperature;
	var country = request.query.country;
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
