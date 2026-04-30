
document.addEventListener("DOMContentLoaded", function() {
    const showFilters = document.querySelector("#show-filters");
    const filterForm = document.querySelector("#filter-form");
    showFilters.addEventListener("click", function(event) { 
        filterForm.classList.toggle("hidden");
    });
});