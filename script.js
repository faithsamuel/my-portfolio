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

    let projects = []; // Store fetched projects

    try {
        const response = await fetch("https://dummyjson.com/c/540e-43ea-4b65-921f");
        const data = await response.json();
        projects = data.projects; // Save projects

        console.log("Fetched Projects:", projects.map(p => ({ title: p.title, category: p.category })));
     // Debugging check

        renderProjects(projects); // Initially display all projects
    } catch (error) {
        console.error("Error fetching projects:", error);
    }

    // Function to render projects
    function renderProjects(filteredProjects) {
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

    // Filter event listeners
    allBtn.addEventListener("click", () => {
        renderProjects(projects);
    });


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
    

});



