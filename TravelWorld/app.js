
/**
 * Module dependencies.
 */


var oracledb = require("./routes/OracleDB");
var mongodb = require('./routes/MongoDB');

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
    secret: 'chyingp', 
    store: new FileStore(),  
    saveUninitialized: true, 
    resave: false,
    cookie: {
        maxAge: 120 * 1000 
    }
}));

// all environments
app.set('port', process.env.PORT || 8080);
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
    var name = req.body.username;
    var pass = req.body.pass;
    mongodb.finduser(name,function(result) {
        if(result[0] === undefined){
            res.redirect('/relogin');
        }else{
            mongodb.finduser(name,function(result) {
                var password = result[0].password;
                if(password === pass){
                    req.session.regenerate(function(err) {
                        if(err){
                            return res.json({ret_code: 2, ret_msg: 'login failed'});                
                        }
                        req.session.loginUser = name;
                        res.redirect('/');                           
                    });
                }else{
                    res.redirect('/relogin');
                }
            });
        }
    }); 
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

    mongodb.finduser(name,function(result) {
        if(result[0] === undefined){
            mongodb.adduser(name, pass);
            res.redirect('/login');
        }else{
            res.redirect('/reregister');
        }
    });
    
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

app.get('/profile', index.profile);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', index.index1);
// app.get('/user', user.list);
app.get('/login', index.login);
app.get('/relogin', index.relogin);
app.get('/register', index.register);
app.get('/reregister', index.reregister);


app.get('/query?', oracledb.query);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
