import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
	service: 'Outlook',
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

export const sendEmail = (data: { email: string; subject: string; htmlBody: string }) =>
	transport.sendMail({
		from: `"API Template" <${process.env.EMAIL_USERNAME}>`,
		to: data.email,
		subject: data.subject,
		html: data.htmlBody,
	});

export const sendConfirmationEmail = (name: string, email: string, confirmationCode: string) =>
	sendEmail({
		email: email,
		subject: 'Confirme a sua conta',
		htmlBody: `<h3>API Template - Email de Confirmação</h3>
		</br>
		<p>Olá ${name},</p>
		<p>Obrigado por se cadastrar. Por favor confirme o seu email clicando
		<a href=http://localhost:3000/api/auth/confirm/${confirmationCode}>aqui</a>.</p>`,
	});
