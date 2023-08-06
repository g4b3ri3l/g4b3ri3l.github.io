// Selecting elements
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const sidebarOpen = document.querySelector(".sidebarOpen");
const sidebarClose = document.querySelector(".sidebarClose");

// Adding event listeners to the nav links
document.getElementById('vocaloidNav').addEventListener('click', showContent);
document.getElementById('learnNav').addEventListener('click', showContent);
document.getElementById('examplesNav').addEventListener('click', showContent);
document.getElementById('impactNav').addEventListener('click', showContent);

// Function to trigger when elements are in the viewport
function scrollTrigger(selector, options = {}) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach(el => {
    addObserver(el, options);
  });
}

// Triggers the scrollTrigger function with appropriate options
scrollTrigger('.impact-info', {
  rootMargin: '-100px',
});

// Function to add IntersectionObserver to an element
function addObserver(el, options) {
  if (!('IntersectionObserver' in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      entry.target.classList.add('active');
    }
    return;
  }

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(el);
        } else {
          entry.target.classList.add('active');
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(el);
}

// Function to trigger the showContent function on scroll
scrollTrigger('.scroll-reveal', {
  rootMargin: '-200px',
});

// Triggering the "VOCALOID" nav link automatically
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('vocaloidNav').click();
});

// Function to show the content div and apply animation
function showContent(event) {
  event.preventDefault();
  const target = event.target.getAttribute('href');
  const contentDiv = document.getElementById(target.slice(1));

  // Hide all content divs
  const contentDivs = document.getElementsByClassName('content');
  for (let i = 0; i < contentDivs.length; i++) {
    contentDivs[i].classList.remove('active');
  }

  // Show the targeted content div with animation
  contentDiv.classList.add('active');

  // Trigger the scrollTrigger function with appropriate options
  scrollTrigger('.impact-info', {
    rootMargin: '-100px',
    cb: animateImpactInfo,
  });
}

// Function to apply animation to impact-info element
function animateImpactInfo(impactInfo) {
  impactInfo.classList.add('active');
}

// Function to toggle the active state of the impact-info element
function toggleAccordion(impactInfo) {
  impactInfo.classList.toggle('active');
}

// Function to handle click events on the impact-info headings
function handleAccordionClick() {
  const impactInfoElements = document.querySelectorAll('.impact-info');

  impactInfoElements.forEach((element) => {
    const heading = element.querySelector('h2');
    heading.addEventListener('click', () => {
      toggleAccordion(element);
    });
  });
}

// Call the function to handle accordion clicks when the Impact section is clicked
document.getElementById('impactNav').addEventListener('click', () => {
  handleAccordionClick();
});

// Image slider functionality
var sliderImage = document.getElementById("sliderImage");
var images = ['images/vocaloidlogo.jpg', 'images/editorimage.jpg', 'images/hatsunemiku.jpg'];
var currentImage = 0;

setInterval(function () {
  currentImage = (currentImage + 1) % images.length;
  sliderImage.src = images[currentImage];
  sliderImage.classList.add('active');
}, 4000);

sliderImage.addEventListener('transitionend', function () {
  sliderImage.classList.remove('active');
});

// Other event listeners for toggling modes, search, and sidebar
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

searchToggle.addEventListener("click", () => {
  searchToggle.classList.toggle("active");
});

sidebarOpen.addEventListener("click", () => {
  console.log("Sidebar open clicked");
  nav.classList.add("active");
});

sidebarClose.addEventListener("click", () => {
  console.log("Sidebar close clicked");
  nav.classList.remove("active");
});

body.addEventListener("click", (e) => {
  let clickedElm = e.target;
  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

// Text animation
var text = document.getElementById('text');
var newDom = '';
var animationDelay = 6;

for (let i = 0; i < text.innerText.length; i++) {
  newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i]) + '</span>';
}

text.innerHTML = newDom;
var length = text.children.length;

for (let i = 0; i < length; i++) {
  text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
}