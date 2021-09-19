export const isEmailValid = (email: string): boolean => {
	let emailRegexValidator =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return emailRegexValidator.test(email);
};

export const isCpfValid = (cpf: string): boolean => {
	if (!/^\d{11}$/.test(cpf)) return false;

	let digits = cpf.split('').map(x => parseInt(x));
	let firstDigit =
		(digits.reduce((total, digit, index) => (index < 9 ? total + digit * (10 - index) : total), 0) * 10) % 11;
	let secondDigit =
		((digits.reduce((total, digit, index) => (index < 9 ? total + digit * (11 - index) : total), 0) +
			firstDigit * 2) *
			10) %
		11;

	return firstDigit === digits[9] && secondDigit === digits[10];
};
