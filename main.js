let slides = [
{
   img_path: "./img/1.jpg",
   title: "project 1",
   id: 1
},
{
   img_path: "./img/2.jpg",
   title: "project 2",
   id: 2
},
{
   img_path: "./img/3.jpg",
   title: "project 3",
   id: 3
},
{
   img_path: "./img/4.jpg",
   title: "project 4",
   id: 4
},
{
   img_path: "./img/5.jpg",
   title: "project 5",
   id: 5
}
];

if (slides.length === 0) {
   let sliderLine = document.querySelector(".slider");
   sliderLine.innerHTML = '<p class = "output-error">Здесь был Слайдер!</p>';
} else {

   let slidesNew = [];
   let dots = [];
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

      function init() {
         width = document.querySelector(".slider").offsetWidth;
         slider.style.width = width * images.length + 'px';
         images.forEach( item => {
            item.style.width = width + 'px';
            item.style.height = 600 + 'px';
            item.classList.remove('circle');
            if(width <= 768) {
               item.style.width = width + 'px';
               item.style.height = width + 'px';
               item.classList.add('circle');
            }
            if(width <= 425) {
               item.style.width = width + 'px';
               item.style.height = 'auto';
               item.classList.remove('circle');
            }
         });
      }
      init();
   }
   window.addEventListener('resize', init);

   /* Устанавливаем индекс слайда по умолчанию */
   let slideIndex = 1;
   showSlides(slideIndex);

   /* Увеличиваем индекс на 1 — показываем следующий слайд*/
   function nextSlide() {
      showSlides((slideIndex += 1));
   }

   /* Уменьшает индекс на 1 — показываем предыдущий слайд*/
   function previousSlide() {
      showSlides((slideIndex -= 1));
   }

   /* Функция перелистывания */
   function showSlides(n) {

      slidesNew = document.getElementsByClassName("item");
      dots = document.getElementsByClassName("dot");

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
      for (i = 0; i < dots.length; i++) {
         dots[i].classList.remove("dot-active");
      }
      dots[slideIndex - 1].classList.add("dot-active");
   }
   /* Считываем событие клика по кнопке и перелистываем слайд*/
   document.querySelector(".previous").addEventListener("click", () => {
      previousSlide();
   });
   document.querySelector(".next").addEventListener("click", () => {
      nextSlide();
   });

   /* Считываем событие клика по точке и перелистываем слайд*/
   for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener('click', () => {
         slideIndex = i + 1;
         showSlides(slideIndex);
      })
   };
}
