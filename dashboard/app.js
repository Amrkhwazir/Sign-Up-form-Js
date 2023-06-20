let logout = document.getElementById('logout');
let inputFileUpload = document.getElementById('inputFileUpload');
let photoIcon = document.getElementById('photoIcon');
let postBtn = document.getElementById('postBtn');
let textPost = document.getElementById('textPost');
let ContentBox = document.getElementById('ContentBox');
// console.log(textPost)

// userdetail
let userName = document.querySelector('.userName');
console.log(userName.innerHTML)
let postText = document.querySelector('.postText');
let userImg = document.querySelector('.userImg');


// date

const time = new Date().getHours()
// console.log(time)

const activeUser = JSON.parse(localStorage.getItem('activeUser')) || [];
// console.log(activeUser);
const {email,firstName,lastName,password,phoneNum} = activeUser

// console.log(email)
console.log(firstName)
// console.log(lastName)
// console.log(password)
// console.log(phoneNum)

if(!activeUser){
    window.location.href = "/index.html";
}

// fileupload

photoIcon.addEventListener('click', fileOpenHandler)
function fileOpenHandler(){
    inputFileUpload.click()
}

// logout function

logout.addEventListener('click',logoutHandler)

function logoutHandler(){
    location.href = "/index.html";
}

// for post function
userName.innerHTML = `${firstName} ${lastName}`;

postBtn.addEventListener('click', ()=> {

    let div = document.createElement('div');
    div.setAttribute('class', 'postContentDiv mt-5 mb-3' )
    
    div.innerHTML = `
    <div class="postArea container-fluid py-2 rounded-2 d-flex direction-column">
    <img class="userImg" src="../Assets/profile pic.jfif" alt="">
    <p class="userName mt-2">${activeUser.firstName} ${activeUser.lastName}</p>
    <p id="postTime">${time}h</p>
    <p class="postText mt-2">${textPost.value}</p>
  </div>
  <div class="postImage mt-4">
    <img class="img-fluid" src="../Assets/photo-1481349518771-20055b2a7b24.jfif" alt="">
  </div>
    `
    ContentBox.prepend(div)
    textPost.value = ''

})

// userdetailArea

let activeUserName = document.querySelector('.userDetailName')
let activeUserEmail = document.querySelector('.userEmail')

activeUserName.innerHTML = `${activeUser.firstName} ${activeUser.lastName}`;
activeUserEmail.innerHTML = `${activeUser.email}` 



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
