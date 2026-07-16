// DARK MODE

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


// SIDEBAR COLLAPSE

const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const container = document.getElementById("container");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    container.classList.toggle("sidebar-collapsed");
});


// LIVE SEARCH

const search = document.getElementById("search");
const rows = document.querySelectorAll("tbody tr");

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    rows.forEach((row) => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});


// PROFILE DROPDOWN

const profile = document.getElementById("profile");
const dropdown = document.getElementById("dropdown");

profile.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("show");
});

document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !profile.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

const ctx = document.getElementById("studentChart");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "Computer Science",
            "Cyber Security",
            "Software Engineering",
            "Information Technology",
            "Data Science"
        ],
        datasets: [{
            label: "Students Enrolled",
            data: [120, 95, 80, 65, 55]
        }]
    }
});