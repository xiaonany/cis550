var oracledb = require('oracledb');
var mongodb = require('./MongoDB');

function sendQuery(queryString, callback){

	oracledb.getConnection({
		user: "project550",
		password: "cis550project",
		connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=myinstance.cbms9dvcxzq5.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))"
	}, function(err, connection) {
		if (err) {
			console.error(err.message);
			return;
		}
		console.log("\nQuery : "+queryString);
		connection.execute(queryString, [],{ maxRows: 1000 },
		function(err, result) {
			if (err) {
				console.error(err.message);
				doRelease(connection);
				return;
			}
			callback(result);
			doRelease(connection);
		});
	});
}

function doRelease(connection) {
	connection.release(
		function(err) {
			if (err) {console.error(err.message);}
		}
	);
}

exports.query = function(req, res) {
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var des = req.query.country;
	// console.log(loc);

	console.log("get request : "+loc+" ; "+dur+" ; "+mon+
		" ; "+budg+" ; "+spec+ " ; "+temp+" ; "+des);

	if (budg === '')
		budg = 'undefined';
	if (spec === '')
		spec = 'undefined';
	if (temp === '')
		temp = 'undefined';
	if (des === '')
		des = 'undefined';

	// q_123_less(req,res);
	
	// console.log(loc && dur && mon);
	if (loc!=='undefined' && mon!=='undefined'  && dur >0) {
		/* 1+2+3 */
		if((budg === 'undefined') && (spec === 'undefined') && (temp === 'undefined') && (des === 'undefined')){
			if ((dur >=1) && (dur <= 5)){
				q_123_less(req, res);
			}
			else {
				q_123_more(req, res);
			}
		}

		/* 1+2+3+4 */
		else if((budg !== 'undefined') && (spec === 'undefined') && (temp === 'undefined') && (des === 'undefined')){
			if ((dur >= 1) && (dur <= 5)){
				q_1234_less(req, res);
			}
			else {
				q_1234_more(req, res);
			}
		}

		/* 1+2+3+5 */
		else if( (budg === 'undefined') && (spec !== 'undefined') && (temp === 'undefined') && (des === 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_1235_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_1235_ta(req, res);
			}	
		}

		/* 1+2+3+6 */
		else if( (budg === 'undefined') && (spec === 'undefined') && (temp !== 'undefined') && (des === 'undefined') ) {
				console.log('check1');
				q_1236(req, res);
		}

        /* 1+2+3+7 */
		else if( (budg === 'undefined') && (spec === 'undefined') && (temp === 'undefined') && (des !== 'undefined') ) {
				q_1237(req, res);
		}

		/* 1+2+3+4+5 */
		else if( (budg !== 'undefined') && (spec !== 'undefined') && (temp === 'undefined') && (des === 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food')){
				q_12345_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_12345_ta(req, res);
			}
		}

		/* 1+2+3+4+6 */
		else if( (budg !== 'undefined') && (spec === 'undefined') && (temp !== 'undefined') && (des === 'undefined') ) {
				q_12346(req, res);
		}

		/* 1+2+3+4+7 */
		else if( (budg !== 'undefined') && (spec === 'undefined') && (temp === 'undefined') && (des !== 'undefined') ) {
				q_12347(req, res);
		}

		/* 1+2+3+5+6 */
		else if( (budg === 'undefined') && (spec !== 'undefined') && (temp !== 'undefined') && (des === 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_12356_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_12356_ta(req, res);
			}
		}	

		/* 1+2+3+5+7 */
		else if( (budg === 'undefined') && (spec !== 'undefined') && (temp === 'undefined') && (des !== 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_12357_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_12357_ta(req, res);
			}
		}	

		/* 1+2+3+6+7 */
		else if( (budg === 'undefined') && (spec === 'undefined') && (temp !== 'undefined') && (des !== 'undefined') ) {
			q_12367(req, res);
		}	

		/* 1+2+3+4+5+6 */
		else if( (budg === 'undefined') && (spec !== 'undefined') && (temp !== 'undefined') && (des !== 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_123456_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_123456_ta(req, res);
			}
		}	

		/* 1+2+3+4+5+7 */
		else if( (budg !== 'undefined') && (spec !== 'undefined') && (temp === 'undefined') && (des !== 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_123457_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_123457_ta(req, res);
			}
		}	

		/* 1+2+3+4+6+7 */
		else if( (budg !== 'undefined') && (spec === 'undefined') && (temp !== 'undefined') && (des !== 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_123467_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_123467_ta(req, res);
			}
		}	

		/* 1+2+3+5+6+7*/
		else if( (budg === 'undefined') && (spec !== 'undefined') && (temp !== 'undefined') && (des !== 'undefined') ) {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				q_123567_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				q_123567_ta(req, res);
			}
		}	

		/* 1+2+3+5+6+7 */
		else {
			if ((spec === 'shopping') || (spec === 'services') || (spec === 'food') ) {
				console.log("here");
				q_1234567_ssf(req, res);
			}
			else if ((spec === 'transport') || (spec === 'accommodation')) {
				console.log("here1");
				q_1234567_ta(req, res);
			}
		}	
	}else{
		res.json([['No Result Found!','']]);
	}
}


