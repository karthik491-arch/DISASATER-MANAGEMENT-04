
// =====================================
// DISASTER RESPONSE HUB
// JavaScript Functionality
// =====================================

// DEMONSTRATION DATA

const defaultIncidents = [
    {
        id: 1,
        name: "Demo User",
        type: "Flood",
        location: "Vijayawada",
        priority: "Critical",
        description: "Sample flood incident for demonstration.",
        status: "Reported"
    },
    {
        id: 2,
        name: "Demo User",
        type: "Cyclone",
        location: "Visakhapatnam",
        priority: "High",
        description: "Sample cyclone incident for demonstration.",
        status: "Reported"
    },
    {
        id: 3,
        name: "Demo User",
        type: "Fire",
        location: "Guntur",
        priority: "Medium",
        description: "Sample fire incident for demonstration.",
        status: "Reported"
    }
];

// STORAGE

function getIncidents() {
    try {
        const saved = localStorage.getItem("drhIncidents");
        return saved ? JSON.parse(saved) : defaultIncidents;
    } catch {
        return defaultIncidents;
    }
}

let incidents = getIncidents();

function saveIncidents() {
    localStorage.setItem("drhIncidents", JSON.stringify(incidents));
}

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// INCIDENT REPORT FORM

const incidentForm = document.getElementById("incidentForm");

incidentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newIncident = {
        id: Date.now(),
        name: document.getElementById("reporterName").value.trim(),
        type: document.getElementById("incidentType").value,
        location: document.getElementById("incidentLocation").value.trim(),
        priority: document.getElementById("incidentPriority").value,
        description: document.getElementById("incidentDescription").value.trim(),
        status: "Reported"
    };

    incidents.unshift(newIncident);

    saveIncidents();
    displayIncidents();
    updateStatistics();

    document.getElementById("incidentMessage").textContent =
        "Incident recorded successfully in this browser demonstration.";

    incidentForm.reset();
});

// DISPLAY INCIDENTS

const incidentList = document.getElementById("incidentList");

function displayIncidents() {

    const search = document.getElementById("searchIncident")
        .value.toLowerCase();

    const priorityFilter = document.getElementById("filterPriority")
        .value;

    incidentList.replaceChildren();

    const filtered = incidents.filter(item => {

        const matchesSearch =
            item.location.toLowerCase().includes(search) ||
            item.type.toLowerCase().includes(search);

        const matchesPriority =
            priorityFilter === "All" ||
            item.priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    if (filtered.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-message";
        empty.textContent = "No matching incidents found.";
        incidentList.appendChild(empty);
        return;
    }

    filtered.forEach(item => {

        const card = document.createElement("div");
        card.className = "incident-item";

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = item.type + " - " + item.location;

        const location = document.createElement("p");
        location.textContent = "Reported by: " + item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const status = document.createElement("p");
        status.textContent = "Status: " + item.status;

        details.append(title, location, description, status);

        const badge = document.createElement("span");
        badge.className = "priority " + item.priority;
        badge.textContent = item.priority;

        card.append(details, badge);
        incidentList.appendChild(card);
    });
}

// SEARCH AND FILTER

document.getElementById("searchIncident")
    .addEventListener("input", displayIncidents);

document.getElementById("filterPriority")
    .addEventListener("change", displayIncidents);

// STATISTICS

function updateStatistics() {

    const count = incidents.length;

    document.getElementById("incidentCount").textContent =
        count.toString().padStart(2, "0");
}

// VOLUNTEER REGISTRATION

const volunteerForm = document.getElementById("volunteerForm");

volunteerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const volunteer = {
        name: document.getElementById("volunteerName").value.trim(),
        email: document.getElementById("volunteerEmail").value.trim(),
        phone: document.getElementById("volunteerPhone").value.trim(),
        skill: document.getElementById("volunteerSkill").value
    };

    // Save demonstration registration in browser storage

    let volunteers = [];

    try {
        volunteers = JSON.parse(
            localStorage.getItem("drhVolunteers") || "[]"
        );
        if (!Array.isArray(volunteers)) volunteers = [];
    } catch {
        volunteers = [];
    }

    volunteers.push(volunteer);

    localStorage.setItem(
        "drhVolunteers",
        JSON.stringify(volunteers)
    );

    document.getElementById("volunteerMessage").textContent =
        "Volunteer registration saved successfully in this browser.";

    volunteerForm.reset();
});

// INTERACTIVE MAP

let map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Illustrative locations only.
// These markers are not actual emergency reports.

const demoLocations = [
    {
        name: "Vijayawada - Demo Marker",
        coords: [16.5062, 80.6480]
    },
    {
        name: "Visakhapatnam - Demo Marker",
        coords: [17.6868, 83.2185]
    },
    {
        name: "Guntur - Demo Marker",
        coords: [16.3067, 80.4365]
    },
    {
        name: "Hyderabad - Demo Marker",
        coords: [17.3850, 78.4867]
    }
];

demoLocations.forEach(location => {

    L.marker(location.coords)
        .addTo(map)
        .bindPopup(
            "<b>" + location.name + "</b><br>Illustrative map location"
        );
});

// INITIALIZE APPLICATION

displayIncidents();
updateStatistics();
