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

// const loadMoreDogs = function () {
//   fetch("https://dog.ceo/api/breeds/image/random")
//     .then((response) => response.json())
//     .then((data) => renderDog(data.message));
// };

const loadMoreDogs = async function () {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  renderDog(data.message);
};

button.addEventListener("click", loadMoreDogs);
