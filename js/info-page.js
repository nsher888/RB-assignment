import {
	isRequired,
	isPhoneValid,
	isEmailValid,
	isGeoAndMin,
	showError,
	showSuccess,
	debounce,
} from "./helpers.js";

// PERSONAL INFO PAGE VALIDATION
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const fileInput = document.querySelector("#file");
const aboutText = document.querySelector("#about");
const backArrow = document.querySelector("#back-arrow");
const firstPageForm = document.querySelector("#fisrt-page-form");

const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");

function showHidden(initial, pre) {
	if (initial.value.length > 0) {
		pre.previousElementSibling.classList.remove("hidden");
	}
	pre.innerHTML = initial.value;
}

// backArrow.addEventListener("click", () => {
// 	shouldEraseStorage = true;
// 	sessionStorage.clear();
// });

let shouldEraseStorage = false;
backArrow.addEventListener("click", () => {
	shouldEraseStorage = true;
	window.location.href = "./index.html";
	sessionStorage.clear();
});

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

	if (sessionStorage.image) {
		showSuccess(fileInput);
		valid = true;
	}
	return valid;
};

fileInput.addEventListener("change", () => {
	preImage.style.display = "block";

	const file = fileInput.files[0];
	const objectUrl = URL.createObjectURL(file);
	preImage.src = objectUrl;

	const reader = new FileReader();

	reader.addEventListener("load", () => {
		sessionStorage.setItem("image", reader.result);
	});
	reader.readAsDataURL(file);
});

// Listening to changes on form's input elements
firstPageForm.addEventListener(
	"input",
	debounce(function (e) {
		switch (e.target.id) {
			case "fname":
				checkName();
				preName.innerHTML = fname.value;
				break;
			case "lname":
				checkLastName();
				preLastName.innerHTML = lname.value;
				break;
			case "email":
				checkEmail();
				showHidden(email, preEmail);
				break;
			case "phone":
				checkPhone();
				showHidden(phone, prePhone);
				break;
			case "file":
				checkFile();
				break;
			case "about":
				showHidden(aboutText, preAboutText);
				break;
		}
	})
);

window.onbeforeunload = function () {
	if (!shouldEraseStorage) {
		sessionStorage.setItem("name", fname.value);
		sessionStorage.setItem("surname", lname.value);
		sessionStorage.setItem("about_me", aboutText.value);
		sessionStorage.setItem("email", email.value);
		sessionStorage.setItem("phone_number", phone.value);
	}
};

window.onload = function () {
	if (sessionStorage.name) {
		fname.value = sessionStorage.name;
		preName.innerHTML = sessionStorage.name;
	}
	if (sessionStorage.surname) {
		lname.value = sessionStorage.surname;
		preLastName.innerHTML = sessionStorage.surname;
	}
	if (sessionStorage.about_me) {
		aboutText.value = sessionStorage.about_me;
		preAboutText.innerHTML = sessionStorage.about_me;
		preAboutText.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.email) {
		email.value = sessionStorage.email;
		preEmail.innerHTML = sessionStorage.email;
		preEmail.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.phone_number) {
		phone.value = sessionStorage.phone_number;
		prePhone.innerHTML = sessionStorage.phone_number;
		prePhone.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.image) {
		preImage.style.display = "block";

		preImage.src = sessionStorage.image;
	}
};

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
		window.location.href = "./experience.html";
	}
});
