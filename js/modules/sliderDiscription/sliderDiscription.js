/* Импортируем функцию отображения актеров */
import { sliderDiscriptionDetailsCharactersFunction } from "./sliderDiscriptionCharacters/sliderDiscriptionCharacters.js";
/* Импортируем функцию отображения транспортных средств */
import { sliderDiscriptionDetailsVehiclesFunction } from "./sliderDiscriptionVehicles/sliderDiscriptionVehicles.js";
/* Функция работы описания слайдов */
export let sliderDiscriptionFunction = function sliderDiscription() {
  function addSliderDiscription() {
    const sliderDiscription = document.querySelector(
      ".slider__discription-wrapper"
    );

    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
        data.results.sort(function (a, b) {
          if (a.episode_id > b.episode_id) {
            return 1;
          }
          if (a.episode_id < b.episode_id) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        });
        for (let i = 0; i < data.results.length; i++) {
          let discriptionBlock = `
              <div class="slider__discription${i + 1} slider__discription-text">
                <div class="slider__discription-title">
                  ${data.results[i].title}
                </div>
                <div class="slider__discription-episode">
                  Episode №${data.results[i].episode_id}
                </div>
                <div class="slider__discription-opening-crawl">
                  ${data.results[i].opening_crawl}
                </div>
                <div class="slider__discription-director">
                  Director: ${data.results[i].director}
                </div>
                <div class="slider__discription-release-date">
                  Date of release: ${data.results[i].release_date}
                </div>
                <div class="slider__discription-characters">
                  <div class="slider__discription-number-of-characters">
                    Number of characters: ${data.results[i].characters.length}
                  </div>  
                  <div class="slider__discription-button-detail button-detail-characters${
                    i + 1
                  }">
                    <p class="slider__discription-button-detail-text">Detail</p>
                    <div class="slider__discription-button-detail-img-container">
                      <img class="slider__discription-button-detail-img" src="./img/icon/discriptionArrow.png" alt="arrow" />
                    </div>
                  </div>
                </div>
                <div class="slider__discription-vehicles">
                  <div class="slider__discription-number-of-vehicles">
                    Number of vehicles: ${data.results[i].vehicles.length}
                  </div>
                  <div class="slider__discription-button-detail button-detail-vehicles${
                    i + 1
                  } ">
                    <p class="slider__discription-button-detail-text">Detail</p>
                    <div class="slider__discription-button-detail-img-container">
                      <img class="slider__discription-button-detail-img" src="./img/icon/discriptionArrow.png" alt="arrow" />
                    </div>
                  </div>
                </div>
              `;
          let div = document.createElement("div");
          let divElement = sliderDiscription.appendChild(div);
          divElement.innerHTML = discriptionBlock;
        }
        for (let i = 0; i < data.results.length; i++) {
          document
            .querySelector(`.button-detail-characters${i + 1}`)
            .addEventListener("click", () => {
              document.querySelector(
                `.slider__discription-details-character-episode${i + 1}`
              ).style.display = "flex";
              document
                .querySelector(".slider__discription")
                .classList.toggle("show-discription");
            });
        }
        for (let i = 0; i < data.results.length; i++) {
          document
            .querySelector(`.button-detail-vehicles${i + 1}`)
            .addEventListener("click", () => {
              document.querySelector(
                `.slider__discription-details-vehicle-episode${i + 1}`
              ).style.display = "flex";
              document
                .querySelector(".slider__discription")
                .classList.toggle("show-discription");
            });
        }
      });
  }
  addSliderDiscription();
  document
    .querySelector(".slider__discription-button")
    .addEventListener("click", () => {
      document
        .querySelector(".slider__discription")
        .classList.toggle("show-discription");
    });
  sliderDiscriptionDetailsCharactersFunction();
  sliderDiscriptionDetailsVehiclesFunction();
};
sliderDiscriptionFunction();