function q_123_less(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var queryString = "";

	queryString += "WITH loca AS(SELECT c1.Lat AS c_lat, c1.Lon AS c_lon FROM\n"+
				   "City c1 WHERE c1.cityName like '"+loc+"%')\n"+
				   "SELECT c.countryName AS Country, c2.cityName AS City \n"+
				   "FROM City c2 JOIN belongTo b ON c2.cityName = b.b_cityName \n"+
				   "JOIN Country c ON b.b_countryCode = c.countryCode, loca ca \n"+
				   "WHERE ABS(c2.Lat - ca.c_lat)<"+dur+" AND ABS(c2.Lon - ca.c_lon)<"+dur+" AND ABS(c2.Lat - ca.c_lat)>0";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		// console.log(result.rows[0]);
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon, resent);
			}
		}
	});
}


function q_123_more(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var queryString = "";

	queryString +=
		" WITH po AS( SELECT p_cityName as cn FROM popularity \n" +
		" WHERE rownum < 51 ORDER BY visitorNum DESC ) \n" +
		" SELECT c.countryName AS Country, tem.t_cityName AS City \n" + 
		" FROM (select m_cityName as t_cityName, "+mon+" as Mon from temperature) tem \n" +
		" JOIN belongTo b ON tem.t_cityName = b.b_cityName \n" +
		" JOIN Country c ON b.b_countryCode = c.countryCode \n" +
		" JOIN po ON b.b_cityName = po.cn WHERE tem.Mon >= 15 AND tem.Mon <= 25  ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon,resent);
			}
		}
	});
}

function q_1234_less(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var queryString = "";

	queryString += 
	" WITH loca AS(SELECT c1.Lat AS c_lat, c1.Lon AS c_lon \n " +
	" FROM City c1 WHERE c1.cityName like '"+loc+"%' ) \n "+
	" SELECT c.countryName AS Country, c2.cityName AS City \n"+
	" FROM Country c JOIN belongTo b ON c.countryCode = b.b_countryCode \n"+
	" JOIN City c2 ON b.b_cityName = c2.cityName \n"+
	" JOIN (select e_cityName, total from EXPENDITURE) exp ON c2.cityName = exp.e_cityName \n"+ 
	" JOIN popularity p ON exp.e_cityName = p.p_cityName, loca ca \n"+ 
	" WHERE (exp.total*100/p.visitorNum)* "+dur+" <= "+budg+" \n"+ 
	" AND ABS(c2.lat - ca.c_lat) < 20 AND ABS(c2.lon - ca.c_lon) <20 \n"+ 
	" and ABS(c2.lat - ca.c_lat) > 0 ";
	sendQuery(queryString, function(result){
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg,resent);
			}
		}
	});
}

function q_1234_more(req, res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var budg = req.query.budget;
	var queryString = "";

	queryString += 
	" WITH po AS( SELECT p_cityName as cn \n"+ 
	" FROM (select p2.p_cityName from popularity p2 \n"+ 
	" ORDER BY p2.visitorNum DESC) \n"+ 
	" Where rownum <21) SELECT c.countryName AS Country, exp.e_cityName AS City \n"+ 
	" FROM (select e_cityName, total from EXPENDITURE) exp JOIN popularity p1 ON exp.e_cityName = p1.p_cityName \n"+ 
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+ 
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+ 
	" JOIN po ON b.b_cityName = po.cn WHERE (exp.total*100/p1.visitorNum)* "+dur+" <= "+budg+" ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg,resent);
			}
		}
	});
}

