document.addEventListener('DOMContentLoaded', () => {
    const goToHomeBtn = document.getElementById('goToHomeBtn');
    const homePage = document.getElementById('homePage');
    const splashContainer = document.querySelector('.splash-container');

    // Ensure splash screen is visible initially for fade-in
    // The CSS animation handles the fade-in from opacity 0 to 1

    goToHomeBtn.addEventListener('click', () => {
        // Add active class to home page to trigger slide-in
        homePage.classList.add('active');

        // Optional: Hide splash screen after transition
        // You might want to delay this or handle it differently
        // depending on desired effect (e.g., fade out splash)
        // For a simple slide, the home page covers the splash.
        // If you want the splash to fade out *after* the slide:
        // setTimeout(() => {
        //     splashContainer.style.display = 'none';
        // }, 500); // Match the transition duration
    });
});
