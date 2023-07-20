import { 
    auth,
    app,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    storage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    updateDoc
     } from "../firebaseConfig.js";
  
const userName = document.querySelector('.userName');
const userEmail = document.querySelector('.userEmail');
const imgInput  = document.querySelector('#img-input');
const updatFirstName = document.getElementById('firstName');
const updateLastName = document.getElementById('lastName');
const Password = document.getElementById('Password');
const phoneNumber = document.getElementById('phoneNumber');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const profilePic = document.getElementById('profilePic');
const profileImg = document.querySelector('.userImg');
const userphn = document.querySelector('.userphn');

console.log(profileImg.src)
 
let currentUserActive = '';

updateProfileBtn.addEventListener("click",  updateProfileHandler)




onAuthStateChanged(auth, (activeUser) => {
  if (activeUser) {
      // User is signed in, see docs for a list of available properties
    
      const uid = activeUser.uid;
      getUserData(uid)
      // getPostData(uid)
      currentUserActive = uid;

  } else {
      
      console.log("sign out")
      window.location.href = '../index.html'
  }
});



function updateProfileHandler(){
  
  getUserData()
    console.log(imgInput.files[0].name)

const file = imgInput.files[0]
const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = ref(storage, 'images/' + file.name);
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

console.log(currentUserActive)      
const washingtonRef = doc(db, "users", currentUserActive );

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  firstName: updatFirstName.value,
  lastName: updateLastName.value,
  Password: Password.value,
  phoneNumber: phoneNumber.value,
  src: downloadURL
});
});
});
}

    async function getUserData(uid){
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await  getDoc(docRef);
    
    if (docSnap.exists()) {
    
      const {firstName,lastName,phoneNumber:phoneNumberFormDB,src} = docSnap.data();
      console.log(firstName,lastName,phoneNumberFormDB,src)
    
    
    userName.innerHTML = `${firstName} ${lastName}`;
    userphn.innerHTML = `${phoneNumberFormDB}`
    profileImg.src = src
    profilePic.src = src
    } else {
    
      console.log("No such document!");
    }
      } catch (error) {
        console.log(error, "error is get in data")
      }
    };
    

//  async function getPostData(uid){
//     // console.log(uid)
//     try {
//         const q = query(collection(db, "posts",), );
//         // console.log(q)
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           // console.log(doc.id, " => ", doc.data());
//         });
//     } catch (error) {
//         console.log(error,"data not found")
//     }

//     }