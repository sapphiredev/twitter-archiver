import * as Express from 'express';

import {
	Database,
} from '../libs';

const router = Express.Router();

router.get('/tweets/:id', (_, res) => {
	Database.getTweets('1').then((tweets) => {
		res.json(tweets);
	}).catch((err) => {
		res.status(500).json(err);
	});
});

router.get('/check/:id', (_, res) => {
	Database.getLatestTweet();
	res.json(1);
});

export default router;