// inputs
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let signEmail = document.getElementById('signEmail');
let signPassword = document.getElementById('signPassword');
let phoneNumber = document.getElementById('phoneNumber');
let dateTime = document.getElementById('dateTime');
let male = document.getElementById('male');
let female = document.getElementById('female');
let custom = document.getElementById('custom');

// buttons
let loginBtn = document.getElementById('loginBtn');
let signupBtn = document.getElementById('signupBtn');

// login

loginBtn.addEventListener('click',loginHandler);

function loginHandler() {
    console.log(loginEmail.value)
    console.log(loginPassword.value)
}

// signup

signupBtn.addEventListener('click',signUpnHandler);

function signUpnHandler() {
    console.log(firstName.value)
    console.log(lastName.value)
    console.log(signEmail.value)
    console.log(signPassword.value)
    console.log(phoneNumber.value)
    console.log(dateTime.value)
    console.log(male.value)
    console.log(female.value)
    console.log(custom.value)
   
}