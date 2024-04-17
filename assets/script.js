const cursorImg = document.querySelector(".cursor");

document.addEventListener("mousemove", (event) => {
    // Use clientX and clientY for cursor coordinates relative to the viewport
    cursorImg.style.left = `${event.clientX}px`;
    cursorImg.style.top = `${event.clientY}px`;
    cursorImg.style.display = "block"; // Show the cursor when mouse moves
});

document.addEventListener("mouseleave", (event) => {
    cursorImg.style.display = "none"; // Hide the cursor when mouse leaves the document
});

document.addEventListener("DOMContentLoaded", function () {
    const theme_switch = document.querySelector(".checkbox"); // This is your theme toggle checkbox
    const add_discord_card = document.querySelectorAll(".card-6");
    const add_git_card = document.querySelector(".card-7");

    function calculateSettingAsThemeString() {
        const localStorageTheme = localStorage.getItem("theme");
        const systemSettingDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        return localStorageTheme || (systemSettingDark ? "dark" : "light");
    }

    function updateButton(isDark) {
        const newCta = isDark
            ? "Change to light theme"
            : "Change to dark theme";
        theme_switch.setAttribute("aria-label", newCta);
        theme_switch.checked = isDark;
    }

    function updateThemeOnHtmlEl(theme) {
        add_discord_card.forEach((element) => {
            element.innerHTML = `<img
            src="https://lanyard.cnrad.dev/api/821653196161679371?theme=${theme}&bg=00000000&hideDiscrim=true&borderRadius=30px&idleMessage=Probably%20doing%20something%20else...&hideTimestamp=true&hideBadges=true" alt="User Status Discord"/>`;
        });
        add_git_card.innerHTML = `<img
        src="https://github-readme-stats.vercel.app/api?username=sanoojes&show_icons=true&theme=${theme}&hide_border=true&disable_animations=true&bg_color=00000000"
        alt="Sanooj's GitHub stats"
    />`;
        document.documentElement.setAttribute("data-theme", theme);
    }

    let currentThemeSetting = calculateSettingAsThemeString();

    // Initialize the UI based on the current theme setting
    updateButton(currentThemeSetting === "dark");
    updateThemeOnHtmlEl(currentThemeSetting);

    // Listen to changes on the theme switch
    theme_switch.addEventListener("change", () => {
        const newTheme = theme_switch.checked ? "dark" : "light";

        localStorage.setItem("theme", newTheme);
        updateButton(newTheme === "dark");
        updateThemeOnHtmlEl(newTheme);
    });
});

// code by kevinpovell
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller_inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

const projects_btn = document.getElementById("projects");
const about_btn = document.getElementById("about");
const modal_1 = document.getElementById("popup-1");
const modal_2 = document.getElementById("popup-2");
const close_btn = document.querySelectorAll(".popup-close-btn");
const main_content = document.querySelector(".container");

modal_1.style.display = "none";
modal_1.style.visibility = "collapse";
main_content.style.visiblity = "visible";
main_content.style.display = "flex";

about_btn.addEventListener("click", () => {
    modal_2.style.display = "flex";
    modal_2.style.visibility = "visible";
    main_content.style.visiblity = "collapse";
    main_content.style.display = "none";

    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});
projects_btn.addEventListener("click", () => {
    modal_1.style.display = "flex";
    modal_1.style.visibility = "visible";
    main_content.style.visiblity = "collapse";
    main_content.style.display = "none";

    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

close_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        modal_1.style.display = "none";
        modal_1.style.visibility = "collapse";
        modal_2.style.display = "none";
        modal_2.style.visibility = "collapse";
        main_content.style.visiblity = "visible";
        main_content.style.display = "flex";
        main_content.style.cssText =
            "animation:slide-in-main .6s ease; animation-fill-mode: forwards;";
        setTimeout(() => {
            modal_1.style.display = "none";
        }, 500);
    });
});

const copy_btn = document.querySelector(".copy-email-btn");
let text = "sanoojes6371@gmail.com";
const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Content copied to clipboard");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
};

copy_btn.addEventListener("click", () => {
    copyContent();
});

// JavaScript code with radio button functionality
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper"),
        carousel = document.querySelector(".carousel"),
        images = document.querySelectorAll(".carousel img"),
        buttons = document.querySelectorAll(".button"),
        radioContainer = document.querySelector(".radio-buttons");

    let imageIndex = 0,
        intervalId;

    // Function to start automatic image slider
    const autoSlide = () => {
        intervalId = setInterval(() => {
            slideImage(imageIndex);
            imageIndex = (imageIndex + 1) % images.length;
        }, 10000);
    };

    // Function that updates the carousel display to show the specified image
    const slideImage = (index) => {
        imageIndex = index % images.length;
        carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
        updateRadioButtons(imageIndex);
    };

    // Function to create and manage radio buttons
    const setupRadioButtons = () => {
        images.forEach((img, index) => {
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "carousel-radio";
            radioButton.id = `radio-${index}`;

            if (index === 0) radioButton.checked = true; // Set the first radio button as checked by default

            radioButton.addEventListener("click", () => {
                clearInterval(intervalId);
                slideImage(index);
                autoSlide();
            });

            radioContainer.appendChild(radioButton);
        });
    };

    // Update radio buttons selection
    const updateRadioButtons = (index) => {
        const allRadioButtons = document.querySelectorAll(
            'input[type="radio"][name="carousel-radio"]'
        );
        allRadioButtons.forEach((radio, idx) => {
            radio.checked = idx === index;
        });
    };

    // Start everything on page load
    autoSlide();
    setupRadioButtons();

    // Event listeners for previous and next buttons
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            clearInterval(intervalId);
            imageIndex += e.target.id === "next" ? 1 : -1;
            slideImage(imageIndex);
            autoSlide();
        });
    });

    // Pause and resume on hover
    // wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
    wrapper.addEventListener("mouseleave", autoSlide);
});
