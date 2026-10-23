const donorForm = document.getElementById("donorForm");

if (donorForm) {
    donorForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const age = Number(document.getElementById("age").value);
        const bloodGroup = document.getElementById("bloodGroup").value;
        const city = document.getElementById("city").value.trim();
        const message = document.getElementById("message");

        if (name.length < 3) {
            message.innerHTML =
                '<div class="alert alert-danger">Please enter a valid name.</div>';
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            message.innerHTML =
                '<div class="alert alert-danger">Please enter a valid email address.</div>';
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            message.innerHTML =
                '<div class="alert alert-danger">Phone number must contain exactly 10 digits.</div>';
            return;
        }

        if (age < 18 || age > 65) {
            message.innerHTML =
                '<div class="alert alert-danger">Age must be between 18 and 65.</div>';
            return;
        }

        if (bloodGroup === "") {
            message.innerHTML =
                '<div class="alert alert-danger">Please select a blood group.</div>';
            return;
        }

        if (city.length < 2) {
            message.innerHTML =
                '<div class="alert alert-danger">Please enter a valid city.</div>';
            return;
        }

        const donorData = {
            name: name,
            email: email,
            phone: phone,
            age: age,
            bloodGroup: bloodGroup,
            city: city
        };

        try {
            const response = await fetch("http://localhost:5000/api/donors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donorData)
            });

            const data = await response.json();

            if (response.ok) {
                message.innerHTML =
                    `<div class="alert alert-success">${data.message}</div>`;

                donorForm.reset();
            } else {
                message.innerHTML =
                    `<div class="alert alert-danger">${data.message}</div>`;
            }

        } catch (error) {
            message.innerHTML =
                '<div class="alert alert-danger">Unable to connect to the server.</div>';

            console.error(error);
        }
    });
}
const donorList = document.getElementById("donorList");
const bloodFilter = document.getElementById("bloodFilter");

let allDonors = [];

if (donorList) {
    loadDonors();
}

async function loadDonors() {
    try {
        const response = await fetch("http://localhost:5000/api/donors");

        allDonors = await response.json();

        displayDonors(allDonors);

    } catch (error) {
        donorList.innerHTML =
            '<div class="alert alert-danger">Unable to load donors.</div>';

        console.error(error);
    }
}

function displayDonors(donors) {

    if (donors.length === 0) {
        donorList.innerHTML =
            '<div class="alert alert-warning text-center">No donors found.</div>';
        return;
    }

    donorList.innerHTML = donors.map(donor => `
        <div class="col-md-6 col-lg-4">
            <div class="card donor-card h-100 shadow-sm">
                <div class="card-body">

                    <h5 class="card-title text-danger">
                        🩸 ${donor.bloodGroup}
                    </h5>

                    <p class="mb-2">
                        <strong>Name:</strong> ${donor.name}
                    </p>

                    <p class="mb-2">
                        <strong>Age:</strong> ${donor.age}
                    </p>

                    <p class="mb-2">
                        <strong>City:</strong> ${donor.city}
                    </p>

                    <p class="mb-0">
                        <strong>Phone:</strong> ${donor.phone}
                    </p>

                </div>
            </div>
        </div>
    `).join("");
}


if (bloodFilter) {

    bloodFilter.addEventListener("change", function () {

        const selectedGroup = bloodFilter.value;

        if (selectedGroup === "all") {
            displayDonors(allDonors);
        } else {

            const filteredDonors = allDonors.filter(
                donor => donor.bloodGroup === selectedGroup
            );

            displayDonors(filteredDonors);
        }

    });

}
const requestForm = document.getElementById("requestForm");

