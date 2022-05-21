"use strict";

const dogAndCatButtons = document.querySelectorAll(".btn-animal");
const dogsContainer = document.querySelector(".container");
const animalCard = document.getElementsByClassName("content");
const initialImage = document.querySelector(".image");
const loading = document.querySelector(".lds-dual-ring");
const buttonLoader = document.querySelector(".btn--load");
const dogBark = document.querySelector("#dog");
const catMiau = document.querySelector("#cat");
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

  // Change initial image
  const sorce = e.target.dataset.src;
  initialImage.src = sorce;

  // Add/remove active class from animal button
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
               <img class="image" src="${src}" alt="dog" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
};

const showHide = function (...elements) {
  elements.forEach((el) => el.classList.toggle("hidden"));
};

const loadMorePets = async function () {
  try {
    showHide(loading, buttonLoader);

    if (select === "dogAPI") {
      initialAPI = dogAPI;

      const res = await fetch(initialAPI);
      const data = await res.json();
      renderPet(data.message);

      showHide(loading, buttonLoader);

      // dog barking
      dogBark.currentTime = 0;
      dogBark.play();
    }

    if (select === "catAPI") {
      initialAPI = catAPI;

      const res = await fetch(catAPI);
      const data = await res.json();
      // console.log(data.url);
      renderPet(catImage + data.url);

      showHide(loading, buttonLoader);

      // cat miau
      catMiau.currentTime = 0;
      catMiau.play();
    }
  } catch (err) {
    alert(err);
  }
};

// Listeners

buttonLoader.addEventListener("click", loadMorePets);

dogAndCatButtons.forEach((button) => {
  button.addEventListener("click", changeImage);
  button.addEventListener("click", removeCards);
});

// const loadCat = (async function () {
//   try {
//     const res = await fetch(catAPI);
//     const data = await res.json();
//     console.log(data.url);
//   } catch (err) {
//     console.log(err);
//   }
// })();
