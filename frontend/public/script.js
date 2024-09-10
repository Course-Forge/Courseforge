document.getElementById('waitlist-button').addEventListener('click', function() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value;
    if (validateEmail(email)) {
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            email: email
        }).then(function(response) {
            alert('Successfully joined the waitlist!');
            emailInput.value = ''; // Clear the input field
        }, function(error) {
            alert('Failed to join the waitlist. Please try again.');
        });
    } else {
        alert('Please enter a valid email address.');
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
