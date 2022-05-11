"use strict";

const carts = document.getElementsByClassName("content");
const loading = document.querySelector(".lds-dual-ring");
const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn");

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

const loadMoreDogs = async function () {
  try {
    loading.classList.remove("hidden");
    button.classList.add("hidden");

    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    renderDog(data.message);

    loading.classList.add("hidden");
    button.classList.remove("hidden");
  } catch (err) {
    alert(err);
  }
};

button.addEventListener("click", loadMoreDogs);
