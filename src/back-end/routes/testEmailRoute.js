import { sendEmail } from '../util/sendEmail';

export const testEmailRoute = {
	path: '/api/test-email',
	method: 'post',
	handler: async (req, res) => {
		try {
			await sendEmail({
				to: 'talk2spencer@gmail.com',
				from: 'spence.codes@gmail.com',
				subject: 'Does this work?',
				text: 'If you\'re reading this, then yes it works',
				html: '<div>some html</div>',
			});
			res.sendStatus(200);
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	}
}