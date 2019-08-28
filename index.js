const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { mongoDBUrl, secretKey } = require('./config');

const urls = ['http://localhost:3000', 'https://react-triathlon.herokuapp.com/'];

const app = express();
app.use(
	cors({
		credentials: true,
		origin: urls,
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'X-Forwarded-Proto',
			'Cookie',
			'Set-Cookie'
		],
		exposedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'X-Forwarded-Proto',
			'Cookie',
			'Set-Cookie'
		]
	})
);

if (process.env.NODE_ENV === 'dev') {
	app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(
	session({
		secret: secretKey,
		resave: false,
		saveUninitialized: false,
		name: 'sessionId',
		cookie: {
			secure: false,
			maxAge: 24 * 60 * 60 * 1000 * 7
		},
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport')(passport);

mongoose.connect(mongoDBUrl, { useCreateIndex: true, useNewUrlParser: true });

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const auth = require('./routes/auth');
const event = require('./routes/event');
const eventUsers = require('./routes/eventUser');
const users = require('./routes/users');
const gallery = require('./routes/gallery');
const results = require('./routes/results');
const feedbacks = require('./routes/feedback');

app.use('/api/v1/auth', auth);
app.use('/api/v1/event', event);
app.use('/api/v1/eventUsers', eventUsers);
app.use('/api/v1/users', users);
app.use('/api/v1/gallery', gallery);
app.use('/api/v1/results', results);
app.use('/api/v1/feedback', feedbacks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
