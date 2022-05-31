"use strict";

// variables
const dogAndCatButtons = document.querySelectorAll(".btn-animal");
const dogsContainer = document.querySelector(".container");
const animalCard = document.getElementsByClassName("content");
const initialImage = document.querySelector(".image");
const allPetsImages = document.getElementsByClassName("image");
const loading = document.querySelector(".lds-dual-ring");
const buttonLoader = document.querySelector(".btn--load");
const dogBark = document.querySelector("#dog");
const catMiau = document.querySelector("#cat");
const popup = document.querySelector(".popup");
const popup_image = document.querySelector(".popup__img");
const popup_close = document.querySelector(".popup__close");
const popupLeftArrow = document.querySelector(".popup__arrow--left");
const popupRightArrow = document.querySelector(".popup__arrow--right");

let currentImageIndex;
let select = "dogAPI";

// API

const dogAPI = "https://dog.ceo/api/breeds/image/random";
const catAPI = "https://cataas.com/cat?json=true";
let initialAPI = dogAPI;
const catImage = "https://cataas.com";

// Functions

const changeImage = function (e) {
  // set select variable
  select = e.target.dataset.animal + "API";

  // Change initial image and alt attribute
  const sorce = e.target.dataset.src;
  initialImage.src = sorce;
  initialImage.alt = select.slice(0, 3);

  // Add/remove active class to animal button
  dogAndCatButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (!e.target.classList.contains("active"))
    e.target.classList.toggle("active");

  // Change Load More button content
  if (initialImage.src.includes("dog"))
    buttonLoader.textContent = "Load more Dogs!";

  if (initialImage.src.includes("cat"))
    buttonLoader.textContent = "Load more Cats!";
};

const removeCards = function () {
  [...animalCard].forEach((card) => {
    if (!card.hasAttribute("data-init")) card.remove();
  });
};

const renderPet = function (src) {
  const html = `
            <div class="content">
               <img class="image" src="${src}" alt="${select.slice(0, 3)}" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
};

const showHide = function (...elements) {
  elements.forEach((el) => el.classList.toggle("hidden"));
};

const getAnimal = async function (url, imageSource, optional = "") {
  const res = await fetch(url);
  const data = await res.json();
  renderPet(optional + data[imageSource]);
};

const loadMorePets = async function () {
  try {
    showHide(loading, buttonLoader);

    if (select === "dogAPI") {
      initialAPI = dogAPI;
      getAnimal(initialAPI, "message");

      showHide(loading, buttonLoader);

      // dog barking
      dogBark.currentTime = 0;
      dogBark.play();
    }

    if (select === "catAPI") {
      initialAPI = catAPI;
      getAnimal(initialAPI, "url", catImage);

      showHide(loading, buttonLoader);

      // cat miau
      catMiau.currentTime = 0;
      catMiau.play();
    }
  } catch (err) {
    alert(err);
  }
};

const openPopup = function (e) {
  if (e.target.classList.contains("image")) {
    popup.classList.remove("hidden");
    popup_image.src = e.target.src;
    popup_image.alt = e.target.alt;

    const index = [...allPetsImages].findIndex((el) => el.src === e.target.src);
    currentImageIndex = index;
  }
};

const closePopup = function () {
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.classList.remove("fade-out");
    popup.classList.add("hidden");
  }, 500);
};

const nextImage = function () {
  if (currentImageIndex === allPetsImages.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  popup_image.src = allPetsImages[currentImageIndex].src;
};

const prevImage = function () {
  if (currentImageIndex === 0) {
    currentImageIndex = allPetsImages.length - 1;
  } else {
    currentImageIndex--;
  }
  popup_image.src = allPetsImages[currentImageIndex].src;
};

// Listeners

buttonLoader.addEventListener("click", loadMorePets);

dogAndCatButtons.forEach((button) => {
  button.addEventListener("click", changeImage);
  button.addEventListener("click", removeCards);
});

dogsContainer.addEventListener("click", openPopup);
popup_close.addEventListener("click", closePopup);
popupRightArrow.addEventListener("click", nextImage);
popupLeftArrow.addEventListener("click", prevImage);
popup.addEventListener("click", function (e) {
  if (e.target === popup) closePopup();
});

document.addEventListener("keydown", function (e) {
  if (popup.classList.contains("hidden")) return;

  if (e.code === "ArrowRight" || e.keyCode === 39) nextImage();
  if (e.code === "ArrowLeft" || e.keyCode === 37) prevImage();
  if (e.code === "Escape" || e.keyCode === 27) closePopup();
});
// Testing cats API
// const loadCat = (async function () {
//   try {
//     const res = await fetch(catAPI);
//     const data = await res.json();
//     console.log(data.url);
//     console.log(data["url"]);
//   } catch (err) {
//     console.log(err);
//   }
// })();
