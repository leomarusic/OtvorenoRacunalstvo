var profile = document.getElementById("profile");
var login = document.getElementById("login");
if(profile.innerHTML === ""){
    profile.style.display = "none";
}
else if(profile.innerHTML != null){
    login.style.display = "none";
}