function q_1235_ssf(req,res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString += 
	" WITH po AS( SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) \n"+
	" WHere rownum <21) SELECT c.countryName AS Country, exp.exp_city AS City\n"+
	" FROM (select e_cityName as exp_city, "+spec+" from EXPENDITURE) exp JOIN belongTo b ON exp.exp_city = b.b_cityName JOIN \n"+
	" Country c ON b.b_countryCode = c.countryCode \n"+
	" JOIN po ON b.b_cityName = po.cn ORDER BY exp."+spec+" DESC ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec,resent);
			}
		}
	});
}

function q_1235_ta(req,res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString += 
	" WITH po AS(SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) \n"+
	" WHere rownum <16) SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN belongTo b ON e.e_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" JOIN po ON b.b_cityName = po.cn ORDER BY e."+spec+" ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec,resent);
			}
		}
	});
}

function q_1236(req, res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var temp = req.query.temperature;
	var queryString = "";

	queryString += 
	" SELECT c.countryName AS Country, t.m_cityName AS City \n"+
	" FROM temperature t JOIN belongTo b ON t.m_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE t.m_cityName IN ( SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) \n"+
	"WHere rownum <21) AND t."+mon+" >= ("+temp+" - 5) AND t."+mon+" <= ("+temp+" + 5) ";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"temperature:"+temp,resent);
			}
		}
	});
}

function q_1237(req, res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var des = req.query.country;
	var queryString = "";

	queryString += 
	"SELECT c.countryName AS Country, b.b_cityName AS City \n"+
	"FROM belongTo b JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE c.countryName like '"+des+"%' AND b.b_cityName IN (SELECT p_cityName \n"+
	" FROM popularity)";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"country:"+des,resent);
			}
		}
	});
}

function q_12345_ssf(req,res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString += 
	"SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN popularity p1 ON e.e_cityName = p1.p_cityName \n"+
	"JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode WHERE (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" \n"+
	" AND e.e_cityName IN ( SELECT p_cityName as cn \n"+
	"FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC)\n"+
	" WHere rownum <21) ORDER BY e."+spec+" DESC ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec,resent);
			}
		}
	});
}

function q_12345_ta(req, res){
	var loc = req.query.location; 
	var mon = req.query.month;
	var dur = req.query.duration;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString += 
	" SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN popularity p1 ON e.e_cityName = p1.p_cityName \n"+
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode WHERE (e.total*100/p1.visitorNum)*"+dur+"<= "+budg+" \n"+
	" AND e.e_cityName IN (SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 \n"+
	" ORDER BY p2.visitorNum DESC) WHere rownum <15) ORDER BY e."+spec+" " ;
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec,resent);
			}
		}
	});
}

function q_12346(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var temp = req.query.temperature;
	var queryString = "";

	queryString += 
	" SELECT c.countryName AS Country, t.m_cityName AS City \n"+
	" FROM temperature t JOIN expenditure e ON t.m_cityName = e.e_cityName \n"+
	" JOIN belongTo b ON e.e_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" JOIN POPULARITY p1 ON p1.p_cityName = b.b_cityName \n"+
	" WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" \n"+
	" AND t.m_cityName IN (SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) WHere rownum <41)" ;
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"temperature:"+temp,resent);
			}
		}
	});

}

function q_12347(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var des = req.query.country;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e \n"+
	" JOIN popularity p1 ON e.e_cityName = p1.p_cityName \n"+
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	"WHERE (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" \n"+
	"AND c.countryName like '"+des+"%' AND e.e_cityName IN \n"+
	"(SELECT p_cityName as cn FROM (select p2.p_cityName from popularity p2 \n"+
	" ORDER BY p2.visitorNum DESC)WHere rownum <41)" ;
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"country:"+des,resent);
			}
		}
	});

}

