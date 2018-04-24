var mongodb = require('mongodb');

var uri = 'mongodb://xiaonany:123456@ds241699.mlab.com:41699/cis550project';

exports.adduser = function(name, pass, callback) {
  
  mongodb.MongoClient.connect(uri, function(err, db) { 
	if(err) throw err;
	var users = db.collection('users');
	users.insert({"username": name, "password": pass});
  });

}

exports.finduser = function(name, callback) {
  
  mongodb.MongoClient.connect(uri, function(err, db) { 
	if(err) throw err;
	var users = db.collection('users');
	users.find({"username": name}).toArray(function(err,result){
		callback(result);
	});

  });

}

exports.matchuser = function(name, pass, callback) {
  
  mongodb.MongoClient.connect(uri, function(err, db) { 
	if(err) throw err;
	var users = db.collection('users');
	users.find({"username": name}).toArray(function(err,result){
		callback(result);
	});

  });

}

exports.addLog = function(name, search, res) {
  
  mongodb.MongoClient.connect(uri, function(err, db) { 
	if(err) throw err;
	var logs = db.collection('logs');
	logs.insert({"username": name, "searchLog":search, "resultLog": res});
  });

}

exports.getLog = function(name, callback){
	mongodb.MongoClient.connect(uri, function(err, db) { 
		if(err) throw err;
		var logs = db.collection('logs');
		logs.find({"username":name}).toArray(function(err,result){
			callback(result);
		});
	});
}

