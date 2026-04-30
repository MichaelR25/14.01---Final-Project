// 
document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.querySelector("#review-form");
    reviewForm.addEventListener("submit", async function(event) { 
        event.preventDefault();
        const formData = new FormData(reviewForm);
        const data = new URLSearchParams(formData);
        const userName = data.get("userName").trim();
        const reviewText = data.get("reviewText").trim();

        data.set("userName", userName);
        data.set("reviewText", reviewText);
        console.log(userName + " " + reviewText);

        if(!(userName == "" || reviewText == "")) {
            let response = await fetch("/api/post-review", {
                method: "POST", 
                body: data 
            }).catch(error => console.log(error));

            console.log(response);
            if(response.ok) {
                window.location.reload();
            }
        }
        
    });
});