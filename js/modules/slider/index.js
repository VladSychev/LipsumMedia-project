/* Импортируем содержимое слайдера */
import { slides } from "./data/data.js";
/* Функция работы слайдера */
export let sliderFunction = function slider() {
  if (slides.length === 0) {
    let sliderLine = document.querySelector(".slider");
    sliderLine.innerHTML = '<p class = "output-error">Здесь был Слайдер!</p>';
  } else {
    let slidesNew = [];
    let slider = document.querySelector(".slider__wrapper");
    let allDots = document.querySelector(".all-dots");

    /* Создаем картинки */
    for (let i = 0; i < slides.length; i++) {
      /* Создание img и tittle */
      let block = `
        <div class="item" data-id="${slides[i].id}">
        <span class="tittle">${slides[i].title}</span>
        <img src="${slides[i].img_path}">
        </div>`;
      let div = document.createElement("div");
      let divElement = slider.appendChild(div);
      divElement.innerHTML = block;
      slidesNew.push(divElement);

      /* Создание dots */
      let aDot = document.createElement("a");
      let dot = allDots.appendChild(aDot);
      dot.classList.add("dot");

      /* Адаптация слайдера */

      let images = document.querySelectorAll(".item img");
      let width;
      width = document.querySelector(".slider").offsetWidth;

      let initFunction = function init() {
        slider.style.width = width * images.length + "px";
        images.forEach((item) => {
          item.style.width = width + "px";
          item.style.height = width / 1.7 + "px";
        });
      };
      initFunction();
    }

    /* Функция перелистывания */

    let showSlidesFunction = function showSlides(n) {
      let slidesNew = document.querySelectorAll(".item");
      let dots = document.querySelectorAll(".dot");

      if (n > slidesNew.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slidesNew.length;
      }
      /* Проходим по каждому слайду в цикле for */
      for (let slide of slidesNew) {
        slide.classList.add("show-off");
      }
      slidesNew[slideIndex - 1].classList.remove("show-off");
      /* Проходим по каждой точке в цикле for */
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("dot-active");
      }
      dots[slideIndex - 1].classList.add("dot-active");
    };

    /* Устанавливаем индекс слайда по умолчанию */
    let slideIndex = 1;
    showSlidesFunction(slideIndex);

    /* Увеличиваем индекс на 1 — показываем следующий слайд*/
    let nextSlideFunction = function nextSlide() {
      showSlidesFunction((slideIndex += 1));
    };

    /* Уменьшает индекс на 1 — показываем предыдущий слайд*/
    let previousSlideFunction = function previousSlide() {
      showSlidesFunction((slideIndex -= 1));
    };

    /* Считываем событие клика по кнопке и перелистываем слайд*/
    document.querySelector(".previous").addEventListener("click", () => {
      previousSlideFunction();
    });
    document.querySelector(".next").addEventListener("click", () => {
      nextSlideFunction();
    });

    /* Считываем событие клика по точке и перелистываем слайд*/
    let dotAll = document.querySelectorAll(".dot");
    for (let i = 0; i < dotAll.length; i++) {
      dotAll[i].addEventListener("click", () => {
        slideIndex = i + 1;
        showSlidesFunction(slideIndex);
      });
    }
  }
};
sliderFunction();
