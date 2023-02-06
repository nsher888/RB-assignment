// import {
// 	isRequired,
// 	isPhoneValid,
// 	isEmailValid,
// 	isGeoAndMin,
// 	showError,
// 	showSuccess,
// } from "./helpers.js";

// // PERSONAL INFO PAGE VALIDATION
// const fname = document.querySelector("#fname");
// const lname = document.querySelector("#lname");
// const email = document.querySelector("#email");
// const phone = document.querySelector("#phone");
// const twoGeorgians = document.querySelectorAll(".twoGeorgian");
// const fileInput = document.querySelector("#file");
// const aboutText = document.querySelector("#about");
// const aboutTextTitle = document.querySelector(".pre-about");
// const backArrow = document.querySelector("#back-arrow");
// const personalInfoBtn = document.querySelector("#personal-info-btn");
// const firstPageForm = document.querySelector("#fisrt-page-form");

// // // PREVIEW ELEMENTS
// const preImage = document.querySelector(".pre-image");
// const preName = document.querySelector(".pre-fname");
// const preLastName = document.querySelector(".pre-lname");
// const preEmail = document.querySelector(".pre-email");
// const prePhone = document.querySelector(".pre-phone");
// const preAboutText = document.querySelector(".pre-about-text");

// // ERASE STORAGE ON BACK ARROW CLICK

// let shouldEraseStorage = false;
// backArrow.addEventListener("click", () => {
// 	shouldEraseStorage = true;
// 	sessionStorage.clear();
// });

// // REGEX FOR VALIDATION
// const cr_twoGeorgian = /^[ა-ჰ]{2,}$/;
// const cr_mail = /@redberry\.ge$/;
// const cr_phone = /^(\+?995)?(79\d{7}|5\d{8})$/;

// // FUNCTION FOR VALIDATION, WHICH TAKES INPUT AND REGEX CRITERIA
// function validateInput(input, criteria) {
// 	return criteria.test(input.value);
// }

// function showHidden(initial, pre) {
// 	if (initial.value.length > 0) {
// 		pre.previousElementSibling.classList.remove("hidden");
// 	}
// 	pre.innerHTML = initial.value;
// }

// twoGeorgians.forEach((input) => {
// 	input.addEventListener("input", (i) => {
// 		if (!validateInput(input, cr_twoGeorgian)) {
// 			phone.parentElement.classList.remove("successful");
// 			input.parentElement.classList.add("danger");
// 		} else {
// 			input.parentElement.classList.remove("danger");
// 			input.parentElement.classList.add("successful");
// 		}
// 	});
// });

// fname.addEventListener("input", () => {
// 	preName.innerHTML = fname.value;
// });

// lname.addEventListener("input", () => {
// 	preLastName.innerHTML = lname.value;
// });

// const checkEmail = () => {
// 	let valid = false;

// 	if (!validateInput(email, cr_mail)) {
// 		email.parentElement.classList.add("danger");
// 	} else {
// 		email.parentElement.classList.remove("danger");
// 		email.parentElement.classList.add("successful");
// 		valid = true;
// 	}

// 	return valid;
// };

// email.addEventListener("input", () => {
// 	showHidden(email, preEmail);
// 	checkEmail();
// });

// phone.addEventListener("input", () => {
// 	showHidden(phone, prePhone);

// 	if (!validateInput(phone, cr_phone)) {
// 		phone.parentElement.classList.add("danger");
// 	} else {
// 		phone.parentElement.classList.remove("danger");
// 		phone.parentElement.classList.add("successful");
// 	}
// });

// fileInput.addEventListener("change", () => {
// 	const file = fileInput.files[0];
// 	const objectUrl = URL.createObjectURL(file);
// 	preImage.src = objectUrl;

// 	const reader = new FileReader();

// 	reader.addEventListener("load", () => {
// 		sessionStorage.setItem("image", reader.result);
// 	});
// 	reader.readAsDataURL(file);
// });

// aboutText.addEventListener("input", () => {
// 	showHidden(aboutText, preAboutText);
// });

// window.onbeforeunload = function () {
// 	if (!shouldEraseStorage) {
// 		sessionStorage.setItem("firstName", fname.value);
// 		sessionStorage.setItem("surname", lname.value);
// 		sessionStorage.setItem("about", aboutText.value);
// 		sessionStorage.setItem("email", email.value);
// 		sessionStorage.setItem("telephone", phone.value);
// 	}
// };

// window.onload = function () {
// 	if (sessionStorage.firstName) {
// 		fname.value = sessionStorage.firstName;
// 		preName.innerHTML = sessionStorage.firstName;
// 	}
// 	if (sessionStorage.surname) {
// 		lname.value = sessionStorage.surname;
// 		preLastName.innerHTML = sessionStorage.surname;
// 	}
// 	if (sessionStorage.about) {
// 		aboutText.value = sessionStorage.about;
// 		preAboutText.innerHTML = sessionStorage.about;
// 		preAboutText.previousElementSibling.classList.remove("hidden");
// 	}
// 	if (sessionStorage.email) {
// 		email.value = sessionStorage.email;
// 		preEmail.innerHTML = sessionStorage.email;
// 		preEmail.previousElementSibling.classList.remove("hidden");
// 	}
// 	if (sessionStorage.telephone) {
// 		phone.value = sessionStorage.telephone;
// 		prePhone.innerHTML = sessionStorage.telephone;
// 		prePhone.previousElementSibling.classList.remove("hidden");
// 	}
// 	if (sessionStorage.image) {
// 		preImage.src = sessionStorage.image;
// 	}
// };

// personalInfoBtn.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	const emailValidation = checkEmail;

// 	let isFormValid = emailValidation;

// 	if (isFormValid) {
// 		console.log("valid");
// 	}
// });
