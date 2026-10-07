$('.tel').mask('+7 (999) 999-99-99');

/* sidebar */
document.addEventListener('DOMContentLoaded', () => {
	const sidebar = document.querySelector('.menu-block');
	const burger = document.querySelector('.navbar-toggler');
	const offcanvas = document.getElementById('offcanvasNavbar');

	offcanvas.addEventListener('show.bs.offcanvas', function () {
		sidebar.classList.add('open');
		burger.classList.add('active');
		document.body.classList.add('active');
	});

	offcanvas.addEventListener('hide.bs.offcanvas', function () {
		sidebar.classList.remove('open');
		burger.classList.remove('active');
		document.body.classList.remove('active');
	});

	offcanvas.addEventListener('hidden.bs.offcanvas', function () {
		sidebar.classList.remove('open');
		burger.classList.remove('active');
		document.body.classList.remove('active');
	});
});

const offcanvas = document.getElementById('offcanvasNavbar');
const themeColor = document.getElementById('themeColor');
const body = document.body;

offcanvas.addEventListener('show.bs.offcanvas', function () {
	themeColor.setAttribute('content', '#080808');
	body.style.backgroundColor = '#080808';
});

offcanvas.addEventListener('hidden.bs.offcanvas', function () {
	themeColor.setAttribute('content', '#F7F6F2');
	body.style.backgroundColor = '#F7F6F2';

	setTimeout(() => {
		body.style.backgroundColor = '';
	}, 300);
});

if (screen.width > 992) {
	document.addEventListener('DOMContentLoaded', function () {
		const fixedBtn = document.querySelector('.fixed-btn');
		const fixedBtnWrap = document.querySelector('.fixed-btn__wrap');
		const menuBlock = document.querySelector('.menu-block');
		const menuToggler = document.querySelector('.navbar-toggler');

		function shouldHideButton() {
			const hideSection = document.querySelector('.fixed-btn-hidden');
			if (!hideSection) return false;

			const rect = hideSection.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			return rect.top < windowHeight && rect.bottom > 0;
		}

		function getLeftTheme() {
			const sections = document.querySelectorAll('section[data-theme-left]');
			let activeTheme = null;

			sections.forEach(section => {
				const rect = section.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
					activeTheme = section.getAttribute('data-theme-left');
				}
			});

			if (!activeTheme) {
				const sectionsGeneral = document.querySelectorAll('section[data-theme]');
				sectionsGeneral.forEach(section => {
					const rect = section.getBoundingClientRect();
					if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
						activeTheme = section.getAttribute('data-theme');
					}
				});
			}

			return activeTheme;
		}

		function getRightTheme() {
			const sections = document.querySelectorAll('section[data-theme-right]');
			let activeTheme = null;

			const settings = {
				triggerPoint: 0.3,        // Точка срабатывания по вертикали (0.5 = центр экрана)
				horizontalPosition: 'right', // 'left', 'center', 'right' или число в px
				customOffset: 50,        // Отступ от правого края в px (если horizontalPosition: 'right')
				checkHorizontal: true     // Включить горизонтальную проверку
			};

			const triggerY = window.innerHeight * settings.triggerPoint;

			// Определяем горизонтальную позицию для проверки
			let checkX;
			if (settings.horizontalPosition === 'right') {
				checkX = window.innerWidth - settings.customOffset;
			} else if (settings.horizontalPosition === 'left') {
				checkX = settings.customOffset;
			} else if (typeof settings.horizontalPosition === 'number') {
				checkX = settings.horizontalPosition;
			} else {
				checkX = window.innerWidth / 2; // center
			}

			sections.forEach(section => {
				const rect = section.getBoundingClientRect();

				// Вертикальная проверка
				const isVerticallyActive = rect.top <= triggerY && rect.bottom >= triggerY;

				// Горизонтальная проверка
				let isHorizontallyActive = true;
				if (settings.checkHorizontal) {
					isHorizontallyActive = rect.left <= checkX && rect.right >= checkX;
				}

				if (isVerticallyActive && isHorizontallyActive) {
					activeTheme = section.getAttribute('data-theme-right');
				}
			});

			// Fallback для общих секций
			if (!activeTheme) {
				const sectionsGeneral = document.querySelectorAll('section[data-theme]');
				sectionsGeneral.forEach(section => {
					const rect = section.getBoundingClientRect();
					const isVerticallyActive = rect.top <= triggerY && rect.bottom >= triggerY;
					const isHorizontallyActive = rect.left <= checkX && rect.right >= checkX;

					if (isVerticallyActive && isHorizontallyActive) {
						activeTheme = section.getAttribute('data-theme');
					}
				});
			}

			return activeTheme;
		}

		function updateLeftTheme() {
			const theme = getLeftTheme();

			menuBlock.classList.remove('theme-dark', 'theme-light');

			if (theme === 'dark') {
				menuBlock.classList.add('theme-light');
			} else if (theme === 'light') {
				menuBlock.classList.add('theme-dark');
			}
		}

		function updateRightTheme() {
			const theme = getRightTheme();

			fixedBtn.classList.remove('theme-dark', 'theme-light');

			if (theme === 'dark') {
				fixedBtn.classList.add('theme-light');
			} else if (theme === 'light') {
				fixedBtn.classList.add('theme-dark');
			}
		}

		function updateButtonVisibility() {
			if (shouldHideButton()) {
				fixedBtn.classList.add('hidden');
			} else {
				fixedBtn.classList.remove('hidden');
			}
		}

		let ticking = false;

		window.addEventListener('scroll', function () {
			if (!ticking) {
				requestAnimationFrame(function () {
					updateButtonVisibility();
					updateLeftTheme();
					updateRightTheme();
					ticking = false;
				});
				ticking = true;
			}
		});

		updateButtonVisibility();
		updateLeftTheme();
		updateRightTheme();

		window.addEventListener('resize', function () {
			updateButtonVisibility();
			updateLeftTheme();
			updateRightTheme();
		});
	});
}


