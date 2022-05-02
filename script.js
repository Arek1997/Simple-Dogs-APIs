"use strict";

const carts = document.getElementsByClassName("content");
const loading = document.getElementsByClassName("spinner");
const dogsContainer = document.querySelector(".container");
const button = document.querySelector(".btn");

const renderDog = function (src) {
  const markup = `
        <div class="spinner">
          <svg>
            <use href="icons.svg#icon-loader"></use>
          </svg>
        </div>
  `;

  const html = `
            <div class="content">
            ${markup}
                <img class="image" src="${src}" alt="dog" />
            </div>
            `;

  dogsContainer.insertAdjacentHTML("beforeend", html);
  for (let el of [...loading]) {
    setTimeout(() => el.remove(), 2000);
  }
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
