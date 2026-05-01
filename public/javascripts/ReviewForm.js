// 
document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.querySelector("#review-form");
    const errorText = document.querySelector("#error-box");
    reviewForm.addEventListener("submit", async function(event) { 
        event.preventDefault();
        const formData = new FormData(reviewForm);
        const data = new URLSearchParams(formData);
        const userName = data.get("userName").trim();
        const reviewText = data.get("reviewText").trim();
        
        data.set("userName", userName);
        data.set("reviewText", reviewText);

        if(userName == "") {
            document.querySelector("#user-name-input").focus();
            postFailed(reviewForm, errorText, "Username can't be empty!")
        } else {
            try {
                const response = await fetch("/api/post-review", {
                    method: "POST", 
                    body: data 
                })

                if(response.ok) {
                    window.location.reload();
                } else {
                    console.log("username fail");
                    reviewForm.classList.add("post-failed")
                    postFailed(reviewForm, errorText, "Unable to post review");
                }
            } catch (error) {
                console.error("Connection Failed:", error.message);
                postFailed(reviewForm, errorText, "Connection error, please check your internet connection");
            }
        }
    });

    reviewForm.addEventListener("input", function(event) {
        reviewForm.classList.remove("post-failed");
        errorText.classList.add("hidden");
    });
});

function postFailed(form, errorBox, message) {
    form.classList.add("post-failed");
    errorBox.classList.remove("hidden");
    errorBox.innerText = 'Error: ' + message;
}