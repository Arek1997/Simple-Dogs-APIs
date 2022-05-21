"use strict";

const initialImage = document.querySelector(".image");
const loading = document.querySelector(".lds-dual-ring");
const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn--load");
const dogBark = document.querySelector("#dog");

const dogAndCatButtons = document.querySelectorAll(".btn-animal");

// API
const dogAPI = "https://dog.ceo/api/breeds/image/random";
const catAPI = "https://cataas.com/cat?json=true";
const catImage = "https://cataas.com";

// Functions

const changeImage = function (e) {
  const sorce = e.target.dataset.src;
  initialImage.src = sorce;
};

const renderDog = function (src) {
  const html = `
            <div class="content">
               <img class="image" src="${src}" alt="dog" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
};

const showHide = function (...elements) {
  console.log(elements);
  elements.forEach((el) => el.classList.toggle("hidden"));
};

const loadMoreDogs = async function () {
  try {
    showHide(loading, button);

    const res = await fetch(dogAPI);
    const data = await res.json();
    renderDog(data.message);

    showHide(loading, button);

    // dog barking
    dogBark.currentTime = 0;
    dogBark.play();
  } catch (err) {
    alert(err);
  }
};

button.addEventListener("click", loadMoreDogs);

dogAndCatButtons.forEach((button) => {
  button.addEventListener("click", changeImage);
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