function q_12356_ssf(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN temperature t ON e.e_cityName = t.m_cityName \n"+
	" JOIN belongTo b ON t.m_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE rownum < 21 AND t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) \n"+
	" AND e.e_cityName IN (SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) \n"+
	" WHere rownum <41) ORDER BY e."+spec+" DESC ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"temperature:"+temp,resent);
			}
		}
	});
}

function q_12356_ta(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City  \n"+
	" FROM expenditure e JOIN temperature t ON e.e_cityName = t.m_cityName \n"+
	" JOIN belongTo b ON t.m_cityName = b.b_cityName  \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode  \n"+
	" WHERE rownum < 21 AND t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5)  \n"+
	" AND e.e_cityName IN FROM (select p2.p_cityName from popularity p2  \n"+
	" ORDER BY p2.visitorNum DESC) WHere rownum <41) ORDER BY e."+spec+" ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"temperature:"+temp,resent);
			}
		}
	});		
}

function q_12357_ssf(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var des = req.query.country;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e JOIN \n"+
	" belongTo b ON e.e_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode AND c.countryName \n"+
	" like '"+des+"%' AND e.e_cityName IN (SELECT p_cityName FROM popularity) \n"+
	" (SELECT p_cityName as cn ORDER BY e."+spec+" DESC ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"country:"+des,resent);
			}
		}
	});	

}

function q_12357_ta(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var des = req.query.country;
	var spec = req.query.specNeeds;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e JOIN belongTo b \n"+
	" ON e.e_cityName = b.b_cityName JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" AND c.countryName like '"+des+"%' AND e.e_cityName IN (SELECT p_cityName FROM popularity) \n"+
	" ORDER BY e."+spec+" ";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"country:"+des,resent);
			}
		}
	});	
}

function q_12367(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var temp = req.query.temperature;
	var des = req.query.country;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, t.m_cityName AS City \n"+
	" FROM temperature t JOIN belongTo b ON t.m_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	"WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND c.countryName like '"+des+"%'";
	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});

		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});	

}

function q_123456_ssf(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN temperature t ON e.e_cityName = t.m_cityName \n"+
	" JOIN popularity p1 ON t.m_cityName = p1.p_cityName \n"+
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE (e.total*100/p1.visitorNum)*"+dur+"<= "+budg+" AND \n"+
	" t."+mon+"  <= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND e.e_cityName \n"+
	" IN (SELECT p2.p_cityName FROM popularity p2)ORDER BY e."+spec+" DESC";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"temperature:"+temp,resent);
			}
		}
	});	

}

function q_123456_ta(req, res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City \n"+
	" FROM expenditure e JOIN temperature t ON e.e_cityName = t.m_cityName \n"+
	" JOIN popularity p1 ON e.e_cityName = p1.p_cityName JOIN \n"+
	" belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" AND \n"+
	" t."+mon+" <= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND e.e_cityName \n"+
	" IN (SELECT p2.p_cityNameFROM popularity p2)\n"+
	"ORDER BY e."+spec+" ";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"temperature:"+temp,resent);
			}
		}
	});	

}

function q_123457_ssf(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var des = req.query.country;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e \n"+
	" JOIN popularity p1 ON e.e_cityName = p1.p_cityName \n"+
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" AND \n"+
	" c.countryName like '"+des+"%' AND e.e_cityName \n"+
	" IN (SELECT p2.p_cityName FROM popularity p2) ORDER BY e."+spec+" DESC";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"country:"+des,resent);
			}
		}
	});		
}

function q_123457_ta(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var budg = req.query.budget;
	var spec = req.query.specNeeds;
	var des = req.query.country;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e  \n"+
	" JOIN popularity p1 ON e.e_cityName = p1.p_cityName  \n"+
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName  \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode  \n"+
	" WHERE (e.total*100/p1.visitorNum)*"+dur+"<= "+budg+" AND  \n"+
	" c.countryName like '"+des+"%' AND e.e_cityName IN (SELECT p2.p_cityName FROM popularity p2) \n"+
	" ORDER BY e."+spec+" ";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"country:"+des,resent);
			}
		}
	});		
}

