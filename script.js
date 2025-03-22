const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Toggle menu when clicking the burger
burger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document

    nav.classList.toggle('nav-active');
    burger.classList.toggle('burger-active');
});

// Close the menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('burger-active');
    }
});

// Prevent clicks inside the menu from closing it
nav.addEventListener('click', (e) => {
    e.stopPropagation();
});


document.addEventListener("DOMContentLoaded", async () => {
    const projectsContainer = document.querySelector(".projects-list");
    const allBtn = document.querySelector('input[value="All"]');
    const websitesBtn = document.querySelector('input[value="Websites"]');
    const appsBtn = document.querySelector('input[value="Applications"]');
    const contactForm = document.querySelector(".contact-form");

    let projects = []; // Store fetched projects

    // ✅ Check if the projects section exists before fetching
    if (projectsContainer) {
        try {
            const response = await fetch("https://dummyjson.com/c/540e-43ea-4b65-921f");
            const data = await response.json();
            projects = data.projects;

            console.log("Fetched Projects:", projects.map(p => ({ title: p.title, category: p.category })));
            renderProjects(projects); // Initially display all projects
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    // ✅ Function to render projects safely
    function renderProjects(filteredProjects) {
        if (!projectsContainer) return; // Avoid errors

        projectsContainer.innerHTML = ""; // Clear existing tiles
        filteredProjects.forEach(project => {
            const projectTile = document.createElement("div");
            projectTile.classList.add("tile");

            projectTile.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="tile-text">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join(" ")}
                    </div>
                </div>
            `;

            projectsContainer.appendChild(projectTile);
        });
    }

    // ✅ Ensure filter buttons exist before adding event listeners
    if (allBtn && websitesBtn && appsBtn) {
        allBtn.addEventListener("click", () => renderProjects(projects));

        websitesBtn.addEventListener("click", () => {
            const filtered = projects.filter(project => project.category?.trim().toLowerCase() === "websites");
            console.log("Filtered Websites:", filtered);
            renderProjects(filtered);
        });

        appsBtn.addEventListener("click", () => {
            const filtered = projects.filter(project => project.category?.trim().toLowerCase() === "applications");
            console.log("Filtered Applications:", filtered);
            renderProjects(filtered);
        });
    }

    // ✅ Ensure the contact form exists before adding an event listener
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent page reload

            // ✅ Select form inputs safely
            const nameInput = document.querySelector("#name");
            const emailInput = document.querySelector("#email");
            const subjectInput = document.querySelector("#subject");
            const messageInput = document.querySelector("#message");

            if (!nameInput || !emailInput || !messageInput) {
                console.error("One or more contact form fields are missing.");
                return;
            }

            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Create message object
            const contactData = {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toLocaleString(),
            };

            // Retrieve existing messages from Local Storage
            const savedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

            // Add new message
            savedMessages.push(contactData);

            // Save back to Local Storage
            localStorage.setItem("contactMessages", JSON.stringify(savedMessages));

            alert("Message saved successfully!");
            contactForm.reset();
        });
    } else {
        console.warn("Contact form not found.");
    }
});



