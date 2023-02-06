export const isRequired = (value) => (value === "" ? false : true);
export const isGeoAndMin = (input) => {
	const re = /^[ა-ჰ]{2,}$/;
	return re.test(input);
};
export const isEmailValid = (email) => {
	const re = /@redberry\.ge$/;
	return re.test(email);
};

export const isPhoneValid = (phone) => {
	const re = /^(\+?995)?(79\d{7}|5\d{8})$/;
	return re.test(phone);
};

export const showError = (input) => {
	const formField = input.parentElement;

	// Error class
	formField.classList.remove("successful");
	formField.classList.add("danger");
};

export const showSuccess = (input) => {
	const formField = input.parentElement;

	// Remove Error class
	formField.classList.remove("danger");
	formField.classList.add("successful");
};
