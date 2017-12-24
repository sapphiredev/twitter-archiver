import Express from 'express';

import Database from '../libs/database';

import session from 'express-session';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const client = Database.client();

const router = Express.Router();

const ttl = 7 * 24 * 3600;

router.use(session({
	'store': new RedisStore({
		'client': client,
		'ttl': ttl,
		'prefix': 'ta:ss:',
	}),
	'cookie': {
		'path': '/',
		'httpOnly': true,
		'secure': process.env.NODE_ENV === 'prod',
		'maxAge': ttl * 1000,
	},
	'secret': process.env.consumer_key,
	'saveUninitialized': true,
	'resave': false,
}));

export default router;