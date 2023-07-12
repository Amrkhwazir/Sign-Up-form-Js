
import { auth,app,db,doc,getDoc,onAuthStateChanged,signOut } from "../firebaseConfig.js";


let logout = document.getElementById('logout');
let inputFileUpload = document.getElementById('inputFileUpload');
let photoIcon = document.getElementById('photoIcon');
let postBtn = document.getElementById('postBtn');
let textPost = document.getElementById('textPost');
let ContentBox = document.getElementById('ContentBox');
// console.log(textPost)

// userdetail
let userName = document.querySelectorAll('.userName');
console.log(userName)
let postText = document.querySelector('.postText');
let userImg = document.querySelector('.userImg');
const userinfo = document.getElementById("userinfo");


onAuthStateChanged(auth, (activeUser) => {
  if (activeUser) {
      // User is signed in, see docs for a list of available properties
    
      const uid = activeUser.uid;
      console.log(uid)
      getUserData(uid)
      
  } else {
      // User is signed out
      console.log("sign out")
      window.location.href = '../index.html'
  }
});



async function getUserData(uid){
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await  getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  const {firstName,lastName,email} = docSnap.data();

  userinfo.innerHTML = ` <img class="userImg" src="../Assets/profile pic.jfif" alt="">
  <h5 class="userDetailName m-1">${firstName} ${lastName}</h5>
  <button type="button" class="profileBtn container rounded-0" data-bs-dismiss="modal" id="signupBtn">Profile</button>
  <p class="userEmail m-1">${email}</p>
  <p class="userDetail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quia ab velit non commodi unde odit,</p>
</div>`

userName[0].innerHTML = `${firstName} ${lastName}`;
userName[1].innerHTML = `${firstName} ${lastName}`;

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  } catch (error) {
    console.log(error, "error is get in data")
  }
};

// fileupload
photoIcon.addEventListener('click', fileOpenHandler)
function fileOpenHandler(){
    inputFileUpload.click()
}

// logout function

logout.addEventListener('click',logoutHandler)

function logoutHandler(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signout successfully")
    location.href = "../index.html";

}).catch((error) => {
    // An error happened.
    console.log(error);
});

}

// for post function
// userName.innerHTML = `${firstName} ${lastName}`;

postBtn.addEventListener('click', ()=> {

    let div = document.createElement('div');

    div.setAttribute('class', 'postContentDiv mt-5 mb-3' )
    
    div.innerHTML = `
    <div class="postArea container-fluid py-2 rounded-2 d-flex direction-column">
    <img class="userImg" src="../Assets/profile pic.jfif" alt="">
    <p class="userName mt-2"></p>
    <p id="postTime">${time}h</p>
    <p class="postText mt-2">${textPost.value}</p>
  </div>
  <div class="postImage mt-4">
    <img class="img-fluid" id="postImg" src="" alt="">
  </div>
    `
    ContentBox.prepend(div)
    textPost.value = ''
});

// messanger shown display

let messangerIcon = document.querySelector('.messageIcon')
let meassangerBox = document.querySelector('.massangerBox');

messangerIcon.addEventListener('click', messangerDisplayHandler);

function messangerDisplayHandler(){

  meassangerBox.style.display = "block";
}

// messanger close display

let btnClose = document.querySelector('.closeBtn');

btnClose.addEventListener('click', messangerCloseHandler);

function messangerCloseHandler() {
  
  meassangerBox.style.display = "none";
}
