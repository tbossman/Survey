document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);

    // Create an object to hold the form data
    let data = {};
    formData.forEach((value, key) => {
        if (!data[key]) {
            data[key] = value;
        } else {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        }
    });

    // Send form data to the server
    fetch('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Survey submitted successfully');
        // Optionally clear the form after submission
        event.target.reset();
    })
    .catch(error => {
        console.error('Error submitting the survey:', error);
    });
});

// Toggle visibility of "Other" highlight textarea
function toggleOtherHighlight() {
    const highlightSelect = document.getElementById('highlight');
    const otherHighlightTextarea = document.getElementById('other-highlight');
    if (highlightSelect.value === '8') { // '8' represents 'Other'
        otherHighlightTextarea.style.display = 'block';
    } else {
        otherHighlightTextarea.style.display = 'none';
    }
}
