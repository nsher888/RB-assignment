// PERSONAL INFO PAGE VALIDATION
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const twoGeorgians = document.querySelectorAll(".twoGeorgian");

// REGEX FOR VALIDATION
const cr_twoGeorgian = /^[ა-ჰ]{2,}$/;
const cr_mail = /@redberry\.ge$/;
const cr_phone = /^(\+?995)?(79\d{7}|5\d{8})$/;

// FUNCTION FOR VALIDATION, WHICH TAKES INPUT AND REGEX CRITERIA
function validateInput(input, criteria) {
	return criteria.test(input.value);
}

twoGeorgians.forEach((input) => {
	input.addEventListener("input", () => {
		if (!validateInput(input, cr_twoGeorgian)) {
			input.parentElement.classList.add("danger");
		} else {
			input.parentElement.classList.remove("danger");
			input.parentElement.classList.add("successful");
		}
	});
});

email.addEventListener("input", () => {
	if (!validateInput(email, cr_mail)) {
		email.parentElement.classList.add("danger");
	} else {
		email.parentElement.classList.remove("danger");
		email.parentElement.classList.add("successful");
	}
});

phone.addEventListener("input", () => {
	if (!validateInput(phone, cr_phone)) {
		phone.parentElement.classList.add("danger");
	} else {
		phone.parentElement.classList.remove("danger");
		phone.parentElement.classList.add("successful");
	}
});
