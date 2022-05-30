var express = require('express');
var router = express.Router();

const mongo = require('../utils/db');

/**
 * Gets the Notes collection
 * @returns The Notes collection from MongoDB
 */
async function _get_message_collection() {
	let db = await mongo.getDb();
	return await db.collection('Messages');
}




router.post('/', (req, res) => {
	console.log(req.body);

	var isNameValid = isValidString(req.body.name);

	var isMessageValid = isValidString(req.body.message);
	console.log(isNameValid, isMessageValid);
	if (isNameValid &&  isMessageValid) {
		insertToDB(req.body);
		res.sendStatus(200);
		return res.end();
	}

	res.status(400).send('bad message');

	
});


function isValidString(str) {
	return str.length > 0;
}


function insertToDB(name, email, phone, message) {
	_get_message_collection().then(collection => {
		collection.insertOne({ name, email, phone, message });
	});
}





module.exports = router;