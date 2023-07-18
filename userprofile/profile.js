import { 
    auth,
    app,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    storage,
    ref,
    query,
    collection,
    where,
    getDocs
     } from "../firebaseConfig.js";
  
const userName = document.querySelector('.userName');
const userEmail = document.querySelector('.userEmail');
const imgInput  = document.querySelector('#img-input');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const Password = document.getElementById('Password');
const phoneNumber = document.getElementById('phoneNumber');
const updateProfileBtn = document.getElementById('updateProfileBtn');

updateProfileBtn.addEventListener("click",  updateProfileHandler)

function updateProfileHandler(){

    console.log(imgInput.files[0].name)

const file = imgInput.files[0]

 const mountainsRef = ref(storage, file.name );
 console.log(mountainsRef)
 
    
// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage,'images/' + file.name);
console.log(mountainImagesRef); 

mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 

}




    onAuthStateChanged(auth, (activeUser) => {
      if (activeUser) {
          // User is signed in, see docs for a list of available properties
        
          const uid = activeUser.uid;
          getUserData(uid)
          getPostData(uid)

      } else {
          
          console.log("sign out")
          window.location.href = '../index.html'
      }
    });

    async function getUserData(uid){
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await  getDoc(docRef);
    
    if (docSnap.exists()) {
    
      const {firstName,lastName,email} = docSnap.data();
      console.log(firstName,lastName,email)
    
    
    userName.innerHTML = `${firstName} ${lastName}`;
    userEmail.innerHTML = `${email}`
    } else {
    
      console.log("No such document!");
    }
      } catch (error) {
        console.log(error, "error is get in data")
      }
    };
    

 async function getPostData(uid){
    console.log(uid)
    try {
        const q = query(collection(db, "posts"), );
        console.log(q)
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.log(error,"data not found")
    }

    }