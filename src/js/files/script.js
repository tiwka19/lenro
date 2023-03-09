// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { menuClose, menuOpen } from './functions.js';
import { flsModules } from './modules.js';
import Toastify from 'toastify-js';


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

const input = document.querySelector('.tel');

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

// const showMore = () => {
//   let showMoreBlock = document.querySelectorAll('[data-showmore]');
//   let showMoreButton = document.querySelector('#showMore');
//   if (!showMoreButton) return;
//   showMoreButton.addEventListener('click', function () {
//     showMoreBlock.forEach((el) => {
//       el.classList.toggle('_active');
//     });
//     this.classList.toggle('active');
//     if (this.classList.contains('active')) {
//       this.textContent = 'Скрыть';
//     } else {
//       this.textContent = 'Показать еще';
//     }
//   });
// };
// showMore();

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
      center: [60.043934, 30.489818],
      zoom: 14,
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
    let ptPlacemark = new ymaps.Placemark(
      [60.043934, 30.489818],
      {
        balloonContentHeader: 'Центральный офис',
        balloonContentBody: 'Санкт-Петербург,Мурино, промзона мурино, круговой проезд 1',
        balloonContentFooter: '8-800-250-23-60',
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

    // myPlacemark.openBalloon()
    mapMoscow.geoObjects.add(moscowPlacemark);
    mapPetersburg.geoObjects.add(ptPlacemark);

    moscowPlacemark.balloon.open();
    ptPlacemark.balloon.open();

    mapMoscow.behaviors.disable('scrollZoom');
    mapPetersburg.behaviors.disable('scrollZoom');
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

const formFunc = () => {
  const formSubmitting = () => {
    const elems = document.querySelectorAll('.wpcf7');
    if (!elems.length) {
      return false;
    }
    const forms = document.querySelectorAll('.wpcf7-form');
    if (!forms.length) {
      return false;
    }

    function _evtFormSubmit() {
      this.disabled = true;
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.setAttribute('data-default-text', submitBtn.innerText);
      submitBtn.innerHTML = '<span>Подождите...</span>';
    }

    function _evtSubmitSuccess(e) {
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
    }

    for (let i = forms.length - 1; i >= 0; i--) {
      forms[i].addEventListener('submit', _evtFormSubmit, false);
    }
    for (let i = elems.length - 1; i >= 0; i--) {
      elems[i].addEventListener('wpcf7submit', _evtSubmitSuccess, false);
    }
  };
  formSubmitting();
};

formFunc();
