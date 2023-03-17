import Swiper, { Navigation, Autoplay, Pagination } from 'swiper';

// import '../../scss/libs/swiper.scss';
import 'swiper/css/bundle';
import '../../scss/base/swiper.scss';

function initSliders() {
  if (document.querySelector('.hero__slider')) {
    new Swiper('.hero__slider', {
      modules: [Navigation, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 15,
      grabCursor: true,
      autoHeight: true,
      loop: true,
      autoplay: {
        delay: 4000,
      },
      speed: 800,
      navigation: {
        prevEl: '.hero__slider-prev',
        nextEl: '.hero__slider-next',
      },
      on: {},
    });
  }
  if (document.querySelector('.article__slider')) {
    new Swiper('.article__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 15,
      autoHeight: true,
      loop: true,
      speed: 800,
      navigation: {
        prevEl: '.hero__slider-prev',
        nextEl: '.hero__slider-next',
      },
      on: {},
    });
  }
  if (document.querySelector('.products__slider')) {
    new Swiper('.products__slider', {
      modules: [Navigation, Autoplay, Pagination],
      observer: true,
      observeParents: true,
      spaceBetween: 15,
      autoHeight: true,
      speed: 800,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: '.related-button',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  if (document.querySelector('.related__slider')) {
    new Swiper('.related__slider', {
      modules: [Navigation, Autoplay],
      observer: true,
      observeParents: true,
      spaceBetween: 15,
      speed: 800,
      loop: true,
      navigation: {
        nextEl: '.related-button',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  if (document.querySelector('.projects__slider')) {
    new Swiper('.projects__slider', {
      modules: [Autoplay, Pagination],
      spaceBetween: 15,
      autoHeight: true,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 2000,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  if (document.querySelector('.cert__slider')) {
    new Swiper('.cert__slider', {
      modules: [Autoplay, Navigation, Pagination],
      spaceBetween: 15,
      autoHeight: true,
      speed: 800,
      observer: true,
      observeParents: true,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1420: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }
}

window.addEventListener('load', function (e) {
  initSliders();
});
