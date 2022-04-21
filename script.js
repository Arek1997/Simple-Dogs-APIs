"use strict";

const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn");

const renderDog = function (src) {
  const html = `
            <div class="content">
                <img class="image" src="${src}" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
};

const loadMoreDogs = function () {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => renderDog(data.message));
};

button.addEventListener("click", loadMoreDogs);
