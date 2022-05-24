var express = require('express');
var session = require('express-session');
var passport = require('passport');

var path = require('path');
const mongo = require('./utils/db.js');
const { homepageLimiter, signupLimiter, limiter, loginLimiter } = require('./utils/ratelimit.js');
const MongoStore = require('connect-mongo');

/* Import Routers */
var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');
var cache = require('./utils/cache.js');

/* declare global app */
var app = express();

/* declare global app */
app.use(session({
	name: process.env.DBNAME + parseInt((Math.random() * 10000), 10), // Just need to have diffrent names on instances running onn the same machine 1/10000 are good odds
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	rolling: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_CONNSTRING,
		dbName: process.env.DBNAME
	})
}));

app.use(passport.authenticate('session'));

app.use(cache);

app.use(express.static(path.join(__dirname, '/view/static'), { dotfiles: 'allow' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Apply the rate limiting middleware
app.get('/', homepageLimiter);
app.post('/signup', signupLimiter);
app.use('/signup', limiter);
app.get('/login/password', loginLimiter);


/* Use Routers */
app.use('/', indexRouter);
app.use('/', authRouter);


app.post('/message', (req, res) => {
	console.log(req.body);
	res.sendStatus(200);
});

/* Connect to the DB */
async function tryConnectDB() {
	try {
		await mongo.connectToDB();
	} catch (err) {
		throw new Error('Could not connect to DB!');
	}
	return true;
}
tryConnectDB();

process.on('SIGINT', () => {
	mongo.closeDBConnection().then(() => {
		console.log('Database connection closed');
	});
});

module.exports = app;