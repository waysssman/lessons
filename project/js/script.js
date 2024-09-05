'use strict';
document.addEventListener('click', documentActions);

function documentActions(e) {
   const targetElement = e.target;

   if (targetElement.closest('.icon-menu')) {
      document.body.classList.toggle('menu-open');
   }

   if (targetElement.closest('[data-spoller]')) {
      const currentElement = targetElement.closest('[data-spoller]');
      if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
         currentElement.classList.toggle('active');
      }
      slideToggle(currentElement.nextElementSibling);
   }
   if (targetElement.closest('.rating__input')) {
      const currentElement = targetElement.closest('.rating__input');
      const rating = targetElement.closest('.rating');
      starRatingGet(rating, currentElement);
   }
}

//Rating

const ratings = document.querySelectorAll('[data-rating]');
if (ratings) {
   ratings.forEach((rating) => {
      const curentValue = +rating.dataset.rating;
      curentValue ? starRatingSet(rating, curentValue) : null;
   });
}

function starRatingGet(rating, currentElement) {
   const ratingValue = +currentElement.value;
   const resultRating = 3.2;
   starRatingSet(rating, resultRating);
}
function starRatingSet(rating, value) {
   const ratingItems = rating.querySelectorAll('.rating__item');
   const resultFullItems = parseInt(value);
   const resultPartItem = value - resultFullItems;
   ratingItems.forEach((ratingItem, i) => {
      ratingItem.classList.remove('active');
      ratingItem.querySelector('span')
         ? ratingItems[i].querySelector('span').remove()
         : null;
      if (i <= resultFullItems - 1) {
         ratingItem.classList.add('active');
      }
      if (i === resultFullItems && resultPartItem) {
         ratingItem.insertAdjacentHTML(
            'beforeend',
            `<span style="width:${resultPartItem * 100}%"></span>`
         );
      }
   });
}

// Spollers
const spollers = document.querySelectorAll('[data-spoller]');
if (spollers.length) {
   spollers.forEach((spoller) => {
      spoller.nextElementSibling.hidden = true;
   });
}

let slideDown = (target, duration = 500) => {
   if (!target.classList.contains('--sliding')) {
      target.classList.add('--sliding');
      target.hidden = false;
      let height = target.offsetHeight;

      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;

      target.style.overflow = 'hidden';
      target.style.height = 0;

      target.offsetHeight;

      target.style.transitionProperty = `height, margin, padding`;
      target.style.transitionDuration = `${duration}ms`;

      target.style.height = `${height}px`;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('magrin-bottom');
      target.style.removeProperty('magrin-top');

      setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-property');
         target.style.removeProperty('transition-duration');
         target.classList.remove('--sliding');
      }, duration);
   }
};
let slideUp = (target, duration = 500) => {
   if (!target.classList.contains('--sliding')) {
      target.classList.add('--sliding');
      target.hidden = false;
      let height = target.offsetHeight;

      target.style.transitionProperty = `height, margin, padding`;
      target.style.transitionDuration = `${duration}ms`;
      target.style.height = `${height}px`;

      target.offsetHeight;

      target.style.overflow = 'hidden';

      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;

      target.style.height = 0;

      setTimeout(() => {
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('magrin-bottom');
         target.style.removeProperty('magrin-top');

         target.style.height = 'height';
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-property');
         target.style.removeProperty('transition-duration');
         target.classList.remove('--sliding');

         target.hidden = true;
      }, duration);
   }
};
let slideToggle = (target, duration = 500) => {
   target.hidden ? slideDown(target, duration) : slideUp(target, duration);
};

// Sliders

const heroSlider = document.querySelector('.hero');
if (heroSlider) {
   new Swiper('.hero', {
      // Optional parameters
      // direction: 'horizontal',
      loop: true,
      autoHeight: true,
      speed: 800,
      parallax: true,
      // If we need pagination
      pagination: {
         el: '.hero__pagination',
         clickable: true,
      },
      // Navigation arrows
      navigation: {
         nextEl: '.hero__arrow--next',
         prevEl: '.hero__arrow--prev',
      },
   });
}

const newSlider = document.querySelector('.new');
if (newSlider) {
   new Swiper('.new__slider', {
      // Optional parameters
      // direction: 'horizontal',
      loop: true,
      autoHeight: true,
      speed: 800,
      spaceBetween: 38,
      slidesPerView: 4,
      // Navigation arrows
      navigation: {
         nextEl: '.new__arrow--right',
         prevEl: '.new__arrow--left',
      },
      breakpoints: {
         320: {
            slidesPerView: 1.5,
            spaceBetween: 15,
         },
         480: {
            slidesPerView: 2,
            spaceBetween: 15,
         },
         650: {
            slidesPerView: 3,
            spaceBetween: 25,
         },
         991: {
            slidesPerView: 4,
            spaceBetween: 38,
         },
      },
   });
}

const reviewsSlider = document.querySelector('.reviews');
if (reviewsSlider) {
   new Swiper('.reviews__slider', {
      // Optional parameters
      loop: true,
      // autoHeight: true,
      speed: 800,
      spaceBetween: 23,
      slidesPerView: 3,
      // If we need pagination
      pagination: {
         el: '.reviews__pages',
         clickable: true,
      },
      // Responsive breakpoints
      breakpoints: {
         320: {
            slidesPerView: 1.3,
            spaceBetween: 15,
         },
         480: {
            slidesPerView: 2,
            spaceBetween: 15,
         },
         991: {
            slidesPerView: 3,
            spaceBetween: 23,
         },
      },
   });
}
