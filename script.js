// Get all navigation links and store them in an array
const navLinks = document.querySelectorAll("nav ul li a");
const menuToggle = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

// Function to remove the active class from all nav links
function removeActiveClass() {
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });
}

// Function to highlight the active section in the navigation bar
function setActiveNav() {
    const scrollPosition = window.scrollY + 200;

    const homeSection = document.querySelector("header");
    const homeTop = homeSection.offsetTop;
    const homeBottom = homeTop + homeSection.offsetHeight;

    if (scrollPosition >= homeTop && scrollPosition < homeBottom) {
        removeActiveClass();
        document.getElementById("home-link").classList.add("active");
        return;
    }

    document.querySelectorAll("section").forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            removeActiveClass();
            navLinks[index + 1].classList.add("active");
        }
    });
}

// Menu Toggle
menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});

// Event listener for smooth scrolling and closing the menu on click
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth",
        });

        // Close the menu after clicking a link (for mobile screens)
        if (navList.classList.contains("active")) {
            navList.classList.remove("active");
        }
    });
});

// Run the function on scroll to update active link based on the section currently in view
window.addEventListener("scroll", setActiveNav);
setActiveNav();