/* sliders */
$('.benefits__slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 800,
	infinite: true,
	prevArrow: '.benefits__prev',
	nextArrow: '.benefits__next',
	dots: true,
	appendDots: '.benefits__pagination',
	fade: true,
});

$('.reviews__slider').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	speed: 800,
	infinite: true,
	prevArrow: '.reviews__prev',
	nextArrow: '.reviews__next',
	dots: true,
	appendDots: '.reviews__pagination',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}
	]
});

$('.reviews-video__slider').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	speed: 800,
	infinite: true,
	prevArrow: '.reviews-video__prev',
	nextArrow: '.reviews-video__next',
	dots: true,
	appendDots: '.reviews-video__pagination',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}
	]
});

$('.commercial__slider').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	speed: 800,
	infinite: true,
	prevArrow: '.commercial__prev',
	nextArrow: '.commercial__next',
	dots: true,
	appendDots: '.commercial__pagination',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			}
		}
	]
});

if (screen.width < 992) {
	$('.project-gallery__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 800,
		infinite: true,
		arrows: false,
		dots: true,
		appendDots: '.project-gallery__pagination',
	});
}

gsap.registerPlugin(ScrollTrigger);

/* анимация блока услуг */
const sliderContainer = document.querySelector('.services-main__slider');
const slider = $(sliderContainer).slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: false,
	prevArrow: '.commercial__prev',
	nextArrow: '.commercial__next',
	dots: true,
	vertical: true,
	verticalSwiping: true,
	appendDots: '.services-main__pagination',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				vertical: false,
				verticalSwiping: false,
				variableWidth: true,
			}
		}
	]
});

function updateImages(currentSlide) {
	const images = document.querySelectorAll('.services-main__image');

	images.forEach((image, index) => {
		if (index === currentSlide) {
			gsap.to(image, {
				opacity: 1,
				scale: 1,
				duration: 0.8,
				ease: 'power2.out',
				display: 'block'
			});
		} else {
			gsap.to(image, {
				opacity: 0,
				scale: 1.05,
				duration: 0.8,
				ease: 'power2.out',
				display: 'none'
			});
		}
	});
}

function initImages() {
	const images = document.querySelectorAll('.services-main__image');

	images.forEach((image, index) => {
		if (index === 0) {
			gsap.set(image, {
				opacity: 1,
				scale: 1,
				display: 'block'
			});
		} else {
			gsap.set(image, {
				opacity: 0,
				scale: 1.05,
				display: 'none'
			});
		}
	});
}

