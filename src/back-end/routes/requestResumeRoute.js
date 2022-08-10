import express from 'express';
import { sendEmail } from '../../util/sendEmail';

var router = express.Router();

async function sendRequestEmail(email){

	const data = {
		to: 'spencerperkinsatl@gmail.com',
		from: 'spence.codes@gmail.com',
		subject: `Request for resume`,
		text: `
			Please view in HTML
		`,
		html: `
			<p>Your resume has been requested to be sent to ${email}</p>
		`,
	};
	sendEmail(data);
}



export const requestResumeRoute = {
	path: '/api/request-resume',
	method: 'post',
	handler: async (req, res) => {

		try{
			const { email } = req.body;	
			sendRequestEmail(email);	
			return res.sendStatus(200);					
		} catch (e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}
}

