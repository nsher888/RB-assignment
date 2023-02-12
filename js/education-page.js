import {
	isRequired,
	isTwoChar,
	debounce,
	showError,
	showSuccess,
} from "./helpers.js";

// import axios from "axios";

const preImage = document.querySelector(".pre-image");
const preName = document.querySelector(".pre-fname");
const preLastName = document.querySelector(".pre-lname");
const preEmail = document.querySelector(".pre-email");
const prePhone = document.querySelector(".pre-phone");
const preAboutText = document.querySelector(".pre-about-text");

const addEducationBtn = document.querySelector("#add-more-education");
const form = document.querySelector("#third-page-form");

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

// Getting data for select menu

async function fetchDegrees() {
	const response = await fetch(
		"https://resume.redberryinternship.ge/api/degrees"
	);
	const data = await response.json();
	const selects = document.querySelectorAll(".degree");
	for (const select of selects) {
		for (const degree of data) {
			const option = document.createElement("option");
			option.id = degree.id;
			option.value = degree.title;
			option.text = degree.title;
			select.appendChild(option);
		}
	}
}

const renderExperiences = () => {
	checkSessionStorage();

	const renderPreExperience = (data) => {
		let feedHtml = "";

		data.forEach((group) => {
			feedHtml += `<div class="pre-experience-group">
            <div class="pre-experience-group__initials">
                <p class="pre-experience-group__initials__position">${group.position}</p>
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

	showPreRender();
};

const checkSchool = (input) => {
	let valid = false;

	const schoolValue = input.value.trim();

	if (!isRequired(schoolValue)) {
		showError(input);
	} else if (!isTwoChar(schoolValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}
	return valid;
};

const checkDegree = (input) => {
	let valid = false;

	const degreeValue = input.value;

	// if (!isRequired(degreeValue)) {
	// 	showError(input);
	// } else {
	// 	showSuccess(input);
	// 	valid = true;
	// }

	console.log(input.value);

	if (input.value === "") {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

const checkSchoolEndDate = (input) => {
	let valid = false;

	const schoolEndDateValue = input.value.trim();

	if (!isRequired(schoolEndDateValue)) {
		showError(input);
	} else {
		showSuccess(input);
		valid = true;
	}

	return valid;
};

const checkSchoolDescription = (input) => {
	let valid = false;

	const schoolDescriptionValue = input.value.trim();

	if (!isRequired(schoolDescriptionValue)) {
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

addEducationBtn.addEventListener("click", () => {
	addFormGroup();
});

form.addEventListener("input", () => {
	const schools = document.querySelectorAll(".school");

	schools.forEach((school) => {
		school.addEventListener(
			"input",
			debounce(function (e) {
				checkSchool(e.target);
			})
		);
	});

	const degrees = document.querySelectorAll(".degree");

	degrees.forEach((degree) => {
		degree.addEventListener(
			"input",
			debounce(function (e) {
				checkDegree(e.target);
			})
		);
	});

	const schoolEndDates = document.querySelectorAll(".school-end-date");

	schoolEndDates.forEach((schoolenddate) => {
		schoolenddate.addEventListener(
			"input",
			debounce(function (e) {
				checkSchoolEndDate(e.target);
			})
		);
	});

	const schoolDescriptions = document.querySelectorAll(
		".education-description"
	);

	schoolDescriptions.forEach((schoolDesc) => {
		schoolDesc.addEventListener(
			"input",
			debounce(function (e) {
				checkSchoolDescription(e.target);
			})
		);
	});

	let experiencesArray = [];

	for (let i = 0; i < schools.length; i++) {
		let educations = {};
		let selectedIndex = degrees[i].selectedIndex;
		educations["institute"] = schools[i].value;
		educations["degree"] = degrees[i].value;
		educations["degree_id"] = selectedIndex;
		educations["due_date"] = schoolEndDates[i].value;
		educations["description"] = schoolDescriptions[i].value;
		experiencesArray.push(educations);
	}

	sessionStorage.setItem("educations", JSON.stringify(experiencesArray));
});

const renderPreEducation = (data) => {
	let feedHtml = "";

	data.forEach((group) => {
		feedHtml += `<div class="pre-education-group">
        <div class="flex-row gap-08">
            <p class="pre-education-group-title">${group.institute}</p>
            <p class="pre-education-group-degree">${group.degree}</p>
        </div>
        <p class="pre-education-group-date">${group.due_date}</p>
        <p class="pre-education-group-description">${group.description}</p>
    </div>`;
	});

	return feedHtml;
};

const showPreRender = () => {
	let retrieveEducation = sessionStorage.getItem("educations");
	let educationArray = JSON.parse(retrieveEducation);
	const preContainer = document.querySelector(".pre-education");
	preContainer.innerHTML = renderPreEducation(educationArray);
};

form.addEventListener("input", () => {
	let retrieveEducation = sessionStorage.getItem("educations");
	let educationArray = JSON.parse(retrieveEducation);
	const preContainer = document.querySelector(".pre-education");
	preContainer.innerHTML = renderPreEducation(educationArray);
});

window.onload = function () {
	let retrieveEducation = sessionStorage.getItem("educations");
	let educationArray = JSON.parse(retrieveEducation);
	fetchDegrees();
	renderExperiences();

	if (educationArray) {
		if (educationArray.length > 0) {
			for (let i = 0; i < educationArray.length - 1; i++) {
				addFormGroup();
			}
		}

		for (let i = 0; i < educationArray.length; i++) {
			let educationHistory = educationArray[i];

			const schools = document.querySelectorAll(".school");
			const degrees = document.querySelectorAll(".degree");
			const descriptions = document.querySelectorAll(
				".education-description"
			);
			const schoolDates = document.querySelectorAll(".school-end-date");

			schools[i].value = educationHistory.institute;
			degrees[i].value = educationHistory.degree;
			descriptions[i].value = educationHistory.description;
			schoolDates[i].value = educationHistory.due_date;
		}

		showPreRender();
	}
};

const educationBackBtn = document.querySelector("#education-back-button");
const educationNextBtn = document.querySelector("#education-next-button");

educationBackBtn.addEventListener("click", (e) => {
	window.location.href = "/experience.html";
});

function checkInput(className, callback) {
	const inputs = document.querySelectorAll(className);
	const results = [];

	inputs.forEach((element) => {
		results.push(callback(element));
	});

	return results;
}

educationNextBtn.addEventListener("click", () => {
	const schoolResults = checkInput(".school", checkSchool);
	const degreeResults = checkInput(".degree", checkDegree);
	const schoolDescriptionResults = checkInput(
		".education-description",
		checkSchoolDescription
	);
	const schoolEndResults = checkInput(".school-end-date", checkSchoolEndDate);

	const isFormValid = [
		...schoolResults,
		...degreeResults,
		...schoolDescriptionResults,
		...schoolEndResults,
	].every((result) => result === true);

	if (isFormValid) {
		var data = {};
		for (var key in sessionStorage) {
			if (
				sessionStorage.hasOwnProperty(key) &&
				key !== "IsThisFirstTime_Log_From_LiveServer"
			) {
				if (key === "experiences" || key === "educations") {
					let parsed = JSON.parse(sessionStorage.getItem(key));
					parsed.forEach((item) => {
						delete item.degree;
					});
					data[key] = parsed;
				} else if (key === "image") {
					let image = sessionStorage.getItem(key);
					let contentType = "image/png"; // you can change it to match the actual image type
					let blob = base64ToBlob(image, contentType);
					data[key] = blob;
				} else {
					data[key] = sessionStorage.getItem(key);
				}
			}
		}

		console.log(data);

		axios
			.post("https://resume.redberryinternship.ge/api/cvs", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => console.error(error));
	}

	function base64ToBlob(base64) {
		let byteString = atob(base64.split(",")[1]);
		let mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
		let arrayBuffer = new ArrayBuffer(byteString.length);
		let _ia = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			_ia[i] = byteString.charCodeAt(i);
		}
		let dataView = new DataView(arrayBuffer);
		let blob = new Blob([dataView], { type: mimeString });
		return blob;
	}
});
