// PERSONAL INFO PAGE VALIDATION
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const twoGeorgians = document.querySelectorAll(".twoGeorgian");
const fileInput = document.querySelector("#file");
const aboutText = document.querySelector("#about");
const aboutTextTitle = document.querySelector(".pre-about");

// PREVIEW ELEMENTS
const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");

// REGEX FOR VALIDATION
const cr_twoGeorgian = /^[ა-ჰ]{2,}$/;
const cr_mail = /@redberry\.ge$/;
const cr_phone = /^(\+?995)?(79\d{7}|5\d{8})$/;

// FUNCTION FOR VALIDATION, WHICH TAKES INPUT AND REGEX CRITERIA
function validateInput(input, criteria) {
	return criteria.test(input.value);
}

twoGeorgians.forEach((input) => {
	input.addEventListener("input", (i) => {
		if (!validateInput(input, cr_twoGeorgian)) {
			phone.parentElement.classList.remove("successful");
			input.parentElement.classList.add("danger");
		} else {
			input.parentElement.classList.remove("danger");
			input.parentElement.classList.add("successful");
		}
	});
});

fname.addEventListener("input", () => {
	preName.innerHTML = fname.value;
});

lname.addEventListener("input", () => {
	preLastName.innerHTML = lname.value;
});

email.addEventListener("input", () => {
	if (email.value.length > 0) {
		preEmail.previousElementSibling.classList.remove("hidden");
	}
	preEmail.innerHTML = email.value;

	if (!validateInput(email, cr_mail)) {
		email.parentElement.classList.add("danger");
	} else {
		email.parentElement.classList.remove("danger");
		email.parentElement.classList.add("successful");
	}
});

phone.addEventListener("input", () => {
	if (phone.value.length > 0) {
		prePhone.previousElementSibling.classList.remove("hidden");
	}
	prePhone.innerHTML = phone.value;
	if (!validateInput(phone, cr_phone)) {
		phone.parentElement.classList.add("danger");
	} else {
		phone.parentElement.classList.remove("danger");
		phone.parentElement.classList.add("successful");
	}
});

fileInput.addEventListener("change", () => {
	const file = fileInput.files[0];
	const objectUrl = URL.createObjectURL(file);
	preImage.src = objectUrl;
});

aboutText.addEventListener("input", () => {
	if (aboutText.value.length > 0) {
		aboutTextTitle.classList.remove("hidden");
	}
	preAboutText.innerHTML = aboutText.value;
});
