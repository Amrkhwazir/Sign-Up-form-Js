// inputs
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let signEmail = document.getElementById('signEmail');
let signPassword = document.getElementById('signPassword');
let phoneNumber = document.getElementById('phoneNumber');
let dateTime = document.getElementById('dateTime');

// buttons
let loginBtn = document.getElementById('loginBtn');
let signupBtn = document.getElementById('signupBtn');

// login
let gender;

const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
// console.log(userArr)

loginBtn.addEventListener('click',loginHandler);

function loginHandler() {
    // console.log(loginEmail.value)
    // console.log(loginPassword.value)

    if(!loginEmail.value || !loginPassword.value) return alert("please enter both Email Address & password to continue")

    const loginUserFound = userArr.filter((user)=> {
        // console.log("login user email found " + loginEmail.value)
         return    user.email === loginEmail.value
    })
    
    if(!loginUserFound.length) return alert("This user is not registered")

    const loginUserFoundPassword = userArr.filter((user)=> {
        // console.log("login user email found " + loginEmail.value)
         return    user.password === loginPassword.value
    })



    if(loginUserFoundPassword[0].password === loginPassword.value){
        alert("user is logged in")
    localStorage.setItem('activeUser', JSON.stringify(loginUserFound[0]))
    
}else{
        alert("incorrect email and password")
    }
}

// signup

signupBtn.addEventListener('click',signUpnHandler);

function signUpnHandler() {

    const signUserFound = userArr.filter((user)=>{
        // console.log("login useremail in loginuserfound filter" + user.email)
        return user.email == signEmail.value
    })
    // console.log(signUserFound);
    
    if(signUserFound.lenght) return alert("Email is already in use try another Email")

    // console.log(loginUserFound + "user ml gya")


    if(firstName.value !== "" && lastName.value !== "" && signPassword.value !== "" && phoneNumber.value !== "" ){
    
        if(signPassword.value < 8) return alert("password should contain 8 characters")
        
        const userObj = {
            firstName : firstName.value,
            lastName : lastName.value,
            email : signEmail.value,
            password : signPassword.value,
            phoneNum : phoneNumber.value,
            date : dateTime.value,
            gender 
    };
    
userArr.push(userObj);

    localStorage.setItem('userArr', JSON.stringify(userArr));

    alert("User signup successfully");

    firstName.value = ""
    lastName.value = ""
    signEmail.value = ""
    signPassword.value = ""
   phoneNumber.value = ""
    dateTime.value = null

    }else{

    alert("Fill all the blanks feild's")
}

};


function genderHandler(g){
    // console.log(g + "handler working")
    gender = g
};
