import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, from, subject, text, html, attachments }) => {
	let msg = { to, from, subject, text, html, attachments };
	console.log(msg);

	return sendgrid.send(msg);
}