function toggleUpdateForm(postId) {
    const form = document.getElementById(`update-form-${postId}`);
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block"; // Show the form
    } else {
        form.style.display = "none"; // Hide the form
    }
}
