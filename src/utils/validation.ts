export const isEmailValid = (email: string): boolean => {
	let emailRegexValidator =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return emailRegexValidator.test(email);
};

export const isUsernameValid = (username: string): boolean => {
	let usernameRegexValidator = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

	return usernameRegexValidator.test(username);
};

export const isPasswordValid = (password: string): boolean => {
	let passwordRegexValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+={[}\]\\|:;'",<.>\/?`~])[\w!@#$%^&*()_\-+={[}\]\\|:;'",<.>\/?`~]{8,}$/;

	return passwordRegexValidator.test(password);
};

export const isCpfValid = (cpf: string): boolean => {
	if (!/^\d{11}$/.test(cpf)) return false;

	let digits = cpf.split('').map(x => parseInt(x));
	let firstDigit = (digits.reduce((total, digit, index) => (index < 9 ? total + digit * (10 - index) : total), 0) * 10) % 11;
	let secondDigit = ((digits.reduce((total, digit, index) => (index < 9 ? total + digit * (11 - index) : total), 0) + firstDigit * 2) * 10) % 11;

	return firstDigit === digits[9] && secondDigit === digits[10];
};

export const isRgValid = (rg: string): boolean => {
	let rgRegexValidator = /^[a-zA-Z0-9]{9}$/;

	return rgRegexValidator.test(rg);
};

export const isNameValid = (name: string): boolean => {
	let nameRegexValidator = /^[a-zA-Z ]{1,}$/;

	return nameRegexValidator.test(name);
};

export const isPhoneValid = (phone: string): boolean => {
	let nameRegexValidator = /^[0-9]{10,11}$/;

	return nameRegexValidator.test(phone);
};
