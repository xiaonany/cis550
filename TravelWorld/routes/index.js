
/*
 * GET home page.
 */

var oracledb = require("./OracleDB");
var mongodb = require("./MongoDB");

exports.index1 = function(req, res){
  res.render('index1', { title: 'TravelWorld' });
};

exports.index2 = function(req, res){
  res.render('index2', { title: 'TravelWorld' });
};

exports.login = function(req, res){
  res.render('login');
};

exports.relogin = function(req, res){
  res.render('loginFailed');
};

exports.register = function(req, res){
  res.render('register');
};

exports.reregister = function(req, res){
  res.render('registerFailed');
};
  
exports.adSearch = function(req, res){
  res.render('adSearch', {title: 'Advanced Search'})
};

