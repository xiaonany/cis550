var oracledb = require('oracledb');

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
	console.log(loc);

	console.log("get request : "+loc+" ; "+dur+" ; "+mon+
		" ; "+budg+" ; "+spec+ " ; "+temp+" ; "+des);

	q_123_less(req,res);

	// if (loc && dur && mon) {

	// 	/* 1+2+3 */
	// 	if（ (budg == '') && (spec == '') && (temp == '') && (des == '') ）{
	// 		if ( 1 < dur < 5){
	// 			q_123_less(req, res);
	// 		}
	// 		else {
	// 			q_123_more(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+4 */
	// 	else if ( (budg != '') && (spec == '') && (temp == '') && (des == '') ) {
	// 		if ( 1 < dur < 5){
	// 			q_1234_less(req, res);
	// 		}
	// 		else {
	// 			q_1234_more(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+5 */
	// 	else if( (budg == '') && (spec != '') && (temp == '') && (des == '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_1235_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_1235_ta(req, res);
	// 		}	
	// 	}

	// 	/* 1+2+3+6 */
	// 	else if( (budg == '') && (spec == '') && (temp != '') && (des == '') ) {
	// 			q_1236(req, res);
	// 		}
	// 	}

 //        /* 1+2+3+7 */
	// 	else if( (budg == '') && (spec == '') && (temp == '') && (des != '') ) {
	// 			q_1237(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+4+5 */
	// 	else if( (budg != '') && (spec != '') && (temp == '') && (des == '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_12345_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_12345_ta(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+4+6 */
	// 	else if( (budg != '') && (spec == '') && (temp != '') && (des == '') ) {
	// 			q_12346(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+4+7 */
	// 	else if( (budg != '') && (spec == '') && (temp == '') && (des != '') ) {
	// 			q_12347(req, res);
	// 		}
	// 	}

	// 	/* 1+2+3+5+6 */
	// 	else if( (budg == '') && (spec != '') && (temp != '') && (des == '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_12356_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_12356_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+5+7 */
	// 	else if( (budg == '') && (spec != '') && (temp == '') && (des != '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_12357_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_12357_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+6+7 */
	// 	else if( (budg == '') && (spec == '') && (temp != '') && (des != '') ) {
	// 		q_12367(req, res);
	// 	}	

	// 	/* 1+2+3+4+5+6 */
	// 	else if( (budg == '') && (spec != '') && (temp != '') && (des != '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_123456_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_123456_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+4+5+7 */
	// 	else if( (budg != '') && (spec != '') && (temp == '') && (des != '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_123457_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_123457_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+4+6+7 */
	// 	else if( (budg != '') && (spec == '') && (temp != '') && (des != '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_123467_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_123467_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+5+6+7*/
	// 	else if( (budg == '') && (spec != '') && (temp != '') && (des != '') ) {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_123567_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_123567_ta(req, res);
	// 		}
	// 	}	

	// 	/* 1+2+3+5+6+7 */
	// 	else {
	// 		if ((spec == 'shopping') || (spec == 'services') || (sepc == 'food') ) {
	// 			q_1234567_ssf(req, res);
	// 		}
	// 		else if ((sepc == 'transport') || (spec == 'accommodation')) {
	// 			q_1234567_ta(req, res);
	// 		}
	// 	}	
	}


function q_123_less(req,res){
	var cityName = req.query.location; 
	console.log(cityName);
	var dur = req.query.duration;
	var mon = req.query.month;
	var queryString = "";

	queryString += "WITH loca AS(SELECT c1.Lat AS c_lat, c1.Lon AS c_lon FROM\n"+
				   "City c1 WHERE c1.cityName = '"+cityName+"')\n"+
				   "SELECT c2.cityName FROM City c2,loca ca \n"+
				   "WHERE ABS(c2.Lat - ca.c_lat)<"+dur+" AND ABS(c2.Lon - ca.c_lon)<"+dur+" AND ABS(c2.Lat - ca.c_lat)>0";
	sendQuery(queryString, function(result){
		res.send(result);
	});
}


