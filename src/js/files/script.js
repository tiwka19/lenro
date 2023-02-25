// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { menuClose } from "./functions.js";
import { flsModules } from "./modules.js";
import Toastify from "toastify-js";

const catalogDropdown = () => {
  const dropdownButton = document.querySelector(".menu-catalog button");
  const dropdownMenu = document.querySelector(".catalog");
  const dropdownClose = document.querySelector(".catalog__head-button");
  if (!dropdownButton) return;
  if (window.matchMedia("(min-width: 992px)").matches) {
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.add("_active");
    });
    dropdownClose.addEventListener("click", () => {
      dropdownMenu.classList.remove("_active");
    });
  }
};
catalogDropdown();

window.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.closest(".menu__body") && !target.closest(".icon-menu")) {
    menuClose();
  }
});

const showMore = () => {
  let showMoreBlock = document.querySelectorAll("[data-showmore]");
  let showMoreButton = document.querySelector("#showMore");
  if (!showMoreButton) return;
  showMoreButton.addEventListener("click", function () {
    showMoreBlock.forEach((el) => {
      el.classList.toggle("_active");
    });
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.textContent = "Скрыть";
    } else {
      this.textContent = "Показать еще";
    }
  });
};
showMore();

const maps = () => {
  if (!document.querySelector(".map")) return;
  ymaps.ready(init);
  function init() {
    // Создание карты.
    let mapMoscow = new ymaps.Map("map_moscow", {
      controls: [],
      center: [55.707791, 37.595806],
      zoom: 14,
    });

    let mapPetersburg = new ymaps.Map("map_petersburg", {
      controls: [],
      center: [60.043934, 30.489818],
      zoom: 14,
    });

    let moscowPlacemark = new ymaps.Placemark(
      [55.707791, 37.595806],
      {
        balloonContentHeader: "Московский офис",
        balloonContentBody: "Москва,ул. Орджоникидзе, д.11, стр. 1А, офис 1.",
        balloonContentFooter: "+7 495 234-41-72",
        hideIconOnBalloonOpen: false,
      },
      {
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // Своё изображение иконки метки.
        iconImageHref: "img/map.svg",
        // Размеры метки.
        iconImageSize: [40, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -20],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [0, 0],
      }
    );
    let ptPlacemark = new ymaps.Placemark(
      [60.043934, 30.489818],
      {
        balloonContentHeader: "Центральный офис",
        balloonContentBody:
          "Санкт-Петербург,Мурино, промзона мурино, круговой проезд 1",
        balloonContentFooter: "8-800-250-23-60",
        hideIconOnBalloonOpen: false,
      },
      {
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // Своё изображение иконки метки.
        iconImageHref: "img/map.svg",
        // Размеры метки.
        iconImageSize: [40, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -20],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [0, 0],
      }
    );

    // myPlacemark.openBalloon()
    mapMoscow.geoObjects.add(moscowPlacemark);
    mapPetersburg.geoObjects.add(ptPlacemark);

    moscowPlacemark.balloon.open();
    ptPlacemark.balloon.open();

    mapMoscow.behaviors.disable("scrollZoom");
    mapPetersburg.behaviors.disable("scrollZoom");
  }
};
maps();

const currentProductsName = () => {
  const products = document.querySelectorAll(".product");
  const productFormName = document.querySelector("#productName");
  if (!products) return;
  products.forEach((product) => {
    product.addEventListener("click", function (event) {
      let productName = this.querySelector(".product__title").textContent;
      productFormName.textContent = productName;
      document.querySelector("#product").value = productName;
    });
  });
};
currentProductsName();

const menuLinks = document.querySelectorAll(".menu__link");
menuLinks.forEach((link) => {
  let location = window.location.href;
  let currentLink = link.href;
  if (location == currentLink) {
    link.classList.add("_active");
  }
});

const menuList = document.querySelector(".menu__list");
menuList.setAttribute("data-spollers", 992);

const formFunc = () => {
  const form = document.querySelector(".wpcf7-form");
  if (!form) return;
  form.addEventListener(
    "wpcf7submit",
    function (e) {
      flsModules.popup.open("#productForm");
      console.log("ss");
      if ("mail_sent" === e.detail.status) {
        setTimeout(() => {
          flsModules.popup.close("#productForm");
          Toastify({
            text: "Ваше сообщение успешно отправлено!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#d52628",
              color: "#FFF",
            },
          }).showToast();
        }, 100);
      }
    },
    false
  );

  const formSubmitting = () => {
    const elems = document.querySelectorAll(".wpcf7");
    if (!elems.length) {
      return false;
    }
    const forms = document.querySelectorAll(".wpcf7-form");
    if (!forms.length) {
      return false;
    }

    function _evtFormSubmit() {
      this.disabled = true;
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.setAttribute("data-default-text", submitBtn.innerText);
      submitBtn.innerHTML = "<span>Подождите...</span>";
    }

    function _evtSubmitSuccess(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          "<span>" + submitBtn.getAttribute("data-default-text") + "</span>";
      }, 600);
    }

    for (let i = forms.length - 1; i >= 0; i--) {
      forms[i].addEventListener("submit", _evtFormSubmit, false);
    }
    for (let i = elems.length - 1; i >= 0; i--) {
      elems[i].addEventListener("wpcf7submit", _evtSubmitSuccess, false);
    }
  };
  formSubmitting();
};
