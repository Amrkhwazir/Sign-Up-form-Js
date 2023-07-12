import { auth, app, db, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc,Timestamp} from "./firebaseConfig.js";

// let gender;
// login

// inputs
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');

// buttons
let loginBtn = document.getElementById('loginBtn');


loginBtn.addEventListener('click',loginHandler);

function loginHandler() {

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user){
        window.location.href ='./dashboard/index.html';
    }
    console.log(user,"user logged in")
  })
  .catch((error) => {
      const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
};

// signup

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let signEmail = document.getElementById('signEmail');
let signPassword = document.getElementById('signPassword');
let phoneNumber = document.getElementById('phoneNumber');
let dateTime = document.getElementById('dateTime');

// buttons
let signupBtn = document.getElementById('signupBtn');


signupBtn.addEventListener('click',signUpnHandler);

async function signUpnHandler() {
try {
    const response =  await createUserWithEmailAndPassword(auth, signEmail.value, signPassword.value)
   // Signed in 
//    console.log(response,"user milgyaa")
   alert("user rigestered")
   
   if(response.user){
        adddata(response.user.uid)
//    console.log(response.user.uid,"user milgyaa")

    }
  }
 catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage)
    
}
};

async function adddata(uid){
    try {
        const docRef = await setDoc(doc(db, "users",uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: signEmail.value,
            password: signPassword.value,
            phnNumber : phoneNumber.value,
            dOB : dateTime.value,
            id : uid,
            time: Timestamp.fromDate(new Date())
        });

        // console.log("Document written with ID: ", docRef.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

// function genderHandler(g){
//     // console.log(g + "handler working")
//     gender = g
// };