function q_123_more(res, loc, dur, mon){
	var cityName = req.body.location; 
	var dur = req.body.duration;
	var mon = req.body.month;
	var queryString = ""

	queryString +=
	" WITH po AS( SELECT p_cityName as cn FROM popularity \n" +
	" WHERE rownum < 51 ORDER BY visitorNum DESC ) \n" +
	" SELECT c.countryName AS Country, t.m_cityName AS City \n" + 
	" FROM temperature t JOIN belongTo b ON t.m_cityName = b.b_cityName \n" +
	" JOIN Country c ON b.b_countryCode = c.countryCode \n" +
	" JOIN po ON b.b_cityName = po.cn WHERE t.mon >= 15 AND t.mon <= 25  \n"+ 
	" where t.mon = "+month+" ";
}

function q_123_more(res, loc, dur, mon){
	var cityName = req.body.location; 
	var dur = req.body.duration;
	var mon = req.body.month;
	var queryString = ""

	queryString +=
	" WITH po AS( SELECT p_cityName as cn FROM popularity \n" +
	" WHERE rownum < 51 ORDER BY visitorNum DESC ) \n" +
	" SELECT c.countryName AS Country, t.m_cityName AS City \n" + 
	" FROM temperature t JOIN belongTo b ON t.m_cityName = b.b_cityName \n" +
	" JOIN Country c ON b.b_countryCode = c.countryCode \n" +
	" JOIN po ON b.b_cityName = po.cn WHERE t.mon >= 15 AND t.mon <= 25  \n"+ 
	" where t.mon = "+month+" ";
}

function q_1234_less(res, loc, dur, mon, budg){
	var cityName = req.body.location; 
	var dur = req.body.duration;
	var mon = req.body.month;
	var budg = req.body.budget;
	var queryString = ""

	queryString += 
	" WITH loca AS(SELECT c1.Lat AS c_lat, c1.Lon AS c_lon \n " +
	" FROM City c1 WHERE c1.cityName =  \'"+location+" \') \n "+
	" SELECT c2.cityName FROM City c2 JOIN expenditure e \n" +
	" ON c2.cityName = e.e_cityName JOIN popularity p \n"+ 
	" ON e.e_cityName = p.p_cityName, loca ca \n"+ 
	" WHERE (e.total*100/p.visitorNum)* dur <= budg \n"+ 
	" AND ABS(c2.lat - ca.c_lat) < 20 AND ABS(c2.lon - ca.c_lon) <20 \n"+ 
	" and ABS(c2.lat - ca.c_lat) > 0 \n"+ 
	" where dur = "+duration+" \n"+ 
	" and budg = "+budget+" " ;
}

function q_1234_more(res, loc, dur, mon, budg){
	var cityName = req.body.location; 
	var dur = req.body.duration;
	var mon = req.body.month;
	var budg = req.body.budget;
	var queryString = ""

	queryString += 
	" WITH po AS( SELECT p_cityName as cn \n"+ 
	" FROM (select p2.p_cityName from popularity p2 \n"+ 
	" ORDER BY p2.visitorNum DESC) \n"+ 
	" Where rownum <21) ELECT c.countryName AS Country, e.e_cityName AS City \n"+ 
	" FROM expenditure e JOIN popularity p1 ON e.e_cityName = p1.p_cityName \n"+ 
	" JOIN belongTo b ON p1.p_cityName = b.b_cityName \n"+ 
	" JOIN Country c ON b.b_countryCode = c.countryCode \n"+ 
	" JOIN po ON b.b_cityName = po.cn WHERE (e.total*100/p1.visitorNum)* dur <= budg \n"+
	" where dur = "+duration+" \n"+ 
	" and budg = "+budget+" " ;
}

function q_1235_ssf(res, loc, dur, mon, spec){
	var cityName = req.body.location; 
	var dur = req.body.duration;
	var mon = req.body.month;
	var budg = req.body.budget;
	var spec = req.body.specNeeds;
	var queryString = ""

	queryString += 
	" WITH po AS( SELECT p_cityName as cn \n"+
	" FROM (select p2.p_cityName from popularity p2 ORDER BY p2.visitorNum DESC) \n"+
	" WHere rownum <21) SELECT c.countryName AS Country, e.e_cityName AS City\n"+
	" FROM expenditure e JOIN belongTo b ON e.e_cityName = b.b_cityName JOIN \n"+
	" Country c ON b.b_countryCode = c.countryCode \n"+
	" JOIN po ON b.b_cityName = po.cn ORDER BY e.spec DESC \n"+
	" WHERE spec = "+specNeeds+" ";
}