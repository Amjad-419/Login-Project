const contanier = document.querySelector('.contanier');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click',()=>{
    contanier.classList.add('active');

});

loginLink.addEventListener('click',()=>{
    contanier.classList.remove('active');

});

btnPopup.addEventListener('click',()=>{
    contanier.classList.add('active-popup');

});
iconClose.addEventListener('click',()=>{
    contanier.classList.remove('active-popup');

});

