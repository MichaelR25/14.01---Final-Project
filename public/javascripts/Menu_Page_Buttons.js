
document.addEventListener("DOMContentLoaded", function() {
    const showFilters = document.querySelector("#show-filters");
    const filterForm = document.querySelector("#filter-form");
    showFilters.addEventListener("click", function(event) { 
        filterForm.classList.toggle("hidden");
    });
});

function showFiltersEvent(event) {
    //const filterButtons = document.querySelector("#filter-form");
    // if(filterForm.classList.contains("hidden")) {
    //     filterForm.classList.remove("hidden");
    // } else {
    //     filterForm.classList.add("hidden");
    // }
    
}