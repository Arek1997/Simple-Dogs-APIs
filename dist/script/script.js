'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// variables
const dogAndCatButtons = document.querySelectorAll('.btn-animal');
const dogsContainer = document.querySelector('.container');
const animalCard = document.getElementsByClassName('content');
const initialImage = document.querySelector('.image');
const allPetsImages = document.getElementsByClassName('image');
const loading = document.querySelector('.lds-dual-ring');
const buttonLoader = document.querySelector('.btn--load');
const dogBark = document.querySelector('#dog');
const catMiau = document.querySelector('#cat');
const popup = document.querySelector('.popup');
const popup_image = document.querySelector('.popup__img');
const popup_close = document.querySelector('.popup__close');
const popupNavigateArrows = document.querySelectorAll('.popup__arrow');
const imageNumber = document.querySelector('.img-number');
const imagesArrLength = document.querySelector('.arr-length');
let currentImageIndex;
let select = 'dogAPI';
// API
const dogAPI = 'https://dog.ceo/api/breeds/image/random';
const catAPI = 'https://cataas.com/cat?json=true';
let initialAPI = dogAPI;
const catImage = 'https://cataas.com';
// Functions
const changeImage = function (e) {
    const target = e.target;
    // set select variable
    select = target.dataset.animal + 'API';
    // Change initial image and alt attribute
    const sorce = target.dataset.src;
    initialImage.src = sorce;
    initialImage.alt = select.slice(0, 3);
    // Add/remove active class to animal button
    dogAndCatButtons.forEach((btn) => {
        btn.classList.remove('active');
    });
    if (!target.classList.contains('active'))
        target.classList.toggle('active');
    // Change Load More button content
    if (initialImage.src.includes('dog'))
        buttonLoader.textContent = 'Load more Dogs!';
    if (initialImage.src.includes('cat'))
        buttonLoader.textContent = 'Load more Cats!';
};
const removeCards = function () {
    [...animalCard].forEach((card) => {
        if (!card.hasAttribute('data-init'))
            card.remove();
    });
};
const renderPet = function (src) {
    const html = `
            <article class="content">
               <img class="image" src="${src}" alt="${select.slice(0, 3)}" />
            </article>
            `;
    dogsContainer.insertAdjacentHTML('beforeend', html);
};
const showHide = function (...elements) {
    elements.forEach((el) => el.classList.toggle('hidden'));
};
const getAnimal = function (url, imageSource, optional = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        const data = yield res.json();
        renderPet(optional + data[imageSource]);
    });
};
const loadMorePets = function () {
    showHide(loading, buttonLoader);
    try {
        if (select === 'dogAPI') {
            initialAPI = dogAPI;
            getAnimal(initialAPI, 'message');
            // dog barking
            dogBark.currentTime = 0;
            dogBark.play();
        }
        if (select === 'catAPI') {
            initialAPI = catAPI;
            getAnimal(initialAPI, 'url', catImage);
            // cat miau
            catMiau.currentTime = 0;
            catMiau.play();
        }
    }
    catch (err) {
        alert(err);
    }
    showHide(loading, buttonLoader);
};
const openPopup = function (e) {
    const target = e.target;
    if (target.classList.contains('image')) {
        popup.classList.remove('hidden');
        popup_image.src = target.src;
        popup_image.alt = target.alt;
        const index = [...allPetsImages].findIndex((el) => el.src === target.src);
        currentImageIndex = index;
        imageNumber.textContent = (currentImageIndex + 1).toString();
        imagesArrLength.textContent = allPetsImages.length.toString();
    }
};
const closePopup = function () {
    popup.classList.add('fade-out');
    setTimeout(() => {
        popup.classList.remove('fade-out');
        popup.classList.add('hidden');
    }, 500);
};
const changePopupImage = function (e, direction) {
    const target = e.target;
    if (target.classList.contains('popup__arrow--next') || direction === 'next') {
        if (currentImageIndex === allPetsImages.length - 1) {
            currentImageIndex = 0;
        }
        else {
            currentImageIndex++;
        }
    }
    if (target.classList.contains('popup__arrow--prev') || direction === 'prev') {
        if (currentImageIndex === 0) {
            currentImageIndex = allPetsImages.length - 1;
        }
        else {
            currentImageIndex--;
        }
    }
    imageNumber.textContent = (currentImageIndex + 1).toString();
    popup_image.src = allPetsImages[currentImageIndex].src;
};
// Listeners
buttonLoader.addEventListener('click', loadMorePets);
dogAndCatButtons.forEach((button) => {
    button.addEventListener('click', changeImage);
    button.addEventListener('click', removeCards);
});
dogsContainer.addEventListener('click', openPopup);
popup_close.addEventListener('click', closePopup);
popupNavigateArrows.forEach((arrow) => arrow.addEventListener('click', changePopupImage));
popup.addEventListener('click', function (e) {
    if (e.target === popup)
        closePopup();
});
document.addEventListener('keydown', function (e) {
    if (popup.classList.contains('hidden'))
        return;
    if (e.code === 'ArrowRight' || e.keyCode === 39)
        changePopupImage(e, 'next');
    if (e.code === 'ArrowLeft' || e.keyCode === 37)
        changePopupImage(e, 'prev');
    if (e.code === 'Escape' || e.keyCode === 27)
        closePopup();
});
