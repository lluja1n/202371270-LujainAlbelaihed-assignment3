const themeButton = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "Light Mode";
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
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

const filterButtons = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        projects.forEach(function (project) {
            const categories = project.dataset.category.split(" ");

            if (selectedFilter === "all" || categories.includes(selectedFilter)) {
                project.style.display = "";
            } else {
                project.style.display = "none";
            }
        });
    });
});

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


/*github API integration*/
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
        githubRepos.replaceChildren();

        if (repos.length === 0) {
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
            githubRepos.appendChild(card);
        });

        githubStatus.textContent = "";
    } catch (error) {
        githubStatus.textContent =
            "Unable to load repositories. Please try again later.";
    }
}

loadGitHubRepos();