function q_123467(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var temp = req.query.temperature;
	var des = req.query.country;
    var budg = req.query.budget;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, t.m_cityName AS City FROM temperature t JOIN \n"+
	" expenditure e ON t.m_cityName = e.e_cityName JOIN belongTo b \n"+
	" ON e.e_cityName = b.b_cityNameJOIN Country c ON \n"+
	" b.b_countryCode = c.countryCode JOIN POPULARITY p1 on b.b_cityName = p1.p_cityName \n"+
	" WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) \n"+
	" AND (e.total*100/p1.visitorNum)*"+dur+"<= "+budg+" AND c.countryName like '"+des+"%'";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});	

}

function q_123567_ssf(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var des = req.query.country;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e \n"+
	" JOIN temperature t ON e.e_cityName = t.m_cityName JOIN \n"+
	" belongTo b ON t.m_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND c.countryName like '"+des+"%' \n"+
	" AND e.e_cityName IN (SELECT p_cityName FROM popularity) \n"+
	" ORDER BY e."+spec+" DESC";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});	
}

function q_123567_ta(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var des = req.query.country;

	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, e.e_cityName AS City FROM expenditure e \n"+
	" JOIN temperature t ON e.e_cityName = t.m_cityName JOIN \n"+
	" belongTo b ON t.m_cityName = b.b_cityName JOIN Country c ON \n"+
	" b.b_countryCode = c.countryCode WHERE t."+mon+" >= ("+temp+"-5) AND \n"+
	" t."+mon+" <= ("+temp+"+5) AND c.countryName like '"+des+"%' \n"+
	" AND e.e_cityName IN (SELECT p_cityName FROM popularity) ORDER BY e."+spec+" ";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"specNeeds:"+spec+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});
}

function q_1234567_ssf(req,res){
	console.log("here");
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var des = req.query.country;
	var budg = req.query.budget;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, t.m_cityName AS City FROM temperature t \n"+
	" JOIN expenditure e ON t.m_cityName = e.e_cityName JOIN \n"+
	" belongTo b ON e.e_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+
	" JOIN POPULARITY p1 on b.b_cityName = p1.p_cityName \n"+
	" WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND \n"+
	" (e.total*100/p1.visitorNum)*"+dur+" <= "+budg+" AND c.countryName \n"+
	" like '"+des+"%' AND t.m_cityName IN (SELECT p_cityName FROM popularity) \n"+
	" order by e."+spec+" DESC";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});	
}

function q_1234567_ta(req,res){
	var loc = req.query.location; 
	var dur = req.query.duration;
	var mon = req.query.month;
	var spec = req.query.specNeeds;
	var temp = req.query.temperature;
	var des = req.query.country;
	var budg = req.query.budget;
	var queryString = "";

	queryString +=
	" SELECT c.countryName AS Country, t.m_cityName AS City \n"+
	" FROM temperature t JOIN expenditure e ON t.m_cityName = e.e_cityName \n"+
	" JOIN belongTo b ON e.e_cityName = b.b_cityName \n"+
	" JOIN Country c ON b.b_countryCode = c.countryCode JOIN \n"+
	" POPULARITY p1 on b.b_cityName = p1.p_cityName \n"+
	" WHERE t."+mon+" >= ("+temp+"-5) AND t."+mon+" <= ("+temp+"+5) AND \n"+
	" (e.total*100/p1.visitorNum)*"+dur+"<= "+budg+" AND c.countryName like '"+des+"%' AND t.m_cityName\n"+
	" IN (SELECT p_cityName FROM popularity)order by e."+spec+"";

	sendQuery(queryString, function(result){
		// res.render('result', {data: result.rows});
		if(result.rows[0]===undefined){
			res.json([['No Result Found!','']]);
		}else{
			res.json(result.rows);
			var resent = '';
			for (i = 0; i < result.rows.length; i++) { 
				resent += result.rows[i]+"  ";
			}
			if (req.session.loginUser !== undefined){
				mongodb.addLog(req.session.loginUser, "location:"+loc+" duration:"+dur+"month:"+mon+"budget:"+budg+"specNeeds:"+spec+"temperature:"+temp+"country:"+des,resent);
			}
		}
	});	
}


