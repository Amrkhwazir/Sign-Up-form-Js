let logout = document.getElementById('logout');



const activeUser = JSON.parse(localStorage.getItem('activeUser')) || [];
// console.log(activeUser);


logout.addEventListener('click',logoutHandler)

function logoutHandler(){
    location.href = "/index.html";
}