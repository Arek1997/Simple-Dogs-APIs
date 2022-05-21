"use strict";

const carts = document.getElementsByClassName("content");
const loading = document.querySelector(".lds-dual-ring");
const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn");
const dog = document.querySelector("#dog");

const renderDog = function (src) {
  const html = `
            <div class="content">
               <img class="image" src="${src}" alt="dog" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
};

// const loadMoreDogs = function () {
//   fetch("https://dog.ceo/api/breeds/image/random")
//     .then((response) => response.json())
//     .then((data) => renderDog(data.message));
// };

const showHide = function (...elements) {
  console.log(elements);
  elements.forEach((el) => el.classList.toggle("hidden"));
};

const loadMoreDogs = async function () {
  try {
    showHide(loading, button);

    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    renderDog(data.message);

    showHide(loading, button);

    // dog barking
    dog.currentTime = 0;
    dog.play();
  } catch (err) {
    alert(err);
  }
};

button.addEventListener("click", loadMoreDogs);
