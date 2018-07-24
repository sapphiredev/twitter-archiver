import crypto from 'crypto';
	
import * as Express from 'express';

import {
	Twitter,
} from '../libs';

const router = Express.Router();

const hmac = crypto.createHmac('sha256', __env.consumer_secret);

router.get('/', (req, res) => {
	hmac.update(req.params.crc_token);

	res.json({
		'response_token': hmac.digest('hex'),
	});
});

router.get('/set', (req, res) => {
	Twitter.setWebhook();
	res.json(true);
});

export default router;
