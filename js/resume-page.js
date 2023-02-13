const responseData = JSON.parse(sessionStorage.getItem("responseData"));
const resumeWrapper = document.querySelector(".resume__wrapper");

const renderPreEducation = (data) => {
	let feedHtml = "";
	for (let group of data) {
		feedHtml += `<div class="pre-education-group">
        <div class="flex-row gap-08">
            <p class="pre-education-group-title">${group.institute}</p>
            <p class="pre-education-group-degree">${group.degree}</p>
        </div>
        <p class="pre-education-group-date">${group.due_date}</p>
        <p class="pre-education-group-description">${group.description}</p>
    </div>`;
	}

	return feedHtml;
};

const renderPreExperience = (data) => {
	let feedHtml = "";

	for (let group of data) {
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
	}

	return feedHtml;
};

const isAboutHidden = () => {
	if (!responseData.about_me) {
		return "hidden";
	}
};

const renderPreAbout = () => {
	if (responseData.about_me) {
		return `<h4 class="pre-about">ჩემ შესახებ</h4>
        <p class="pre-about-text">
            ${responseData.about_me}
        </p>`;
	} else {
		return `<div style="height: 50px"></div>`;
	}
};

window.onload = function () {
	let finalHtml = `<img class="pre-image" src="https://resume.redberryinternship.ge/${
		responseData.image
	}" />
    <div class="pre-fullname flex-row">
        <h3 class="pre-fname">${responseData.name}</h3>
        <h3 class="pre-lname">${responseData.surname}</h3>
    </div>
    <div class="full-email flex-row">
        <img src="images/atsign.png" alt="" />
        <p class="pre-email">${responseData.email}</p>
    </div>
    <div class="full-phone flex-row">
        <img src="images/phonesign.png" alt="" />
        <p class="pre-phone">${responseData.phone_number}</p>
    </div>

    ${renderPreAbout()}

    <div class="experience__wrapper">
        <h4 class="pre-experience-title">გამოცდილება</h4>
        <div class="pre-experience">${renderPreExperience(
			responseData.experiences
		)}</div>
    </div>

    <div class="educations__wrapper">
        <div class="educations__title">განათლება</div>
        <div class="pre-education">${renderPreEducation(
			responseData.educations
		)}</div>
    </div>`;

	resumeWrapper.innerHTML = finalHtml;
};

const modalCloseBtn = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");

modalCloseBtn.addEventListener("click", () => {
	modal.style.display = "none";
});

const backArrow = document.querySelector("#back-arrow");
backArrow.addEventListener("click", () => {
	window.location.href = "./index.html";
	sessionStorage.clear();
});
