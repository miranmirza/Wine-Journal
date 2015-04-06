var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var parser = require('logic-query-parser');


router.get('/', function(req, res) {
	res.render('index', { title: 'Wine Journal'});
});

router.post('/login', function(req, res) {

	var db = new sqlite3.Database('data/3005DB');
	var sql = "SELECT * FROM consumers WHERE firstName like ? AND lastName like ?;"
	var statement = db.prepare(sql);
	
	statement.get(req.body.input.split(" ", 2), function(err, row) {
		req.session.user = row;
		//console.log(req.session.user.firstName);
		statement.finalize();
		db.close();
	});
	res.render('list', {title: 'Wine Listing', result: ""});
});


router.post('/search', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var sql = "SELECT * FROM wines NATURAL JOIN winery WHERE wineName like ? or type like ?;"// or id like ? or bookcode like ?;";
	var options = [];
	/*var binaryTree = parser.parse(req.body.input);
	var queryRes = parser.utils.binaryTreeToQueryJson(binaryTree);
	var options = [];
	
	if(queryRes['type'] == 'and') {
		sql = "SELECT * FROM songs WHERE title like ? and bookcode like ?;";
		options.push("%" + queryRes.values[0].value + "%");
		options.push("%" + queryRes.values[1].value + "%");
	}
	else {*/
			//}
	for(var i = 0; i < 2; ++i) {
		options.push("%" + req.body.input + "%");			
	}

	var statement = db.prepare(sql);
	statement.all(options, function(err, row) {
      	 res.render('list', { 
      		 title: 'Wine Listing', result: req.body.input, items: row});
		statement.finalize();
		db.close();
	});
});


router.post('/getDataFromID', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var sql = "SELECT * FROM wines WHERE id = ?;";
	
	var statement = db.prepare(sql);
	statement.get(req.body.id, function(err, row) {
		res.send(row);
		statement.finalize();
		db.close();
	});
});


router.post('/getWineryDataFromID', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var sql = "SELECT * FROM winery WHERE wineryID = ?;";
	
	var statement = db.prepare(sql);
	statement.get(req.body.id, function(err, row) {
		res.send(row);
		statement.finalize();
		db.close();
	});
});

router.post('/deleteEntry', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var key = JSON.parse(req.body.data);
	
	var statement = db.prepare("DELETE FROM wines WHERE id=?");
	statement.run(key, function() {
		res.send("Success");
		statement.finalize();
		db.close();
	});

});

router.post('/updateEntry', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');

	var queryString = "UPDATE wines SET wineName= ?, type= ?, year= ?, alcoholContent= ?, country= ?, wineryID= ?, style= ?, varterial= ?, rating =? WHERE id=?;"
	var statement = db.prepare(queryString);
	
	statement.run([req.body.wineName, req.body.wineType, req.body.wineYear, req.body.alcoholContent, req.body.wineCOO, req.body.wineryID, req.body.wineStyle ,req.body.wineVarterial, req.body.wineRating, req.body.wineID], function() {
		queryString = "SELECT * FROM wines WHERE id=" + req.body.wineID + ";";
		db.all(queryString, function(err, row) {
		   	 res.render('list', {title: 'Search Results', result: req.body.wineName, items: row, message: "Your changes have been saved"});
		 });
		 statement.finalize(); 
		 db.close();
	});
});


router.post('/updateWineryEntry', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	
	var queryString = "UPDATE winery SET wineryName= ?, yearFounded= ?, location= ? WHERE wineryID=?;"
	var statement = db.prepare(queryString);
	
	statement.run([req.body.wineryName, req.body.wineryYear, req.body.wineryLocation, req.body.wineryID], function() {
		queryString = "SELECT * FROM winery WHERE wineryID=" + req.body.wineryID + ";";
		db.all(queryString, function(err, row) {
		   	 res.render('list', {title: 'Search Results', result: req.body.wineryName, items: row, message: "Your changes have been saved"});
		 });
		 statement.finalize(); 
		 db.close();
	});
});

router.post('/getFavourites', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var queryString = "SELECT * from consumers JOIN starred ON consumers.id = starred.consumerID JOIN wines on starred.wineID=wines.id NATURAL JOIN winery WHERE starred=1 and consumerID=?;"
	var statement = db.prepare(queryString);

	statement.all(1, function(err, row) {
      	 res.render('list', { 
      		 title: 'Wine Listing', result: req.body.input, items: row});
		statement.finalize();
		db.close();
	});	
});


router.post('/starWine', function(req, res) {
	var db = new sqlite3.Database('data/3005DB');
	var queryString = "INSERT OR IGNORE INTO starred (consumerID, wineID, starred) VALUES (?, ?, COALESCE((SELECT starred FROM starred WHERE consumerID = ? AND wineID = ?), 0));"

	var statement = db.prepare(queryString);
	statement.run([req.body.user, req.body.data, req.body.user, req.body.data], function() {
		queryString = "UPDATE starred SET starred = CASE starred WHEN 1 THEN 0 ELSE 1 END WHERE consumerID=" + req.body.user + " and wineID=" + req.body.data + ";";
		 db.run(queryString, function(err, row) {
			 res.send("done");
	 	
		 });
		 statement.finalize(); 
		 db.close();
	});
});


module.exports = router;
