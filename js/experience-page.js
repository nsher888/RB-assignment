import {
	isRequired,
	isTwoChar,
	showError,
	showSuccess,
	debounce,
} from "./helpers.js";

const addExperienceBtn = document.querySelector("#add-more-experience");
const form = document.querySelector("#second-page-form");

const position = document.querySelector(".position");
const employer = document.querySelector(".employer");
const workStart = document.querySelector(".work-start");
const workEnd = document.querySelector(".work-end");
const workDescription = document.querySelector(".work-description");

const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");

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

// form.addEventListener(
// 	"input",
// 	debounce(function (e) {
// 		switch (e.target.id) {
// 			case "position":
// 				checkPosition(position);
// 				break;
// 			case "employer":
// 				checkEmployer(employer);
// 				break;
// 			case "work-description":
// 				checkWorkDescription(workDescription);
// 				break;
// 			case "work-start":
// 				checkWorkStart(workStart);
// 				break;
// 			case "work-end":
// 				checkWorkEnd(workEnd);
// 				break;
// 		}
// 	})
// );

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

	let workHistoryArray = [];

	for (let i = 0; i < positions.length; i++) {
		let workHistory = {};
		workHistory["position"] = positions[i].value;
		workHistory["employer"] = employers[i].value;
		workHistory["start_date"] = workStarts[i].value;
		workHistory["due_date"] = workEnds[i].value;
		workHistory["description"] = workDescriptions[i].value;
		workHistoryArray.push(workHistory);
	}

	sessionStorage.setItem("workHistory", JSON.stringify(workHistoryArray));
});

const checkSessionStorage = () => {
	if (sessionStorage.firstName) {
		preName.innerHTML = sessionStorage.firstName;
	}
	if (sessionStorage.surname) {
		preLastName.innerHTML = sessionStorage.surname;
	}
	if (sessionStorage.about) {
		preAboutText.innerHTML = sessionStorage.about;
		preAboutText.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.email) {
		preEmail.innerHTML = sessionStorage.email;
		preEmail.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.telephone) {
		prePhone.innerHTML = sessionStorage.telephone;
		prePhone.previousElementSibling.classList.remove("hidden");
	}
	if (sessionStorage.image) {
		preImage.src = sessionStorage.image;
	}
};

window.onload = function () {
	checkSessionStorage();
	let retrievedWorkHistory = sessionStorage.getItem("workHistory");
	let workHistoryArray = JSON.parse(retrievedWorkHistory);

	if (workHistoryArray) {
		if (workHistoryArray.length > 0) {
			for (let i = 0; i < workHistoryArray.length - 1; i++) {
				addFormGroup();
			}
		}

		const positions = document.querySelectorAll(".position");
		const employers = document.querySelectorAll(".employer");
		const workStarts = document.querySelectorAll(".work-start");
		const workEnds = document.querySelectorAll(".work-end");
		const workDescriptions = document.querySelectorAll(".work-description");

		for (let i = 0; i < workHistoryArray.length; i++) {
			let workHistory = workHistoryArray[i];
			positions[i].value = workHistory.position;
			employers[i].value = workHistory.employer;
			workStarts[i].value = workHistory.start_date;
			workEnds[i].value = workHistory.due_date;
			workDescriptions[i].value = workHistory.description;
		}

		for (let i = 0; i < workHistoryArray.length; i++) {
			let workHistory = workHistoryArray[i];
			const experienceGroup = document.createElement("div");
			experienceGroup.classList.add("pre-experience-group");

			const initials = document.createElement("div");
			initials.classList.add("pre-experience-group__initials");

			const position = document.createElement("p");
			position.classList.add("pre-experience-group__initials__position");
			position.textContent = workHistory.position;
			initials.appendChild(position);

			const employer = document.createElement("p");
			employer.classList.add("pre-experience-group__initials__employer");
			employer.textContent = workHistory.employer;
			initials.appendChild(employer);

			const dates = document.createElement("div");
			dates.classList.add("pre-experience-group__dates");

			const start = document.createElement("p");
			start.classList.add("pre-experience-group__dates__start");
			start.textContent = workHistory.start_date;
			dates.appendChild(start);

			const separator = document.createElement("p");
			separator.textContent = "-";
			dates.appendChild(separator);

			const end = document.createElement("p");
			end.classList.add("pre-experience-group__dates__end");
			end.textContent = workHistory.due_date;
			dates.appendChild(end);

			const description = document.createElement("p");
			description.classList.add("pre-experience-group__description");
			description.textContent = workHistory.description;

			experienceGroup.appendChild(initials);
			experienceGroup.appendChild(dates);
			experienceGroup.appendChild(description);

			const container = document.querySelector(".pre-experience");
			container.appendChild(experienceGroup);
		}
	}

	form.addEventListener("input", () => {
		let retrievedWorkHistory = sessionStorage.getItem("workHistory");
		let workHistoryArray = JSON.parse(retrievedWorkHistory);

		const prePositions = document.querySelectorAll(
			".pre-experience-group__initials__position"
		);

		if (workHistoryArray) {
			for (let i = 0; i < workHistoryArray.length; i++) {
				prePositions[i].textContent = workHistoryArray[i].position;
			}
		}
	});
};