if (requestForm) {
    requestForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const patientName = document.getElementById("patientName").value.trim();
        const requesterName = document.getElementById("requesterName").value.trim();
        const requesterPhone = document.getElementById("requesterPhone").value.trim();
        const requestBloodGroup = document.getElementById("requestBloodGroup").value;
        const units = Number(document.getElementById("units").value);
        const hospital = document.getElementById("hospital").value.trim();
        const requestCity = document.getElementById("requestCity").value.trim();
        const urgency = document.getElementById("urgency").value;
        const requestMessage = document.getElementById("requestMessage");

        if (patientName.length < 3) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please enter a valid patient name.</div>';
            return;
        }

        if (requesterName.length < 3) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please enter a valid requester name.</div>';
            return;
        }

        if (!/^[0-9]{10}$/.test(requesterPhone)) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Phone number must contain exactly 10 digits.</div>';
            return;
        }

        if (requestBloodGroup === "") {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please select a blood group.</div>';
            return;
        }

        if (units < 1 || units > 10) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Units must be between 1 and 10.</div>';
            return;
        }

        if (hospital.length < 3) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please enter a valid hospital name.</div>';
            return;
        }

        if (requestCity.length < 2) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please enter a valid city.</div>';
            return;
        }

        if (urgency === "") {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Please select urgency.</div>';
            return;
        }

        const requestData = {
            patientName: patientName,
            requesterName: requesterName,
            requesterPhone: requesterPhone,
            bloodGroup: requestBloodGroup,
            units: units,
            hospital: hospital,
            city: requestCity,
            urgency: urgency
        };

        try {
            const response = await fetch("http://localhost:5000/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (response.ok) {
                requestMessage.innerHTML =
                    `<div class="alert alert-success">${data.message}</div>`;

                requestForm.reset();
            } else {
                requestMessage.innerHTML =
                    `<div class="alert alert-danger">${data.message}</div>`;
            }

        } catch (error) {
            requestMessage.innerHTML =
                '<div class="alert alert-danger">Unable to connect to the server.</div>';

            console.error(error);
        }
    });
}

const requestList = document.getElementById("requestList");

if (requestList) {
    loadRequests();
}

async function loadRequests() {
    try {
        const response = await fetch("http://localhost:5000/api/requests");

        const requests = await response.json();

        displayRequests(requests);

    } catch (error) {
        requestList.innerHTML =
            '<div class="alert alert-danger">Unable to load blood requests.</div>';

        console.error(error);
    }
}

function displayRequests(requests) {

    if (requests.length === 0) {
        requestList.innerHTML =
            '<div class="alert alert-warning text-center">No blood requests found.</div>';
        return;
    }

    requestList.innerHTML = requests.map(request => `
        <div class="col-md-6 col-lg-4">

            <div class="card request-card h-100 shadow-sm">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center mb-3">

                        <h5 class="text-danger mb-0">
                            🩸 ${request.bloodGroup}
                        </h5>

                        <span class="badge ${
                            request.urgency === "Emergency"
                                ? "bg-danger"
                                : request.urgency === "Urgent"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                        }">
                            ${request.urgency}
                        </span>

                    </div>

                    <p class="mb-2">
                        <strong>Patient:</strong> ${request.patientName}
                    </p>

                    <p class="mb-2">
                        <strong>Units:</strong> ${request.units}
                    </p>

                    <p class="mb-2">
                        <strong>Hospital:</strong> ${request.hospital}
                    </p>

                    <p class="mb-2">
                        <strong>City:</strong> ${request.city}
                    </p>

                    <p class="mb-0">
                        <strong>Contact:</strong> ${request.requesterPhone}
                    </p>

                </div>

            </div>

        </div>
    `).join("");
}

/* ===== LifeLink Interactive Mouse Effects ===== */

document.addEventListener("DOMContentLoaded", function () {
    // Glowing cursor inside the hero section
    document.querySelectorAll(".hero, .hero-section").forEach(function (hero) {
        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        hero.appendChild(glow);

        hero.addEventListener("mousemove", function (event) {
            const rect = hero.getBoundingClientRect();

            glow.style.left = (event.clientX - rect.left) + "px";
            glow.style.top = (event.clientY - rect.top) + "px";
        });

        hero.addEventListener("mouseenter", function () {
            glow.style.opacity = "1";
        });

        hero.addEventListener("mouseleave", function () {
            glow.style.opacity = "0";
        });
    });

    // Gentle 3D tilt on feature cards
    document.querySelectorAll(".feature-card").forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
            if (window.matchMedia("(hover: none)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 8;
            const rotateX = (0.5 - y) * 8;

            card.style.transform =
                "perspective(800px) rotateX(" + rotateX +
                "deg) rotateY(" + rotateY + "deg) translateY(-5px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });
});
