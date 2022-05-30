var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
	if (process.env.NODE_ENV === 'production') {
		res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
	} else {
		res.send('Server misconfigured, launch with NODE_ENV=production or start react app');
	}

});



module.exports = router;