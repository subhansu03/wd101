function loadUserData() {
    var userData = JSON.parse(localStorage.getItem("userRegistrationData")) || [];
    var tableBody = document.getElementById("userDataBody");

    tableBody.innerHTML = "";

    userData.forEach(function (data) {
        var row = tableBody.insertRow();
        for (var key in data) {
            var cell = row.insertCell();
            cell.textContent = data[key];
        }
    });
}

function verifyDob() {
    var dobInput = document.getElementById("userDob");
    var dobValue = new Date(dobInput.value);
    var currentDate = new Date();
    var minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    var maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    if (dobValue < minDate || dobValue > maxDate) {
        alert("Date of birth must be between 18 and 55 years.");
        dobInput.value = ""; // Clear the invalid date
    } else {
        alert("Thank you for providing a valid date of birth.");
    }
}

document.getElementById("userRegistration").addEventListener("submit", function (event) {
    event.preventDefault();

    var fullName = document.getElementById("userName").value;
    var emailAddress = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var dob = document.getElementById("userDob").value;
    var acceptTerms = document.getElementById("acceptTerms").checked;

    var formData = { fullName: fullName, emailAddress: emailAddress, password: password, dob: dob, acceptTerms: acceptTerms };

    var userData = JSON.parse(localStorage.getItem("userRegistrationData")) || [];
    userData.push(formData);
    localStorage.setItem("userRegistrationData", JSON.stringify(userData));

    loadUserData();
    
    verifyDob();
});

window.onload = loadUserData;
