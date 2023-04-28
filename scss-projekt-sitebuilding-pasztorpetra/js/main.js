"use strict"

const navbar = document.querySelector('.navbar');
const navBrand = document.querySelector(".navbar-brand");
const navToggler = document.querySelector(".navbar-toggler");
const navItem = document.querySelector(".nav-item");

const changeNavbar = () => {
  if (window.scrollY !== 0) {
    navbar.style.backgroundColor = "white";
    // navbar.style.removeProperty('background-image');
    // navbar.classList.add("bg-white");
    navBrand.style.color = "black";
    navToggler.style.color = "black"; 
    navItem.style.color = "grey";
  }};
   
   
window.addEventListener("scroll", changeNavbar);

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


