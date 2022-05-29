var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
	res.set('Cache-control', 'no-cache');
	if(req.user){  // If user has an active session skip login page
		res.send('Logged In!');
	}else{   // No active session, go to login page
		res.sendFile(path.join(__dirname,'..', 'build', 'index.html'));
	}
});


/* GET home page. */
router.post('/', function (req, res) {
	res.set('Cache-control', 'no-cache');

	console.log('hello');
	res.sendStatus(200);
});


module.exports = router;