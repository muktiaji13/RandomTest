// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = event.target.querySelector('input').value.toLowerCase();
    // Implement search logic here
    console.log(`Searching for: ${searchTerm}`);
}

// Initialize search form
const searchForm = document.querySelector('form.d-flex');
searchForm.addEventListener('submit', handleSearch);

// Smooth scroll to top
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});
