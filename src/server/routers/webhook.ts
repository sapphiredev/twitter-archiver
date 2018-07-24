import crypto from 'crypto';
	
import * as Express from 'express';

import {
	Twitter,
} from '../libs';

const router = Express.Router();

router.get('/', (req, res) => {
	const hmac = crypto.createHmac('sha256', __env.consumer_secret);
	hmac.update(req.query.crc_token);

	res.status(200).json({
		'response_token': `sha256=${hmac.digest('base64')}`,
	});
});

router.get('/set', (req, res) => {
	Twitter.setWebhook();
	res.json(true);
});

export default router;