function initServicesScrollAnimation() {
	if (window.innerWidth <= 992) {
		if (window.servicesScrollTrigger) {
			window.servicesScrollTrigger.kill();
			window.servicesScrollTrigger = null;

			const section = document.querySelector('.services-main');
			if (section) {
				section.style.position = '';
				section.style.top = '';
				section.style.zIndex = '';
				section.style.width = '';
			}

			const images = document.querySelectorAll('.services-main__image');
			images.forEach(image => {
				gsap.set(image, {
					opacity: 1,
					scale: 1,
					display: 'block'
				});
			});
		}
		return;
	}

	const section = document.querySelector('.services-main');
	const slideCount = $('.services-main__slide').length;

	initImages();

	if (window.servicesScrollTrigger) {
		window.servicesScrollTrigger.kill();
	}

	gsap.set(section, {
		zIndex: 100,
		position: 'relative'
	});

	window.servicesScrollTrigger = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: 'bottom bottom',
			end: () => `+=${(slideCount - 1) * 50}%`,
			pin: true,
			pinSpacing: true,
			scrub: 0.5,
			anticipatePin: 1,
			invalidateOnRefresh: true,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;
				const currentSlide = Math.round(progress * (slideCount - 1));

				if (slider && typeof slider.slick === 'function') {
					const currentSlideIndex = slider.slick('slickCurrentSlide');
					if (currentSlideIndex !== currentSlide) {
						slider.slick('slickGoTo', currentSlide);
						updateImages(currentSlide);
					}
				}
			},
			onEnter: () => {
				console.log('Секция зафиксирована');
				section.classList.add('is-pinned');
			},
			onLeave: () => {
				console.log('Секция откреплена');
				section.classList.remove('is-pinned');
			},
			onLeaveBack: () => {
				console.log('Секция откреплена (обратно)');
				section.classList.remove('is-pinned');
			},
			onEnterBack: () => {
				console.log('Секция зафиксирована (обратно)');
				section.classList.add('is-pinned');
			}
		}
	});

	window.servicesScrollTrigger.to({}, {
		duration: 1,
		ease: 'none'
	});
}

$(document).ready(function () {
	initServicesScrollAnimation();

	setTimeout(() => {
		if (window.ScrollTrigger) {
			ScrollTrigger.refresh();
		}
	}, 100);
});

let resizeTimer;
$(window).on('resize', function () {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		initServicesScrollAnimation();
		if (window.ScrollTrigger) {
			ScrollTrigger.refresh();
		}
	}, 250);
});

window.addEventListener('load', function () {
	if (window.ScrollTrigger) {
		ScrollTrigger.refresh();
	}
});


// слайдер на странице проекта
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function handleProjectSliders() {
	if ($('.project-direction__slider').length === 0) {
		return;
	}

	$('.project-direction__slider').each(function () {
		const $slider = $(this);
		const $dots = $slider.closest('.project-direction').find('.project-direction__pagination');

		if (window.innerWidth < 992) {
			$slider.not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 800,
				infinite: true,
				arrows: false,
				dots: true,
				appendDots: $dots
			});
		} else {
			$slider.filter('.slick-initialized').slick('unslick');
		}
	});
}

$(document).ready(function () {
	if ($('.project-direction__slider').length > 0) {
		handleProjectSliders();

		$(window).on('resize', debounce(handleProjectSliders, 250));
	}
});

/* анимация бегущего фона */
class BackgroundScroller {
	constructor(element, options = {}) {
		if (!element) return;

		this.element = element;
		this.position = 0;
		this.speed = options.speed || 0.5;
		this.direction = options.direction || 1;
		this.isAnimating = false;
		this.animationId = null;

		this.init();
	}

	init() {
		this.element.style.backgroundSize = 'cover';
		this.element.style.backgroundRepeat = 'no-repeat';
		this.element.style.backgroundPosition = '0% center';

		this.start();
	}

	start() {
		if (this.isAnimating) return;
		this.isAnimating = true;
		this.animate();
	}

	stop() {
		this.isAnimating = false;
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
		}
	}

	animate = () => {
		if (!this.isAnimating) return;

		this.position += this.speed * this.direction;

		if (this.position > 100) {
			this.position = 0;
		} else if (this.position < 0) {
			this.position = 100;
		}

		this.element.style.backgroundPosition = `${this.position}% center`;

		this.animationId = requestAnimationFrame(this.animate);
	}
}

const banner = document.querySelector('.team-banner__image');

if (banner) {
	const scroller = new BackgroundScroller(banner, {
		speed: 0.02,
		direction: 1
	});
}

/* анимация счетчика */
function animateCounter() {
	const numElement = document.querySelector('.about-main__num');
	const counter = { value: 0 };

	ScrollTrigger.create({
		trigger: numElement,
		start: 'top bottom',
		once: true,
		onEnter: () => {
			gsap.to(counter, {
				value: 15,
				duration: 2,
				ease: "power2.out",
				onUpdate: () => {
					numElement.innerHTML = '>' + Math.floor(counter.value) + ' <span>ЛЕТ</span>';
				}
			});
		}
	});
}

document.addEventListener('DOMContentLoaded', animateCounter);

/*  */
function initFadeUpAnimation() {
	const animateElements = document.querySelectorAll('.animate');

	animateElements.forEach((element, index) => {
		gsap.set(element, {
			opacity: 0,
			y: 50,
			visibility: 'hidden'
		});

		gsap.to(element, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			visibility: 'visible',
			scrollTrigger: {
				trigger: element,
				start: 'top 80%',
				once: true,
				refreshPriority: -1,
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', initFadeUpAnimation);







