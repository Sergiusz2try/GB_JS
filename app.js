'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

let cartProfile = document.querySelector('.cartProfile')
let cartIcon = document.querySelector('.cartIcon');
cartIcon.addEventListener('click', () => {
    cartProfile.classList.toggle('hidden');
});

let totalCartPrice = 0;
let prodAmount = 0;
const totalOrderCart = {};
const featuredItems = document.querySelector('.featuredItems');
const cartContentName = document.querySelector('.cartContent-name');
const cartContentCount = document.querySelector('.cartContent-count');
const cartContentPrice = document.querySelector('.cartContent-price');
const cartContentTotal = document.querySelector('.cartContent-total');
const cartTotalPrice = document.querySelector('.cartTotalPrice');

featuredItems.addEventListener('click', event => {
    if (!event.target.tagName === 'BUTTON') {
        return;
    }
    const featuredData = event.target.parentElement.parentElement.parentElement.querySelector('.featuredData');
    const featuredName = featuredData.querySelector('.featuredName').innerText;
    const featuredPrice = featuredData.querySelector('.featuredPrice').innerText;
    if (featuredName in totalOrderCart) {
        totalOrderCart[featuredName].count++;
        cartContentCount.querySelector(`.prod-${totalOrderCart[featuredName].id}`).innerHTML = totalOrderCart[featuredName].count;
        const price = totalOrderCart[featuredName].price.replace('$', '');
        const totalPrice = totalOrderCart[featuredName].count * +price;
        totalCartPrice += +price;
        cartContentTotal.querySelector(`.prod-${totalOrderCart[featuredName].id}`).innerHTML = `$${totalPrice}`;
    } else {
        prodAmount++;
        totalOrderCart[featuredName] = {
            id: prodAmount,
            count: 1,
            price: featuredPrice,
        };

        cartContentName.innerHTML += `<li class="prod-${totalOrderCart[featuredName].id}">${featuredName}</li>`;
        cartContentCount.innerHTML += (`<li class="prod-${totalOrderCart[featuredName].id}">${totalOrderCart[featuredName].count}</li>`);
        cartContentPrice.innerHTML += (`<li class="prod-${totalOrderCart[featuredName].id}">${totalOrderCart[featuredName].price}</li>`);
        const price = totalOrderCart[featuredName].price.replace('$', '');
        const totalPrice = totalOrderCart[featuredName].count * +price;
        totalCartPrice += +price;
        cartContentTotal.innerHTML += (`<li class="prod-${totalOrderCart[featuredName].id}"}">$${totalPrice}</li>`); 
    }

    cartTotalPrice.innerHTML = `Товаров в корзине на сумму: $${totalCartPrice}`;
});
