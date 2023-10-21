// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import Toastify from 'toastify-js';
import { flsModules } from './modules.js';
import tippy from 'tippy.js';

tippy('[data-tippy-content]', {
  placement: 'top',
  interactive: true,
});

const catalogDropdown = () => {
  const dropdownButton = document.querySelector('.menu-catalog button');
  const dropdownMenu = document.querySelector('.catalog');
  const dropdownClose = document.querySelector('.catalog__head-button');
  if (!dropdownButton) return;
  if (window.matchMedia('(min-width: 992px)').matches) {
    dropdownButton.addEventListener('click', () => {
      dropdownMenu.classList.add('_active');
    });
    dropdownClose.addEventListener('click', () => {
      dropdownMenu.classList.remove('_active');
    });
  }
};
catalogDropdown();

const inputs = document.querySelectorAll('.tel');
const prefixNumber = (str) => {
  if (str === '7') {
    return '7 (';
  }
  if (str === '8') {
    return '8 (';
  }
  if (str === '9') {
    return '7 (9';
  }
  return '7 (';
};

// ======================================
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    const value = input.value.replace(/\D+/g, '');
    const numberLength = 11;

    let result;
    if (input.value.includes('+8') || input.value[0] === '8') {
      result = '';
    } else {
      result = '+';
    }

    //
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ') ';
          break;
        case 7:
          result += '-';
          break;
        case 9:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }
    //
    input.value = result;
  });
});

const maps = () => {
  if (!document.querySelector('.map')) return;
  ymaps.ready(init);
  function init() {
    // Создание карты.
    let mapMoscow = new ymaps.Map('map_moscow', {
      controls: [],
      center: [55.707791, 37.595806],
      zoom: 14,
    });

    let mapPetersburg = new ymaps.Map('map_petersburg', {
      controls: [],
      center: [60.045844, 30.429834],
      zoom: 12,
    });

    let moscowPlacemark = new ymaps.Placemark(
      [55.707791, 37.595806],
      {
        balloonContentHeader: 'Московский офис',
        balloonContentBody: 'Москва,ул. Орджоникидзе, д.11, стр. 1А, офис 1.',
        balloonContentFooter: '+7 495 234-41-72',
        hideIconOnBalloonOpen: false,
      },
      {
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: '/wp-content/themes/lenro/assets/img/map.svg',
        // Размеры метки.
        iconImageSize: [40, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -20],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [0, 0],
      },
    );
    let ptPlacemark1 = new ymaps.Placemark(
      [60.05909, 30.335029],
      {
        balloonContentHeader: 'Центральный офис',
        balloonContentBody: 'Санкт-Петербург, проспект Энгельса 154, офис 467',
        balloonContentFooter: '8-800-250-23-60',
        hasBalloon: true,
        hideIconOnBalloonOpen: true,
      },
      {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/wp-content/themes/lenro/assets/img/map.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20],
        iconContentOffset: [0, 0],
      },
    );
    let ptPlacemark2 = new ymaps.Placemark(
      [60.043929, 30.489818],
      {
        balloonContentHeader: 'Производственно-складской комплекс',
        balloonContentBody: 'Производственная зона Мурино, Круговой проезд д.1',
        balloonContentFooter: '8-800-250-23-60',
        hasBalloon: true,
        hideIconOnBalloonOpen: true,
      },
      {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/wp-content/themes/lenro/assets/img/map.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20],
        iconContentOffset: [0, 0],
      },
    );

    // myPlacemark.openBalloon()
    mapMoscow.geoObjects.add(moscowPlacemark);
    mapPetersburg.geoObjects.add(ptPlacemark1);
    mapPetersburg.geoObjects.add(ptPlacemark2);

    mapMoscow.behaviors.disable('scrollZoom');
    mapPetersburg.behaviors.disable('scrollZoom');

    moscowPlacemark.balloon.open();
    ptPlacemark1.balloon.open();
  }
};
maps();

const currentProductsName = () => {
  const products = document.querySelectorAll('.product');
  const productFormName = document.querySelector('#productName');
  if (!products) return;
  products.forEach((product) => {
    product.addEventListener('click', function (event) {
      let productName = this.querySelector('.product__title').textContent;
      productFormName.textContent = productName;
      document.querySelector('#product').value = productName;
    });
  });
};
currentProductsName();

const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach((link) => {
  let location = window.location.href;
  let currentLink = link.href;
  if (location == currentLink) {
    link.classList.add('_active');
  }
});

const menuList = document.querySelector('.menu__list');
menuList.setAttribute('data-spollers', 992);

const formSubmitting = () => {
  let forms = document.querySelectorAll('.wpcf7');
  forms.forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.addEventListener('click', () => {
      submitBtn.innerHTML = 'Подождите...';
      submitBtn.disabled = true;
    });
    form.addEventListener(
      'wpcf7mailsent',
      (e) => {
        console.log(e.detail);
        submitBtn.innerHTML = 'Отправить';
        submitBtn.disabled = false;
        flsModules.popup.close('#productForm');
        flsModules.popup.close('#callbackForm');
        Toastify({
          text: 'Заявка принята, спасибо!',
          duration: 6000,
          fontSize: 30,
          gravity: 'top',
          position: 'right',
          style: {
            background: '#d52628',
          },
          onClick: function () {},
        }).showToast();
      },
      false,
    );
    form.addEventListener(
      'wpcf7invalid',
      () => {
        submitBtn.innerHTML = 'Отправить';
        submitBtn.disabled = false;
      },
      false,
    );
  });
};
formSubmitting();

let scrollToTopButton = document.getElementById('scrollTopButton');
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopButton.classList.add('visible');
  } else {
    scrollToTopButton.classList.remove('visible');
  }
}

scrollToTopButton.addEventListener('click', () => topFunction());

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
