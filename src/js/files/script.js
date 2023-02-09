// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { menuClose } from './functions.js'

if (window.matchMedia('(min-width: 992px)').matches) {
	const dropdownButton = document.querySelector('.menu-catalog button')
	const dropdownMenu = document.querySelector('.catalog')
	const dropdownClose = document.querySelector('.catalog__head-button')
	dropdownButton.addEventListener('click', () => {
		dropdownMenu.classList.add('_active')
	})
	dropdownClose.addEventListener('click', () => {
		dropdownMenu.classList.remove('_active')
	})
}

window.addEventListener('click', e => {
	const target = e.target
	if (!target.closest('.menu__body') && !target.closest('.icon-menu')) {
		menuClose()
	}
})

const showMore = () => {
	let showMoreBlock = document.querySelectorAll('[data-showmore]')
	let showMoreButton = document.querySelector('#showMore')
	if (!showMoreButton) return;
	showMoreButton.addEventListener('click', function () {
		showMoreBlock.forEach(el => {
			el.classList.toggle('_active')
		})
		this.classList.toggle('active')
		if (this.classList.contains('active')) {
			this.textContent = 'Скрыть'
		} else {
			this.textContent = 'Показать еще'
		}
	})
}
showMore()

ymaps.ready(init)
function init() {
	// Создание карты.
	let mapMoscow = new ymaps.Map('map_moscow', {
		controls: [],
		center: [55.707791, 37.595806],
		zoom: 14,
	})

	let mapPetersburg = new ymaps.Map('map_petersburg', {
		controls: [],
		center: [60.043934, 30.489818],
		zoom: 14,
	})

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
			iconImageHref: 'img/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		}
	)
	let ptPlacemark = new ymaps.Placemark(
		[60.043934, 30.489818],
		{
			balloonContentHeader: 'Центральный офис',
			balloonContentBody:
				'Санкт-Петербург,Мурино, промзона мурино, круговой проезд 1',
			balloonContentFooter: '8-800-250-23-60',
			hideIconOnBalloonOpen: false,
		},
		{
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		}
	)

	// myPlacemark.openBalloon()
	mapMoscow.geoObjects.add(moscowPlacemark)
	mapPetersburg.geoObjects.add(ptPlacemark)

	moscowPlacemark.balloon.open()
	ptPlacemark.balloon.open()

	mapMoscow.behaviors.disable('scrollZoom')
	mapPetersburg.behaviors.disable('scrollZoom')
	// myMap.behaviors.disable('drag');
}
