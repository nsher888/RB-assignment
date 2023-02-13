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
const backArrow = document.querySelector("#back-arrow");
const educationWrapper = document.querySelector(".educations__wrapper");

const addEducationBtn = document.querySelector("#add-more-education");
const form = document.querySelector("#third-page-form");

backArrow.addEventListener("click", () => {
	window.location.href = "./index.html";
	sessionStorage.clear();
});

const checkSessionStorage = () => {
	if (sessionStorage.name) {
		preName.innerHTML = sessionStorage.name;
	}
	if (sessionStorage.name) {
		preLastName.innerHTML = sessionStorage.name;
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
	educationWrapper.style.display = "block";
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

const checkForPadding = () => {
	const infoWrapper = document.querySelector(".info__wrapper");
	const preAbout = document.querySelector(".pre-about");

	if (preAbout.classList.contains("hidden")) {
		infoWrapper.classList.add("mb-12");
	}
};

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
	checkForPadding();

	fetchDegrees();
	renderExperiences();

	if (educationArray) {
		educationWrapper.style.display = "block";

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
	window.location.href = "./experience.html";
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

		// Add name
		data["name"] = sessionStorage.getItem("name");

		// Add lastname
		data["surname"] = sessionStorage.getItem("surname");

		// Add email
		data["email"] = sessionStorage.getItem("email");

		// Add phone_number
		data["phone_number"] = sessionStorage.getItem("phone_number");

		// Add experiences
		let experiences = JSON.parse(sessionStorage.getItem("experiences"));
		let filteredExperiences = experiences.map((exp) => {
			return {
				position: exp.position,
				employer: exp.employer,
				start_date: exp.start_date,
				due_date: exp.due_date,
				description: exp.description,
			};
		});
		data["experiences"] = filteredExperiences;

		// Add educations
		let educations = JSON.parse(sessionStorage.getItem("educations"));
		let filteredEducations = educations.map((edu) => {
			return {
				institute: edu.institute,
				degree_id: edu.degree_id,
				due_date: edu.due_date,
				description: edu.description,
			};
		});
		data["educations"] = filteredEducations;

		// Add image
		let image = sessionStorage.getItem("image");
		let contentType = "image/png";
		let blob = base64ToBlob(image, contentType);
		data["image"] = blob;

		// Add about_me if it exists
		if (sessionStorage.getItem("about_me")) {
			data["about_me"] = sessionStorage.getItem("about_me");
		}

		axios
			.post("https://resume.redberryinternship.ge/api/cvs", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.status === 201) {
					window.location.href = "./resume.html";
					const responseData = response.data;
					sessionStorage.clear();

					sessionStorage.setItem(
						"responseData",
						JSON.stringify(responseData)
					);
				}
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
