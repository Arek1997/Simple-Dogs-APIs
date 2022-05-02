"use strict";

const cart = document.querySelector(".content");
const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn");

const renderSpinner = function (parentEl) {
  const markup = `
        <div class="spinner">
          <svg>
            <use href="icons.svg#icon-loader"></use>
          </svg>
        </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

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
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    renderDog(data.message);
  } catch (err) {
    alert(err);
  }
};

button.addEventListener("click", loadMoreDogs);
