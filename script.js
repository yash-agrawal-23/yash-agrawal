// Get all navigation links and store them in an array
const navLinks = document.querySelectorAll("nav ul li a");

// Function to remove the active class from all nav links
function removeActiveClass() {
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });
}

// Function to highlight the active section in the navigation bar
function setActiveNav() {
    const scrollPosition = window.scrollY + 200; // Adjust scroll position slightly to better detect the active section

    // Handle Home as a separate case since it's in the header, not a section
    const homeSection = document.querySelector("header");
    const homeTop = homeSection.offsetTop;
    const homeBottom = homeTop + homeSection.offsetHeight;

    // If we're in the Home section, highlight the Home link
    if (scrollPosition >= homeTop && scrollPosition < homeBottom) {
        removeActiveClass(); // Remove 'active' class from all nav links
        document.getElementById("home-link").classList.add("active"); // Add 'active' class to Home link
        return; // No need to check other sections if we're in the Home section
    }

    // Loop through sections and activate the corresponding nav link
    document.querySelectorAll("section").forEach((section, index) => {
        // Get the top and bottom positions of the section
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // If the scroll position is within the section's bounds, set the corresponding nav link as active
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            removeActiveClass(); // Remove 'active' class from all nav links
            navLinks[index + 1].classList.add("active"); // Add 'active' class to the current section's nav link (skipping home)
        }
    });
}

// Menu Toggle
const menuToggle = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});

// Event listener for smooth scrolling to sections when clicking on nav links
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        // Scroll to the section smoothly
        window.scrollTo({
            top: targetSection.offsetTop - 50, // Adjust for header height if necessary
            behavior: "smooth",
        });
    });
});

// Run the function on scroll to update active link based on the section currently in view
window.addEventListener("scroll", setActiveNav);

// Initialize the page by highlighting the active nav link on load
setActiveNav();
