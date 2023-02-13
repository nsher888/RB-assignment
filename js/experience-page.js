import {
	isRequired,
	isTwoChar,
	showError,
	showSuccess,
	debounce,
} from "./helpers.js";

const addExperienceBtn = document.querySelector("#add-more-experience");
const form = document.querySelector("#second-page-form");

const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");
const experienceWrapper = document.querySelector(".experience__wrapper");

const backArrow = document.querySelector("#back-arrow");
backArrow.addEventListener("click", () => {
	window.location.href = "./index.html";
	sessionStorage.clear();
});

// Functions for validadtion
const checkPosition = (input) => {
	let valid = false;

	const positionValue = input.value.trim();

	if (!isRequired(positionValue)) {
		showError(input);
	} else if (!isTwoChar(positionValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}
	return valid;
};

const checkEmployer = (input) => {
	let valid = false;

	const employerValue = input.value.trim();

	if (!isRequired(employerValue)) {
		showError(input);
	} else if (!isTwoChar(employerValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

const checkWorkDescription = (input) => {
	let valid = false;

	const workDescriptionValue = input.value.trim();

	if (!isRequired(workDescriptionValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

const checkWorkStart = (input) => {
	let valid = false;

	const workStartValue = input.value.trim();

	if (!isRequired(workStartValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

const checkWorkEnd = (input) => {
	let valid = false;

	const workEndalue = input.value.trim();

	if (!isRequired(workEndalue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

function addFormGroup() {
	const formGroup = document.querySelector(".form-group");
	// Clone the formGroup element
	const clonedFormGroup = formGroup.cloneNode(true);
	const parentElements = clonedFormGroup.querySelectorAll(".input-container");
	parentElements.forEach((element) => {
		const input = element.querySelector("input, textarea");
		const dateInput = element.querySelector(".date-input");
		if (input || dateInput) {
			input.value = "";
			// dateInput.value = "";
			element.classList.remove("successful", "danger");
		}
	});
	// Append the cloned formGroup element to the form
	form.appendChild(clonedFormGroup);
}

addExperienceBtn.addEventListener("click", () => {
	addFormGroup();
});

form.addEventListener("input", (e) => {
	experienceWrapper.style.display = "block";
	const positions = document.querySelectorAll(".position");

	positions.forEach((position) => {
		position.addEventListener(
			"input",
			debounce(function (e) {
				checkPosition(e.target);
			})
		);
	});

	const employers = document.querySelectorAll(".employer");

	employers.forEach((employer) => {
		employer.addEventListener(
			"input",
			debounce(function (e) {
				checkEmployer(e.target);
			})
		);
	});

	const workDescriptions = document.querySelectorAll(".work-description");

	workDescriptions.forEach((workDescription) => {
		workDescription.addEventListener(
			"input",
			debounce(function (e) {
				checkWorkDescription(e.target);
			})
		);
	});

	const workStarts = document.querySelectorAll(".work-start");

	workStarts.forEach((workStart) => {
		workStart.addEventListener(
			"input",
			debounce(function (e) {
				checkWorkStart(e.target);
			})
		);
	});

	const workEnds = document.querySelectorAll(".work-end");

	workEnds.forEach((workEnd) => {
		workEnd.addEventListener(
			"input",
			debounce(function (e) {
				checkWorkEnd(e.target);
			})
		);
	});

	let experiencesrray = [];

	for (let i = 0; i < positions.length; i++) {
		let experiences = {};
		experiences["position"] = positions[i].value;
		experiences["employer"] = employers[i].value;
		experiences["start_date"] = workStarts[i].value;
		experiences["due_date"] = workEnds[i].value;
		experiences["description"] = workDescriptions[i].value;
		experiencesrray.push(experiences);
	}

	sessionStorage.setItem("experiences", JSON.stringify(experiencesrray));
});

const checkSessionStorage = () => {
	if (sessionStorage.name) {
		preName.innerHTML = sessionStorage.name;
	}
	if (sessionStorage.surname) {
		preLastName.innerHTML = sessionStorage.surname;
	}
	if (sessionStorage.about_me) {
		preAboutText.innerHTML = sessionStorage.about_me;
		preAboutText.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.email) {
		preEmail.innerHTML = sessionStorage.email;
		preEmail.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.phone_number) {
		prePhone.innerHTML = sessionStorage.phone_number;
		prePhone.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.image) {
		preImage.src = sessionStorage.image;
	}
};

const renderPreExperience = (data) => {
	let feedHtml = "";

	data.forEach((group) => {
		feedHtml += `<div class="pre-experience-group">
		<div class="pre-experience-group__initials">
			<p class="pre-experience-group__initials__position">${group.position},</p>
			<p class="pre-experience-group__initials__employer">${group.employer}</p>
		</div>

		<div class="pre-experience-group__dates">
			<p class="pre-experience-group__dates__start">${group.start_date}</p>
			<p>-</p>
			<p class="pre-experience-group__dates__end">${group.due_date}</p>
		</div>

		<p class="pre-experience-group__description">${group.description}</p>
	</div>`;
	});

	return feedHtml;
};

const showPreRender = () => {
	let retrievedexperiences = sessionStorage.getItem("experiences");
	let experiencesArray = JSON.parse(retrievedexperiences);
	const preContainer = document.querySelector(".pre-experience");
	preContainer.innerHTML = renderPreExperience(experiencesArray);
};

form.addEventListener("input", () => {
	let retrievedexperiences = sessionStorage.getItem("experiences");
	let experiencesArray = JSON.parse(retrievedexperiences);
	const preContainer = document.querySelector(".pre-experience");
	preContainer.innerHTML = renderPreExperience(experiencesArray);
});

window.onload = function () {
	checkSessionStorage();

	let retrievedexperiences = sessionStorage.getItem("experiences");
	let experiencesArray = JSON.parse(retrievedexperiences);

	if (experiencesArray) {
		experienceWrapper.style.display = "block";

		if (experiencesArray.length > 0) {
			for (let i = 0; i < experiencesArray.length - 1; i++) {
				addFormGroup();
			}
		}

		for (let i = 0; i < experiencesArray.length; i++) {
			let experience = experiencesArray[i];

			const positions = document.querySelectorAll(".position");
			const employers = document.querySelectorAll(".employer");
			const workStarts = document.querySelectorAll(".work-start");
			const workEnds = document.querySelectorAll(".work-end");
			const workDescriptions =
				document.querySelectorAll(".work-description");

			positions[i].value = experience.position;
			employers[i].value = experience.employer;
			workStarts[i].value = experience.start_date;
			workEnds[i].value = experience.due_date;
			workDescriptions[i].value = experience.description;
		}

		showPreRender();
	}
};

const experienceBackBtn = document.querySelector("#experience-back-button");
const experienceNextBtn = document.querySelector("#experience-next-button");

experienceBackBtn.addEventListener("click", (e) => {
	window.location.href = "./personal.html";
});

function checkInput(className, callback) {
	const inputs = document.querySelectorAll(className);
	const results = [];

	inputs.forEach((element) => {
		results.push(callback(element));
	});

	return results;
}

experienceNextBtn.addEventListener("click", () => {
	const positionResults = checkInput(".position", checkPosition);
	const employerResults = checkInput(".employer", checkEmployer);
	const workDescriptionResults = checkInput(
		".work-description",
		checkWorkDescription
	);
	const workStartResults = checkInput(".work-start", checkWorkStart);
	const workEndResults = checkInput(".work-end", checkWorkEnd);

	const isFormValid = [
		...positionResults,
		...employerResults,
		...workDescriptionResults,
		...workStartResults,
		...workEndResults,
	].every((result) => result === true);

	if (isFormValid) {
		window.location.href = "./education.html";
	}
});
