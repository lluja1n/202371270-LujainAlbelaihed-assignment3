const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function updateTheme() {
    const isDark = document.body.classList.contains("dark-mode");

    themeIcon.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeButton.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

updateTheme();

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateTheme();
});


const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* Project Filtering and Sorting */
const filterButtons = document.querySelectorAll(".project-filters button");
const projectsContainer = document.getElementById("projects");
const projects = Array.from(document.querySelectorAll(".project"));
const sortSelect = document.getElementById("sort-projects");

let selectedFilter = localStorage.getItem("projectFilter") || "all";

if (!["all", "software", "hardware"].includes(selectedFilter)) {
    selectedFilter = "all";
}

const savedSort = localStorage.getItem("projectSort");

if (["default", "az", "za"].includes(savedSort)) {
    sortSelect.value = savedSort;
}

function updateProjects() {
    const sortOrder = sortSelect.value;
    const sortedProjects = [...projects];

    if (sortOrder === "az") {
        sortedProjects.sort(function (a, b) {
            return a.querySelector("h3").textContent.localeCompare(
                b.querySelector("h3").textContent
            );
        });
    } else if (sortOrder === "za") {
        sortedProjects.sort(function (a, b) {
            return b.querySelector("h3").textContent.localeCompare(
                a.querySelector("h3").textContent
            );
        });
    }

    sortedProjects.forEach(function (project) {
        const categories = project.dataset.category.split(" ");

        if (selectedFilter === "all" || categories.includes(selectedFilter)) {
            project.style.display = "";
        } else {
            project.style.display = "none";
        }

        projectsContainer.appendChild(project);
    });
}

filterButtons.forEach(function (button) {
    if (button.dataset.filter === selectedFilter) {
        button.classList.add("active");
    }

    button.addEventListener("click", function () {
        selectedFilter = button.dataset.filter;
        localStorage.setItem("projectFilter", selectedFilter);

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        updateProjects();
    });
});

sortSelect.addEventListener("change", function () {
    localStorage.setItem("projectSort", sortSelect.value);
    updateProjects();
});

updateProjects();


/* Contact Form Validation */
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const message = document.getElementById("message").value.trim();

    formFeedback.className = "";

    if (name === "" || email === "" || message === "") {
        formFeedback.textContent = "Please fill in all fields.";
        formFeedback.classList.add("error");
    } else if (!emailInput.validity.valid || email.includes(" ")) {
        formFeedback.textContent = "Please enter a valid email address.";
        formFeedback.classList.add("error");
    } else {
        formFeedback.textContent = "Thank you! Your message is ready.";
        formFeedback.classList.add("success");
        contactForm.reset();
    }
});


/* GitHub API Integration */
const githubRepos = document.getElementById("github-repos");
const githubStatus = document.getElementById("github-status");

async function loadGitHubRepos() {
    githubStatus.textContent = "Loading repositories...";

    try {
        const response = await fetch(
            "https://api.github.com/users/lluja1n/repos?sort=updated&per_page=6"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch repositories");
        }

        const repos = await response.json();
        const fragment = document.createDocumentFragment();

        if (repos.length === 0) {
            githubRepos.replaceChildren();
            githubStatus.textContent = "No public repositories found.";
            return;
        }

        repos.forEach(function (repo) {
            const card = document.createElement("div");
            card.className = "github-card";

            const title = document.createElement("h3");
            title.textContent = repo.name;

            const description = document.createElement("p");
            description.textContent =
                repo.description || "No description available.";

            const link = document.createElement("a");
            link.href = repo.html_url;
            link.textContent = "View Repository";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.append(title, description, link);
            fragment.appendChild(card);
        });

        githubRepos.replaceChildren(fragment);
        githubStatus.textContent = "";

    } catch (error) {
        githubStatus.textContent =
            "Unable to load repositories. Please try again later.";
    }
}

loadGitHubRepos();
