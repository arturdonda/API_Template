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

export const sendAccountConfirmationEmail = (name: string, email: string, confirmationCode: string) =>
	sendEmail({
		email: email,
		subject: 'Confirme a sua conta',
		htmlBody: `<h3>API Template - Email de Confirmação</h3>
		</br>
		<p>Olá ${name},</p>
		<p>Obrigado por se cadastrar. Por favor confirme o seu email clicando
		<a href=http://localhost:3000/api/auth/confirm/${confirmationCode}>aqui</a>.</p>`,
	});

export const sendPasswordChangeRequestEmail = (email: string, resetToken: string) =>
	sendEmail({
		email: email,
		subject: 'Link para alterar a senha',
		htmlBody: `<p>Olá,</p>
		<p>&nbsp;</p>
		<p>Foi solicitada a alteração da sua senha. <a href="http://localhost:3000/api/auth/reset/${resetToken}" target="_blank">Clique aqui</a> para alterá-la (link válido por ${process.env.RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES} minutos).</p>
		<p>Caso você não tenha solicitado a alteração da senha, por favor desconsidere este email.</p>`,
	});

export const sendPasswordChangeConfirmationEmail = (name: string, email: string) =>
	sendEmail({
		email: email,
		subject: 'A sua senha foi alterada',
		htmlBody: `<p>Olá ${name},</p>
		<p>&nbsp;</p>
		<p>A sua senha foi alterada recentemente. Se você não solicitou esta alteração, <a href="www.google.com.br">clique aqui</a> para alterá-la imediatamente.</p>`,
	});
