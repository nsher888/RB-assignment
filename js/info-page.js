import {
	isRequired,
	isPhoneValid,
	isEmailValid,
	isGeoAndMin,
	showError,
	showSuccess,
} from "./helpers.js";

// PERSONAL INFO PAGE VALIDATION
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const twoGeorgians = document.querySelectorAll(".twoGeorgian");
const fileInput = document.querySelector("#file");
const aboutText = document.querySelector("#about");
const aboutTextTitle = document.querySelector(".pre-about");
const backArrow = document.querySelector("#back-arrow");
const personalInfoBtn = document.querySelector("#personal-info-btn");
const firstPageForm = document.querySelector("#fisrt-page-form");

const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");

const checkName = () => {
	let valid = false;

	const name = fname.value.trim();
	if (!isRequired(name)) {
		showError(fname);
	} else if (!isGeoAndMin(name)) {
		showError(fname);
	} else {
		showSuccess(fname);
		valid = true;
	}

	return valid;
};

const checkLastName = () => {
	let valid = false;

	const lastName = lname.value.trim();
	if (!isRequired(lastName)) {
		showError(lname);
	} else if (!isGeoAndMin(lastName)) {
		showError(lname);
	} else {
		showSuccess(lname);
		valid = true;
	}

	return valid;
};

const checkEmail = () => {
	let valid = false;

	const emailValue = email.value.trim();

	if (!isRequired(emailValue)) {
		showError(email);
	} else if (!isEmailValid(emailValue)) {
		showError(email);
	} else {
		showSuccess(email);
		valid = true;
	}

	return valid;
};

const checkPhone = () => {
	let valid = false;

	const phoneValue = phone.value.trim();

	if (!isRequired(phoneValue)) {
		showError(phone);
	} else if (!isPhoneValid(phoneValue)) {
		showError(phone);
	} else {
		showSuccess(phone);
		valid = true;
	}

	return valid;
};

const checkFile = () => {
	let valid = false;

	const fileValue = fileInput.files[0];

	if (!fileValue) {
		showError(fileInput);
	} else {
		showSuccess(fileInput);
		valid = true;
	}

	return valid;
};

// Function to add little delay to validation
const debounce = (fn, delay = 150) => {
	let timeoutId;
	return (...args) => {
		// cancel the previous timer
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// setup a new timer
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};

// Listening to changes on form's input elements
firstPageForm.addEventListener(
	"input",
	debounce(function (e) {
		switch (e.target.id) {
			case "fname":
				checkName();
				break;
			case "lname":
				checkLastName();
				break;
			case "email":
				checkEmail();
				break;
			case "phone":
				checkPhone();
				break;
			case "file":
				checkFile();
				break;
		}
	})
);

firstPageForm.addEventListener("submit", function (e) {
	e.preventDefault();

	let isNameValid = checkName(),
		isLastNameValid = checkLastName(),
		isFileValid = checkFile(),
		isEmailValid = checkEmail(),
		isPhoneValid = checkPhone();

	let isFormValid =
		isNameValid &&
		isLastNameValid &&
		isFileValid &&
		isEmailValid &&
		isPhoneValid;

	if (isFormValid) {
		console.log("Form is valid");
	} else {
		console.log("form is Invalid");
	}
});
