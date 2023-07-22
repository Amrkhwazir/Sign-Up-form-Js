
import { 
  auth,
  app,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  addDoc,
  ref,
  query,
  storage,
  getDownloadURL,
  uploadBytesResumable
 } from "../firebaseConfig.js";


const logout = document.getElementById('logout');
const photoIcon = document.getElementById('photoIcon');
const postBtn = document.getElementById('postBtn');
const textPost = document.getElementById('textPost');
const ContentBox = document.getElementById('ContentBox');

// userdetail
const userName = document.querySelector('.userName');
const displayImage = document.querySelector('#displayImage');
let myUsersArea = document.querySelector('#myUserArea');
const image_input = document.getElementById('image_input');
const userinfo = document.getElementById("userinfo");
const profilePic = document.getElementById("profilePic");
const postUsrImg = document.getElementById("postUsrImg");
const modalProfilePic = document.getElementById("modalProfilePic");

let currentActiveUser;

onAuthStateChanged(auth, (activeUser) => {
  if (activeUser) {
      // User is signed in, see docs for a list of available properties
    
      const uid = activeUser.uid;
      // console.log(uid)
      getUserData(uid)
      currentActiveUser = uid
  } else {
      // User is signed out
      // console.log("sign out")
      window.location.href = '../index.html'
  }
});

async function getUserData(uid){
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await  getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  const {firstName,lastName,email,src} = docSnap.data();
  console.log(firstName,lastName,email,src)
  // console.log(time)
  userinfo.innerHTML = ` <img class="userImg rounded-5" src="${src} || ../Assets/photo-1481349518771-20055b2a7b24.jfif " alt="" width="35px" height="65px">
  <h5 class="userDetailName m-1">${firstName} ${lastName}</h5>
  <button type="button" class="profileBtn container rounded-0" data-bs-dismiss="modal" id="signupBtn">Profile</button>
  <p class="userEmail m-1">${email}</p>
  <p class="userDetail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quia ab velit non commodi unde odit,</p>
</div>`

userName.innerHTML = `${firstName}${lastName}`;
profilePic.src = src
postUsrImg.src = src
modalProfilePic.src = src

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  } catch (error) {
    console.log(error, "error is get in data")
  }
};

// for post function

postBtn.addEventListener('click', async () => {
  
      // console.log(image_input.files[0].name)
  
  const file = image_input.files[0]
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  const storageRef = ref(storage, 'posts/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  uploadTask.on('state_changed',
    (snapshot) => {
  
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
     
      switch (error.code) {
        case 'storage/unauthorized':
  
          break;
        case 'storage/canceled':
  
          break;
  
  
        case 'storage/unknown':
  
          break;
      }
    }, 
    () => {
   
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
  
        const docRef = await addDoc(collection(db, "posts"), {
          postPersonId: currentActiveUser,
          postData: textPost.value,
          postUrl: downloadURL
        });
        console.log("Document written with ID: ", docRef.id);
        getPost()
  });
  });
});


async function getPost(){
  
  const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach(async(doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  const {postData,postPersonId,postUrl} = doc.data()
  console.log(postUrl,postData,postPersonId)
  
  const activeAuthrDetail = await getPostUserData(postPersonId)
  console.log(activeAuthrDetail);
  
  // ContentBox.innerHTML = "";
  
let div = document.createElement('div');
  div.setAttribute('class', 'postArea mb-3' )

  div.innerHTML = `
  <div class="postContent container-fluid py-2 rounded-2 d-flex direction-column">
  <img class="userImg rounded-5" src="${activeAuthrDetail.src}" alt="" height="45px>
  <p class="userName mt-2">${activeAuthrDetail?.firstName}${activeAuthrDetail?.lastName}</p>
  <p id="postTime">2 minutes</p>
  <p class="postText mt-2">${postData}</p>
</div>
<div class="postImage mt-4">
<img class="img-fluid img-fluid"" src=${postUrl || '../Assets/photo-1481349518771-20055b2a7b24.jfif'} alt="">
</div>
  `
  ContentBox.appendChild(div)
  textPost.value = ''
  
});
}


async function getPostUserData(authUid){
  
const docRef = doc(db, "users", authUid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  return docSnap.data()
  console.log(firstName,lastName)
  
} else {
  
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
}

// All user data

async function getAllUser(){

  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      // console.log(doc.id, " => ", doc.data());
      const {firstName,src} = doc.data()
      // console.log(firstName,lastName)

      const columnHtml = document.createElement('div')
      columnHtml.setAttribute('class', 'friendListBox container d-flex align-items-start gap-2 position-relative mt-3')

      const content = ` <img class="userImg rounded-5 mt-2" src=${ src || '../Assets/profile pic.jfif'} alt="" height="40px">
      <p class="reqPerson">${firstName}</p>
      <p id="mutual" class="position-absolute">8 mutual friends</p>
      <div class="btn d-flex gap-2">
        <button class="accept">See</button>
        <button class="reject">Ignore</button>
      </div>`

      columnHtml.innerHTML = content

      myUsersArea.appendChild(columnHtml)
  });
}

getAllUser()


// fileupload
photoIcon.addEventListener('click', fileOpenHandler)
function fileOpenHandler(){
    image_input.click();
}


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
